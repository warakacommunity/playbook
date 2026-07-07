---
sidebar_position: 4
title: Edge devices and cheap-hardware inference
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Edge devices and cheap-hardware inference

*Last reviewed: 2026-07-07.*

Most published NLP benchmarks are run on hardware nobody in the target African-language deployment context owns. A 200 ms latency claim on an A100 GPU is not a claim about what your user experiences on a $50 phone. This page is the practical guide to making models run on the hardware that actually reaches African users — Android Go, mid-range Android, single-board computers running as village-scale servers, and everything in between. The [offline chapter](./offline.md) is about *what the app does* when connectivity is bad; this chapter is about *how the model runs* on hardware that is cheap.

## The phone tier map — the deployment surface

There is no single "African phone" any more than there is a single European phone; but the practical device mix is heavily skewed toward the low end of what the ML press treats as normal. Design against the real distribution, not the median press review.

- **Android Go phones (2 GB RAM, ARM Cortex-A53 class, no NNAPI).** Sub-$80 handsets. Still the fastest-growing tier in many African markets. Inference budget: under 100 MB in RAM, under 200 MB on disk, no acceleration.
- **Mid-range Android (4-6 GB RAM, ARM Cortex-A75 class, NNAPI available on newer devices).** $80-$300 handsets. The majority tier in urban markets today. Inference budget: under 400 MB in RAM, under 800 MB on disk, NNAPI or on-device NPU on Snapdragon-8-Gen-adjacent chipsets.
- **High-end Android and modern iOS.** $300+. The lucrative tier commercial products target, and a shrinking share of the actual African deployment surface if reach matters. Inference budget: multi-GB models feasible, GPU or on-device NPU available.
- **KaiOS feature phones (Cat B4B) with Firefox OS heritage.** 512 MB - 1 GB RAM. A large residual user base for text-only NLP use cases via web app or PWA. Inference budget: send-to-server, essentially no on-device NLP.
- **Basic feature phones (no smart OS).** Text via SMS or USSD only; the [SMS/USSD/WhatsApp chapter](./sms-ussd-whatsapp.md) is the design reference.

For non-phone edge deployment — village-scale or clinic-scale server workloads:

- **Raspberry Pi 4 / 5 (4-8 GB RAM, no GPU).** ~$50-$100. Widely deployed as edge servers where mains power is intermittent but not absent.
- **Jetson Nano / Orin Nano (4-8 GB RAM, small NVIDIA GPU).** ~$150-$500. The workhorse for on-device speech and vision at a village or clinic scale.
- **Old laptops (i5/i7 with 8-16 GB RAM, no GPU).** The de-facto edge-server hardware for many community projects; almost free at second-hand market rates.

Deployment code that targets one tier will not run acceptably on the others. Decide up front which tiers the deployment must support, and design against the lowest one that matters.

## Model-size budgets, restated

Reproducing the numbers from the [offline chapter](./offline.md#model-size-budget) because they are the load-bearing part of edge design, with elaboration on how to hit them.

- **Android Go**: model on disk under 200 MB, in RAM under 100 MB, inference in tens to hundreds of milliseconds per short sentence. Sub-100M-parameter models quantised to INT8. Practical: distilled encoder-only models (mBERT-small, DistilBERT-multilingual with LoRA fine-tuning), quantised TrOCR-small, distilled TTS voice models. Full-scale Whisper is out; Whisper-tiny quantised is in.
- **Mid-range Android**: under 800 MB on disk, under 400 MB in RAM. Distilled 600M-parameter models with careful INT8 quantisation. Practical: NLLB-200-distilled at INT8, AfroXLMR-base with LoRA adapters, MMS ASR adapters, Whisper-small quantised.
- **High-end phones**: multi-GB feasible but the download UX becomes the binding constraint. See the model-download UX section in the [offline chapter](./offline.md#model-download-ux-—-the-part-that-gets-ignored).

The right question at any tier is not "will it fit"; it is "will it fit, run in a user-tolerable time, and stay under the thermal + battery envelope." All three tests must pass; passing only "will it fit" is a common failure.

## Quantisation revisited — the deployment-tuned view

The [compute-poor chapter](../compute-poor/index.md#quantisation-—-the-deployment-lever) covers quantisation as a training-and-deployment technique in general. Here are the edge-specific choices:

- **INT8 dynamic quantisation** — the safe default for on-device inference on Android and iOS. Memory roughly halved, throughput 1.5-2x higher, quality drop typically under 1 point on classification tasks and 1-2 chrF points on generation. Use unless you have measured a problem.
- **INT8 static (per-channel) quantisation** — better quality retention than dynamic; requires a calibration pass. Worth the extra step for production deployments on mid-range and up.
- **INT4 quantisation** — aggressive; memory quartered, throughput 2-3x higher, quality drop noticeable on morphology-rich languages. Test extensively on target-language content before deploying; do not rely on English-language benchmark numbers to predict impact.
- **Mixed-precision (FP16 activations, INT8 weights)** — a compromise that works well on newer devices with NNAPI support. Usually not worth the complexity on Android Go.
- **Quantisation-aware training (QAT)** — better than post-training quantisation for aggressive levels but requires re-training. Rarely worth it below the small-NGO compute profile.

For deployment on phones, **quantisation is not optional**. Deploy a non-quantised model to an Android Go phone and the app will crash on first inference or drain battery within an hour. Every training decision made without quantisation in the eventual deployment stack in mind is a decision that may have to be re-made.

## Inference runtimes — what actually runs on-device

The training framework and the deployment runtime are usually not the same. Concrete choices:

- **[ONNX Runtime](https://onnxruntime.ai/)** with the Mobile execution provider — the pragmatic default for cross-platform (Android + iOS) deployment of transformer-based models. Supports INT8, INT4, quantised BERT/RoBERTa/T5-family. Documentation is solid.
- **[TensorFlow Lite (LiteRT)](https://ai.google.dev/edge/litert)** — Android-native runtime with NNAPI integration. Works well for classification and small encoder-decoder models; less mature for large LLM inference than the LLM-specific runtimes below.
- **[whisper.cpp](https://github.com/ggerganov/whisper.cpp)** — the reference on-device ASR runtime, with quantised model support for Whisper-family models across CPU, ARM, and Apple Silicon. If your deployment is speech, this is your default.
- **[llama.cpp](https://github.com/ggerganov/llama.cpp)** — the reference on-device LLM runtime, with heavy quantisation and CPU/GPU/Metal/Vulkan backends. Supports many multilingual models including AfroXLMR fine-tunes exported to the runtime's `.gguf` format.
- **[MLC-LLM](https://mlc.ai/mlc-llm/)** — cross-platform LLM inference (Android, iOS, WebAssembly) with strong quantisation support. A defensible choice for consumer LLM deployment on mid-range and up.
- **[MediaPipe](https://developers.google.com/mediapipe)** and Google's on-device MMS + Gemma runtimes — Android-native ML deployment, useful for pipelines that combine NLP with vision or audio.
- **[Meta's PyTorch Executorch](https://pytorch.org/executorch/)** — newer PyTorch-native mobile deployment; worth watching but less mature than the alternatives listed above.
- **Custom TorchScript / TensorFlow SavedModel deployment** — the manual path. Sometimes necessary; rarely first-choice.

For simplicity: default to whisper.cpp for on-device ASR, llama.cpp or MLC-LLM for on-device generative models, ONNX Runtime Mobile for on-device classification and NER. Reach for the alternatives when a specific constraint (thermal envelope, memory ceiling, specific accelerator) forces it.

## Battery, thermal, and background inference

Real device deployment fails at least as often on power and thermal issues as on model-size issues. Concrete rules:

- **Measure battery drain per 100 inferences on the target hardware.** A model that runs correctly but drains 20% battery per 100 inferences is a deployment failure — the user will notice and stop opening the app. Realistic targets: under 1% battery per 100 short-inference calls on mid-range hardware, under 3% on Android Go.
- **Measure thermal steady-state.** Continuous inference on entry-level phones triggers thermal throttling within seconds. If your app does inference on every keystroke or every seconds-worth of audio, thermal throttling will halve your effective throughput after the first minute. Design for burst-and-idle usage patterns, not steady stream.
- **Never do inference in the background.** Android and iOS both aggressively kill apps that run compute in the background. Even if the OS permits it, users interpret background compute as a battery-drain problem and the app gets uninstalled.
- **On-device sync + inference budgets add up.** If your app both runs a model and syncs data over metered connectivity, both budgets have to fit. Batch sync when charging + on Wi-Fi where possible.

## Edge-server deployment — single-board computers and old laptops

For village-scale or clinic-scale deployments (a health post, a school computer lab, a community radio station serving a district) the edge is a small server, not a phone. Practical guidance:

- **Raspberry Pi 5 with 8 GB RAM** runs quantised 7B models via llama.cpp at usable speeds for offline chat or transcription workloads with small user counts. It is remarkable how far this hardware has come; treat it as a real deployment target, not a demo platform.
- **Jetson Orin Nano** is the workhorse for speech and vision workloads at village scale — small NVIDIA GPU, well-supported by ONNX Runtime and TensorRT.
- **Old laptops running Linux** are the de-facto edge-server for many community projects; almost free at second-hand market rates, easier to service than embedded hardware, no vendor lock-in.
- **Solar + battery power budgets** matter more than raw compute for many rural deployments. A model that runs but requires 40 W of continuous power will not survive on solar + battery in dry-season use. Measure idle + inference power draw at deployment scoping time, not after.
- **OS + software stack drift** is the medium-term maintenance concern. A Raspberry Pi image that works today will be a security-patch nightmare in two years. Plan for update cadence at deployment scoping time.

## Evaluation methodology for edge deployment

Standard NLP benchmarks are run on desktop / server hardware. That evaluation does not predict edge behaviour. What to measure specifically:

- **p50 and p95 latency on the target hardware class**, not on a laptop. Run inference on the actual phone tier or single-board device you are targeting; publish both percentiles.
- **Model-size and load-time budgets separately from inference budgets.** A model that loads in 10 seconds is a UX failure even if inference is fast — users close the app in that window.
- **Quality after quantisation, not before.** The quantised model is what runs; publish that number. See the [compute-poor chapter's evaluation section](../compute-poor/index.md#evaluation-under-a-compute-budget) for the general principle.
- **Thermal-throttled sustained throughput**, not just peak. Run the model in a loop for 5 minutes on the target device; report the average throughput including thermal degradation.
- **Battery drain** as an evaluation metric alongside accuracy. Publish battery-percent-per-100-inferences on target hardware.

## Anti-patterns to avoid

1. **Benchmarking on laptop-class hardware and assuming those numbers hold on the target phone.** They do not.
2. **Not quantising until it is too late.** A model architecture chosen in float32 may not survive quantisation to INT8; better to make the training decision with the deployment target in mind.
3. **Assuming Whisper-large runs on-device because it appeared in a demo.** It runs on a laptop with 32 GB of RAM. It does not run on an Android Go phone. Measure on the actual target.
4. **Ignoring thermal and battery** because "the phone is fine in the office." Office use is not real deployment; test in an African market environment with realistic usage patterns and mid-day heat.
5. **Locking to a single vendor accelerator** (Snapdragon NPU, Qualcomm AI Engine) at the app level. The user base is device-heterogeneous; portable runtimes are worth the small performance cost.
6. **Building against the latest phone your team owns.** Test the app on a phone your team's grandmother owns.
7. **Assuming Raspberry Pi is a toy.** For text and modest-scale speech workloads, a Pi 5 is a real deployment target in 2026. Rejecting it out of habit is expensive.

## Further reading

- [Meta MMS on-device technical report](https://ai.meta.com/blog/multilingual-model-speech-recognition/) — the reference on on-device multilingual ASR constraints and trade-offs.
- [whisper.cpp README](https://github.com/ggerganov/whisper.cpp) — the practical reference for on-device ASR deployment.
- [llama.cpp performance discussions](https://github.com/ggerganov/llama.cpp/discussions) — the ongoing community documentation of quantised LLM inference on constrained hardware.
- [ONNX Runtime Mobile documentation](https://onnxruntime.ai/docs/tutorials/mobile/) — the canonical reference for cross-platform mobile inference.
- [MLC-LLM documentation](https://mlc.ai/mlc-llm/) — the reference for cross-platform quantised LLM deployment.
- [Google MLKit on-device ML docs](https://developers.google.com/ml-kit) — Google's Android-native ML deployment reference.
- [GSMA Mobile Economy Sub-Saharan Africa report](https://www.gsma.com/mobileeconomy/sub-saharan-africa/) — the industry data on handset mix and device tier distribution in African markets.

---

**Contributor's note.** If you have shipped an NLP model on Android Go, on a Raspberry Pi as a community server, or on any similarly-constrained deployment target, the highest-value contribution here is a per-project note describing the model, the quantisation approach, the runtime, and the measured latency and battery numbers. Real numbers from real deployments are the ground truth this page is trying to preserve.
