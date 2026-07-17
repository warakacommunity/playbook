---
title: "Python SDK"
sidebar_label: "Python SDK"
description: "Install and use the Python SDK to script AfriAnnotate operations."
sidebar_position: 2
mdx:
  format: md
---

# Python SDK

The [`label-studio-sdk`](https://github.com/HumanSignal/label-studio-sdk)
Python package works against AfriAnnotate out of the box — the API
shape is the same as upstream Label Studio's. Use it to automate
project creation, task imports, annotation exports, and member
management from Python scripts or CI pipelines.

## Install

```bash
pip install label-studio-sdk
```

Minimum Python 3.9. The SDK depends on `httpx` and `pydantic`.

## Get a token

You need a Personal Access Token (PAT) to authenticate. See
[API → Authentication](/annotate/api/overview#authentication) for the step-by-step.
Briefly:

1. Sign in to [label.afriannotate.org](https://label.afriannotate.org).
2. **Profile → Settings → Personal Access Token → Create new token**.
3. Copy the token immediately (only shown once).

For production scripts, store the token in a secret manager / env
var, not in source.

## Hello world

```python
import os
from label_studio_sdk import LabelStudio

client = LabelStudio(
    base_url="https://label.afriannotate.org",
    api_key=os.environ["AFRIANNOTATE_API_KEY"],
)

# List your projects
for project in client.projects.list():
    print(f"{project.id}: {project.title} ({project.task_number} tasks)")
```

## Common operations

### Create a project

```python
project = client.projects.create(
    title="Hausa sentiment v1",
    description="Sentiment labels for Hausa product reviews",
    label_config="""
    <View>
        <Choices name="sentiment" toName="text">
            <Choice value="positive"/>
            <Choice value="negative"/>
            <Choice value="neutral"/>
        </Choices>
        <Text name="text" value="$text"/>
    </View>
    """,
)
print(f"Created project {project.id}")
```

### Import tasks

```python
client.projects.import_tasks(
    id=project.id,
    request=[
        {"data": {"text": "Yana da kyau sosai"}},
        {"data": {"text": "Ban so wannan ba"}},
        {"data": {"text": "Wannan ya yi kyau ainun"}},
    ],
)
```

Each task's `data` keys must match the `$varname` references in
the project's labeling config. See
[Task format](/annotate/data-import/task-format).

### Export annotations

```python
# JSON with full task + annotation structure
export = client.projects.exports.create(
    project_id=project.id,
    request={"format": "JSON"},
)

with open("annotations.json", "wb") as f:
    f.write(export.content)
```

Other supported formats include CSV, CoNLL2003, COCO, YOLO, Pascal VOC,
and ASR / TextGrid for audio. List the formats available for your
project with:

```python
formats = client.projects.exports.list_formats(project_id=project.id)
for fmt in formats:
    print(fmt.name, fmt.title)
```

### Iterate over tasks

```python
# Paginated — handles large datasets
for task in client.tasks.list(project=project.id):
    print(task.id, task.data, task.annotations)
```

### Submit an annotation

```python
client.annotations.create(
    task=task_id,
    result=[
        {
            "from_name": "sentiment",
            "to_name": "text",
            "type": "choices",
            "value": {"choices": ["positive"]},
        }
    ],
)
```

The `result` array follows the same format the labeling UI emits —
see [Task format](/annotate/data-import/task-format) for the per-tag
schema.

## Async client

The SDK ships an async variant with the same surface:

```python
import asyncio
from label_studio_sdk import AsyncLabelStudio

async def main():
    client = AsyncLabelStudio(
        base_url="https://label.afriannotate.org",
        api_key="<your-token>",
    )
    projects = [p async for p in client.projects.list()]
    print(f"{len(projects)} projects")

asyncio.run(main())
```

Useful when running many concurrent operations (bulk import,
parallel exports, etc.).

## Error handling

The SDK raises `label_studio_sdk.errors.APIError` for non-2xx
responses. The error carries the same `{error, code, detail}`
shape the HTTP API returns:

```python
from label_studio_sdk.errors import APIError

try:
    client.projects.create(title="")
except APIError as e:
    print(f"Status: {e.status_code}")
    print(f"Code:   {e.body.get('code')}")
    print(f"Error:  {e.body.get('error')}")
```

`429` responses (rate-limited) include a `retry_after` field in the
body so your script can back off correctly.

## Resources

- [**`label-studio-sdk` GitHub**](https://github.com/HumanSignal/label-studio-sdk)
  — source + per-method reference + more examples
- [**API → Authentication**](/annotate/api/overview#authentication) — getting a
  token, rotation, revocation
- [**Task format**](/annotate/data-import/task-format) — the JSON shape
  every import + annotation result follows
