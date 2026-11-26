---
title: Large and geo-referenced imagery
sidebar_position: 8
ready: true
last_update:
  date: 2026-11-26
  author: Seid Muhie Yimam
---

# Large and geo-referenced imagery

Some images are too large to annotate the way the rest of this chapter assumes. A satellite scene, a drone orthomosaic of a farm, or a scanned slide can run to tens of thousands of pixels on each side, far more than a browser can display at once or a model can take as input. Aerial and satellite images also carry a second layer of meaning: every pixel corresponds to a place on the ground. This page covers how to cut large images into workable pieces, how to annotate them without losing objects at the seams, how to keep labels tied to real-world coordinates, and how to respect the licences that come with satellite data.

These images matter for African work. Agriculture is one of the areas where computer-vision research in Africa is most concentrated ([State of CV in Africa, 2024](../references.md#cv-africa-2024)), and much of it, along with settlement and land-cover mapping, starts from imagery taken from above. The annotation shape choices in [Image Data](./index.md#choosing-the-annotation-shape) still apply; this page adds what changes when the image is very large or geo-referenced.

:::tip[Key points]

- Record the ground resolution and the smallest object size in pixels before the pilot.
- Annotate at full resolution with zoom and pan and a systematic sweep; never on a shrunken copy.
- Tile with an overlap wider than the largest object, keep a tile manifest, and merge duplicates.
- Store the CRS, transform and imagery date with every label, and split data by area, not by tile.
- Check the imagery licence before annotating; it decides whether you can release the pixels.

:::

## When an image counts as large

Treat an image as large when an annotator cannot see the smallest object of interest at full resolution while also seeing enough context to recognise it. The problem is the ratio between image size and object size, not file size alone. A 100-megapixel phone panorama of a market may be easy to box at screen size; a much smaller drone image of a seedling nursery may not, because each seedling is a few pixels wide.

Three kinds of large image come up most often:

- **Satellite scenes.** Wide areas at a fixed ground resolution, usually delivered as multi-band GeoTIFF files that hold more than the red, green and blue a screen shows.
- **Aerial and drone imagery.** Many overlapping photographs stitched into an orthomosaic, at much finer resolution than satellites, often a few centimetres per pixel.
- **Gigapixel images that are not maps.** Scanned microscope slides, archive maps and large document scans. They need the same tiling and zoom handling, but have no ground coordinates.

Before you plan anything, write down the ground sample distance (how many centimetres or metres of ground one pixel covers) and the size of the smallest object you want labelled, in pixels. If the smallest object is only a handful of pixels wide, no amount of guideline writing will make the labels reliable; you need finer imagery or a coarser label, such as one label per tile.

## Annotate with zoom and pan, not by shrinking

Never downscale a large image so that it fits the screen and then annotate the small version. The small objects disappear, and boxes drawn on the shrunken image are scaled back up with an error of several pixels. Annotators should work on the full-resolution pixels and move around with zoom and pan.

Viewers handle this in one of two ways:

- **Load the whole image** and let the annotator zoom. This works up to a size the browser can hold in memory.
- **Serve a tile pyramid**: the full-resolution image plus a stack of progressively smaller overview copies, cut into small tiles. The viewer fetches only the tiles in view at the current zoom.

A Cloud Optimized GeoTIFF is a regular GeoTIFF arranged so that clients can fetch only the parts they need over HTTP, and is now an OGC standard ([Cloud Optimized GeoTIFF, n.d.](../references.md#cogeo)). Confirm in the pilot that your annotation tool can display your largest image at full resolution before you import the rest.

Write zoom into the guidelines. State the zoom level at which annotators must check each object, and ask them to sweep the image systematically, for example row by row in a grid, rather than wandering. Unsystematic panning is the main reason objects are missed in large images, and missed objects are the hardest error to detect in review, because the reviewer sees only what was drawn.

## Tiling with overlap

Most projects cut large images into tiles for annotation, model training or both. A tile is a fixed-size window, for example 512 or 1024 pixels square, cut from the large image. Tiling raises one problem that ordinary images do not have: objects on a tile boundary are cut in half.

The standard answer is to overlap neighbouring tiles, so that every object small enough to fit in the overlap appears whole in at least one tile. Make the overlap at least as wide as the largest object you want kept whole. Overlap has a cost: the same object now appears in two or four tiles, and must be counted once.

Decide which of the two workflows you use, because they need different rules:

- **Annotate the whole image, tile afterwards (preferred).** Annotators label the full image with zoom and pan, and tiles are cut from the finished labels. Every object is drawn once, whole. When cutting, clip each shape to the tile and record whether it was truncated, so a model can be trained to treat truncated objects differently.
- **Annotate tile by tile.** Each tile becomes its own task. This is easier to distribute and suits phones and slow connections, but the guidelines must say what to do with an object cut by the tile edge (label the visible part and flag it as truncated, or label it only in the tile that holds its centre). After annotation, map every shape back to full-image coordinates and merge duplicates in the overlaps, for example by keeping the larger of two boxes whose overlap passes a stated IoU threshold. [Merging boxes from several annotators](./formats-and-merging.md#merging-boxes-from-several-annotators) uses the same IoU grouping to combine overlapping boxes.

For model input, the same slicing idea helps detection of small objects. Running a detector on overlapping slices and merging the results, and fine-tuning on slices, improved small-object detection on aerial datasets in the work that introduced the Slicing Aided Hyper Inference approach ([Akyon et al., 2022](../references.md#akyon-2022)). Use the same tile size at annotation and training time where you can, so annotators see what the model sees.

Keep a tile manifest: for each tile, the source image, the pixel offset of its top-left corner, its size, and, for geo-referenced imagery, its own geotransform. Without that record, labels on tiles cannot be placed back on the original image or on the ground.

```python title="tile_manifest.py"
# pip install rasterio
import json
import rasterio
from rasterio.windows import Window

TILE, OVERLAP = 1024, 128          # overlap should exceed the largest object
STEP = TILE - OVERLAP

with rasterio.open("orthomosaic.tif") as src:
    manifest = []
    for row in range(0, src.height, STEP):
        for col in range(0, src.width, STEP):
            win = Window(col, row, min(TILE, src.width - col), min(TILE, src.height - row))
            manifest.append({
                "tile_id": f"r{row}_c{col}",
                "source": "orthomosaic.tif",
                "offset_px": [col, row],                 # top-left in the full image
                "size_px": [int(win.width), int(win.height)],
                "crs": src.crs.to_string() if src.crs else None,
                "transform": list(src.window_transform(win))[:6],  # pixel to map
            })

with open("tiles.json", "w") as f:
    json.dump(manifest, f, indent=2)
```

## Geo-referenced images and labels

A geo-referenced image stores how its pixels map to positions on the earth: a coordinate reference system (CRS) and a transform from pixel rows and columns to map coordinates. GeoTIFF is the common format; the OGC GeoTIFF standard defines how TIFF files carry this information and how they refer to coordinate systems in the EPSG register ([OGC, n.d.](../references.md#ogc-geotiff)).

Annotation tools usually work in pixel coordinates. That is fine during annotation, but the released labels should also exist in map coordinates, because only map coordinates survive re-tiling, re-projection, or a switch to newer imagery of the same place. Three rules prevent most errors:

- **Record the CRS with every label file.** A coordinate without its CRS is a pair of meaningless numbers. Many sources use a projected CRS in metres (for example a UTM zone), while web maps use longitude and latitude.
- **Mind the coordinate order and format.** GeoJSON requires WGS 84 longitude and latitude, in that order ([Butler et al., 2016](../references.md#rfc-7946)). Swapped latitude and longitude is a common bug; plot a sample of labels on a basemap after every conversion.
- **Convert with the transform, not by hand.** Use the geotransform from the image or the tile manifest to turn pixel vertices into map coordinates, and keep the pixel version as well, so each can be checked against the other.

Store, per image, the acquisition date, the sensor or platform, the ground resolution and any processing applied (orthorectification, pan-sharpening, cloud masking). Labels describe the ground on one date: a field boundary from the rainy season or a building that has since been demolished is wrong for imagery taken later. Record the imagery date with each label, and do not mix labels from one date with imagery from another without checking.

Labels from outside the image need the same care. Field-survey points collected on a phone carry GPS error of several metres, so a point taken at the edge of a small plot can land in the neighbouring one. Record the reported accuracy of each point, and have annotators check survey labels against the imagery rather than trusting them blindly. The [field image capture](../agri-advisory/field-image-capture.md) page covers collecting photographs in the field.

## Splits that respect geography

Pixels close together on the ground look alike, and so do tiles cut from the same scene. If overlapping or neighbouring tiles fall in both training and test sets, test scores measure memory, not skill. A study of forest biomass mapping in central Africa found that random validation suggested the model explained more than half of the variation, while spatial validation showed almost no predictive power ([Ploton et al., 2020](../references.md#ploton-2020)). Splitting data into spatial or temporal blocks, rather than at random, is the standard remedy for structured data ([Roberts et al., 2017](../references.md#roberts-2017)).

Split by area, not by tile: assign whole regions, scenes, or administrative units to one split, and leave a gap at least one tile wide between training and test areas. If the model is meant to work in new regions or seasons, hold out a whole region or season for testing. The [splits and duplicates](./splits-and-duplicates.md) page covers leakage-safe splitting in general.

## Licensing satellite and aerial imagery

The licence of the imagery limits what you may do with the labels and the image chips you publish alongside them. Check it before annotation starts, because a dataset built on imagery you cannot redistribute can be released only as labels, without the pixels.

| Source | Terms in brief |
|---|---|
| Copernicus Sentinel | Free, full and open access, including redistribution and modification. Publications must carry the notice "Copernicus Sentinel data [Year]", or "Contains modified Copernicus Sentinel data [Year]" if adapted ([European Commission, n.d.](../references.md#copernicus-sentinel-notice)). |
| Landsat (from the USGS) | No restrictions on use or redistribution; the USGS asks that the source be credited ([USGS, n.d.](../references.md#usgs-landsat-use)). |
| NICFI basemaps from Planet | Tropical basemaps, including Africa, at about 4.77 m per pixel, with usage, reproduction and distribution restrictions under a participant licence ([Google Earth Engine, n.d.](../references.md#nicfi-basemaps)). Read the licence before publishing derived data. |
| Commercial very-high-resolution imagery | Usually licensed for internal use only; redistribution of the pixels is often excluded. Read the contract, and ask whether derived labels may be published. |
| OpenStreetMap data used as labels | Open Database Licence: credit OpenStreetMap and share altered or derived data under the same licence ([OpenStreetMap Foundation, n.d.](../references.md#osm-copyright)). |
| Drone imagery you collect | Settle in writing who holds the rights (your project, the pilot or a contractor). You may also need permission to fly and consent from landowners and the people visible. |

Record the licence and the required attribution text in the dataset card, and keep the imagery licence separate from the licence on your labels. [Licence selection](../legal-consent/index.md#licence-selection) and [Licensing](../6_documentation/licensing.md) cover licences more generally.

## Building and settlement mapping

Open building datasets show both the promise and the limits of large-scale labelling in Africa:

- **Open Buildings.** Produced by a model trained on about 1.75 million manually labelled building instances and applied to 50 cm satellite imagery of the whole continent ([Sirko et al., 2021](../references.md#sirko-2021)). Its current release offers footprint polygons with a confidence score per building under CC BY 4.0 or ODbL. It warns that accuracy drops for small structures, contiguous buildings, rural and desert areas, and places with rocks or vegetation ([Google Research, n.d.](../references.md#open-buildings)).
- **Microsoft's global building footprints.** Released under CDLA Permissive 2.0. They report lower recall than precision for Africa, meaning more real buildings are missed than false ones added, and advise checking quality locally before importing into OpenStreetMap ([Microsoft, n.d.-a](../references.md#ms-building-footprints)).

These datasets are useful starting points, but they are model output, not ground truth. If you use them as pre-annotations, follow [model-assisted annotation](../3_annotation-design/model-assisted-annotation.md): have annotators correct them on imagery of a known date, measure how often they add missed buildings and delete false ones, and report that rate. Measure accuracy on a sample from your own area before relying on any published figure.

Community mapping offers a model for distributing large-area work. The OpenStreetMap Tasking Manager divides a mapping job into smaller tasks that can be completed quickly and shows which areas still need mapping and which need validation ([OpenStreetMap Wiki, n.d.](../references.md#osm-tasking-manager)). The same pattern, small grid cells plus a second-person validation step, works for any large-area annotation project.

For agriculture, labels are often points or polygons collected in the field and paired with time series of satellite images rather than single scenes. CropHarvest, for example, gathers more than 90,000 geographically diverse samples with agricultural labels for crop-type classification ([Tseng et al., 2021](../references.md#tseng-2021)). The [segmentation](./segmentation.md) page covers field-boundary masks.

## Privacy at high resolution

Fine-resolution aerial imagery shows homes, vehicles, livestock and, at drone resolution, identifiable people. Treat it as personal data where people or their property can be recognised. Check your national rules on flying drones before collecting imagery, tell communities what is being mapped and why, and blur or exclude sensitive sites before release. Building footprints of informal settlements, for example, can be used to help residents or to target them. The [visual privacy](./visual-privacy.md) page and the [data governance](../data-governance/index.md) chapter cover these obligations.

## Checklist

- Ground resolution and smallest object size (in pixels) recorded before the pilot.
- Annotation at full resolution with zoom and pan, with a stated check zoom and a systematic sweep.
- Tile size and overlap chosen so that the largest object fits in the overlap; a tile manifest kept.
- A written rule for objects cut by tile edges, and a merge step for duplicates in overlaps.
- CRS, transform, imagery date and sensor stored with every label file; labels released in map coordinates as well as pixels.
- Splits made by area or season, with a gap between training and test areas.
- Imagery licence and attribution text recorded in the dataset card, separately from the label licence.
- Pre-annotations from open building or land-cover datasets checked locally and their correction rate reported.
