---
ready: true
last_update:
  date: 2026-11-24
  author: Idris Abdulmumin
---
# Ethics, Bias, and Governance

Learn how to ensure responsible dataset creation by addressing bias, protecting privacy, and maintaining transparency throughout the data lifecycle.

## Why Ethics and Governance Matter

Datasets directly influence the behavior of language AI systems. Poor handling of bias, privacy, or sensitive content can lead to harmful outcomes. Ethical practices and governance frameworks help ensure fairness, accountability, and trust. Who speaks in a dataset, and in which variety, shapes whose language a system handles well, which is why documentation standards for NLP data ask for the speakers' and annotators' backgrounds ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)).

## Key Components of Ethical Data Practices

### Bias Identification and Mitigation

- **Bias detection** – Identify imbalances or skewed representations in data  
- **Source bias** – Assess biases introduced by data sources  
- **Annotation bias** – Monitor inconsistencies across annotators  
- **Mitigation strategies** – Apply re-sampling, re-weighting, or guideline refinement  

Annotation bias is well documented. Models trained on crowdsourced data can learn the habits of a few prolific annotators rather than the task, so keep the annotators of your test set separate from those of your training set ([Geva et al., 2019](../references.md#geva-2019)). In widely used hate speech datasets, markers of African American English correlated with offensive labels, models trained on that data flagged such tweets as offensive at up to twice the rate of others, and telling annotators about the dialect made them less likely to label a tweet offensive ([Sap et al., 2019](../references.md#sap-2019)). The same risk applies to dialects and varieties of African languages, so recruit annotators who know the varieties in your data.

### PII Detection and Removal

- **Personal data identification** – Detect names, addresses, contact details, and identifiers  
- **Automated detection tools** – Use models or rules to flag sensitive information  
- **Manual review** – Validate automated detection with human checks  
- **Data removal or masking** – Delete or obfuscate personal identifiers

Check that any automated detector has been tested on your language before you rely on it, and measure what it misses on a hand-checked sample. For person and place names, named entity data for African languages such as MasakhaNER ([Adelani et al., 2021](../references.md#adelani-2021)) can help you train or test a detector.

### Anonymization Strategies

- **De-identification** – Remove or replace identifiable information  
- **Pseudonymization** – Substitute identifiers with artificial labels, for the annotators as well as the people in the data: see [Personally identifiable information](../data-governance/index.md#personally-identifiable-information) for pseudonymizing annotator IDs in exports.
- **Aggregation** – Present data in grouped form to prevent re-identification  
- **Risk assessment** – Evaluate re-identification risks after anonymization  

Pseudonymized data is still personal data in law: under the GDPR, data that can be linked back to a person with additional information remains personal data, and only data that no longer identifies anyone falls outside the regulation ([European Union, 2016](../references.md#gdpr-2016)). Re-identification is also easier than it looks: one study estimated that 99.98% of Americans would be correctly re-identified in any dataset using 15 demographic attributes ([Rocher et al., 2019](../references.md#rocher-2019)). Treat removing names as a first step, not as anonymization.

### Sensitive Attribute and Content Handling

- **Sensitive attributes** – Gender, ethnicity, religion, health, or political views  
- **Content moderation** – Handle harmful, offensive, or explicit content carefully  
- **Access control** – Restrict sensitive data to authorized users  
- **Use-case alignment** – Decide inclusion based on task requirements  

Many data protection laws give these attributes extra protection. The GDPR's special categories include racial or ethnic origin, political opinions, religious beliefs, health data and biometric data used to identify a person ([European Union, 2016](../references.md#gdpr-2016)), and South Africa's POPIA lists similar "special personal information", such as religious beliefs, ethnic origin, political views and health ([Republic of South Africa, 2013](../references.md#popia-2013)). Check the law in each country where you collect data; see [Legal and consent](../legal-consent/index.md).

### Fair Representation

- **Inclusive sampling** – Ensure diverse representation across groups  
- **Balanced datasets** – Avoid over- or under-representation  
- **Context awareness** – Consider cultural and linguistic diversity  
- **Evaluation fairness** – Test models across different subgroups  

Report results per subgroup, not only overall. Disaggregated evaluation of commercial gender classifiers found error rates of up to 34.7% for darker-skinned women against at most 0.8% for lighter-skinned men, a gap the overall accuracy hid ([Buolamwini and Gebru, 2018](../references.md#buolamwini-2018)). Model cards make this kind of per-group reporting a standard part of release ([Mitchell et al., 2019](../references.md#mitchell-2019)). For language data, the subgroups usually include language, dialect, script, region and speaker gender or age.

### Risk Documentation and Transparency

- **Risk identification** – Document potential harms and limitations  
- **Datasheets and documentation** – Provide clear dataset descriptions  
- **Transparency practices** – Share collection, processing, and annotation details  
- **Governance policies** – Define rules for dataset usage and distribution  

Established templates cover most of this: datasheets ([Gebru et al., 2021](../references.md#gebru-2021)), data statements for NLP ([Bender and Friedman, 2018](../references.md#bender-friedman-2018)) and Data Cards ([Pushkarna et al., 2022](../references.md#pushkarna-2022)). For governance, the CARE principles set out a community's authority over data about it ([Carroll et al., 2020](../references.md#carroll-2020)), and the BigScience project describes a distributed governance structure for language data ([Jernite et al., 2022](../references.md#jernite-2022)). See [Data governance](../data-governance/index.md) for how to apply them.

## Further reading

- [Nekoto et al., 2020](../references.md#nekoto-2020): how Masakhane involved native speakers as co-creators of data and models.
- [Bird, 2020](../references.md#bird-2020): centring the communities whose languages are at stake rather than treating them as data sources.
- [Peng et al., 2021](../references.md#peng-2021): why released datasets need ongoing stewardship to limit harm.
