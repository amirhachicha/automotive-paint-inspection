
# Training Report — Workshop Proprietary Dataset

**Project:** MALLOULINOVA / MALLOULIAUTO
**Reference:** MALL-STG-ETE-2026-PAINT-01
**Study type:** Exploratory proof of feasibility
**Equipment:** Redmi Note 12 + Apexel attachment
**Date of last documented execution:** August 21, 2026

---

## 1. Objective

The objective of this experiment is to evaluate whether macro-texture images acquired using a Redmi Note 12 smartphone and an Apexel attachment contain a signal that can distinguish between automotive surfaces classified as:

- `original`;
- `repaint`.

The study focuses primarily on texture variations, gloss differences, and finish irregularities observable at close range.

The intended outcome is an initial feasibility assessment, not an industrial validation of the product.

---

## 2. Dataset Used

The pilot proprietary dataset currently contains:

```text
Total number : 264 images
Original     : approximately 157 images
Repaint    : approximately 107 images
```

Distribution used for training:

| Subset     | Original | Repaint | Total |
| ---------- | -------: | ------: | ----: |
| Train      |      112 |      54 |   166 |
| Validation |       23 |      24 |    47 |
| Test       |       22 |      29 |    51 |

The images were split using session metadata. Vehicle-based splitting should continue to be verified whenever vehicle identifiers are available.

---

## 3. Preprocessing

The following steps were used:

1. Loading images from `dataset_final_splits_v2/`;
2. Resizing to `384 × 384` pixels;
3. Applying a fixed central crop of 32 pixels on each side to reduce the influence of bright edges;
4. Resizing the retained area to `384 × 384`;
5. Applying the preprocessing expected by EfficientNet-B0;
6. Applying moderate data augmentation only during training.

A central crop of 64 pixels on each side was not selected because it removed too much of the useful texture.

---

## 4. Data Augmentation

The following moderate transformations were used:

- Horizontal flipping;
- Slight rotation;
- Slight translation;
- Slight zoom;
- Moderate contrast variation;
- Moderate brightness variation.

These transformations are not applied to the Validation and Test sets.

---

## 5. Model

The model used is an EfficientNet-B0 pre-trained on ImageNet, with a binary classification head.

Architecture:

```text
Image 384×384×3
      ↓
Fixed central crop
      ↓
Resizing to 384×384
      ↓
Data augmentation during Train
      ↓
EfficientNet-B0
      ↓
GlobalAveragePooling2D
      ↓
Dropout 0.5
      ↓
Dense 128
      ↓
Dropout 0.3
      ↓
Softmax — 2 classes
      ↓
original / repaint
```

### Phase 1

- Frozen backbone;
- Learning rate: `1e-3`;
- Class weighting;
- EarlyStopping;
- ReduceLROnPlateau.

### Phase 2

- Limited fine-tuning;
- Last five layers potentially trainable;
- BatchNormalization layers kept frozen;
- Learning rate: `1e-5`;
- EarlyStopping;
- Best checkpoint saving.

---

## 6. Results of the Latest Training Run

The latest documented training run produced the following results on the Test set:

| Metric             |  Result |
| ------------------ | ------: |
| Test loss          |  0.8098 |
| Accuracy           |  0.6863 |
| Balanced accuracy  |  0.7132 |
| Macro F1           |  0.6832 |
| Original precision |  0.5882 |
| Original recall    |  0.9091 |
| Original F1        |  0.7143 |
| Repaint precision |  0.8824 |
| Repaint recall    |  0.5172 |
| Repaint F1        |  0.6522 |
| Repaint AUC       |  0.6755 |
| Number of errors   | 16 / 51 |

Confusion matrix:

```text
                 Predicted original   Predicted repaint
Actual original           20                     2
Actual repaint          14                    15
```

---

## 7. Interpretation

The model correctly recognizes a large proportion of original surfaces:

```text
20/22 Original images correctly classified
```

The `Repaint` class is correctly recognized in:

```text
15/29 images
```

The precision of the `Repaint` class is high, but its recall remains limited. Consequently, the model still misses several repainted surfaces and classifies them as `Original`.

The AUC of `0.6755` indicates moderate probabilistic separation. The system therefore contains an exploitable signal, but this signal is not sufficiently stable for industrial use.

---

## 8. Decision Thresholds

The exploratory classification threshold for the `Repainted` class was searched for using the Validation set. A value close to `0.52` was observed in this experiment.

The classification rule is:

```text
p(repainted) ≥ 0.52 → repaint
p(repainted) < 0.52 → original
```

A separate rejection threshold can produce the `Uncertain` state:

```text
Maximum confidence < 0.65 → Uncertain
```

These thresholds should not be considered final. They must be confirmed using a more representative dataset.

---

## 9. Overfitting Analysis

The curves generally show a faster improvement in training accuracy than in validation accuracy. Validation accuracy remains lower, and validation loss increases after the first few epochs.

This indicates:

- Partial overfitting;
- Significant image variability;
- Differences between acquisition sessions;
- A dataset that is still small for a Deep Learning model;
- A possible influence of color, body panel, lighting, and framing.

Regularization, central cropping, moderate data augmentation, and limited fine-tuning reduce the risk, but do not completely eliminate overfitting.

---

## 10. Limitations

- The proprietary dataset is still limited in size.
- The classes are imbalanced.
- Validation is performed on a small number of images.
- There is variability across vehicles, body panels, colors, and acquisition sessions.
- The Apexel attachment exhibits vignetting in certain capture modes.
- Performance may be influenced by acquisition conditions.
- Vehicle-based validation needs to be strengthened.
- No final industrial model has been validated.

---

## 11. Conclusion

The complete classification pipeline was executed on a proprietary automotive dataset acquired using a Redmi Note 12 smartphone and an Apexel attachment. The results demonstrate the possibility of exploiting macro-textural features to distinguish original and repainted surfaces.

The current performance represents a partial proof of feasibility. However, it does not make it possible to guarantee reliable generalization to new vehicles or new acquisition sessions.

The main priorities for future improvements are:

1. Increase the diversity of vehicles and body panels;
2. Improve the representation of repainted surfaces in the Train set;
3. Further control lighting and focusing conditions;
4. Apply strict vehicle-based data splitting;
5. Evaluate the model across several independent acquisition sessions;
6. Analyze errors with the workshop's expertise;
7. Optimize the `Uncertain` threshold using a larger Validation set.
