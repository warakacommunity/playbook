---
sidebar_position: 1
last_update:
  date: 2026-07-07
  author: Idris Abdulmumin
---

# Compute-poor training and evaluation

*Last reviewed: 2026-07-07.*

Most published NLP work assumes a compute budget that most African research teams do not have. A single fine-tune of a 7B model with the recipes in the flagship papers can burn thousands of dollars of GPU time; those papers are not written for someone whose whole project budget is a Colab Pro subscription. This chapter is the practical guide for teams whose compute constraint is real: what to use, what to avoid, and how to make the small budget count.

The chapter does not tell you to want less. It tells you how to get more out of what you have.

## What "compute-poor" actually means in practice

Four resource profiles cover most African-language NLP work. Every technique in this chapter is discussed with the profile it fits in mind.

- **Grad student / individual researcher.** Personal laptop, free Colab, occasional Kaggle notebook. Effective GPU-hours per week: 10–30.
- **Community research team.** Shared Colab Pro (~$10/month), Kaggle team account (30 hours free GPU per week per member), occasional access to a shared institutional GPU. Effective GPU-hours per week: 40–150.
- **Small NGO or early-stage startup.** ~$50–500/month cloud budget on GCP, AWS, or Runpod; occasional grant credits (Google TRC, Microsoft AI for Good). Effective GPU-hours per month: 200–1,500.
- **University lab.** Shared cluster with a small pool of A100 or H100 GPUs; competition for time is the real constraint, not the dollar cost. Effective GPU-hours: highly variable.

Recognise which profile you are in. Techniques that make sense at profile 4 are wasteful at profile 1, and vice versa.

## Method selection — the shortest path

For most African-language NLP tasks, the compute-cheapest path to a usable model is:

1. **Start from a checkpoint that already knows a lot.** Never train from scratch. Every task in this playbook has a defensible starting checkpoint — AfroXLMR for text, NLLB-200-distilled for MT, MMS or Whisper for ASR, XLS-R for low-resource speech. Fine-tuning from a good checkpoint is one to two orders of magnitude cheaper than training from scratch, at every parameter count.
2. **Use parameter-efficient fine-tuning.** LoRA and QLoRA update a small fraction of the model's parameters and drop memory usage by 10x or more, with negligible quality loss for most tasks. This is the technique that turns "we cannot fit this on our GPU" into "we can fine-tune this on a Colab T4."
3. **Quantise for inference.** INT8 or INT4 quantised inference roughly halves or quarters the memory and speeds up throughput 1.5–3x, with quality degradation that is usually small and always measurable. This is the technique that turns "we fine-tuned it but cannot serve it" into "we can serve it on-device."
4. **Use cross-language transfer as a compute-saving strategy.** Transferring from a closely-related resourced language is nearly always cheaper than training on a much larger corpus in the target language, and often produces comparable quality. See the [cross-language transfer](../cross-language-transfer/index.md) chapter for pivot guidance.
5. **Consider distillation only when serving cost is the binding constraint.** Distillation trades training cost for inference cost — you spend more compute up-front to run a smaller model at deployment. If your deployment is small-scale, quantisation is easier and cheaper.
6. **Consider APIs for prototyping** — Cohere, OpenAI, Anthropic, Google, and others expose multilingual models via API. For prototyping a use case, evaluating whether a task is feasible, or running one-off inference on hundreds of test examples, the cost is often lower than provisioning your own GPU. For production deployment, weigh cost per call, latency, data-sovereignty implications, and licence terms; API dependency introduces its own risks.

The techniques compose. LoRA on a base model + INT8 quantisation for serving + starting from a cross-language-transfer-warm checkpoint is the practical baseline for most projects at profiles 1–3.

## LoRA and QLoRA — what and when

[LoRA (Low-Rank Adaptation)](https://arxiv.org/abs/2106.09685) adds small trainable rank-decomposition matrices to a frozen pre-trained model. You update a few million parameters instead of hundreds of millions or billions, and the resulting adapter is small enough to distribute freely.

[QLoRA](https://arxiv.org/abs/2305.14314) runs LoRA on top of a 4-bit quantised base model. Memory reduction is dramatic — a 7B model that would need 28 GB of GPU memory for standard fine-tuning fits in around 6 GB with QLoRA. This is the difference between "cannot run" and "runs on a Colab free tier."

Practical guidance:

- **Default to LoRA** for parameter-efficient fine-tuning on a memory-adequate GPU (T4, V100, A100). Quality is essentially unchanged from full fine-tuning for the great majority of tasks.
- **Move to QLoRA** when memory is the binding constraint or when the base model is 7B+. Expect a small but measurable quality drop versus LoRA; measure it.
- **Rank matters less than people think.** Rank 8 or 16 is usually enough. Higher ranks add parameters without improving quality on most African-language tasks.
- **Alpha and dropout matter for stability.** Follow the published recipes for your model architecture; do not over-tune.
- **Use the [Hugging Face PEFT library](https://huggingface.co/docs/peft/)** as the canonical implementation. Reinventing this stack is not a good use of your compute budget.

## Quantisation — the deployment lever

For inference-time compute reduction:

- **INT8 quantisation** with libraries like [bitsandbytes](https://github.com/TimDettmers/bitsandbytes) is nearly free — a quality drop of a fraction of a percentage point on most tasks, memory roughly halved, throughput 1.5–2x higher. Default to it for serving unless you have measured a quality problem.
- **INT4 quantisation** is more aggressive — memory quartered, throughput 2–3x higher, but quality drop is noticeable on morphology-rich tasks. Always measure the drop on your target language before deploying.
- **Quantisation-aware training** (QAT) preserves quality better than post-training quantisation for aggressive levels but requires more compute. Rarely worth it at profiles 1–2; sometimes worth it at 3–4.
- **On-device deployment** (see [Deployment for African contexts](../deployment/offline.md)) essentially requires quantised inference. Plan for it from the training stage — a model trained without quantisation in mind may fail its accuracy target after quantisation and require retraining.

For ASR specifically, [whisper.cpp](https://github.com/ggerganov/whisper.cpp) and MLC-based on-device runtimes are the reference implementations for quantised deployment on constrained hardware.

## Distillation — when it earns its cost

Distillation is training a smaller model to reproduce a larger model's outputs. It reduces inference cost but increases training cost, and it usually loses some quality. Practical guidance:

- **Use it when serving cost is the binding constraint** — high-QPS deployment where a 3B model would work but a 300M model would work more cheaply.
- **Do not use it when training cost is the binding constraint** — for a research project shipping a research release, quantisation of the larger model is easier, cheaper, and typically produces comparable inference cost.
- **The distilled student inherits the teacher's biases and blind spots.** A teacher that under-performs on your target language transfers that under-performance to the student. Distillation does not fix upstream problems.

## API-based approaches — legitimate but not free

For prototyping, small-scale evaluation, or targets where the community explicitly consents to API-mediated processing:

- **[Cohere](https://cohere.com/)** — strong multilingual coverage including some African languages; competitive pricing for embedding and classification tasks.
- **[OpenAI](https://platform.openai.com/), [Anthropic](https://www.anthropic.com/api), [Google (Gemini)](https://ai.google.dev/), [Mistral](https://mistral.ai/)** — general-purpose LLMs with varying African-language coverage. Measure per language; the published multilingual claims are marketing-broad, not accuracy-guaranteed.
- **[Hugging Face Inference API](https://huggingface.co/inference-api)** and Inference Endpoints — access community-hosted models without provisioning infrastructure. Excellent for one-off runs, expensive at production scale.

Cost is measured in tokens or characters, not GPU-hours; a single evaluation pass of ten thousand test examples with a mid-tier commercial API is typically $5–$50 depending on model. Compare this against the amortised cost of provisioning your own GPU before deciding.

Warnings that always apply:

- **Data sovereignty.** Sending community-derived African-language data to a foreign API means the data leaves the jurisdiction it was collected in. Check the [legal, consent, and community IP](../legal-consent/index.md) chapter — this is usually not what the community agreed to.
- **Licence and re-use.** Many commercial APIs' terms allow the provider to use your inputs to train their own models. Read the terms; this is often not what the community agreed to either.
- **Reproducibility.** APIs deprecate models. A benchmark you ran last quarter on a commercial API may not be reproducible next quarter. Publish the specific model version and note the reproducibility caveat.

## Platform-by-platform notes

- **[Google Colab](https://colab.google/)** — free tier gives limited T4 access, quota-limited. Colab Pro at ~$10/month is a 5–10x productivity multiplier for individual researchers. Pro+ at ~$50/month gives longer sessions and better GPUs. The free tier is enough for LoRA fine-tuning of small models on modest datasets; anything larger, budget for Pro.
- **[Kaggle Notebooks](https://www.kaggle.com/docs/notebooks)** — 30 hours per week of free GPU (T4 x2 or P100). Substantially underused by African NLP teams. Combine with Colab for higher effective throughput.
- **[Hugging Face Spaces](https://huggingface.co/spaces)** — free CPU compute for demos; paid GPU tiers for hosted inference. Excellent for shipping a demo of a fine-tuned model without provisioning cloud infrastructure.
- **[Google TPU Research Cloud (TRC)](https://sites.research.google/trc/about/)** — free TPU time for research projects with a lightweight application. Under-applied for by African researchers; the application takes an hour and can unlock hundreds of TPU-hours.
- **[Microsoft AI for Good / AI for Africa](https://www.microsoft.com/en-us/ai/ai-for-good)** — periodic credit grants for community-benefit projects. Cadence varies; check current programmes.
- **[NVIDIA Inception programme](https://www.nvidia.com/en-us/startups/)** and **[startup credits from GCP, AWS, and Azure](https://cloud.google.com/startup)** — for teams that qualify as startups; typical credit awards are $1k–$100k with varying restrictions.
- **Community GPU pools** — several African research communities operate shared GPU access (SunbirdAI, DSN Nigeria, and others; availability changes). Search current listings; do not assume access is automatic.
- **University clusters** — where they exist, use them. Expect competition, poor documentation, and unclear priority ordering; budget time to negotiate access and to work around cluster idiosyncrasies.

## Realistic budgets

Rough end-to-end budgets, all figures order-of-magnitude:

- **A LoRA fine-tune of AfroXLMR-large on a MasakhaNER-2 language.** Under 24 GPU-hours on a T4 or better. Feasible on Colab free tier if the run is chunked into checkpointed segments. Total cost: $0–$10.
- **A LoRA fine-tune of NLLB-200-distilled on LAFAND-MT for one language pair.** 24–72 GPU-hours on a V100 or better. Colab Pro or Kaggle. Total cost: $10–$50.
- **A QLoRA fine-tune of a 7B multilingual base model.** 100–300 GPU-hours; needs a solid Colab Pro+ or a modest cloud budget. Total cost: $50–$300.
- **Fine-tuning an MMS adapter on 20 hours of speech.** 40–100 GPU-hours; Kaggle + Colab combined can do it, or ~$40–$120 in cloud spend.
- **Full-scale pretraining of a new African-language base model** (rare — do not do this without a compelling reason). 10,000+ GPU-hours; explicitly out of scope for profiles 1–2, sits at the edge of what a well-credited profile-3 team can attempt.

If the budgets above look too tight for what you want to do, that is often a signal that the [cross-language transfer](../cross-language-transfer/index.md) approach or an API-based prototype is a better fit than a full training run.

## Evaluation under a compute budget

Evaluation costs GPU-hours too, and evaluation quality is where compute-poor work often gets cut short. Non-negotiables:

- **Do not skip human evaluation to save compute.** Automatic metrics are noisy on small samples for low-resource languages; the human-evaluation floor is unchanged by any compute constraint.
- **Cache aggressively.** Every evaluation pass should write its outputs to disk with the model version, so you never re-run inference to recompute a metric.
- **Use small representative evaluation sets** — 200–500 items chosen to span the domains and dialects you care about — rather than the whole test set for every training checkpoint. Run the full test set only at final evaluation.
- **Report per-language and per-class scores** as the playbook demands (see [core principles](../1_introduction/core-principles.md)). This is not more expensive than reporting a single number; it is exactly the same inference, sliced differently.

## Anti-patterns

1. **Training from scratch.** Almost never the right answer for compute-poor teams. Fine-tune from a checkpoint.
2. **Full fine-tuning when LoRA would work.** Wasteful for the great majority of tasks; there is a reason PEFT is the field's operational default now.
3. **Running the same experiment twice because you did not checkpoint.** Every training run should write its state to disk at intervals matched to your compute budget. Losing 24 GPU-hours to a Colab timeout is a preventable mistake.
4. **Publishing results without measuring the quantisation impact.** If you fine-tuned in float16 but plan to serve in INT8, your published number is not your served number. Measure both.
5. **Assuming the free-tier GPU will keep the same architecture.** Colab and Kaggle's free-tier GPUs change over time. Code that assumes a specific device will fail; write portable code.
6. **Renting expensive GPUs for prototyping** when Colab Pro would do. Match the tool to the phase — prototyping does not need an A100.
7. **Ignoring evaluation cost.** A full evaluation pass at every checkpoint eats compute that could have gone into training. Sample first, evaluate fully at the end.

## Further reading

- [LoRA paper (Hu et al., 2021)](https://arxiv.org/abs/2106.09685) — the foundational parameter-efficient fine-tuning method.
- [QLoRA paper (Dettmers et al., 2023)](https://arxiv.org/abs/2305.14314) — the memory-efficient extension that makes 7B+ fine-tuning feasible on modest hardware.
- [Hugging Face PEFT library docs](https://huggingface.co/docs/peft/) — the canonical implementation used across the ecosystem.
- [bitsandbytes GitHub](https://github.com/TimDettmers/bitsandbytes) — the canonical INT8/INT4 quantisation library.
- [Efficient Deep Learning (Menghani, 2023)](https://arxiv.org/abs/2106.08962) — the survey covering distillation, quantisation, pruning, and NAS at book length.
- [Google TPU Research Cloud programme](https://sites.research.google/trc/about/) — free TPU time for qualifying academic and community projects.
- [Hugging Face Community Compute](https://huggingface.co/blog/community-gpu) — periodic grants of community-hosted GPU time for open-source projects.

---

**Contributor's note.** If you have shipped a fine-tuned model on a genuinely compute-constrained setup — Colab Pro, Kaggle, community GPU, small cloud budget — the most useful thing you can contribute here is a per-project note describing what you used, what it cost, what worked, and what did not. General guidance is only as good as the concrete projects it is drawn from. Consider a [Case Studies](../case-studies/index.md) entry.
