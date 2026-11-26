---
ready: true
last_update:
  date: 2026-11-26
  author: Idris Abdulmumin
---
# Cost and Resource Planning

Learn how to effectively plan the resources required for dataset creation, including budgeting, timelines, and scaling strategies.

:::tip[Key points]

- Plan budget, people and time before collection starts; problems left to later cost more.
- The choice between expert and crowd annotators drives much of the budget.
- Base time and cost estimates on cleaned pilot timings, using the median.
- Scale up in stages, and measure the effect of pre-annotation before relying on it.

:::

## Why planning matters

Dataset creation can be resource-intensive. Good planning helps you use time, budget and people well while keeping data quality high. Data work that is under-planned tends to cost more later, because problems introduced early surface late as "data cascades" ([Sambasivan et al., 2021](../references.md#sambasivan-2021)); see [Project Management](../project-management/index.md).

## Key components of planning

### Budgeting annotation costs

- **Annotation cost estimation** – Calculate cost per sample or per task  
- **Workforce planning** – Consider expert vs crowd annotators  
- **Tooling costs** – Include platforms, storage, and infrastructure  
- **Quality control costs** – Account for validation and review processes  

The expert-or-crowd choice drives much of the budget. On five English tasks, non-expert crowd annotations agreed well with expert gold labels at a fraction of the usual cost ([Snow et al., 2008](../references.md#snow-2008)), but those tasks were chosen to be easy for non-experts. For African languages the pool of fluent, literate annotators on general crowd platforms may be small, so budget for recruiting and training native speakers where the task needs them. If you use a crowdsourcing marketplace, budget for its service fee, which some platforms charge on top of what workers are paid ([Prolific, 2026a](../references.md#prolific-pricing-2026)), and for running your own language screening test; see [Crowdsourcing platforms](../11_text-classification/annotation.md#crowdsourcing-platforms).

### Time estimation

- **Task complexity** – More complex tasks require more time per annotation  
- **Annotator speed** – Estimate based on pilot studies or benchmarks  
- **Project phases** – Include setup, training, annotation, and validation  
- **Buffer time** – Plan for delays and iterations  

**Clean pilot timings before you turn them into cost.** The time per item that an annotation tool records usually covers the whole period an item was open, including breaks, interruptions and items left open overnight. Ask annotators to submit the item, or leave it, before they step away. Then:

1. Look at the spread of timings first.
2. Set aside clear outliers, such as items open for hours.
3. Use the median rather than the mean, because a few very long values pull the mean upwards.
4. Record what you excluded and why.
5. Convert the median into annotator-hours, budget and pay rates, and check the figure again after the first full batch.

### Scaling strategy

- **Incremental scaling** – Start small and expand gradually  
- **Automation support** – Use tools to speed up preprocessing and validation  
- **Parallel workflows** – Distribute tasks across multiple annotators  
- **Quality vs scale balance** – Maintain data quality while increasing size  

Pre-annotation with a model is a common way to cut annotation time, but measure its effect in your pilot: in a controlled study it made annotators faster and could raise quality, yet it also pulled their labels towards the pre-annotation ([Fort and Sagot, 2010](../references.md#fort-sagot-2010)).

## Further reading

- [Sabou et al., 2014](../references.md#sabou-2014): best-practice guidelines for planning and running crowdsourced corpus annotation.
- [Snow et al., 2008](../references.md#snow-2008): an early, widely cited comparison of crowd and expert annotation quality and cost.
- [Sambasivan et al., 2021](../references.md#sambasivan-2021): why skimping on data work causes costly problems later, with practitioners in East and West Africa among those interviewed.
- [Lacuna Fund](../references.md#lacuna-fund): a funder of labelled datasets for low-resource contexts, useful when you plan a budget and look for support.
