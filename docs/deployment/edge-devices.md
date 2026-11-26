---
sidebar_position: 4
title: Edge devices and cheap-hardware inference
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Edge devices and cheap-hardware inference

*Last reviewed: 2026-07-07.*

Most published NLP benchmarks run on hardware that nobody in the target African-language deployment context owns. A 200 ms latency claim on an A100 GPU says nothing about what your user experiences on a \$50 phone.

This page is a practical guide to making models run on the hardware that actually reaches African users: Android Go, mid-range Android, single-board computers used as village-scale servers, and everything in between. The [offline chapter](./offline.md) is about *what the app does* when connectivity is bad; this chapter is about *how the model runs* on cheap hardware.

:::tip[Key points]

- Design for the lowest device tier your users actually have, not for the phone your team owns.
- Each tier has a disk and RAM budget; a model must fit, run in tolerable time, and stay within the battery and heat limits.
- Plan for quantisation from the start, and evaluate the quantised model, not the training checkpoint.
- Pick a portable on-device runtime: whisper.cpp for speech, llama.cpp or MLC-LLM for generation, ONNX Runtime Mobile for classification.
- Measure latency, battery drain and thermal throttling on the target device itself.

:::

## The phone tier map: the deployment surface

There is no single "African phone", any more than there is a single European phone. But the practical device mix leans heavily toward the low end of what the ML press treats as normal. Design against the real distribution, not the median press review.

The budgets below are this playbook's rules of thumb for planning, not measured limits. Replace them with numbers from your own target devices.

- **Android (Go edition) phones (up to about 2 GB RAM, ARM Cortex-A53 class, CPU only).** Entry-level handsets, often under \$80. Android (Go edition) is the configuration of Android for low-RAM phones, and it turns off some features by default. Its minimum RAM is 2 GB from Android 13, and was 512 MB to 1 GB on earlier releases still in use ([Android Developers, n.d.-a](../references.md#android-go)).
  - *Budget:* under 200 MB on disk, under 100 MB in RAM, no acceleration; aim for tens to hundreds of milliseconds per short sentence.
  - *Practical models:* sub-100M-parameter models quantised to INT8. Examples: distilled encoder-only models such as multilingual DistilBERT (distillation made BERT 40% smaller and 60% faster while keeping about 97% of its performance ([Sanh et al., 2019](../references.md#sanh-2019))), fine-tuned with small LoRA adapters ([Hu et al., 2021](../references.md#hu-2021)); quantised TrOCR-small; distilled TTS voice models. Full-scale Whisper is out; Whisper-tiny (39M parameters), quantised, is in ([Radford et al., 2023](../references.md#radford-2023)).
- **Mid-range Android (4-6 GB RAM, ARM Cortex-A75 class).** Roughly \$80-\$300 handsets, with a GPU or on-device NPU on some chipsets. Do not plan around Android's Neural Networks API (NNAPI): it is deprecated as of Android 15, and Google points developers to LiteRT (formerly TensorFlow Lite) with a GPU delegate instead ([Android Developers, n.d.-b](../references.md#android-nnapi)).
  - *Budget:* under 800 MB on disk, under 400 MB in RAM.
  - *Practical models:* distilled models of up to about 600M parameters with careful INT8 quantisation. Examples: the distilled 600M-parameter NLLB-200 model at INT8 ([NLLB Team, 2022](../references.md#nllb-2022)), AfroXLMR-base ([Alabi et al., 2022](../references.md#alabi-2022)) with LoRA adapters, MMS ASR adapters ([Pratap et al., 2023](../references.md#pratap-2023)), and Whisper-small (244M parameters), quantised ([Radford et al., 2023](../references.md#radford-2023)).
- **High-end Android and modern iOS (\$300 and up).** The tier commercial products target, but only part of the African deployment surface if reach matters. A GPU or on-device NPU is available.
  - *Budget:* multi-GB models are feasible.
  - *Practical models:* size is rarely the limit here; the download becomes the binding constraint. See [model download UX](./offline.md#model-download-ux-the-part-that-gets-ignored) in the offline chapter.
- **KaiOS feature phones.** As little as 256 MB RAM on 3G models and 512 MB on 4G models, with a 240 by 320 screen ([KaiOS Technologies, n.d.](../references.md#kaios-hardware)). Suitable for text-only NLP through a web app.
  - *Budget:* send to a server; essentially no on-device NLP.
- **Basic feature phones (no smart OS).** Text via SMS or USSD only; the [SMS/USSD/WhatsApp chapter](./sms-ussd-whatsapp.md) is the design reference.

For non-phone edge deployment (village-scale or clinic-scale server workloads):

| Hardware | RAM and accelerator | Approximate cost | Typical role |
|---|---|---|---|
| Raspberry Pi 4 / 5 | 4-8 GB, no GPU | \$50-\$100 | Edge server where mains power is intermittent but not absent |
| Jetson Nano / Orin Nano | 4-8 GB, small NVIDIA GPU | \$150-\$500 | Workhorse for on-device speech and vision at village or clinic scale |
| Old laptop (i5/i7) | 8-16 GB, no GPU | Almost free second-hand | De-facto edge server for many community projects |

Deployment code that targets one tier will not run acceptably on the others. Decide up front which tiers the deployment must support, and design against the lowest one that matters.

At any tier, the right question is not "will it fit?". It is "will it fit, run in a time the user tolerates, and stay within the thermal and battery envelope?" All three tests must pass; passing only "will it fit" is a common failure.

## Quantisation revisited: the deployment-tuned view

The [compute-poor chapter](../compute-poor/index.md#quantisation-the-deployment-lever) covers quantisation in general. These are the edge-specific choices:

| Option | When to use it on devices |
|---|---|
| **INT8 dynamic** | The safe default for on-device transformer inference on Android and iOS; ONNX Runtime recommends dynamic quantisation for transformer-based models ([Microsoft, n.d.-b](../references.md#onnxruntime-quantization)). |
| **INT8 static (per-channel)** | Needs a calibration pass on representative data to fix activation scales in advance. ONNX Runtime recommends it mainly for CNNs, and per-channel quantisation can recover accuracy for models with large weight ranges ([Microsoft, n.d.-b](../references.md#onnxruntime-quantization)). Worth trying in production on mid-range and up when dynamic quantisation is too slow. |
| **INT4** | Halves INT8 size but harms some languages far more than others, non-Latin scripts most ([Marchisio et al., 2024](../references.md#marchisio-2024)); test with native speakers first (see [compute-poor](../compute-poor/index.md#quantisation-the-deployment-lever)). |
| **Mixed precision** (FP16 activations, INT8 weights) | A compromise that can work well on newer devices with a capable GPU or NPU. Usually not worth the complexity on Android Go. |
| **Quantisation-aware training (QAT)** | Simulates quantisation during training so that accuracy survives it ([Jacob et al., 2017](../references.md#jacob-2017)). Rarely worth it below the small-NGO compute profile; see [compute-poor](../compute-poor/index.md#quantisation-the-deployment-lever). |

On size: INT8 weights take a quarter of the space of FP32 weights, though the saving on the whole model is smaller when some layers stay in floating point. Speed-up and quality loss depend on the model, task and device, so measure both on your target language before and after quantising.

For phones, **plan for quantisation from the start**: an unquantised model often does not fit in an entry-level phone's memory at all, and where it does, it runs slower and drains the battery.

## Inference runtimes: what actually runs on-device

The training framework and the deployment runtime are usually not the same. Concrete choices:

- **[ONNX Runtime](https://onnxruntime.ai/)** (ONNX Runtime Mobile builds for Android and iOS): the pragmatic default for cross-platform deployment of transformer-based models. Supports INT8 and 4-bit weight-only quantisation ([Microsoft, n.d.-b](../references.md#onnxruntime-quantization)) for BERT/RoBERTa/T5-family models. Documentation is solid.
- **[LiteRT (formerly TensorFlow Lite)](https://ai.google.dev/edge/litert)**: Google's on-device runtime, with a GPU delegate on Android; Google now recommends it in place of the deprecated NNAPI ([Android Developers, n.d.-b](../references.md#android-nnapi)). Works well for classification and small encoder-decoder models; for LLMs, use Google's LLM layer on top of it or the LLM-specific runtimes below.
- **[whisper.cpp](https://github.com/ggml-org/whisper.cpp)**: the reference on-device ASR runtime, with quantised model support for Whisper-family models across CPU, ARM, and Apple Silicon. If your deployment is speech, this is your default.
- **[llama.cpp](https://github.com/ggml-org/llama.cpp)**: the reference on-device LLM runtime, with heavy quantisation and CPU/GPU/Metal/Vulkan backends, for decoder models converted to its `.gguf` format. It is built for generative models; for encoder classifiers such as AfroXLMR fine-tunes, ONNX Runtime is usually the simpler path.
- **[MLC-LLM](https://mlc.ai/mlc-llm/)**: cross-platform LLM inference (Android, iOS, WebAssembly) with strong quantisation support. A defensible choice for consumer LLM deployment on mid-range and up.
- **[MediaPipe](https://developers.google.com/mediapipe)**: Google's on-device ML pipelines for Android, iOS and the web, with ready-made solutions for vision, audio and text; useful for pipelines that combine NLP with vision or audio.
- **[ExecuTorch](https://pytorch.org/executorch/)**: PyTorch's own on-device runtime, the natural choice if your training stack is PyTorch and you want to avoid a format conversion; check its support for your model's operators before committing.
- **Custom TorchScript / TensorFlow SavedModel deployment**: the manual path. Sometimes necessary; rarely first-choice.

For simplicity: default to whisper.cpp for on-device ASR, llama.cpp or MLC-LLM for on-device generative models, ONNX Runtime Mobile for on-device classification and NER. Reach for the alternatives when a specific constraint (thermal envelope, memory ceiling, specific accelerator) forces it.

## Battery, thermal, and background inference

Real device deployment fails at least as often on power and thermal issues as on model-size issues. Concrete rules:

- **Measure battery drain per 100 inferences on the target hardware.** A model that runs correctly but drains 20% battery per 100 inferences is a deployment failure: the user will notice and stop opening the app. As a starting target (a rule of thumb, not a published benchmark), aim for under 1% battery per 100 short-inference calls on mid-range hardware and under 3% on Android Go, and adjust once you have measured how your users actually use the app.
- **Measure thermal steady-state.** Sustained inference on entry-level phones can trigger thermal throttling, after which the chip runs more slowly. If your app does inference on every keystroke or every second of audio, expect throughput to drop as the phone heats up. Design for burst-and-idle usage patterns, not steady stream.
- **Avoid inference in the background.** Mobile operating systems restrict background work: on Android 8.0 and later, an app's background services are stopped a few minutes after the app leaves the foreground, and deferred work is meant to go through scheduled jobs ([Android Developers, n.d.-c](../references.md#android-background-limits)). Even where the OS permits it, users are likely to read background compute as a battery drain.
- **On-device sync + inference budgets add up.** If your app both runs a model and syncs data over metered connectivity, both budgets have to fit. Batch sync when charging + on Wi-Fi where possible.

## Edge-server deployment: single-board computers and old laptops

For village-scale or clinic-scale deployments (a health post, a school computer lab, a community radio station serving a district), the edge is a small server, not a phone. Practical guidance:

- **Raspberry Pi 5 with 8 GB RAM** can run small quantised models via llama.cpp or whisper.cpp for offline chat or transcription with small user counts. Larger models (around 7B parameters) fit in memory but generate slowly, so measure tokens per second for your model before promising interactive use. Treat it as a real deployment target, not a demo platform.
- **Jetson Orin Nano** is the workhorse for speech and vision workloads at village scale: a small NVIDIA GPU, well supported by ONNX Runtime and TensorRT.
- **Old laptops running Linux** are the de-facto edge server for many community projects: almost free second-hand, easier to service than embedded hardware, and free of vendor lock-in.
- **Solar and battery power budgets** matter more than raw compute for many rural deployments. A model that needs 40 W of continuous power will not survive on solar and battery through the dry season. Measure idle and inference power draw when you scope the deployment, not after.
- **Operating-system and software drift** is the medium-term maintenance concern. A Raspberry Pi image that works today will need security patches and updates for years. Plan the update schedule when you scope the deployment.

## Evaluation methodology for edge deployment

Standard NLP benchmarks are run on desktop / server hardware. That evaluation does not predict edge behaviour. What to measure specifically:

- **p50 and p95 latency on the target hardware class**, not on a laptop. Run inference on the actual phone tier or single-board device you are targeting; publish both percentiles.
- **Model-size and load-time budgets separately from inference budgets.** A model that loads in 10 seconds is a UX failure even if inference is fast: users close the app in that window.
- **Quality after quantisation, not before.** The quantised model is what runs; publish that number. See the [compute-poor chapter's evaluation section](../compute-poor/index.md#evaluation-under-a-compute-budget) for the general principle.
- **Thermal-throttled sustained throughput**, not just peak. Run the model in a loop for 5 minutes on the target device; report the average throughput including thermal degradation.
- **Battery drain** as an evaluation metric alongside accuracy. Publish battery-percent-per-100-inferences on target hardware.

## Anti-patterns to avoid

1. **Benchmarking on laptop-class hardware and assuming those numbers hold on the target phone.** They do not.
2. **Not quantising until it is too late.** A model architecture chosen in float32 may not survive quantisation to INT8; better to make the training decision with the deployment target in mind.
3. **Assuming Whisper-large runs on-device because it appeared in a demo.** Whisper-large has 1.55 billion parameters, and its reference implementation needs about 10 GB of GPU memory ([Radford et al., 2023](../references.md#radford-2023)). It does not run on an Android Go phone. Measure on the actual target.
4. **Ignoring thermal and battery** because "the phone is fine in the office." Office use is not real deployment; test in an African market environment with realistic usage patterns and mid-day heat.
5. **Locking to a single vendor accelerator** (Snapdragon NPU, Qualcomm AI Engine) at the app level. The user base is device-heterogeneous; portable runtimes are worth the small performance cost.
6. **Building against the latest phone your team owns.** Test the app on a phone your team's grandmother owns.
7. **Assuming Raspberry Pi is a toy.** For text and modest-scale speech workloads, a Pi 5 is a real deployment target in 2026. Rejecting it out of habit is expensive.

## Further reading

- The Massively Multilingual Speech (MMS) paper ([Pratap et al., 2023](../references.md#pratap-2023)) and its [announcement](https://ai.meta.com/blog/multilingual-model-speech-recognition/): speech models for over 1,100 languages, with small per-language adapters that suit constrained deployment.
- [whisper.cpp README](https://github.com/ggml-org/whisper.cpp): the practical reference for on-device ASR deployment.
- [llama.cpp performance discussions](https://github.com/ggml-org/llama.cpp/discussions): the ongoing community documentation of quantised LLM inference on constrained hardware.
- [ONNX Runtime Mobile documentation](https://onnxruntime.ai/docs/tutorials/mobile/) and its [quantisation guide](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html) ([Microsoft, n.d.-b](../references.md#onnxruntime-quantization)): the canonical reference for cross-platform mobile inference.
- [MLC-LLM documentation](https://mlc.ai/mlc-llm/): the reference for cross-platform quantised LLM deployment.
- [Google ML Kit on-device ML docs](https://developers.google.com/ml-kit): Google's ready-made on-device ML APIs for Android and iOS.
- The GSMA's *Mobile Economy Africa 2025* ([GSMA Intelligence, 2025](../references.md#gsma-me-africa-2025)): industry data on mobile subscription, mobile internet use and the barriers to it, including handset affordability, across Africa.

---

**Contributor's note.** If you have shipped an NLP model on Android Go, on a Raspberry Pi as a community server, or on any similarly-constrained deployment target, the highest-value contribution here is a per-project note describing the model, the quantisation approach, the runtime, and the measured latency and battery numbers. Real numbers from real deployments are the ground truth this page is trying to preserve.
