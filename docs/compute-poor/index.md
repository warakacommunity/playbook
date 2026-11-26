---
sidebar_position: 1
ready: true
last_update:
  date: 2026-07-07
  author: Shamsuddeen Hassan Muhammad
---

# Compute-poor training and evaluation

*Last reviewed: 2026-07-07.*

Most published NLP work assumes a compute budget that most African research teams do not have. A single fine-tune of a 7B model with the recipes in the flagship papers can burn thousands of dollars of GPU time. Those papers are not written for someone whose whole project budget is a Colab Pro subscription.

This chapter is the practical guide for teams whose compute constraint is real: what to use, what to avoid, and how to make a small budget count. It does not tell you to want less. It tells you how to get more out of what you have.

:::tip[Key points]

- Never train from scratch: fine-tune a strong existing checkpoint.
- Use LoRA by default, and QLoRA when GPU memory is the limit.
- Quantise for serving (INT8 first), and always measure the quality drop on your own language.
- APIs are fine for prototypes, but check data sovereignty, terms of use and reproducibility.
- Save compute on evaluation by caching and sampling, never by skipping human evaluation.

:::

## What "compute-poor" actually means in practice

Four resource profiles cover most African-language NLP work. Every technique in this chapter is discussed with the profile it fits in mind.

The GPU-hour figures below are the authors' rough estimates for planning, not measured averages. Platform quotas and prices change often.

| Profile | Typical resources | Effective GPU-hours |
|---|---|---|
| **1. Grad student / individual researcher** | Personal laptop, free Colab, occasional Kaggle notebook | 10–30 per week |
| **2. Community research team** | Shared Colab Pro (a low-cost monthly subscription; check current pricing), Kaggle accounts (each with a free weekly GPU quota, around 30 hours at the time of writing), occasional access to a shared institutional GPU | 40–150 per week |
| **3. Small NGO or early-stage startup** | About \$50–500 per month of cloud budget on GCP, AWS or Runpod; occasional grant credits (Google TRC, Microsoft AI for Good) | 200–1,500 per month |
| **4. University lab** | Shared cluster with a small pool of A100 or H100 GPUs; competition for time is the real constraint, not the dollar cost | Highly variable |

Recognise which profile you are in. Techniques that make sense at profile 4 are wasteful at profile 1, and the reverse.

## Method selection: the shortest path

For most African-language NLP tasks, the compute-cheapest path to a usable model is:

1. **Start from a checkpoint that already knows a lot.** Never train from scratch. Every task in this playbook has a defensible starting checkpoint: AfroXLMR for text ([Alabi et al., 2022](../references.md#alabi-2022)), NLLB-200-distilled for MT ([NLLB Team, 2022](../references.md#nllb-2022)), MMS or Whisper for ASR ([Pratap et al., 2023](../references.md#pratap-2023); [Radford et al., 2023](../references.md#radford-2023)), XLS-R for low-resource speech ([Babu et al., 2021](../references.md#babu-2021)). Fine-tuning from a good checkpoint costs a small fraction of what pre-training that checkpoint cost.
2. **Use parameter-efficient fine-tuning.** LoRA trains a tiny fraction of the model's parameters: on GPT-3 175B its authors cut trainable parameters by about 10,000 times and training memory by about 3 times, while matching full fine-tuning quality on their benchmarks ([Hu et al., 2021](../references.md#hu-2021)). QLoRA adds a 4-bit base model and cuts memory much further ([Dettmers et al., 2023](../references.md#dettmers-2023)). This is the technique that turns "we cannot fit this on our GPU" into "we can fine-tune this on a Colab T4."
3. **Quantise for inference.** INT8 or INT4 weights take roughly a half or a quarter of the memory of 16-bit weights. INT8 inference can preserve full-precision quality even for very large models ([Dettmers et al., 2022](../references.md#dettmers-2022)); lower precision can hurt some languages more than others ([Marchisio et al., 2024](../references.md#marchisio-2024)), so always measure. Speed gains depend on your hardware and library. This is the technique that turns "we fine-tuned it but cannot serve it" into "we can serve it on-device."
4. **Use cross-language transfer as a compute-saving strategy.** Transferring from a well-chosen related language with resources is usually cheaper than building and training on a much larger corpus in the target language, and the choice of source language makes a large difference to quality ([Adelani et al., 2022a](../references.md#adelani-2022)). See the [cross-language transfer](../cross-language-transfer/index.md) chapter for pivot guidance.
5. **Consider distillation only when serving cost is the binding constraint.** Distillation trades training cost for inference cost: you spend more compute up-front to run a smaller model at deployment. If your deployment is small-scale, quantisation is easier and cheaper.
6. **Consider APIs for prototyping.** Cohere, OpenAI, Anthropic, Google, and others expose multilingual models via API. For prototyping a use case, evaluating whether a task is feasible, or running one-off inference on hundreds of test examples, the cost is often lower than provisioning your own GPU. For production deployment, weigh cost per call, latency, data-sovereignty implications, and licence terms; API dependency introduces its own risks.

The techniques compose. LoRA on a base model + INT8 quantisation for serving + starting from a cross-language-transfer-warm checkpoint is the practical baseline for most projects at profiles 1–3.

## LoRA and QLoRA: what and when

LoRA (Low-Rank Adaptation) adds small trainable rank-decomposition matrices to a frozen pre-trained model ([Hu et al., 2021](../references.md#hu-2021)). You update a few million parameters instead of hundreds of millions or billions, and the resulting adapter is small enough to distribute freely.

QLoRA runs LoRA on top of a 4-bit quantised base model ([Dettmers et al., 2023](../references.md#dettmers-2023)). Memory reduction is dramatic: its authors fine-tune a 65B model on a single 48 GB GPU, and report matching 16-bit fine-tuning on their academic benchmarks. For 7B models, this is often the difference between "cannot run" and "runs on a single free or low-cost GPU."

Practical guidance:

- **Default to LoRA** for parameter-efficient fine-tuning on a memory-adequate GPU (T4, V100, A100). In the original paper it matched or beat full fine-tuning on most of the benchmarks tested ([Hu et al., 2021](../references.md#hu-2021)); check this on your own task.
- **Move to QLoRA** when memory is the binding constraint or when the base model is 7B+. Quantising the base model can cost more quality on some languages than on English, so measure it on your target language ([Marchisio et al., 2024](../references.md#marchisio-2024)).
- **Rank matters less than people think.** The LoRA paper found ranks as small as 1 to 8 competitive on its tasks, while warning that this may not hold for every task ([Hu et al., 2021](../references.md#hu-2021)). Rank 8 or 16 is a common default; there is little published evidence specific to African languages, so try a couple of values on your development set.
- **Alpha and dropout matter for stability.** Follow the published recipes for your model architecture; do not over-tune.
- **Use the [Hugging Face PEFT library](https://huggingface.co/docs/peft/)** as the canonical implementation. Reinventing this stack is not a good use of your compute budget.

## Quantisation: the deployment lever

Quantisation stores a model's weights with fewer bits, so the model takes less memory and often runs faster. For inference-time compute reduction:

- **INT8 quantisation** with libraries like [bitsandbytes](https://github.com/TimDettmers/bitsandbytes) roughly halves weight memory, and the LLM.int8() method behind it was shown to run models up to 175B parameters without loss of quality on the authors' benchmarks ([Dettmers et al., 2022](../references.md#dettmers-2022)). Speed gains vary with hardware and model size, so measure throughput rather than assume it. Default to INT8 for serving unless you have measured a quality problem.
- **INT4 quantisation** is more aggressive: weight memory is about a quarter of 16-bit. Quality loss varies by language; a study of multilingual LLMs found non-Latin-script languages hit hardest, and found that automatic metrics understated the damage that human raters noticed ([Marchisio et al., 2024](../references.md#marchisio-2024)). Always measure the drop on your target language, with some human checking, before deploying.
- **Quantisation-aware training** (QAT) simulates quantisation during training so that accuracy survives it ([Jacob et al., 2017](../references.md#jacob-2017)). It preserves quality better than post-training quantisation at aggressive levels, but it requires more compute. Rarely worth it at profiles 1–2; sometimes worth it at 3–4.
- **On-device deployment** (see [Edge devices and cheap-hardware inference](../deployment/edge-devices.md)) essentially requires quantised inference. Plan for it from the training stage. A model trained without quantisation in mind may fail its accuracy target after quantisation and need retraining.

For device-specific choices (dynamic versus static INT8, mixed precision, which phone tiers can take what), see [Quantisation revisited: the deployment-tuned view](../deployment/edge-devices.md#quantisation-revisited-the-deployment-tuned-view). For ASR specifically, [whisper.cpp](https://github.com/ggerganov/whisper.cpp) and MLC-based on-device runtimes are widely used for quantised deployment on constrained hardware.

## Distillation: when it earns its cost

Distillation is training a smaller model to reproduce a larger model's outputs ([Hinton et al., 2015](../references.md#hinton-2015)). It reduces inference cost but increases training cost, and it usually loses some quality. DistilBERT is a well-known example: 40% smaller and 60% faster than BERT while keeping 97% of its language-understanding performance ([Sanh et al., 2019](../references.md#sanh-2019)). Practical guidance:

- **Use it when serving cost is the binding constraint.** High-QPS deployment where a 3B model would work but a 300M model would work more cheaply.
- **Do not use it when training cost is the binding constraint.** For a research project shipping a research release, quantisation of the larger model is easier, cheaper, and typically produces comparable inference cost.
- **The distilled student inherits the teacher's biases and blind spots.** A teacher that under-performs on your target language transfers that under-performance to the student. Distillation does not fix upstream problems.

## API-based approaches: legitimate but not free

For prototyping, small-scale evaluation, or targets where the community explicitly consents to API-mediated processing:

- **Commercial LLM APIs** such as [Cohere](https://cohere.com/), [OpenAI](https://platform.openai.com/), [Anthropic](https://www.anthropic.com/api), [Google (Gemini)](https://ai.google.dev/) and [Mistral](https://mistral.ai/): general-purpose and embedding models with varying African-language coverage. Measure per language; published multilingual claims are broad and do not guarantee accuracy on your language.
- **[Hugging Face](https://huggingface.co/docs/inference-providers/) hosted inference** (serverless inference and Inference Endpoints): run community-hosted models without provisioning infrastructure. Good for one-off runs, expensive at production scale.

Cost is measured in tokens or characters, not GPU-hours. As a rough guide only, a single evaluation pass of ten thousand short test examples with a mid-tier commercial API has tended to cost in the range of \$5–\$50, depending on model and prompt length. Check the provider's current per-token prices.

The same content can take many more tokens, and so cost more, in some languages than in English ([Ahia et al., 2023](../references.md#ahia-2023)). Compare this against the amortised cost of provisioning your own GPU before deciding.

Warnings that always apply:

- **Data sovereignty.** Sending community-derived African-language data to a foreign API means the data leaves the jurisdiction it was collected in. Check the [legal, consent, and community IP](../legal-consent/index.md) chapter. This is usually not what the community agreed to.
- **Licence and re-use.** Some providers' terms, particularly for free or consumer tiers, allow the provider to use your inputs to improve or train their models. Read the terms for the exact tier you use; this is often not what the community agreed to either.
- **Reproducibility.** APIs deprecate models. A benchmark you ran last quarter on a commercial API may not be reproducible next quarter. Publish the specific model version and note the reproducibility caveat.

## Platform-by-platform notes

Quotas, prices and programmes on these platforms change often; treat the details below as a snapshot and check the provider's page before planning.

- **[Google Colab](https://colab.google/)**: free tier gives limited T4 access, quota-limited. The paid Pro and Pro+ tiers add compute and longer sessions for a monthly fee (check current pricing); for an individual researcher, Pro is often worth it. The free tier is enough for LoRA fine-tuning of small models on modest datasets; anything larger, budget for Pro.
- **[Kaggle Notebooks](https://www.kaggle.com/docs/notebooks)**: a free weekly GPU quota (around 30 hours at the time of writing, on accelerators such as dual T4s; your account settings show the current figure). Combine with Colab for higher effective throughput.
- **[Hugging Face Spaces](https://huggingface.co/spaces)**: free static Spaces and a free basic CPU tier, with paid GPU hardware for hosted inference and [community GPU grants](https://huggingface.co/docs/hub/spaces-gpus#community-gpu-grants) for some open projects. Check the current terms, since running compute-backed Spaces may require a paid plan. Good for shipping a demo of a fine-tuned model without provisioning cloud infrastructure.
- **[Google TPU Research Cloud (TRC)](https://sites.research.google/trc/about/)**: free access to a large pool of Cloud TPUs for accepted researchers, who are expected to share their TRC-supported research publicly. Applying starts with a short expression-of-interest form, and is worth the effort for any team with a research project.
- **[Microsoft AI for Good / AI for Africa](https://www.microsoft.com/en-us/ai/ai-for-good)**: periodic credit grants for community-benefit projects. Cadence varies; check current programmes.
- **[NVIDIA Inception programme](https://www.nvidia.com/en-us/startups/)** and **[startup credits from GCP, AWS, and Azure](https://cloud.google.com/startup)**: for teams that qualify as startups; credit amounts and restrictions vary by programme and change over time.
- **Community GPU pools**: several African research communities operate shared GPU access (SunbirdAI, DSN Nigeria, and others; availability changes). Search current listings; do not assume access is automatic.
- **University clusters**: where they exist, use them. Expect competition, poor documentation, and unclear priority ordering; budget time to negotiate access and to work around cluster idiosyncrasies.

## Realistic budgets

Rough end-to-end budgets, all figures order-of-magnitude. These are the authors' planning estimates, not measured benchmarks. Record what your own runs cost and share it (see the note at the end of this page).

| Job | GPU-hours | Where it runs | Total cost |
|---|---|---|---|
| LoRA fine-tune of AfroXLMR-large on one MasakhaNER 2 language | Under 24, on a T4 or better | Colab free tier, if the run is split into checkpointed segments | \$0–\$10 |
| LoRA fine-tune of NLLB-200-distilled on LAFAND-MT, one language pair | 24–72, on a V100 or better | Colab Pro or Kaggle | \$10–\$50 |
| QLoRA fine-tune of a 7B multilingual base model | 100–300 | Colab Pro+ or a modest cloud budget | \$50–\$300 |
| MMS adapter fine-tune on 20 hours of speech | 40–100 | Kaggle and Colab combined, or cloud | About \$40–\$120 in cloud spend |
| Full pretraining of a new African-language base model (rare; do not do this without a compelling reason) | 10,000+ | Out of scope for profiles 1–2; at the edge of what a well-credited profile-3 team can attempt | Not a budget item for most teams |

If the budgets above look too tight for what you want to do, that is often a signal that the [cross-language transfer](../cross-language-transfer/index.md) approach or an API-based prototype is a better fit than a full training run.

## Evaluation under a compute budget

Evaluation costs GPU-hours too, and evaluation quality is where compute-poor work often gets cut short. Non-negotiables:

- **Do not skip human evaluation to save compute.** Automatic metrics are noisy on small samples for low-resource languages; the human-evaluation floor is unchanged by any compute constraint.
- **Cache aggressively.** Every evaluation pass should write its outputs to disk with the model version, so you never re-run inference to recompute a metric.
- **Use small representative evaluation sets** (200–500 items chosen to span the domains and dialects you care about) rather than the whole test set for every training checkpoint. Run the full test set only at final evaluation.
- **Report per-language and per-class scores** as the playbook demands (see [core principles](../1_introduction/core-principles.md)). This is not more expensive than reporting a single number; it is exactly the same inference, sliced differently.

## Anti-patterns

1. **Training from scratch.** Almost never the right answer for compute-poor teams. Fine-tune from a checkpoint.
2. **Full fine-tuning when LoRA would work.** Wasteful for the great majority of tasks; there is a reason PEFT is the field's operational default now.
3. **Running the same experiment twice because you did not checkpoint.** Every training run should write its state to disk at intervals matched to your compute budget. Losing 24 GPU-hours to a Colab timeout is a preventable mistake.
4. **Publishing results without measuring the quantisation impact.** If you fine-tuned in float16 but plan to serve in INT8, your published number is not your served number. Measure both.
5. **Assuming the free-tier GPU will keep the same architecture.** Colab and Kaggle's free-tier GPUs change over time. Code that assumes a specific device will fail; write portable code.
6. **Renting expensive GPUs for prototyping** when Colab Pro would do. Match the tool to the phase: prototyping does not need an A100.
7. **Ignoring evaluation cost.** A full evaluation pass at every checkpoint eats compute that could have gone into training. Sample first, evaluate fully at the end.

## Further reading

- [Hu et al. (2021)](../references.md#hu-2021): LoRA, the foundational parameter-efficient fine-tuning method.
- [Dettmers et al. (2023)](../references.md#dettmers-2023): QLoRA, the memory-efficient extension that makes 7B+ fine-tuning feasible on modest hardware.
- [Dettmers et al. (2022)](../references.md#dettmers-2022): LLM.int8(), the 8-bit inference method behind the bitsandbytes library.
- [Marchisio et al. (2024)](../references.md#marchisio-2024): how quantisation affects multilingual models, language by language.
- [Ahia et al. (2023)](../references.md#ahia-2023): why commercial API costs differ across languages.
- [Menghani (2021)](../references.md#menghani-2021): a survey of efficient deep learning, covering distillation, quantisation, pruning and more.
- [Hugging Face PEFT library docs](https://huggingface.co/docs/peft/): the canonical implementation used across the ecosystem.
- [bitsandbytes GitHub](https://github.com/TimDettmers/bitsandbytes): the canonical INT8/INT4 quantisation library.
- [Google TPU Research Cloud programme](https://sites.research.google/trc/about/): free TPU time for accepted research projects.
- [Hugging Face community GPU grants](https://huggingface.co/docs/hub/spaces-gpus#community-gpu-grants): grants of GPU hardware for Spaces built by the community.

:::note[Contributor's note]

If you have shipped a fine-tuned model on a genuinely compute-constrained setup (Colab Pro, Kaggle, community GPU, small cloud budget), the most useful thing you can contribute here is a per-project note describing what you used, what it cost, what worked, and what did not. General guidance is only as good as the concrete projects it is drawn from. Consider a [Case Studies](../case-studies/index.md) entry.

:::
