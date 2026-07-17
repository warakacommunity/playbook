---
title: "Cloud storage"
sidebar_label: "Cloud storage"
description: "Connect Amazon S3, Google Cloud Storage, or Azure Blob Storage to your AfriAnnotate project — for both source data and annotation export."
sidebar_position: 3
mdx:
  format: md
---

# Cloud storage

For production-scale datasets, point AfriAnnotate at a cloud bucket
rather than uploading files through the UI. The platform reads tasks
from the bucket as **source storage** and (optionally) writes
annotations back to a bucket as **target storage**.

Supported providers:

| Provider | Source | Target |
|---|:---:|:---:|
| Amazon S3 | ✓ | ✓ |
| Google Cloud Storage | ✓ | ✓ |
| Microsoft Azure Blob Storage | ✓ | ✓ |

Each source and target storage connection is **project-specific**.
You can connect multiple buckets to the same project — useful when
data lands in several buckets owned by different teams.

:::tip
For one-off uploads (proof of concept, a single CSV, a small batch
of images), the [drag-drop UI](/annotate/data-import/tasks) is faster — no bucket
setup required. Cloud storage is the right call once data
ingestion is recurring and you want the originals to live somewhere
you control + back up.
:::

## Source storage

AfriAnnotate does not automatically sync data from source storage. If you upload new data to a connected cloud storage bucket, sync the storage connection using the UI to add the new labeling tasks to AfriAnnotate without restarting. You can also use the API to set up or sync storage connections. See [AfriAnnotate API](https://api.label.afriannotate.org/api-reference/introduction/getting-started) and locate the relevant storage connection type. 

Task data synced from cloud storage is not stored in AfriAnnotate. Instead, the data is accessed using presigned URLs. You can also secure access to cloud storage using VPC and IP restrictions for your storage — see the [Security model](/annotate/platform-admin/security).

### Source storage permissions

* If you set the import method to "Files", AfriAnnotate backend will only need LIST permissions and won't download any data from your buckets.

* If you set the import method to "Tasks", AfriAnnotate backend will require GET permissions to read JSON files and convert them to AfriAnnotate tasks. 

When your users access labeling, the backend will attempt to resolve URI (e.g., s3://) to URL (https://) links. URLs will be returned to the frontend and loaded by the user's browser. To load these URLs, the browser will require HEAD and GET permissions from your Cloud Storage. The HEAD request is made at the beginning and allows the browser to determine the size of the audio, video, or other files. The browser then makes a GET request to retrieve the file body.

### Source storage Sync and URI resolving

Source storage functionality can be divided into two parts:
* Sync - when AfriAnnotate scans your storage and imports tasks from it.
* URI resolving - when the AfriAnnotate backend requests Cloud Storage to resolve URI links (e.g., `s3://bucket/1.jpg`) into HTTPS (`https://aws.amazon.com/bucket/1.jpg`). This way, user's browsers are able to load media. 

![](/annotate-assets/img/source-cloud-storages.png)

### Import method

:::info
The "Treat every bucket object as a source file" option was renamed and reintroduced as the "Import method" dropdown.

:::
AfriAnnotate Source Storages feature an "Import method" dropdown. This setting enables two different methods of loading tasks into AfriAnnotate.

##### Tasks

When set to "Tasks", tasks in JSON, JSONL/NDJSON or Parquet format can be loaded directly from storage buckets into AfriAnnotate. This approach is particularly helpful when dealing with complex tasks that involve multiple media sources.

![](/annotate-assets/img/source-storages-treat-off.png)

You may put multiple tasks inside the same JSON file, but not mix task formats inside the same file.

<details>
<summary>Example with bare tasks</summary>



`task_01.json`
```
{
  "image": "s3://bucket/1.jpg",
  "text": "opossums are awesome"
}
```

`task_02.json`
```
{
  "image": "s3://bucket/2.jpg",
  "text": "cats are awesome"
}
```

Or:

`tasks.json`
```
[
  {
    "image": "s3://bucket/1.jpg",
    "text": "opossums are awesome"
  },
  {
    "image": "s3://bucket/2.jpg",
    "text": "cats are awesome"
  }
]
```

</details>

<br>

<details>
<summary>Example with tasks, annotations and predictions</summary>


`task_with_predictions_and_annotations_01.json`
```
{
    "data": {
        "image": "s3://bucket/1.jpg",
        "text": "opossums are awesome"
    },
    "annotations": [...],  
    "predictions": [...]
}
```

`task_with_predictions_and_annotations_02.json`
```
{
    "data": {
      "image": "s3://bucket/2.jpg",
      "text": "cats are awesome"
    }
    "annotations": [...],  
    "predictions": [...]
}
```

Or:

`tasks_with_predictions_and_annotations.json`
```
[
  {
      "data": {
          "image": "s3://bucket/1.jpg",
          "text": "opossums are awesome"
      },
      "annotations": [...],  
      "predictions": [...]
  },
  {
      "data": {
        "image": "s3://bucket/2.jpg",
        "text": "cats are awesome"
      }
      "annotations": [...],  
      "predictions": [...]
  }
]
```

</details>

<br>

<details>
<summary>Example with JSONL</summary>


`tasks.jsonl`
```
{ "image": "s3://bucket/1.jpg", "text": "opossums are awesome" }
{ "image": "s3://bucket/2.jpg", "text": "cats are awesome" }
```

</details>

In AfriAnnotate and Starter Cloud editions, Parquet files can also be used to import tasks in the same way as JSON and JSONL.

<br>

##### Files

When set to "Files", AfriAnnotate automatically lists files from the storage bucket and constructs tasks. This is only possible for simple labeling tasks that involve a single media source (such as an image, text, etc.).* 

![](/annotate-assets/img/source-storages-treat-on.png)


### Pre-signed URLs vs. Storage proxies

There are two secure mechanisms in which AfriAnnotate fetches media data from cloud storage: via pre-signed URLS and via proxy. Which one you use depends on whether you have **Use pre-signed URLs** toggled on or off when setting up your source storage. **Use pre-signed URLs** is used by default. Proxy storage is enabled when **Use pre-signed URLs** is OFF.



<br/>

#### Pre-signed URLs

In this scenario, your browser receives an HTTP 303 redirect to a time-limited S3/GCS/Azure presigned URL. This is the default behavior. 

The main benefit to using pre-signed URLs is if you want to ensure that your media files are isolated **from** the AfriAnnotate network as much as possible. 

![Diagram of presigned URL flow](/annotate-assets/img/storages/storage-proxy-presigned.png)

The permissions required for this are already included in the cloud storage configuration documentation below. 


#### Proxy storage

When in proxy mode, the AfriAnnotate backend fetches objects server-side and streams them directly to the browser.

![Diagram of proxy flow](/annotate-assets/img/storages/storage-proxy.png)

This has multiple benefits, including:

- **Security**
    - Access to media files is further restricted based on AfriAnnotate user roles and project access. 
    - This access is applied to cached files. This means that even if the media is cached, access will be restricted to that file if a user's access to the task is revoked.  
    - Data stays within the AfriAnnotate network boundary. This is especially useful for on-prem environments who want to maintain a single entry point for their network traffic.
- **Configuration**
    - No CORS settings are needed. 
    - No pre-signed permissions are needed. 

To allow proxy storage, you need to ensure your permissions include the following: 

<details>
<summary>AWS S3</summary>


```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}

```

</details>

<br>

<details>
<summary>Google Cloud Storage</summary>


- `storage.objects.get` - Read object data and metadata
- `storage.objects.list` - List objects in the bucket (if using prefix)

</details>

<br>

<details>
<summary>Azure Blob Storage</summary>


Add the **Storage Blob Data Reader** role, which includes:
- `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read`
- `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/getTags/action`

</details>

<br>

:::note[Note for on-prem deployments]
Large media files are streamed in sequential 8 MB chunks, which are split into different GET requests. This can result in frequent requests to the backend to get the next portion of data and uses additional resources.

You can configure this using the following environment variables:

* `RESOLVER_PROXY_MAX_RANGE_SIZE` - Defaults to 8 MB, and defines the largest chunk size returned per request. 
* `RESOLVER_PROXY_TIMEOUT` - Defaults to 20 seconds, and defines the maximum time uWSGI workers spend on a single request.


:::
## Target storage

If you configure target storage, your annotations will be saved in two places: in the AfriAnnotate database and in your target storage.

* When annotators click **Submit** or **Update** while labeling tasks, an annotation is sent to the target storage as well as to the AfriAnnotate database.
* When a user clicks the **Sync** button on the target storage, all annotations will be saved again from scratch.

The target storage receives a JSON-formatted export of each annotation. See [Task format](/annotate/data-import/task-format) for the structure of exported annotations.

You can also delete annotations in target storage when they are deleted in AfriAnnotate. By default this option is off.

### Target storage permissions

To use this type of storage, you must have PUT permission, and DELETE permission is optional.

## Troubleshooting

When working with an external cloud storage connection, keep the following in mind:

* For Source storage:
   * When **Files** import method is selected, AfriAnnotate doesn’t import the data stored in the bucket, but instead creates *references* to the objects. Therefore, you have full access control on the data to be synced and shown on the labeling screen.
   * When **Tasks** import method is selected, bucket files are assumed to be immutable; the only way to push an updated file's state to AfriAnnotate is to upload it with a new filename to storage or delete all tasks that are associated with that file and resync.
* Sync operations with external buckets only goes one way. It either creates tasks from objects on the bucket (Source storage) or pushes annotations to the output bucket (Target storage). Changing something on the bucket side doesn't guarantee consistency in results.
* We recommend using a separate bucket folder for each AfriAnnotate project. 
* Storage Regions: To minimize latency and improve efficiency, store data in cloud storage buckets that are geographically closer to your team rather than near the AfriAnnotate server.

For more troubleshooting information, see [Troubleshooting AfriAnnotate](/annotate/troubleshooting).

