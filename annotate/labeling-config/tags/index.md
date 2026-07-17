---
title: "Tag reference"
sidebar_label: "Overview"
sidebar_position: 1
description: "Every XML tag you can use in a AfriAnnotate labelling configuration — Object, Control, and Visual tags."
mdx:
  format: md
---

# Tag reference

Every tag you can use inside a `<View>` block in a labelling
configuration. Auto-generated from the schema at
`web/libs/core/src/lib/utils/schema/tags.json` — the same
schema the labeller renders from, so the docs and the runtime
are always aligned on attributes + defaults.

Tags pair via the `name=...` / `toName=...` link: a control tag
(e.g. `<Choices name="sent" toName="txt">`) operates on an
object tag (`<Text name="txt" value="$content">`). Visual tags
(`<View>`, `<Header>`, `<Style>`) shape layout but don't
produce annotations.

Tags marked with the platform name are **AfriAnnotate-specific** — added on
top of the upstream Label Studio tag library for use cases
particular to African-language data work.

## Object tags

Declare the data being labelled (what the annotator sees) — image, text, audio, video, etc.

| Tag | Description |
|---|---|
| [`<Audio>`](/annotate/labeling-config/tags/audio) | The Audio tag plays audio and shows its waveform. Use for audio annotation tasks where you want to label regions of audio, see the waveform, and manipulate audio during annotation. |
| [`<AudioRecord>`](/annotate/labeling-config/tags/audiorecord) *(AfriAnnotate)* | The AudioRecord tag lets annotators record audio in-browser via the microphone — useful for ASR corpus collection, pronunciation comparison, voice prompts. Captures WebM/Opus by default with configurable bitrate, sample rate, and noise/echo cancellation. Optional live waveform display while recording. |
| [`<AudioTextAlign>`](/annotate/labeling-config/tags/audiotextalign) *(AfriAnnotate)* | The AudioTextAlign tag pairs an audio clip with its transcript and lets annotators align words / tokens to time positions in the audio. Useful for forced-alignment correction, prosody annotation, and building TTS training corpora. |
| [`<Channel>`](/annotate/labeling-config/tags/channel) | Channel tag can be used to label time series data |
| [`<Chat>`](/annotate/labeling-config/tags/chat) | displays a conversational transcript and lets annotators |
| [`<HyperText>`](/annotate/labeling-config/tags/hypertext) | displays hypertext markup for labeling. Use for labeling HTML-encoded text and webpages for NER and NLP projects. |
| [`<Image>`](/annotate/labeling-config/tags/image) | shows an image on the page. Use for all image annotation tasks to display an image on the labeling interface. |
| [`<List>`](/annotate/labeling-config/tags/list) | is used to display a list of similar items like articles, search results, etc. Task data in the `value` parameter should be an array of objects with `id`, `title`, `body`, and `html` fields. |
| [`<MultiChannel>`](/annotate/labeling-config/tags/multichannel) | MultiChannel tag for grouped display of channels on the same plot |
| [`<MultiModalCanvas>`](/annotate/labeling-config/tags/multimodalcanvas) *(AfriAnnotate)* | Binds several time-based object tags (Audio, Video, AudioTextAlign) into ONE labeling surface with ONE playhead and ONE shared-region timeline. Payoff for the 'one recording, many views' pattern common in speech, gesture, and audio-video corpus annotation. |
| [`<Paragraphs>`](/annotate/labeling-config/tags/paragraphs) | displays paragraphs of text on the labeling interface. Use to label dialogue transcripts for NLP and NER projects. |
| [`<Pdf>`](/annotate/labeling-config/tags/pdf) | is used to display a PDF document from a URL. |
| [`<Table>`](/annotate/labeling-config/tags/table) | is used to display object keys and values in a table. |
| [`<Text>`](/annotate/labeling-config/tags/text) | shows text that can be labeled. Use to display any type of text on the labeling interface. |
| [`<TimeSeries>`](/annotate/labeling-config/tags/timeseries) | can be used to label time series data. Read more about Time Series Labeling on [the time series template page](https://labelstud.io/templates/time_series). |
| [`<Video>`](/annotate/labeling-config/tags/video) | Video tag plays a simple video file. Use for video annotation tasks such as classification and transcription. |

## Control tags

Declare the annotation type (what the annotator does) — labels, choices, rectangles, brushes, etc. Each control tag links to an object tag via `toName=`.

| Tag | Description |
|---|---|
| [`<BitmaskLabels>`](/annotate/labeling-config/tags/bitmasklabels) | for pixel-wise image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image. |
| [`<Brush>`](/annotate/labeling-config/tags/brush) | is used for image segmentation tasks where you want to apply a mask or use a brush to draw a region on the image. |
| [`<BrushLabels>`](/annotate/labeling-config/tags/brushlabels) | for image segmentation tasks is used in the area where you want to apply a mask or use a brush to draw a region on the image. |
| [`<Choice>`](/annotate/labeling-config/tags/choice) | represents a single choice for annotations. Use with the `Choices` tag or `Taxonomy` tag to provide specific choice options. |
| [`<Choices>`](/annotate/labeling-config/tags/choices) | is used to create a group of choices, with radio buttons or checkboxes. It can be used for single or multi-class classification. Also, it is used for advanced classification tasks where annotators can choose one or multiple answers. |
| [`<DateTime>`](/annotate/labeling-config/tags/datetime) | The DateTime tag adds date and time selection to the labeling interface. Use this tag to add a date, timestamp, month, or year to an annotation. |
| [`<Ellipse>`](/annotate/labeling-config/tags/ellipse) | is used to add an elliptical bounding box to an image. Use for bounding box image segmentation tasks with ellipses. |
| [`<EllipseLabels>`](/annotate/labeling-config/tags/ellipselabels) | creates labeled ellipses. Use to apply labels to ellipses for semantic segmentation. |
| [`<HyperTextLabels>`](/annotate/labeling-config/tags/hypertextlabels) | creates labeled hyper text (HTML). Use with the HyperText object tag to annotate HTML text or HTML elements for named entity recognition tasks. |
| [`<KBRef>`](/annotate/labeling-config/tags/kbref) *(AfriAnnotate)* | Attach a concept from a curated Knowledge Base to a region. Autocomplete search against the KB's entries (label, aliases, external_id). The standard building block for entity linking / concept grounding on top of NER-style span labels. |
| [`<KeyPoint>`](/annotate/labeling-config/tags/keypoint) | is used to add a key point to an image without selecting a label. This can be useful when you have only one label to assign to the key point. |
| [`<KeyPointLabels>`](/annotate/labeling-config/tags/keypointlabels) | creates labeled keypoints. Use to apply labels to identified key points, such as identifying facial features for a facial recognition labeling project. |
| [`<Label>`](/annotate/labeling-config/tags/label) | represents a single label. Use with the `Labels` tag, including `BrushLabels`, `EllipseLabels`, `HyperTextLabels`, `KeyPointLabels`, and other `Labels` tags to specify the value of a specific label. |
| [`<Labels>`](/annotate/labeling-config/tags/labels) | provides a set of labels for labeling regions in tasks for machine learning and data science projects. Use the `Labels` tag to create a set of labels that can be assigned to identified region and specify the values of labels to assign to regions. |
| [`<Magicwand>`](/annotate/labeling-config/tags/magicwand) | makes it possible to click in a region of an image a user is doing segmentation |
| [`<Number>`](/annotate/labeling-config/tags/number) | The Number tag supports numeric classification. Use to classify tasks using numbers. |
| [`<Pairwise>`](/annotate/labeling-config/tags/pairwise) | is used to compare two different objects and select one item from the list. If you want annotators to compare two objects and determine whether they are similar or not, use the `Choices` tag. |
| [`<ParagraphLabels>`](/annotate/labeling-config/tags/paragraphlabels) | creates labeled paragraphs. Use with the `Paragraphs` tag to label a paragraph of text. |
| [`<Polygon>`](/annotate/labeling-config/tags/polygon) | is used to add polygons to an image without selecting a label. This can be useful when you have only one label to assign to the polygon. Use for image segmentation tasks. |
| [`<PolygonLabels>`](/annotate/labeling-config/tags/polygonlabels) | is used to create labeled polygons. Use to apply labels to polygons in semantic segmentation tasks. |
| [`<Ranker>`](/annotate/labeling-config/tags/ranker) | is used to rank items in a `List` tag or pick relevant items from a `List`, depending on using nested `Bucket` tags. |
| [`<Rating>`](/annotate/labeling-config/tags/rating) | adds a rating selection to the labeling interface. Use for labeling tasks involving ratings. |
| [`<Rectangle>`](/annotate/labeling-config/tags/rectangle) | is used to add a rectangle (Bounding Box) to an image without selecting a label. This can be useful when you have only one label to assign to a rectangle. |
| [`<RectangleLabels>`](/annotate/labeling-config/tags/rectanglelabels) | creates labeled rectangles. Use to apply labels to bounding box semantic segmentation tasks. |
| [`<Relation>`](/annotate/labeling-config/tags/relation) | represents a single relation label. Use with the `Relations` tag to specify the value of a label to apply to a relation between regions. |
| [`<Relations>`](/annotate/labeling-config/tags/relations) | is used to create label relations between regions. Use to provide many values to apply to the relationship between two labeled regions. |
| [`<Shortcut>`](/annotate/labeling-config/tags/shortcut) | to define a shortcut that annotators can use to add a predefined object, such as a specific label value, with a hotkey or keyboard shortcut. |
| [`<Taxonomy>`](/annotate/labeling-config/tags/taxonomy) | is used to create one or more hierarchical classifications, storing both choice selections and their ancestors in the results. Use for nested classification tasks with the `Choice` tag. |
| [`<TextArea>`](/annotate/labeling-config/tags/textarea) | is used to display a text area for user input. Use for transcription, paraphrasing, or captioning tasks. |
| [`<TypedFeature>`](/annotate/labeling-config/tags/typedfeature) *(AfriAnnotate)* | Renders a form of typed attributes (string / boolean / int / float / link / concept_kb_ref) on a region. Attributes come from a Typed Feature Layer defined at the project level. INCEpTION-style structured annotation on top of NER-style spans. |
| [`<TimeSeriesLabels>`](/annotate/labeling-config/tags/timeserieslabels) | is used to create a labeled time range. |
| [`<TimelineLabels>`](/annotate/labeling-config/tags/timelinelabels) | Use the TimelineLabels tag to classify video frames. This can be a single frame or a span of frames. |
| [`<Vector>`](/annotate/labeling-config/tags/vector) | is used to add vectors to an image without selecting a label. This can be useful when you have only one label to assign to the vector. Use for image segmentation tasks. |
| [`<VectorLabels>`](/annotate/labeling-config/tags/vectorlabels) | is used to create labeled vectors. Use to apply labels to vectors in semantic segmentation tasks. |
| [`<VideoRectangle>`](/annotate/labeling-config/tags/videorectangle) | VideoRectangle tag brings Object Tracking capabilities to videos. It works in combination with the `<Video/>` and the `<Labels/>` tags. |
| [`<VideoVector>`](/annotate/labeling-config/tags/videovector) | VideoVector tag brings vector annotation capabilities to videos. |
| [`<VideoVectorLabels>`](/annotate/labeling-config/tags/videovectorlabels) | creates labeled vectors on video frames. |

## Visual tags

Shape the labelling interface — layout, headings, conditional show/hide, custom CSS. Don't produce annotations themselves.

| Tag | Description |
|---|---|
| [`<Bucket>`](/annotate/labeling-config/tags/bucket) | Simple container for items in `Ranker` tag. Can be used to group items in `List` tag. |
| [`<Collapse>`](/annotate/labeling-config/tags/collapse) | Collapse tag, a content area which can be collapsed and expanded. |
| [`<Filter>`](/annotate/labeling-config/tags/filter) | Use the Filter tag to add a filter search for a large number of labels or choices. Use with the Labels tag or Choices tag. |
| [`<Header>`](/annotate/labeling-config/tags/header) | is used to show a header on the labeling interface. |
| [`<Markdown>`](/annotate/labeling-config/tags/markdown) | The `Markdown` element is used to display markdown-formatted text content. |
| [`<Style>`](/annotate/labeling-config/tags/style) | is used in combination with the View tag to apply custom CSS properties to the labeling interface. See the [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) on the MDN page for a full list of available properties that you can reference. You can also adjust default Label Studio CSS classes. Use the browser developer tools to inspect the element on the UI and locate the class name, then specify that class name in the `Style` tag. |
| [`<View>`](/annotate/labeling-config/tags/view) | The `View` element is used to configure the display of blocks, similar to the div tag in HTML. |

