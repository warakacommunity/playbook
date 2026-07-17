---
title: "Ranker"
sidebar_label: "Ranker"
description: "Control tag — The `Ranker` tag is used to rank items in a `List` tag or pick relevant items from a `List`, depending on using nested `Bucket` tags."
mdx:
  format: md
---

# `<Ranker>`

**Category:** Control tag

The `Ranker` tag is used to rank items in a `List` tag or pick relevant items from a `List`, depending on using nested `Bucket` tags.
In simple case of `List` + `Ranker` tags the first one becomes interactive and saved result is a dict with the only key of tag's name and with value of array of ids in new order.
With `Bucket`s any items from the `List` can be moved to these buckets, and resulting groups will be exported as a dict `{ bucket-name-1: [array of ids in this bucket], ... }`
By default all items will sit in `List` and will not be exported, unless they are moved to a bucket. But with `default="true"` parameter you can specify a bucket where all items will be placed by default, so exported result will always have all items from the list, grouped by buckets.
Columns and items can be styled in `Style` tag by using respective `.htx-ranker-column` and `.htx-ranker-item` classes. Titles of columns are defined in `title` parameter of `Bucket` tag.
Note: When `Bucket`s used without `default` param, the original list will also be stored as "_" named column in results, but that's internal value and this may be changed later.

## Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| name | string | **yes** | — | Name of the element |
| toName | string | **yes** | — | List tag name to connect to |

## Examples

### Example labeling config

You can style the ranker layout using the `Style` tag:

* `.htx-ranker-column` for columns (buckets)

* `.htx-ranker-item `for items

```html
<View>
  <Style>
    .htx-ranker-column { background: cornflowerblue; }
    .htx-ranker-item { background: lightgoldenrodyellow; }
  </Style>
  <List name="results" value="$items" title="Search Results" />
  <Ranker name="rank" toName="results" />
</View>
```

### Example input data

Example list to use as input data:

```json
{
  "items": [
    { "id": "blog", "title": "10 tips to write a better function", "body": "There is nothing worse than being left in the lurch when it comes to writing a function!" },
    { "id": "mdn", "title": "Arrow function expressions", "body": "An arrow function expression is a compact alternative to a traditional function" },
    { "id": "wiki", "title": "Arrow (computer science)", "body": "In computer science, arrows or bolts are a type class..." }
  ]
}
```

### Example results

The saved result is a dictionary with one key (the Ranker tag’s name) and a value that is an array of list item IDs in their new order.

In this example, the annotator moved the list item with `"id": "mdn"` to the top, and `"id": "blog"` to the bottom. The data output would appear as follows:

```json
[
  {
    "value": {
      "ranker": {
        "rank": [
          "mdn",
          "wiki",
          "blog"
        ]
      }
    },
    "id": "PpwBv_NMxd",
    "from_name": "rank",
    "to_name": "results",
    "type": "ranker",
    "origin": "manual"
  }
]
```

## List + Ranker + Buckets

When you use `Ranker` with a nested `Bucket`, you can sort list items into bucket categories.

### Example labeling config 

See the example above for notes on adding styling. 

```html
<View>
  <List name="results" value="$items" title="Search Results" />
  <Ranker name="rank" toName="results">
    <Bucket name="best" title="Best results" />
    <Bucket name="ads" title="Paid results" />
  </Ranker>
</View>
```

### Example input data

See the example list provided above.

### Example results

The saved result is a dictionary where each key is the bucket name and each value is an array of item IDs in that bucket, for example:

```json
[
  {
    "value": {
      "ranker": {
        "_": [
          "wiki"
        ],
        "best": [
          "mdn"
        ],
        "ads": [
          "blog"
        ]
      }
    },
    "id": "sjYK7Bcl7g",
    "from_name": "rank",
    "to_name": "results",
    "type": "ranker",
    "origin": "manual"
  }
]
```

Note that the `"_"` array contains the list items that were **not** sorted into buckets. 

You can change this behavior by designating a default bucket. See the example below.

