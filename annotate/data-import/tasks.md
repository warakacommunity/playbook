---
title: "Import data"
sidebar_label: "Import data"
description: "Label and annotate data for your machine learning and data science projects using common file formats or the Label Studio JSON format."
sidebar_position: 1
mdx:
  format: md
---

Get data into AfriAnnotate in one of three ways:

- **Drag-drop or paste a URL** in the project create wizard or in
  **Project → Settings → Data**. Best for one-shot uploads, sample
  datasets, proof of concept.
- **Connect cloud storage** (GCS / S3 / Azure) as a *source*.
  Better for ongoing pipelines where new data lands in the bucket
  and you want AfriAnnotate to ingest automatically. See
  [Cloud storage](/annotate/data-import/cloud-storage).
- **POST via the API**. Best for programmatic loaders or CI
  pipelines. See [API → Import tasks](/annotate/api/overview#import-tasks).

## General guidelines

* Keep around **100k tasks / 100k annotations per project** for
  best performance. Larger projects work but the dashboard +
  filters get slower past that point. Split by workspace if you
  need more headroom.
* **Avoid frequent imports** — each upload kicks off a background
  reimport job. Batches of ~500-1000 tasks per upload paced at
  one upload per 30 seconds is a safe rhythm.
* Each task's `data` keys must match the `$varname` references in
  your project's labeling config. The wizard surfaces a per-file
  warning when a mismatch is detected (e.g. config wants `$text`
  but the uploaded CSV has no `text` column).
* For **media** (images / audio / video / PDF), drag-drop works
  for proof of concept but isn't ideal for production-scale
  datasets — the platform doesn't run a backup tier for uploaded
  media. **For larger media projects, use cloud storage** and
  point AfriAnnotate at the bucket; the original files stay where
  you can back them up.
    
    **Risks when uploading through the UI**:<br />
    You will face challenges when attempting to do the following: 

        * Importing tasks with predictions
        * Exporting your data
        * Moving your data to another AfriAnnotate instance 
        * Redeploying AfriAnnotate

    We ***strongly*** recommend that you configure [source storage](/annotate/data-import/cloud-storage) instead.


## Types of data you can import into AfriAnnotate

You can import many types of data, including text, timeseries, audio, and image data. The file types supported depend on the type of data. 

| Data type | Supported file types |
| --- | --- |
| Audio | .flac, .m4a, .mp3, .ogg, .wav |
| [HyperText (HTML)](#import-html-data) | .html, .htm, .xml |
| Images | .bmp, .gif, .jpg, .png, .svg, .webp |
| Paragraphs (Dialogue) | .json |
| Structured data | .csv, .tsv | 
| [Text](#plain-text) | .txt, .json |
| [Time series](#import-csv-or-tsv-data) | .csv, .tsv, .json |
| [Tasks with multiple data types](#basic-json-format) | .csv, .tsv, .json, .jsonl*, .parquet*+ |
| Video | .mp4, .webm |

\* *Cloud storage only*

\+ *AfriAnnotate and Starter Cloud only*

If you don't see a supported data or file type that you want to import, please let us know by submitting an issue at [https://github.com/AfriAnnotate/Tool/issues](https://github.com/AfriAnnotate/Tool/issues).


### How to import your data

The most secure and reliable method to import your data is to store the data outside of AfriAnnotate and import references to the data using URLs. You can import a list of URLs in a TXT, CSV, or TSV file, or reference the URLs in [JSON task format](#basic-json-format).

If you're importing audio, image, or video data, you must use URLs to refer to those data types. 

If you're importing HTML, text, dialogue, or timeseries data using the `<HyperText>`, `<Text>`, `<Paragraphs>`, or `<TimeSeries>` tags in your labeling configuration, you can either load data directly, or load data from a URL. 
- To load data from a URL, specify `valueType="url"` in your labeling configuration. 
- To load data directly into the AfriAnnotate database, specify `valueType="text"` for `HyperText` or `Text` data, or `valueType="json"` for `Paragraph` or `TimeSeries` data.

:::note
If you load data from a URL, the data is not saved in AfriAnnotate. If you want an annotated task export to include the data that you annotated, you must import the data into the AfriAnnotate database without using URL references, or combine the data with the annotations after exporting.

:::
<br/>
<details>
<summary>Click to expand example configurations with each valueType</summary>


#### Example with valueType="text"
<div style="margin-left: 1em;">

Labeling configuration:

```xml
<View> 
  <Text name="text1" value="text" valueType="text"> 
</View>
```

JSON file to import:
```json
{
  "text": "My awesome opossum"
}
```

CSV file to import:
```csv
text
My awesome opossum
```

</div>

#### Example with valueType="url"

<div style="margin-left: 1em;">

Labeling config:

```xml
<View> 
  <Text name="text1" value="text" valueType="url"> 
</View>
```

Import JSON file:
```json
{
  "text": "http://example.com/text.txt"
}
```

Import CSV file:
```csv
text
http://example.com/text.txt
```

</div>

</details>


## How to retrieve data

There are several steps to retrieve the data to display in the `Object` tag. The data retrieval is also used in [dynamic choices](https://labelstud.io/templates/serp_ranking) and [labels](https://labelstud.io/templates/inventory_tracking). Use the following parameters in the `Object` tag.

### `value` (required)

The `value` parameter represents the source of the data. It can be plain text or a step of complex data retrieval system. It can be denoted using the following forms:
`value` (required)

#### Variables 

In most cases, the `Object` tag has the value with one variable (prefixed with a $) in it.

For example, `<Audio value="$audio" ... />` seeks the "audio" field in the imported JSON object:
```json
{
  "data": {
    "audio": "https://host.name/myaudio.wav"
  }
}
```

#### Plain text

The value parameter can be a string. It is useful for `Header` and `Text`. 

Also, you can use the content of the tag as value. It is useful for descriptive text tags and is applied for `Label` and `Choice`.

For example:

```xml
<Header>Label audio:</Header>
<Header value="Label only fully visible cars" />
<Text name="instruction" value="Label only fully visible cars" />
<Label>cat</Label>

<Choice>other</Choice>
```

#### Other cases

1. The `value` parameter can be a text containing variables prefixed by $.

    For example:
    ```xml
    <Header value="url: $image"/>
    ```

2. The `value` parameter can also refer to nested data in arrays and dicts (`$texts[2]` and `$audio.url`). 

    For example: 
    ```xml
    <Image name="image" value="$images[0]"/>
    ```


### `valueType` (optional)

The `valueType` parameter defines how to treat the data retrieved from the previous steps.
There are two options such as the  "url" and raw data. Currently the raw data input can be  "text” or "json”. The  “text” is used for `HyperText` and `Text` tags and "json" is used for `TimeSeries` tag. 

For example:

- Using “url”: `<Text name="text1" value="$text" valueType="url"/>` displays the text loaded by the URL.

- Using “text”: `<Text name="text" value="$text" valueType="text"/>` displays the URL without loading the text.

### `resolver` (optional)
    
Use this parameter to retrieve data from multi-column csv on [S3 or other cloud storage](/annotate/data-import/cloud-storage). AfriAnnotate can retrieve it only in run-time, so it's secure.

If you import a file with a list of tasks, and every task in this list is a link to another file in the storage. In this case, you can use the `resolver` parameter to retrieve the content of these files from a storage. 

#### Use Case

There is a list of tasks, where the "remote" field of every task is a link to a CSV file in the storage. Every CSV file has a “text” column with text to be labeled. Every CSV file has a “text” column with text to be labeled. For example:

Tasks:
```json
[
    { "remote": "s3://bucket/text1.csv" },
    { "remote": "s3://bucket/text2.csv" }
]
```

CSV file:
```csv
id;text
12;The most flexible data annotation tool. Quickly installable. Build custom UIs or use pre-built labeling templates.
```

#### Solution

To retrieve the file, use the following parameters:

1. `value="$remote"`: The URL to CSV on S3 is in "remote" field of task data. If you use the `resolver` parameter the `value` is always treated as URL, so you don't need to set `valueType`.

2. `resolver="csv|separator=;|column=text"`: Load this file in run-time, parse it as CSV, and get the “text” column from the first row. 

3. Display the result.

#### Syntax

The syntax for the `resolver` parameter consists of a list of options separated by a `|` symbol.

The first option is the type of file.

:::note
Currently, only CSV files are supported.

:::
The remaining options are parameters of the specified file type with optional values. The parameters for CSV files are:

- `headless`: A CSV file does not have headers (this parameter is boolean and can't have a value).
- `separator=;`: CSV separator, usually can be detected automatically.
- `column=1`: In `headless` mode use zero-based index, otherwise use column name.

For example, `resolver="csv|headless|separator=;|column=1"`


## How to format your data to import it

AfriAnnotate treats different file types different ways. 

If you want to import multiple types of data to label at the same time, for example, images with captions or audio recordings with transcripts, you must use the [basic AfriAnnotate JSON format](#basic-json-format). 

[You can also use a CSV file or a JSON list of tasks to point to URLs with the data](#how-to-import-your-data), rather than directly importing the data if you need to import thousands of files. You can import files containing up to 250,000 tasks or up to 50MB in size into AfriAnnotate.

If you're specifying data in a cloud storage bucket or container, and you don't want to [sync cloud storage](/annotate/data-import/cloud-storage), create and specify [presigned URLs for Amazon S3 storage](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL), [signed URLs for Google Cloud Storage](https://cloud.google.com/storage/docs/access-control/signed-urls), or [shared access signatures for Microsoft Azure](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview) in a JSON, CSV, TSV or TXT file. 

### Basic AfriAnnotate JSON format {#basic-json-format}

The best way to import data into AfriAnnotate is to use a JSON-formatted list of tasks. The `data` key of the JSON file references each task as an entry in a JSON dictionary. If there is no `data` key, AfriAnnotate interprets the entire JSON file as one task. 

In the `data` JSON dictionary, use key-value pairs that correspond to the source key expected by the object tag in the [labeling configuration](/annotate/labeling-config/overview) that you set up for your project. 

Depending on the type of object tag, AfriAnnotate interprets field values differently:
- `<Text value="$key">`: `value` is interpreted as plain text.
- `<HyperText value="$key">`: `value` is interpreted as HTML markup.
- `<HyperText value="$key" encoding="base64">`: `value` is interpreted as a base64 encoded HTML markup.
- `<Audio value="$key">`: `value` is interpreted as a valid URL to an audio file with CORS policy enabled on the server side.
- `<Image value="$key">`: `value` is interpreted as a valid URL to an image file
- `<TimeSeries value="$key">`: `value` is interpreted as a valid URL to a CSV/TSV file if `valueType="url"`, otherwise it is interpreted as a JSON dictionary with column arrays: `"value": {"first_column": [...], ...}` if `valueType="json"`. See more about [how to use valueType](#how-to-import-your-data).
    
You can add other, optional keys to the JSON file.

| JSON key | Description |
| --- | --- | 
| annotations | Optional. List of annotations exported from AfriAnnotate. See [Task format](/annotate/data-import/task-format) for the structure — annotations can be imported back in to reuse them in subsequent labeling tasks. |
| predictions | Optional. List of model prediction results, using the same per-result structure as annotations. Useful for automatic task pre-labeling and active learning. |

See [Task format](/annotate/data-import/task-format) for full details on the JSON shape of imported and exported tasks.

### Example JSON format

For an example text classification project, you can set up a label config like the following:
```xml
<View>
  <Text name="message" value="$my_text"/>
  <Choices name="sentiment_class" toName="message">
    <Choice value="Positive"/>
    <Choice value="Neutral"/>
    <Choice value="Negative"/>
  </Choices>
</View>

```

You can then import text tasks to label that match the following JSON format:

```yaml
[{
  # "data" must contain the "my_text" field defined in the text labeling config as the value and can optionally include other fields
  "data": {
    "my_text": "Opossums are great",
    "ref_id": 456,
    "meta_info": {
      "timestamp": "2020-03-09 18:15:28.212882",
      "location": "North Pole"
    } 
  },

  # annotations are not required and are the list of annotation results matching the labeling config schema
  "annotations": [{
    "result": [{
      "from_name": "sentiment_class",
      "to_name": "message",
      "type": "choices",
      "readonly": false,
      "hidden": false,
      "value": {
        "choices": ["Positive"]
      }
    }]
  }],

  # "predictions" are pretty similar to "annotations" 
  # except that they also include some ML-related fields like a prediction "score"
  "predictions": [{
    "result": [{
      "from_name": "sentiment_class",
      "to_name": "message",
      "type": "choices",
      "readonly": false,
      "hidden": false,
      "value": {
        "choices": ["Neutral"]
      }
    }],
  # score is used for active learning sampling mode
    "score": 0.95
  }]
}]
```

#### Example JSON with multiple tasks
You can place multiple tasks in one JSON file if you're uploading the JSON file using AfriAnnotate Import Dialog only (Data Manager => Import button), or when importing from [cloud storage](/annotate/data-import/cloud-storage). When using cloud storage, you must ensure every task in the file is formatted the same way. 

If you're using [Source cloud storage](/annotate/data-import/cloud-storage), you can also place multiple tasks in a newline-delimited JSON file (JSONL/NDJSON).

<br/>
<details>
<summary>To place multiple tasks in one JSON file, use this JSON format example</summary>

This example contains multiple text classification tasks with no annotations or predictions.

The "data" parameter must contain the "my_text" field defined in the text labeling config and can optionally include other fields. The "id" parameter is not required.

```json
[
   {
      "id":1,
      "data":{
         "my_text":"Opossums like to be aloft in trees."
      }
   },
   {
      "id":2,
      "data":{
         "my_text":"Opossums are opportunistic."
      }
   },
   {
      "id":3,
      "data":{
         "my_text":"Opossums like to forage for food."
      }
   }
]
```

You can also use the bare contents of the "data" field without nesting, as long as you have no annotations or predictions.

```json
[
   {
      "my_text":"Opossums like to be aloft in trees."
   },
   {
      "my_text":"Opossums are opportunistic."
   },
   {
      "my_text":"Opossums like to forage for food."
   }
]
```
</details>

#### Example JSON for older versions of AfriAnnotate
If you're still using a AfriAnnotate version earlier than 1.0.0, refer to this example JSON format. 

<br/>
<details>
<summary>For versions of AfriAnnotate earlier than 1.0.0, use this JSON format example.</summary>

If you're using a version of AfriAnnotate earlier than version 1.0.0, import tasks that match the following JSON format: 

```json
[{
  # "data" must contain the "my_text" field defined by labeling config,
  # and can optionally include other fields
  "data": {
    "my_text": "Opossums are great",
    "ref_id": 456,
    "meta_info": {
      "timestamp": "2020-03-09 18:15:28.212882",
      "location": "North Pole"
    } 
  },

  # completions are the list of annotation results matching the labeling config schema
  "completions": [{
    "result": [{
      "from_name": "sentiment_class",
      "to_name": "message",
      "type": "choices",
      "value": {
        "choices": ["Positive"]
      }
    }]
  }],

  # "predictions" are pretty similar to "completions" 
  # except that they also include some ML-related fields like a prediction "score"
  "predictions": [{
    "result": [{
      "from_name": "sentiment_class",
      "to_name": "message",
      "type": "choices",
      "value": {
        "choices": ["Neutral"]
      }
    }],
  # score is used for active learning sampling mode
    "score": 0.95
  }]
}]
```
</details>

### Import CSV or TSV data

When you import a CSV / TSV formatted text file, AfriAnnotate interprets the column names are as task data keys that correspond to the labeling config you set up: 
```csv
my_text,optional_field
this is a first task,123
this is a second task,456
```

:::note
If your labeling config has a `TimeSeries` tag, AfriAnnotate interprets the CSV/TSV as time series data when you import it. This CSV/TSV is hosted as a resource file and AfriAnnotate automatically creates a task with a link to the uploaded CSV/TSV.

:::
### Plain text

Import data as plain text. AfriAnnotate interprets each line in a plain text file as a separate data labeling task. 

You might use plain text for labeling tasks if you have only one stream of input data, and only one [object tag](/annotate/labeling-config/overview) specified in your label config. 

```text
this is a first task
this is a second task
```

If you want to import entire plain text files without each line becoming a new labeling task, customize the labeling configuration to specify `valueType="url"` in the Text tag. See the [Text tag documentation](https://labelstud.io/tags/text). See more about [how to use the valueType field](#how-to-import-your-data).

### Import HTML data

You can import `HyperText` data in HTML-formatted files and annotate them in AfriAnnotate. When you directly import HTML files, the content is minified by compressing the text, removing whitespace and other nonfunctional data in the HTML code. Annotations that you create are applied to the minified version of the HTML.

If you want to label HTML files without minifying the data, you can do one of the following:
- Import the HTML files as BLOB storage from [external cloud storage such as Amazon S3 or Google Cloud Storage](/annotate/data-import/cloud-storage).
- Update the `HyperText` tag in your labeling configuration to specify `valueType="url"` as described in [How to import your data](#how-to-import-your-data) on this page.

## Import data from a local directory

To import data from a local directory, you have two options:
- Run a web server to generate URLs for the files, then upload a file that references the URLs to AfriAnnotate. 
- Add the file directory as a source or target local storage connection in the AfriAnnotate UI — see [Cloud storage](/annotate/data-import/cloud-storage).

### Run a web server to generate URLs to local files

To run a web server to generate URLs for the files, you can refer to this provided [helper shell script in the AfriAnnotate repository](https://github.com/HumanSignal/label-studio/blob/develop/scripts/serve_local_files.sh) or write your own script. 
Use that script to do the following:
1. On the machine with the file directory that you want AfriAnnotate to import, call the helper script and specify a regex pattern to match the files that you want to import. In this example, the script identifies files with the JPG file extension:
   ```bash
   ./script/serve_local_files.sh <directory/with/files> *.jpg
   ```
   The script collects the links to the files provided by that HTTP server and saves them to a `files.txt` file with one URL per line. 
3. Import the file with URLs into AfriAnnotate using the AfriAnnotate UI. 

:::note
You must keep the web server running while you perform your data labeling so that the URLs remain accessible to AfriAnnotate.

:::
If your labeling configuration supports HyperText or multiple data types, use the AfriAnnotate JSON format to specify the local file locations instead of a `txt` file. See [Cloud storage](/annotate/data-import/cloud-storage) for example formats.

If you serve your data from an HTTP server created like follows: `python -m http.server 8081 -d`, you might need to set up CORS for that server so that AfriAnnotate can access the data files successfully. If needed, run the following from the command line:
```bash
npm install http-server -g
http-server -p 3000 --cors
```

### Add the file directory as source storage in the AfriAnnotate UI

If you're running AfriAnnotate on Docker and want to add local file storage, you need to mount the file directory and set up environment variables. See [Run AfriAnnotate on Docker and use local storage](https://label.afriannotate.org/guide/start#Run-Label-Studio-on-Docker-and-use-Local-Storage).


## Import data from the AfriAnnotate UI {#import-data-from-the-ui}

:::caution
For large projects or business critical projects, do not [upload media files through the AfriAnnotate interface](#import-data-from-the-ui). This is especially true for files such as images, audio, video, timeseries, etc.

Uploading data through the AfriAnnotate UI works fine for proof of concept projects, but it is not recommended for larger projects. AfriAnnotate is not designed as a hosting service at scale and does not have backups for imported media resources. 

**Risks when uploading through the UI**:<br />
You will face challenges when attempting to do the following: 

    * Importing tasks with predictions
    * Exporting your data
    * Moving your data to another AfriAnnotate instance 
    * Redeploying AfriAnnotate

We ***strongly*** recommend that you configure [source storage](/annotate/data-import/cloud-storage) instead.

:::
To import data from the AfriAnnotate UI, do the following:
1. On the AfriAnnotate UI, open the Data Manager page for a specific project.
2. Click **Import** to open the Import dialog.
3. Import your data from files or URLs. 

Data that you import is project-specific.

![Import Button in Data Manager](/annotate-assets/img/screens/import-button.png) 


## Import data using the API

Import your data using the AfriAnnotate API. See the [API documentation for importing tasks](/annotate/api/overview#import-tasks).

### Bulk-import from the command line

For programmatic / CI imports, use the Python SDK or `curl` against
the API rather than the legacy local-CLI flow:

```bash
# Python SDK (pip install afriannotate-sdk):
python -c "
from afriannotate_sdk import Client
c = Client(url='https://label.afriannotate.org', api_key='YOUR_PAT')
c.projects.get(id=42).import_tasks_from_file('my_tasks.json')
"

# Or curl:
curl -X POST 'https://label.afriannotate.org/api/projects/42/import' \
  -H "Authorization: Bearer YOUR_PAT" \
  -H "Content-Type: application/json" \
  --data-binary @my_tasks.json
```

See [API → Authentication](/annotate/api/overview#authentication) for how
to generate the Personal Access Token (PAT).

By default, AfriAnnotate expects JSON-formatted tasks using the
[Basic AfriAnnotate JSON format](#basic-json-format).
