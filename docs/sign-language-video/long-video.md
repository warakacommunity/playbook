---
title: Long video
sidebar_position: 5
ready: true
last_update:
  date: 2026-11-24
  author: Seid Muhie Yimam
---

# Long video

*Last reviewed: 2026-11-24.*

A broadcast programme, a recorded lecture, a community meeting or a sign-language conversation can run for an hour or more, and annotation wants short pieces. This page covers what changes when the source is long: deciding what is labelled, cutting the video into chunks that can be traced back to the source, choosing how many frames to look at, using shot boundaries, and checking that sound and picture still line up. It is the video counterpart of [Segmenting long recordings](../asr/index.md#segmenting-long-recordings) on the ASR page.

Start from a normalised annotation copy, not the master. [Preparing video for annotation](./video.md#preparing-video-for-annotation) covers constant frame rate, keyframe spacing and probing; everything below assumes that copy exists and that its conversion command is logged.

:::danger[Minimum requirements]

- Every chunk, sampled frame and label **must** be traceable to one source file, by a hash of that file and a time in seconds within it.
- All chunks and frames cut from one source **must** go into the same train, validation or test split.
- Sound and picture **must** be checked for sync at the start and the end of every long recording before time-aligned annotation begins.

:::

## Decide what is labelled first

The choice between clip-level and event-level labels decides how to chunk the video, so make it before cutting anything.

- **Clip-level labels** give one label (or a caption) to a whole clip: "this clip shows harvesting". They are cheap, and a model trained on them learns from weak supervision: it is told that something happens in the clip, not when.
- **Event-level labels** mark the start and end of each occurrence inside a longer video: "harvesting from 312.4 s to 351.0 s". They cost more per minute of video, and annotators disagree on boundaries (see the boundary point under [Known limitations to watch for](./video.md#known-limitations-to-watch-for)), so agree a boundary tolerance before you measure agreement.

ActivityNet shows that both can come from the same untrimmed videos: it offers untrimmed video classification, trimmed activity classification and activity detection over 849 hours from 203 classes ([Caba Heilbron et al., 2015](../references.md#caba-heilbron-2015)). If you can afford event labels on a sample, collect them; clip labels can be derived from events later, but not the other way round. If you derive clip labels from events, write down the rule (for example, "a clip is labelled harvesting when an event covers at least half of it") and store it with the release.

Keep "nothing of interest happens here" distinct from "not yet annotated". Give annotators an explicit label for empty stretches, so that a gap in the event list means unannotated, not negative.

## Chunk long videos with provenance

Annotators on phones or metered data cannot load a two-hour file, and many annotation tools become slow on long timelines. Cut the annotation copy into chunks, but keep the source as the reference timeline.

**Choose where to cut.** In rough order of preference:

1. at a natural break: a pause in speech, a turn change, the end of an elicitation prompt, or a shot boundary (see [Shot boundaries and keyframes](#shot-boundaries-and-keyframes));
2. at a fixed length with an overlap, when no natural break exists, so an event cut at the end of one chunk appears whole in the next;
3. never inside an event you will label, when you already know where events are.

As with audio, let a detector suggest cuts and let a person confirm them. Set a minimum and maximum chunk length for the project and merge fragments that fall below the minimum.

**Make cuts exact.** Cutting without re-encoding (stream copy) cannot start a chunk between keyframes. When FFmpeg seeks in stream-copy mode, it seeks to the closest seek point before the requested position and keeps the extra stretch ([FFmpeg Developers, n.d.-a](../references.md#ffmpeg-cli)), and its segment muxer starts every segment on a keyframe of the reference stream, so splits are only exact if keyframes sit at the requested times ([FFmpeg Developers, n.d.-c](../references.md#ffmpeg-formats)). A chunk can therefore start up to one keyframe interval early. Either re-encode with a keyframe forced at each cut, or keep stream-copy chunks and record the start time they actually have, measured with `ffprobe`, rather than the time you asked for.

**Store provenance on every chunk.** At minimum: the source video ID and a hash of the exact source file, the chunk index, the chunk's start and end in seconds within the source, the overlap with its neighbours, the frame rate, how the cut was chosen (pause, shot boundary, fixed length) and the command and tool version that made it. Record the cutting step in the [transformation log](../2_data-collection/8_data-provenance-traceability.md#a-transformation-log-that-travels-with-the-data), so that anyone can trace a chunk back through its [lineage](../2_data-collection/8_data-provenance-traceability.md#data-lineage).

```json
{
  "chunk": "chunks/meeting_017_0003.mp4",
  "source_video_id": "meeting_017",
  "source_sha256": "9f2c...e41a",
  "chunk_index": 3,
  "chunk_start": 180.0,
  "chunk_end": 245.0,
  "overlap_s": 5.0,
  "fps": 25,
  "cut_method": "fixed_length",
  "tool": "ffmpeg 8.1"
}
```

**Store event times on the source timeline.** Annotators work in chunk time (0 s is the start of the chunk). Convert every event to source time by adding `chunk_start` at export, and keep the source time as the canonical value. Where chunks overlap, an event can be marked twice; merge events with the same label whose source-time spans overlap, and send conflicting pairs to review rather than keeping both.

**Keep related chunks together.** Chunks from one recording share people, place and background. Put them, and any frames sampled from them, in one split, as [Split video by video, not by frame](../image-data/splits-and-duplicates.md#split-video-by-video-not-by-frame) explains.

A fixed-length chunking run that forces a keyframe at each cut and writes a list of chunk times:

```bash
# 60-second chunks, re-encoded so each chunk starts exactly on a forced keyframe.
# chunks.csv gets one line per chunk: file name, start and end in seconds within the source.
ffmpeg -i source_annot.mp4 -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -pix_fmt yuv420p -bf 0 -force_key_frames "expr:gte(t,n_forced*60)" \
  -c:a aac -f segment -segment_time 60 -reset_timestamps 1 \
  -segment_list chunks.csv chunks/chunk_%04d.mp4

# Check each chunk's real duration against the list.
for f in chunks/*.mp4; do
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"
done
```

The `-force_key_frames expr:gte(t,n_forced*60)` form forces a keyframe every 60 seconds, and the segment list's CSV format writes each segment's file name, start and end in seconds ([FFmpeg Developers, n.d.-a](../references.md#ffmpeg-cli); [FFmpeg Developers, n.d.-c](../references.md#ffmpeg-formats)). The listed times can differ slightly from the probed chunk durations (by a few hundredths of a second in a test run), so store the probed values in the manifest. This simple run has no overlap; for overlapping chunks, cut each one separately with `-ss` and `-to` and re-encode.

## Shot boundaries and keyframes

A shot is a continuous take from one camera; a shot boundary is a hard cut or a gradual transition such as a fade or dissolve. In edited video (broadcast, documentaries, social media) shot boundaries are good cut points, give one representative frame per shot for fast review, and let annotators skim a long video as a strip of images before opening it.

"Keyframe" has two meanings. A **codec keyframe** (I-frame) is where the encoder stores a full picture; its position follows the encoder settings, not the content. A **representative keyframe** is a frame chosen to stand for a shot. Do not use codec keyframes as representative frames.

Tools that detect shot boundaries:

- **FFmpeg.** The `select` filter exposes a per-frame `scene` score between 0 and 1, and the filter documentation calls comparing it against a value between 0.3 and 0.5 "generally a sane choice". The `scdet` filter logs scene changes with a threshold for which values from 8 to 14 are suggested ([FFmpeg Developers, n.d.-b](../references.md#ffmpeg-filters)).
- **PySceneDetect.** An open-source tool with a content detector for fast cuts, an adaptive detector that compares each frame against a rolling average (useful with camera motion), and a threshold detector for fades. It writes a scene list as CSV, saves images from each scene, and splits the video with FFmpeg; its own documentation notes that splitting by stream copy is faster but less precise ([Castellano, n.d.](../references.md#pyscenedetect)).
- **Learned detectors.** TransNet V2 is a neural shot-transition detector released with a trained model for analysing large archives; its authors note that even common transitions still cause false hits and misses ([Souček and Lokoč, 2020](../references.md#soucek-2020)).

```bash
# Print the time of every frame whose scene score is above 0.4.
ffmpeg -i source_annot.mp4 -vf "select='gt(scene,0.4)',showinfo" -f null - 2>&1 \
  | grep -o "pts_time:[0-9.]*"
```

Treat detected boundaries as suggestions. Flashes, fast camera movement and text overlays cause false cuts; slow fades are missed. Have a person confirm the boundaries on a sample, and tune the threshold per source, because broadcast, phone and drone video behave differently.

Shot detection does little for a single fixed camera, which is the normal case for sign-language and interview recordings. There, cut at pauses, turns or prompt boundaries instead, and for sign language follow the tier model in [Sign language](./sign-language.md#the-annotation-model).

## Choose the frame-sampling rate

Three different rates are often confused:

- **The viewing rate.** Annotators marking event boundaries should always see the full frame rate of the annotation copy, with frame stepping. Do not ask anyone to mark boundaries on a sampled sequence of stills.
- **The labelling rate.** For per-frame labels (frame classification, boxes, keypoints), you choose how many frames per second get a label. For tracked objects, label keyframes and interpolate, as in [Tracking objects across frames](./video.md#tracking-objects-across-frames).
- **The model-input rate.** Training code usually samples frames from a clip, and that rate is a modelling choice, not an annotation one.

Set the labelling rate from the fastest thing that must not be missed. A rule of thumb is to sample often enough that the shortest event you care about contains several sampled frames. Slow scenes, such as a field being worked, may need one frame per second or fewer; fingerspelling needs every frame of video recorded at 50 frames per second or more (see [Recording](./sign-language.md#recording)).

Choose the sampling scheme to match the question:

- **Uniform by time** (for example, one frame per second) is simple and comparable across sources. Sample by time, not by frame index, because sources differ in frame rate. FFmpeg's `fps` filter produces a constant rate by duplicating or dropping frames ([FFmpeg Developers, n.d.-b](../references.md#ffmpeg-filters)).
- **Segment-based sparse sampling** splits a video into equal segments and takes a frame from each, so a fixed number of frames covers the whole video. Temporal Segment Networks used this to learn from whole action videos without processing every frame ([Wang et al., 2016](../references.md#wang-2016-tsn)).
- **One or a few frames per shot** suits edited video and fast review.

```bash
# One frame per second; showinfo prints each output frame's time in seconds (pts_time)
# so the manifest can record where every image came from. Image files are numbered
# from 1 (000001), while showinfo counts frames from 0 (n: 0), so match them with care.
ffmpeg -i source_annot.mp4 -vf "fps=1,showinfo" frames/meeting_017_%06d.jpg 2>&1 \
  | grep -o "n: *[0-9]* .*pts_time:[0-9.]*"
```

Store the time of each sampled frame in seconds within the source, the sampling rate and scheme, and the source hash. A frame number alone is not enough once a file has been re-encoded. Neighbouring sampled frames are near-duplicates, so they follow their source video into one split.

## Check audio-video sync

Long recordings drift. A separate audio recorder and a camera run on different clocks, phone video can have a variable frame rate, and a re-encode or a trimmed stream can shift one track against the other. A few frames of offset ruin lip-reading, transcripts aligned to video, captions timed to speech, and mouthing tiers in sign-language annotation.

For a sense of scale, the broadcast recommendation ITU-R BT.1359 reports that viewers on average detect sound and picture out of sync at about 45 ms when sound is early and 125 ms when sound is late, and accept up to about 90 ms early and 185 ms late ([ITU-R, 1998](../references.md#itu-bt1359)). One frame at 25 frames per second lasts 40 ms, so an offset of a few frames is already noticeable.

Checks to run on every long recording:

- **Compare the streams.** Read each stream's start time and duration with `ffprobe` (command below). A difference in start times is a constant offset; a large difference in duration means a track was cut short or has a tail.
- **Check both ends.** Measure the offset at a sync event near the start (a clap, a slate or a light flash) and again near the end. The same offset at both ends is a constant shift; a different offset means drift, which a single shift cannot fix. [Recording](./sign-language.md#recording) describes the clap or flash anchor for multi-camera shoots.
- **Spot-check speaking faces.** Watch a few seconds of a visible speaker or signer at the start, middle and end, frame by frame if needed.
- **Use a sync model as a screen, not a judge.** Models such as SyncNet estimate the offset between mouth movement and speech ([Chung and Zisserman, 2016](../references.md#chung-2016)). They need a visible, talking face, so they say nothing about scenes without one; route their flags to a person.

```bash
# Start time and duration of every stream, in seconds.
ffprobe -v error -show_entries stream=index,codec_type,start_time,duration \
  -of csv=p=0 source_annot.mp4
```

Fix sync on the annotation copy, never on the master. A constant offset can be corrected by shifting one input: FFmpeg's `-itsoffset` adds an offset to an input's timestamps, so a positive value delays its streams ([FFmpeg Developers, n.d.-a](../references.md#ffmpeg-cli)). Drift needs the audio stretched or re-aligned against several sync points. Log the correction and its size, and re-run the checks after fixing. Do the sync check before chunking, because every chunk inherits the offset of its source.

## Checklist

- [ ] Clip-level or event-level labels decided, and the rule for deriving one from the other written down.
- [ ] An explicit label for empty stretches, distinct from unannotated.
- [ ] Sync checked at the start and end of each source; corrections logged.
- [ ] Cuts at natural breaks where possible; chunk length bounds set; overlap recorded.
- [ ] Chunks either cut on forced keyframes or with their real start time probed and stored.
- [ ] Every chunk and sampled frame carries the source ID, source hash and source-time offsets.
- [ ] Event times exported on the source timeline; overlapping duplicates merged.
- [ ] Sampling rate and scheme recorded with the frames.
- [ ] All chunks and frames from one source in the same split.

## Further reading

- [FFmpeg Filters Documentation](https://ffmpeg.org/ffmpeg-filters.html): the `select`, `scdet`, `fps` and `showinfo` filters used on this page.
- [PySceneDetect documentation](https://www.scenedetect.com/docs/latest/): shot detection, scene lists and splitting.
- [ActivityNet (Caba Heilbron et al., 2015)](https://openaccess.thecvf.com/content_cvpr_2015/html/Heilbron_ActivityNet_A_Large-Scale_2015_CVPR_paper.html): one corpus with untrimmed classification, trimmed classification and detection tasks.
- [Segmenting long recordings](../asr/index.md#segmenting-long-recordings): the speech counterpart of this page.
