---
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---
# Cost and Resource Planning

Learn how to effectively plan the resources required for dataset creation, including budgeting, timelines, and scaling strategies.

## Why Planning Matters

Dataset creation can be resource-intensive. Proper planning helps ensure efficient use of time, budget, and human effort while maintaining data quality. Data work that is under-planned tends to cost more later: in interviews with 53 AI practitioners in India, East and West Africa and the US, 92% reported at least one "data cascade", a data problem that surfaced late and caused downstream harm ([Sambasivan et al., 2021](../references.md#sambasivan-2021)).

## Key Components of Planning

### Budgeting Annotation Costs

- **Annotation cost estimation** – Calculate cost per sample or per task  
- **Workforce planning** – Consider expert vs crowd annotators  
- **Tooling costs** – Include platforms, storage, and infrastructure  
- **Quality control costs** – Account for validation and review processes  

The expert-or-crowd choice drives much of the budget. On five English tasks, non-expert crowd annotations agreed well with expert gold labels at a fraction of the usual cost ([Snow et al., 2008](../references.md#snow-2008)), but those tasks were chosen to be easy for non-experts. For African languages the pool of fluent, literate annotators on general crowd platforms may be small, so budget for recruiting and training native speakers where the task needs them. If you use a crowdsourcing platform, check its fee structure: some charge a percentage on top of what annotators are paid (for example, [Prolific, 2026a](../references.md#prolific-pricing-2026)).

### Time Estimation

- **Task complexity** – More complex tasks require more time per annotation  
- **Annotator speed** – Estimate based on pilot studies or benchmarks  
- **Project phases** – Include setup, training, annotation, and validation  
- **Buffer time** – Plan for delays and iterations  

**Clean pilot timings before you turn them into cost.** The time per item that an annotation tool records usually covers the whole period an item was open, including breaks, interruptions and items left open overnight. Ask annotators to submit the item, or leave it, before they step away. When you summarise pilot timings, look at the spread first, set aside clear outliers such as items open for hours, and use the median rather than the mean, because a few very long values pull the mean upwards. Record what you excluded and why. Only then convert the median into annotator-hours, budget and pay rates, and check the figure again after the first full batch.

### Scaling Strategy

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
