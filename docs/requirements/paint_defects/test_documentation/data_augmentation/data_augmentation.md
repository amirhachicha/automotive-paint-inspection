
# Data Augmentation — Study and Selection of Techniques

**Reference:** MALL-STG-ETE-2026-PAINT-01
**Week:** W4
**Context:** Preparatory study for the implementation of the Keras pipeline

---

## 1. Introduction

### 1.1. What Is Data Augmentation?

Data augmentation is a technique used to artificially generate new images from an existing dataset by applying transformations that preserve the image label. This technique increases the diversity of training data without collecting new images, thereby improving the model's robustness and generalization capabilities.

### 1.2. Why Is It Important for MALLOULIAUTO?

Since the proprietary MALLOULIAUTO v0.1 dataset is limited to 450–500 macro patches (see §4 of the project schedule), data augmentation is an essential approach to:

- Reduce the risk of overfitting on a small dataset.
- Simulate variations in real-world conditions (lighting, module positioning).
- Improve the model's inter-smartphone robustness.
- Virtually increase the training dataset size without additional hardware costs.

---

## 2. Techniques Studied and Selected

The following table summarizes all the data augmentation techniques evaluated, their principles, their relevance to macro-scale orange peel detection, and the final configuration selected for the MALLOULIAUTO project's Keras pipeline.

| Technique                         | Principle                                                                                                                                           | Keras Parameter              | Analysis for Orange Peel (Macro Patches)                                                                                                                                                                                                                                                           |       Decision       | Selected Configuration |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------: | ---------------------- |
| **Rotation**                | Randomly rotates the image within a defined angular range. Simulates slight variations in the positioning angle of the macro module on the surface. | `RandomRotation`           | The clearcoat microtexture is isotropic (it has no preferred direction), making it rotation-invariant. Improves robustness to small variations in the orientation of the Apexel module when it is in contact with the vehicle body. Limit rotation to ±10–15° to maintain realistic conditions. |    ✅**Yes**    | ±10 to 15°           |
| **Horizontal Flip**         | Applies a horizontal mirror effect. A left fender patch becomes visually equivalent to a right fender patch.                                        | `RandomFlip("horizontal")` | Macro-scale texture remains identical regardless of its spatial orientation. Virtually doubles the dataset without introducing artifacts. Useful because the left and right body panels of a vehicle have the same macro-scale textural signature.                                                 |    ✅**Yes**    | Systematic             |
| **Vertical Flip**           | Applies a vertical mirror effect. The image is flipped upside down.                                                                                 | `RandomFlip("vertical")`   | Physically unrealistic: paint droplets flow downward during drying, creating a subtle preferred direction that is visible at the macro scale. It could also introduce artifacts due to the integrated LED lighting, which has a fixed orientation.                                                 |    ❌**No**    | —                     |
| **Zoom**                    | Randomly enlarges or reduces the image. Simulates slight variations in the distance between the module and the surface.                             | `RandomZoom`               | Macro-scale orange peel is a signal with a fixed physical scale (millimetric). Excessive zoom artificially changes the texture scale and prevents real-world generalization. Slight zoom (±5–10%) is acceptable to simulate small variations in the module's pressure against the vehicle body.  | ⚠️**Limited** | ±5 to 10%             |
| **Translation**             | Randomly shifts the image horizontally or vertically. Simulates slightly misaligned framing of the target area.                                     | `RandomTranslation`        | Since macro-scale texture is homogeneous across the area captured by the Apexel module, translation does not change the relevant information. Improves robustness to imprecise positioning of the module on the vehicle body.                                                                      |    ✅**Yes**    | ±10%                  |
| **Brightness**              | Randomly modifies the overall image brightness. Simulates ambient lighting variations that may affect the image even when integrated LEDs are used. | `RandomBrightness`         | Extremely useful for simulating different real-world lighting conditions (workshop, shaded parking area, indirect light). Even with the Apexel module's integrated LEDs, ambient light slightly influences the result. Avoid extreme values that cause overexposure or underexposure.              |    ✅**Yes**    | ±10 to 20%            |
| **Contrast**                | Increases or decreases intensity differences between pixels. Simulates contrast variations caused by ambient light intensity.                       | `RandomContrast`           | Useful for simulating lighting variations. Excessively low contrast could erase the shadows that reveal orange peel and are captured by the module's LEDs. Excessively high contrast could create artifacts.                                                                                       |    ✅**Yes**    | ±10 to 15%            |
| **Saturation**              | Modifies color saturation, making colors more vivid or more muted.                                                                                  | Custom (`tf.image`)        | Since the main signal is macro-scale texture rather than color, saturation has little direct impact. However, it can simulate variations in color rendering between smartphones (ISP), which are expected to be evaluated during Week 7 tests, thereby improving inter-brand robustness.           |    ✅**Yes**    | ±10 to 15%            |
| **Hue**                     | Shifts the overall hue (red → orange → yellow → green, etc.). Changes the perceived color without affecting the texture.                         | Custom (`tf.image`)        | Simulates hue variations between different vehicle body colors (red, blue, grey, etc.). Forces the model to learn macro-scale texture independently of the paint's background color. The shift must remain limited to maintain realistic conditions.                                               |    ✅**Yes**    | ±10 to 15°           |
| **Gaussian Noise**          | Adds random noise to each pixel. Simulates smartphone sensor digital noise, especially at high ISO values.                                          | Custom (`GaussianNoise`)   | Ambiguous in macro mode: noise may be confused with the fine microtexture of orange peel revealed by the Apexel module's magnification. There is a risk of reducing the model's ability to distinguish real texture from noise. In very small quantities only, it may improve robustness.          |  ⚠️**Test**  | σ < 0.02              |
| **Blur**                    | Applies Gaussian blur to the image. Simulates slightly blurred captures caused by vibration or imperfect focusing.                                  | Custom                       | Counterproductive: blur destroys precisely the macro-scale microtexture that the model needs to learn. In macro mode, sharpness is critical to capturing orange peel with pixel-level detail. It would make the model less discriminative when dealing with fine textural signals.                 |    ❌**No**    | —                     |
| **Cutout / Random Erasing** | Randomly masks a rectangular area of the image. Forces the model not to rely on a single region of the patch.                                       | Custom                       | Improves robustness by forcing the model to learn macro-scale texture across several areas of the patch. Simulates cases where part of the patch may be obscured by residual reflections or dust despite prior cleaning. No more than 15–20% of the image should be masked.                       |    ✅**Yes**    | 10–15% max            |

### Overall Selection Rationale

The selected configuration prioritizes augmentations that:

1. **Preserve the macro-scale texture signal** (rotation, horizontal flip, translation, moderate cutout).
2. **Simulate real-world conditions** (brightness, contrast, and module positioning variations).
3. **Improve inter-smartphone robustness** (saturation and hue), in preparation for Week 7 tests.
4. **Avoid destroying the main signal** (blur excluded, noise kept to a minimum, no vertical flip).

This configuration is consistent with the **macro-scale approach** defined in `revue_SOTA.md` (§4.6) and will be implemented in the `pipeline_initial.py` file during Week 4.

---

## 3. Planned Keras Implementation

### 3.1. Planned Code Structure

```python
import tensorflow as tf
from tensorflow.keras import layers

# Data augmentation pipeline for MALLOULIAUTO V0.1
# Adapted to macro patches (Apexel all-in-one module)
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.04),          # ~15°
    layers.RandomTranslation(0.1, 0.1),
    layers.RandomZoom(0.05),
    layers.RandomBrightness(0.15),
    layers.RandomContrast(0.1),
    # Saturation and Hue via tf.image (custom layer)
])
```

### 3.2. Implementation Considerations

- Apply data augmentation **only to the training set** (never to the validation or test sets).
- Explicitly use `training=True` when calling the augmentation pipeline.
- Integrate it into the `tf.data.Dataset` pipeline for optimal performance.
- Document the exact parameters in `config.yaml`.

---

## 4. Conclusion

This preparatory study identified the data augmentation techniques most relevant to the MALLOULIAUTO project, prioritizing those that preserve the macro-scale texture signal (orange peel captured with pixel-level detail by the Apexel all-in-one module) while simulating variations in real-world conditions.

The selected configuration will be implemented during Week 4 in the `pipeline_initial.py` file and empirically validated before training the binary EfficientNet-B0 model (**Origin / Repaint**) in Week 6.

---

## 5. References

- YouTube video: "Day 8: Data Augmentation" (Computer Vision for Developers playlist).
- Keras Documentation: https://keras.io/api/layers/preprocessing_layers/image_augmentation/
- TensorFlow Documentation: https://www.tensorflow.org/tutorials/images/data_augmentation
