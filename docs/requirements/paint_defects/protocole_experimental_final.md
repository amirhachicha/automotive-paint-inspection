
# Experimental Protocol — Automotive Image Acquisition

**Project:** MALLOULINOVA / MALLOULIAUTO
**Reference:** MALL-STG-ETE-2026-PAINT-01
**Version:** 1.1 — Protocol actually used
**Equipment:** Redmi Note 12 + Apexel attachment
**Scope:** Exploratory feasibility study

---

## 1. Objective

This protocol describes the conditions used to acquire macro images of automotive surfaces in order to investigate the visual differences between:

- `original`: confirmed original paint;
- `repaint`: confirmed repainted paint.

The analysis focuses primarily on texture variations, visible spots, micro-irregularities, and local variations in gloss observed in the images.

This protocol corresponds to a pilot campaign and does not yet constitute a definitive industrial procedure.

---

## 2. Equipment Used

- Smartphone: **Redmi Note 12**;
- Optical attachment: **Apexel**;
- Smartphone camera application in **Pro** mode;
- Integrated lighting of the Apexel attachment;
- CPL filter integrated into the Apexel attachment.

---

## 3. Actual Capture Parameters

The following parameters were used during the campaign:

| Parameter             | Value                                             |
| --------------------- | ------------------------------------------------- |
| Smartphone            | Redmi Note 12                                     |
| Attachment            | Apexel                                            |
| Camera mode           | Pro                                               |
| Shutter speed         | **1/50 s**                                  |
| White balance         | **5600 K**                                  |
| Focus                 | **Auto (F)**                                |
| ISO sensitivity       | **Auto (ISO)**                              |
| Exposure compensation | **0 EV**                                    |
| Lens used             | **W (Wide)**                                |
| Distance              | Almost zero, depending on the best observed focus |
| Number of captures    | **2 to 3 captures per examined area**       |

The 50 MP mode is not selected as the primary capture mode when it produces a bright circular area, vignetting, or darkened edges. The Pro mode with the **W** lens is the documented configuration used for this campaign.

---

## 4. Image Acquisition Procedure

For each automotive area being examined:

1. Position the Redmi Note 12 smartphone equipped with the Apexel attachment.
2. Use the **W** lens and do not use the **UW** lens.
3. Set the shutter speed to **1/50 s**.
4. Set the white balance to **5600 K**.
5. Leave the focus in **Auto (F)** mode.
6. Leave the ISO sensitivity in **Auto (ISO)** mode.
7. Set the exposure compensation to **0 EV**.
8. Position the attachment at an almost zero distance corresponding to the best observed sharpness.
9. Visually check the sharpness of the central area.
10. Capture **2 to 3 images of the same area**.
11. Perform a quick check of the acquired images.
12. Save the images in the folder corresponding to their label.

**The experimental campaign was conducted in several professional environments within the automotive sector**: areas dedicated to paint application and drying, automotive companies with new vehicles, and workshops specializing in sheet metal work and body repair. This variety of locations made it possible to collect surfaces representing different paint conditions while accounting for variations in real-world field acquisition conditions.

---

## 5. File Organization

The images are organized into two classes:

```text
dataset/
├── original/
└── repaint/
```

After dataset preparation, the images are distributed into:

```text
dataset_final_splits_v2/
├── train/
│   ├── original/
│   └── repaint/
├── val/
│   ├── original/
│   └── repaint/
└── test/
    ├── original/
    └── repaint/
```

---

## 6. Metadata Used

The metadata file used in this campaign contains only the information actually utilized:

| Field          | Purpose                                    |
| -------------- | ------------------------------------------ |
| `filename`   | Image name, for example,`image_225.jpeg` |
| `filepath`   | Path to the image                          |
| `label`      | `original` or `repaint`                |
| `session_id` | Identifier for each vehicle                |
| `split`      | `train`, `val`, or `test`            |

---

## 7. Image Annotation

Each image is assigned to one of the two classes:

```text
original
repaint
```

The annotation is based on the information available from the workshop and not solely on the visual appearance of the image.

---

## 8. Quality Control

An image is retained if:

- the examined area is visible;
- the focus is sufficiently sharp;
- the image is not severely overexposed or underexposed;
- the texture is not obscured by a significant reflection;
- the bright circular area does not cover the useful region.

Images that are severely blurred or significantly degraded may be excluded from the final dataset.

---

## 9. Data Preparation for AI

The images are resized to:

```text
384 × 384 pixels
```

A fixed central crop of 32 pixels on each side may be applied to reduce the influence of bright edges:

```text
Initial image: 384 × 384
Retained area: 320 × 320
Model input: 384 × 384 after resizing
```

The same processing must be applied to Train, Validation, and Test.

Data augmentation is applied only to the Train set.

---

## 10. Dataset Splitting Rules

- Images from the same session should remain in the same subset whenever possible.
- Images from the same vehicle should not be distributed between Train and Test if the vehicle identifier is available.
- Validation and Test images must not undergo data augmentation.
- The Test set is used only for final evaluation.

---

## 11. Limitations of the Pilot Protocol

- Only the Redmi Note 12 smartphone was used.
- Only the Apexel attachment was used.
- The exact working distance and actual magnification have not yet been precisely calibrated.
- The 50 MP mode may produce circular vignetting and darkened edges.
- The captures cover areas available in the workshop, without a protocol requiring a specific automotive body panel.
- Two to three captures per area do not always constitute independent observations.
- The pilot dataset does not yet allow industrial use to be validated.
