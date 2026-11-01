# MALLOULINOVA – Summer Internship 2026

## R&D — Reliable Qualification of Repainted vs. Original Vehicle Paint Using Computer Vision

**Reference:** MALL-STG-ETE-2026-PAINT-01
**Deliverable:** Mission 1 — SOTA Review & Project Scoping

---

## 1. Scientific Scope & Problem Statement

The objective of this internship is to investigate the feasibility of a computer vision system capable of automatically distinguishing original paint from a repainted vehicle panel using images acquired with a smartphone.

In the automotive field, this task is generally performed by an expert who combines several visual indicators with their professional experience. A repainted panel may exhibit more or less pronounced differences depending on the quality of the repair, making automatic detection particularly challenging.

The main indicators that may reveal a repainting operation include:

- Clear-coat microtexture (orange peel effect);
- Local variations in gloss;
- Differences in light reflection;
- Slight color deviations;
- Surface finishing defects (dust, inclusions, polishing marks, etc.).

However, these indicators are not always present, and their visibility depends heavily on lighting conditions, paint type, vehicle color, and repair quality.

Within the scope of this internship, the study focuses primarily on observing **surface microtexture**, as it is a physical indicator directly related to the application process and the behavior of the clear coat during drying. This texture becomes easier to observe through macro imaging performed using a smartphone equipped with a dedicated optical attachment.

The objective is not to demonstrate that microtexture is the only criterion for identifying a repaint, but rather to assess whether this information, when processed by a Deep Learning model, is sufficient to achieve an initial reliable classification under acquisition conditions compatible with mobile use.

---

## 2. SOTA Approach — Overview of Candidate Techniques

The SOTA review compares the main candidate techniques for improving the quality of the signal supplied to the AI model, while taking into account the project's portability and cost constraints.

### Table 1 — Summary of SOTA Techniques

| Technique                                          | Principle                                                                                                                 | Signal exploited by AI                                                          | Main advantage                                                                                           | Main limitation                                                                                              | Maturity | Status                                             |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------- |
| **Smartphone RGB**                           | Conventional capture using a mobile camera.                                                                               | RGB image.                                                                      | Maximum simplicity and equipment availability.                                                           | Sensitivity to reflections, lighting, and ISP processing.                                                    | High     | Reference baseline                                 |
| **All-in-one clip-on macro module**          | Portable optical attachment integrating macro magnification, LED lighting, and a CPL polarizing filter on the smartphone. | Effectively high-resolution RGB (\~1300 pixels/mm) with controlled reflections. | All-in-one solution: magnification, lighting, and polarization integrated into a single portable module. | Reduced field of view (\~6 mm), requiring multiple patches per vehicle.                                      | High     | 🟢**Selected (Main Setup)**                  |
| **External low-angle LED lighting**          | Controlled illumination of the observed area at a grazing incidence angle (15–25°).                                     | RGB with micro-relief revealed by cast shadows.                                 | Reveals texture through cast shadows and stabilizes image acquisition.                                   | Requires precise positioning, operational complexity, and a separate accessory to handle.                    | High     | Excluded (integrated into the macro module)        |
| **Separate CPL filter**                      | Circular polarizer mounted on a smartphone clip.                                                                          | Optically filtered RGB.                                                         | Suppresses specular reflections from the clear coat.                                                     | Requires manual optical adjustment and handling of a separate accessory.                                     | High     | Excluded (integrated into the macro module)        |
| **USB monochrome camera**                    | CMOS sensor without a Bayer filter, +30% sensitivity, effectively doubled resolution.                                     | High-contrast monochrome signal.                                                | Better signal-to-noise ratio in low-light conditions.                                                    | Low nominal resolution (1–5 MP vs. 48 MP smartphone), requires a laptop, and is not portable for field use. | Medium   | Excluded (V2 fixed inspection station perspective) |
| **Portable spectrophotometry**               | Local measurement of colorimetric properties in the L\*a\*b\* color space.                                                | Spectral signature / Lab values.                                                | Accurate colorimetric measurement (ΔE < 0.5).                                                           | Does not provide a complete 2D image, high user cost, and long capture time.                                 | Medium   | Excluded from the product                          |
| **ColorChecker calibration (Macbeth chart)** | Calibrated physical reference containing 24 patches for colorimetric calibration.                                         | RGB corrected using a CCM matrix.                                               | Reliable and reproducible colorimetric reference.                                                        | UX and field-handling constraints.                                                                           | High     | Laboratory reference                               |
| **Appearance deflectometry**                 | Analysis of reflections from structured patterns projected onto the surface.                                              | Surface geometric signature (waviness, DOI, haze).                              | Rich information for clear-coat and micro-defect analysis.                                               | Complex and poorly suited to mobile acquisition; prohibitive cost (€25,000–150,000).                       | High     | Industrial reference                               |

---

## 3. Experimental Configurations

The experimental configurations are intended to compare practical combinations of image acquisition techniques in order to identify the best compromise for field use, taking into account cost, portability, and feasibility constraints within the internship.

### Table 1 — Setup Benchmark

| Setup             | Composition                                                                      | Objective                                                                                                         | Indicative Cost    | Time            | Constraints                      | Estimated Performance                                                           | Field Portability   | Decision                            |
| :---------------- | :------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------- | :-------------- | :------------------------------- | :------------------------------------------------------------------------------ | :------------------ | :---------------------------------- |
| **Setup A** | Smartphone RGB only at 40 cm.                                                    | Minimum baseline.                                                                                                 | 0 DT               | Very short      | Very low                         | Low (\~40 pixels/mm)                                                            | Very high           | Excluded                            |
| **Setup B** | Portable spectrophotometer (Spectro 1 Mobile).                                   | Reference point spectral measurement.                                                                             | 1008 DT            | Long            | Medium                           | High for color, low for 2D imaging                                              | Medium              | Excluded from the product           |
| **Setup C** | Smartphone + NEEWER LED + separate CPL filter at 40 cm (separate accessories).   | Texture enhancement through grazing illumination and polarization.                                                | 242 DT             | Short           | Medium (3 accessories to handle) | Medium (\~40 pixels/mm, limited resolution at 40 cm)                            | High                | Excluded (macro is more effective)  |
| **Setup D** | Calibrite ColorChecker Classic Mini.                                             | Laboratory colorimetric reference.                                                                                | 290 DT             | Medium          | High                             | Very high for calibration, low for field use                                    | Low                 | Excluded from the product           |
| **Setup E** | Rhopoint TAMS — Total Appearance Measurement System.                            | Industrial appearance deflectometry.                                                                              | 63000 DT           | Long            | Very high                        | Very high for geometric signal analysis                                         | Low                 | Industrial reference                |
| **Setup F** | **All-in-one Apexel macro module (integrated magnification + LED + CPL).** | **High-resolution macro analysis of the texture signal, with accessories integrated into a single device.** | **\~180 DT** | **Short** | **Low (only one module)**  | **High (\~1300 pixels/mm, approximately 30× the resolution of Setup C)** | **Very high** | 🟢**Optimal choice selected** |

---

## 4. Benchmark Methodological Guide

The comparative evaluation of optical configurations was revised in Week 4 following the identification of the all-in-one Apexel macro module as the optimal solution. This module integrates macro magnification, LED lighting, and a CPL polarizing filter into a single device, eliminating the need for separate accessories (the initially considered Setup C).

This change makes it possible to finalize the technical direction and devote the following weeks exclusively to collecting the proprietary field dataset (450 to 500 macro patches for V0.1, with a long-term target of 1,000 patches included in the V1 roadmap) and training the AI model using this single configuration. The classes are *Original / Repaint*.

### 4.1. Controlled Variables and Tested Variables

#### Table 1 — Controlled Variables (Strictly Stabilized by the Protocol)

| Controlled Variable                    | Operational Rule Applied                                                                                                                                    | Methodological Objective                                                                                           |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Vehicle & area**               | Same vehicle, with several panels (hood, fenders, doors, roof, trunk) captured during one session.                                                          | Document all significant areas of each vehicle for multi-patch aggregation.                                        |
| **Module-to-surface distance**   | Near-direct contact (5–10 mm) with the surface, guided by the physical stop of the Apexel module.                                                          | Ensure optimal magnification and automatic focusing of the macro module.                                           |
| **Number of patches per panel**  | 2 patches per panel on the main flat areas.                                                                                                                 | Provide a statistically meaningful basis for classification and multi-patch aggregation.                           |
| **Number of panels per vehicle** | 6 to 8 panels (hood, left fender, right fender, left door, right door, rear left door, rear right door, trunk).                                             | Ensure vehicle representativeness for a reliable overall verdict.                                                  |
| **Lighting**                     | LEDs integrated into the Apexel module are always activated.                                                                                                | Standardize lighting independently of ambient conditions.                                                          |
| **Polarization**                 | CPL filter integrated into the Apexel module remains permanently active.                                                                                    | Eliminate specular reflections directly at module level, without external handling.                                |
| **Focus**                        | Automatic, through the fixed optics of the macro module (working distance: 5–10 mm).                                                                       | Ensure sharpness of the texture signal at the microscopic scale.                                                   |
| **Smartphone processing modes**  | Mandatory use of Pro/Manual mode, with explicit disabling of automatic HDR, Portrait mode, and artistic filters. Documentation is included in the metadata. | Eliminate biases introduced by algorithmic ISP processing that may artificially alter the clear-coat microtexture. |
| **Smartphone resolution**        | 12.5 MP                                                                                                                                                     | Use the sensor's maximum native resolution to capture all details.                                                 |
| **Recording format**             | Maximum-quality JPEG.                                                                                                                                       | Preserve high-frequency information containing the textural signature.                                             |
| **Resolution & AI**              | Strict format of**384×384 pixels** for the **EfficientNet-B0** backbone.                                                                       | Standardize the network input dimensions.                                                                          |

#### Table 2 — Tested Variables (Performance Evaluation Factors)

| Tested Variable                  | Scientific Measurement Objective                                                                                               |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **Bodywork color**         | Evaluate the robustness of the texture signal on reflective light colors, dark colors, and metallic finishes.                  |
| **Vehicle make and model** | Evaluate model generalization across different automotive brands.                                                              |
| **Paint condition**        | Compare the macro signatures of original factory paint, dealership repaints, and repaints performed by independent body shops. |

### 4.2. Image Preprocessing

| Step                                                    | Role                                                                     | Objective                                                                    |
| :------------------------------------------------------ | :----------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Resizing (384 × 384 pixels)                            | Adapts the macro image to the EfficientNet-B0 model input format.        | Reduce computational cost and standardize the input.                         |
| Keras normalization (`preprocess_input` EfficientNet) | Applies the standard normalization expected by the pre-trained backbone. | Ensure compatibility between input statistics and ImageNet weights.          |
| Overall purpose                                         | Limits irrelevant variations while preserving the texture signal.        | Allow the model to focus on the discriminative characteristics of the paint. |

### 4.3. Multi-Criteria Matrix for Selecting the Optimal Setup

The final setup selection is based on a multi-criteria analysis combining:

- Expected performance according to the state of the art;
- Industrial constraints;
- Available preliminary experimental results.

> **Methodological note**: The scores below constitute an engineering decision-support tool (weighted multi-criteria analysis), not an experimental benchmark. The criteria "Texture Signal Quality" and "Expected AI Performance" are estimates based on the literature and manufacturer specifications for setups that have not been tested (C, B, D, E), and on preliminary field tests for setups A and F. The scores will be supplemented with experimental measurements in Week 4.

This approach makes it possible to compare configurations of different levels of complexity without requiring the immediate acquisition of all equipment.

The final choice is based on an overall score:

$$
Score_{setup} = \sum_{i=1}^{n} W_i \times S_i
$$

where \(W_i\) is the criterion weight and \(S_i\) is the score assigned to the setup for that criterion (1 = low → 5 = excellent).

#### Table 1 — Weighted Evaluation of Setups

*Rating: 1 (low) → 5 (excellent). The scores for Setups B, C, D, and E are estimates based on the literature and manufacturer specifications (not experimentally measured); Setups A and F have undergone actual field tests.*

| Evaluation Criterion                  | Weight (\(W_i\)) |         Setup A*(Smartphone only)*         |           Setup B*(Spectrophotometry)*           |     Setup C*(Separate LED + CPL)*     |          Setup D*(ColorChecker)*          |          Setup E*(Rhopoint TAMS)*          | **Setup F [Target Choice]** *(All-in-one Macro Module)* |
| :------------------------------------ | :--------------: | :------------------------------------------: | :-------------------------------------------------: | :--------------------------------------: | :-----------------------------------------: | :-------------------------------------------: | :-------------------------------------------------------------: |
| **Texture signal quality**      |        25        |                      1                      |                          1                          |                    2                    |                      3                      |                       5                       |                           **5**                           |
| **Expected AI performance**     |        25        |                      2                      |                          3                          |                    3                    |                      4                      |                       5                       |                           **5**                           |
| **Reflection management**       |        15        |                      1                      |                          2                          |                    5                    |                      4                      |                       5                       |                           **5**                           |
| **Capture time (<90s)**         |        10        |                      5                      |                          2                          |                    4                    |                      3                      |                       1                       |                           **5**                           |
| **Cost (constraint ≤ 250 DT)** |        10        |                      5                      |                          2                          |                    4                    |                      3                      |                       1                       |                           **4**                           |
| **Portability**                 |        10        |                      5                      |                          3                          |                    4                    |                      2                      |                       1                       |                           **5**                           |
| **Availability**                |        5        |                      5                      |                          1                          |                    4                    |                      1                      |                       1                       |                           **5**                           |
| **TOTAL SCORE / 5**             |  **100%**  |              **2.55 / 5**              |                 **2.20 / 5**                 |            **3.25 / 5**            |             **3.30 / 5**             |              **3.50 / 5**              |                      **🟢 4.85 / 5**                      |
| **INTERPRETATION & DECISION**   |        —        | ❌ Simple baseline (insufficient resolution) | ❌ Does not provide a 2D image compatible with CNNs | ❌ Effective resolution limited at 40 cm | ❌ Accurate (too restrictive for field use) | ❌ High potential (too complex and expensive) |          🟢**Best compromise (Selected Setup)**          |

### 4.5. Data Management and Ground Truth

Each acquisition is associated with metadata to ensure dataset traceability.

| Information         | Example                                             |
| :------------------ | :-------------------------------------------------- |
| Setup used          | A / F                                               |
| Smartphone          | Xiaomi Redmi Note 12 (dataset reference)            |
| Vehicle             | Make, model, year                                   |
| Inspected panel     | Hood, fender, door, roof, trunk                     |
| Patch position      | Number (1 or 2) and approximate area (center, side) |
| Paint color         | Light, dark, metallic                               |
| External conditions | Sunlight, shade, weather, workshop interior         |
| Annotation          | Original / Repaint                                  |

Ground truth is defined using the available information (vehicle history, human expertise, or external measurement when necessary).

| Class    | Description                  |
| :------- | :--------------------------- |
| Original | Confirmed factory paint      |
| Repaint  | Confirmed paint modification |

The proprietary dataset constitutes the final reference for training and evaluation.

#### Table 1 — Classification Strategy and Management of the Uncertain State

> **Architectural decision**: The model is trained using **only 2 classes** (Original / Repaint). The "Uncertain" state is not a trained class — it is an output state automatically generated during post-processing when the model's maximum confidence is below a threshold to be determined experimentally (initial value: 0.65). This approach is consistent with industrial practices for binary classification with a rejection threshold.

| Pipeline Phase                                  | Operational Action in the Field / Code                                                                                                                                                                                                               | Methodological Objective & AI Impact                                              |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **1. Initial Capture**                    | - Capture approximately**200 certified factory-finish macro patches** (*Original*).- Capture approximately **200 certified repaired macro patches** (*Repaint*).- Cases without reliable confirmation are excluded from the dataset. | Build a clean V0.1 database containing only 2 classes, with quantitative balance. |
| **2. Post-Acquisition Quality Filtering** | Exclude blurry, poorly exposed patches or patches with inadequate module-to-surface contact.                                                                                                                                                         | Eliminate technically unreliable data.                                            |
| **3. Training**                           | EfficientNet-B0 trained on**2 binary classes**: Original and Repaint. No third class.                                                                                                                                                          | Build a clean binary model without ambiguous class noise.                         |
| **4. Inference Post-Processing**          | If`max(softmax_output) ≥ threshold` → predicted class (Original or Repaint). If `max(softmax_output) < threshold` → "Uncertain" state (rejection flag).                                                                                       | Produce a verdict with a controlled confidence level.                             |
| **5. Threshold Optimization**             | The rejection threshold will be optimized on the validation set (grid search on the precision/recall curve). Initial value: 0.65.                                                                                                                    | Find the best balance between false positives and rejected cases.                 |

---

### 4.6. AI Model Architecture

The objective is to automatically classify a body panel into two main categories:

- Original;
- Repaint.

An "Uncertain" state is generated during post-processing when the model's confidence is insufficient.

The model primarily uses surface microtexture (orange peel effect) captured by Setup F (all-in-one Apexel macro module). The architecture is based on a patch-by-patch approach, with multi-patch aggregation to establish a vehicle-level verdict.

| Signal                                       | Role in the System                                                                                                               |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Macro texture (orange peel effect)** | Main physical signal, processed using EfficientNet-B0 on high-resolution RGB patches acquired with the all-in-one Apexel module. |
| **Color (implicit)**                   | Secondary information learned automatically by the CNN's deep layers, without dedicated colorimetric processing.                 |

General pipeline:

```text
                 Image acquisition
       (smartphone + all-in-one Apexel Module)
       [Integrated LEDs + integrated CPL activated]
                            │
                            ▼
                 Acquisition using Setup F
          (Magnification + integrated grazing LED + CPL)
                            │
                            ▼
                  15–20 patches per vehicle
              (2 patches per panel across 6–8 panels)
                            │
                            ▼
                    OpenCV preprocessing
                  • Resizing (384×384)
                  • Keras normalization (preprocess_input)
                            │
                            ▼
                 EfficientNet-B0 AI Model
                 (Transfer Learning - Binary Classification)
                            │
                            ▼
             Prediction per patch + Confidence Score
                            │
                            ▼
              Rejection threshold filtering (initial: 0.65)
              - Confidence ≥ threshold → Original or Repaint
              - Confidence < threshold → Uncertain (flag)
                            │
                            ▼
             Confidence-weighted voting aggregation
                            │
                            ▼
             Vehicle verdict + Detailed report per panel
```

The pipeline is based on macro acquisition with near-direct contact with the surface through Setup F, followed by minimal OpenCV preprocessing (resizing and Keras normalization), and then patch-level inference using EfficientNet-B0. A confidence-threshold filtering system produces the "Uncertain" state for ambiguous patches, while a confidence-weighted voting aggregation layer produces the final vehicle-level verdict as well as a diagnosis for each panel.

The simplicity of the pipeline is a deliberate methodological choice: by shifting signal control towards hardware acquisition (Setup F), the image-processing pipeline remains short and robust, reducing the risk of introducing artificial biases.

## Architectural Principle: Division of Responsibilities Between Acquisition, Preprocessing, and AI

System performance does not depend solely on the artificial intelligence model. Each pipeline block has a specific function that helps reduce the overall complexity of the problem.

| System Element                                         | Main Function                                                                             | Role in Reducing Complexity                                                                                                                                                     |
| :----------------------------------------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Setup F (All-in-one Apexel Macro Module)**     | Reveal micro-relief with pixel-level detail through integrated lighting and polarization. | Physically optimize acquisition by providing an effective resolution significantly higher than standard capture, with all accessories integrated into a single portable device. |
| **OpenCV preprocessing (minimal)**               | Adapt images to the model input format.                                                   | Standardize images without altering the texture signal; complexity is deliberately reduced.                                                                                     |
| **AI model (EfficientNet-B0)**                   | Automatically extract discriminative texture features from each patch.                    | Classify each patch as Original or Repaint with a confidence score.                                                                                                             |
| **Confidence rejection threshold**               | Produce the "Uncertain" state for ambiguous predictions.                                  | Avoid low-confidence decisions by explicitly identifying ambiguity.                                                                                                             |
| **Confidence-weighted voting aggregation layer** | Consolidate predictions at vehicle level through confidence-weighted voting.              | Produce a reliable overall verdict and a detailed diagnosis for each area, without arbitrary rules.                                                                             |

### Architectural Conclusion

This approach follows a classical principle of industrial vision systems:

**Improve the signal before increasing model complexity.**

By shifting the main challenge towards acquisition (all-in-one macro Setup F) and using a patch-by-patch approach with confidence-weighted voting aggregation, it becomes possible to use a lightweight architecture suitable for mobile deployment, with a deliberately short and robust software pipeline.

### 4.7. Deep Learning Model Selection

| Model                                  | Advantages                                                                                                               | Disadvantages / Limitations                                                                                                 | R&D Decision                           |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| **ResNet-50**                    | Reference backbone in industrial automotive vision*(see Semitela et al., 2025)*.                                       | High number of parameters (25M), computationally intensive for Edge deployment, and risk of overfitting on a small dataset. | ❌**Not selected**               |
| **ViT** *(Vision Transformer)* | Excellent attention and global contextual correlation capabilities for shapes.                                           | Requires a massive training dataset to converge (absence of inductive bias).                                                | ❌**Not selected**               |
| **ConvNeXt**                     | Modern architecture with high performance on complex segmentation tasks.                                                 | High computational cost, memory footprint, and inference speed unfavorable for mobile devices.                              | ❌**Not selected**               |
| **EfficientNet-B0**              | **Ultra-lightweight (5M parameters), accurate, and optimized for embedded applications through Compound Scaling.** | Sensitive to the geometric quality of initial resizing (requires a strict 224×224 format).                                 | 🟢**SELECTED (Target Backbone)** |

**Justification for selecting EfficientNet-B0:**

- **Edge AI optimization**: Number of parameters reduced by a factor of 5 (5M vs. 25M for ResNet-50), minimizing RAM footprint and battery consumption on smartphones.
- **Inference speed**: Computational speed up to 4 times faster on mobile processors, ensuring compliance with the strict experimental target cycle time (≤ 90 seconds).
- **Transfer Learning suitability**: Architecture suited to rapid convergence without overfitting on our target volume of 450 to 500 macro patches in V0.1.
- **TensorFlow Lite compatibility**: Native conversion to a mobile format through the `keras.applications` API, consistent with the Keras / TensorFlow framework selected for the pipeline.

### 4.8. Data Strategy and Robustness

The model will be tested on:

| Factor                         | Objective                                                      |
| :----------------------------- | :------------------------------------------------------------- |
| **Multiple colors**      | Generalization across light, dark, and metallic finishes.      |
| **Different vehicles**   | Generalization across different makes and models.              |
| **Different conditions** | Robustness under shade, workshop lighting, and indirect light. |

The following table summarizes the mapping of the data used to initialize and train the **EfficientNet-B0** architecture:

| Dataset                                                                            | Size / Content                                                                                                                                                                             | Relevance to This Internship                                                                                                                                                                                                                   | Recommended Use & Integration                                                                                                                                                            |
| :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MVTec AD**                                                                 | 5,354 images, 15 object categories, industrial surface anomalies.                                                                                                                          | **Medium**: Excellent temporary proxy for learning microtextures and clear-coat irregularities, but not specific to macro-scale automotive imaging.                                                                                      | Excluded: Not suitable for the macro scale of Setup F.                                                                                                                                   |
| **Roboflow Paint Defects** *(BuildwellAI)*                                 | 467 automotive paint defect images (global view from a distance).                                                                                                                          | **Critical overfitting risk:** The analysis shows that the statistical distributions are too different (global contextual view vs. pixel-perfect macrotexture from APEXEL). Direct transfer would cause overfitting to the wrong domain. | **Retained only for technical pipeline testing** (checking that the code, loading, and inference work correctly in a dry run) and for SOTA documentation. No performance training. |
| **CarDD**                                                                    | 4,000 high-resolution images, more than 9,000 annotated defect instances.                                                                                                                  | **Medium**: Useful for validating the technical pipeline, but far removed from the target signal (mechanical damage vs. macro paint texture).                                                                                            | Excluded from the main pipeline.                                                                                                                                                         |
| **Curacel Car Damage**                                                       | 6,839 images of crashed or damaged vehicles captured in field conditions.                                                                                                                  | **Medium to High**: Useful for exposing the AI to manufacturers' chromatic diversity and complex outdoor environments.                                                                                                                   | Excluded from the main pipeline.                                                                                                                                                         |
| **MALLOULIAUTO Proprietary Dataset v0.1** *(To be built — first version)* | 450–500 high-resolution macro patches with complete metadata and*Original / Repaint* labels, captured using Setup F. Cases without reliable ground truth are excluded from the dataset. | **Maximum**: Unique business target and core of MALLOULIAUTO product R&D.                                                                                                                                                                | **Main training dataset (Week 5)**. This first version will be expanded if validation results reveal a lack of representativeness or overfitting.                                  |

Public datasets are used only to test the pipeline.

This finding confirms the scientific need to build a proprietary dataset consistent with the final acquisition setup, without mixing heterogeneous sources.

### 4.9. Progressive Training Strategy

Model development is organized into two stages.

The first stage establishes a baseline exploiting the texture signal (orange peel effect), which is the project's main physical signal.

The second stage adjusts the confidence rejection threshold and develops the multi-patch aggregation system.

---

#### Phase 1 — Classification Head Training (Frozen Backbone)

This phase rapidly adapts the model to the specific orange-peel domain by freezing the ImageNet pre-trained weights. The model is trained using **only 2 binary classes** (Original / Repaint).

Pipeline:

```text
                 Macro Capture
        (smartphone + all-in-one Apexel Module)
                            │
                            ▼
                 Minimal OpenCV preprocessing
                    (Resizing 384 × 384)
                            │
                            ▼
                    Keras normalization
              (EfficientNet preprocess_input)
                            │
                            ▼
                EfficientNet-B0 Backbone (Frozen)
                    (ImageNet weights preserved)
                            │
                            ▼
                Custom classification head
                    (Dense + 2-class Softmax)
                            │
                            ▼
             Original / Repaint (with confidence score)
```

Phase 1 configuration:

- **Epochs**: 15–20
- **Learning rate**: 1e-3
- **Batch size**: 32
- **Optimizer**: Adam
- **Loss**: Categorical crossentropy
- **Number of classes**: 2 (Original / Repaint)

Objectives:

- Obtain an initial performance measurement on the texture signal;
- Calculate the benchmark KPIs;
- Evaluate model robustness under the selected acquisition conditions;
- Identify the model's main errors.

Evaluation metrics:

| Metric           | Objective                               |
| :--------------- | :-------------------------------------- |
| AUC              | Separation between Original and Repaint |
| Repaint Recall   | Reduction of false negatives            |
| F1-score         | Precision/recall balance                |
| Confusion matrix | Error analysis                          |

---

#### Phase 2 — Fine-Tuning of the Final Layers + Rejection Threshold Optimization

This phase refines the representations specific to the macrotexture signal by unfreezing the final layers of the backbone. The confidence rejection threshold is then optimized on the validation set.

Phase 2 configuration:

- **Epochs**: 10–15 additional epochs
- **Learning rate**: 1e-5 (reduced)
- **Unfrozen layers**: Last 30 layers of EfficientNet-B0
- **Regularization**: Dropout 0.3, Early Stopping
- **Rejection threshold optimization**: Grid search on the validation set (initial value: 0.65)

---

#### Multi-Patch Aggregation System Using Weighted Voting

After individually classifying each patch and applying the rejection threshold, a simple aggregation layer produces the vehicle-level verdict through **confidence-weighted majority voting**.

**Aggregation method:**

```text
For each vehicle:
    1. Retrieve predictions for the 15–20 patches (predicted class + confidence score)
    2. Exclude patches whose confidence < rejection threshold (Uncertain state)
    3. For the retained patches, calculate the weighted vote:
       - Overall "Repaint" score = Σ (confidence of patches classified as Repaint)
       - Overall "Original" score = Σ (confidence of patches classified as Original)
    4. Vehicle verdict = class with the highest overall score
    5. If no patch is retained (all rejected by the threshold) → Vehicle UNCERTAIN
```

**Methodological justification:**

Confidence-weighted majority voting is a **statistically justifiable approach** and **consistent with the Deep Learning paradigm** of the project. It avoids introducing arbitrary rules (manually fixed thresholds) and allows the model to express its overall confidence through the accumulation of scores. This approach is standard in patch-based classification in industrial vision.

This method offers three advantages:

1. **Simplicity**: No arbitrary aggregation-level hyperparameter needs to be optimized.
2. **Consistency**: Respects the principle that "the model learns on its own", without manual rules.
3. **Robustness**: A highly confident patch (0.95) carries more weight than a less confident one (0.55), which is statistically justified.

The only parameter to optimize remains the **confidence rejection threshold** (initial value 0.65), determined through grid search on the validation set.

---

## 5. Benchmark Protocol v0

| Protocol Component                | Experimental Reference Value & R&D Specifications                                                                                                                                                                                                              |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Selected Configuration**  | Setup F (Xiaomi Redmi Note 12 + all-in-one Apexel Macro Module)                                                                                                                                                                                                |
| **Main Signal Exploited**   | Surface macrotexture (orange peel effect)                                                                                                                                                                                                                      |
| **Trained Classes**         | Original / Repaint (binary)                                                                                                                                                                                                                                    |
| **Additional Output State** | Uncertain (generated through confidence rejection threshold)                                                                                                                                                                                                   |
| **Input Resolution**        | Strict and standardized format of**384×384 pixels**                                                                                                                                                                                                     |
| **Model / Backbone**        | Target architecture**EfficientNet-B0** *(Transfer Learning)*                                                                                                                                                                                           |
| **Framework**               | **Keras / TensorFlow** *(TensorFlow Lite compatibility for future mobile deployment)*                                                                                                                                                                  |
| **Approach**                | Patch classification + rejection threshold + confidence-weighted voting aggregation                                                                                                                                                                            |
| **Controlled Variables**    | Vehicle, panel, bodywork area, module-to-surface distance (5–10 mm contact), integrated LED lighting, Xiaomi Redmi Note 12 in Pro mode, 2 patches per panel across 6–8 panels per vehicle.                                                                   |
| **Tested Variables**        | Vehicle make/model, bodywork color, residual lighting conditions.                                                                                                                                                                                              |
| **Inclusion Criteria**      | Perfectly sharp patch, effective module-to-surface contact, complete contextual metadata matrix, capture performed with manually controlled ISP settings.                                                                                                      |
| **Exclusion Criteria**      | Blur, poor module-to-surface contact, faulty LED lighting, patch with model confidence below the threshold (marked Uncertain), uncertain annotation not flagged.                                                                                               |
| **Expected Outputs (KPIs)** | **AUC** *(separation)*, **Repaint Recall** *(sensitivity)*, **inter-smartphone F1-score** *(ISP robustness)*, **vehicle accuracy** *(overall verdict after aggregation)*, **Uncertain rate** *(rejection proportion)*. |

---

## 6. Deliverables and Target Experimental Objectives

> **Note**: The values below are **target experimental objectives**, not guaranteed success thresholds. They will be evaluated and discussed in light of the actual results obtained. If they are not achieved, root-cause analysis and improvement proposals will constitute a deliverable in their own right.

The project must produce:

- A benchmark matrix;
- A documented macro dataset V0.1;
- An AI prototype for patch classification + thresholding + aggregation;
- An evaluation report;
- Product recommendations;
- An industrialization roadmap.

The target experimental objectives are:

- **AUC per patch** ≥ 0.85.
- **Repaint Recall per patch** ≥ 0.90.
- **Vehicle accuracy** ≥ 0.80 after multi-patch aggregation.
- **Processing time** ≤ 90 seconds per vehicle (capture + inference).
- **Error analysis**: at least 5 root causes identified and explained.

## 7. Future Development Perspectives

- **Development of a dedicated mobile application**: The final deployment of the MALLOULIAUTO product will require the development of a native mobile application (Android and iOS) to replace the smartphone's generic camera application. This application will directly access the camera sensor through the operating system's low-level APIs (**CameraX** on Android and **AVFoundation** on iOS) to programmatically control all capture settings: forced disabling of Beauty Mode, automatic HDR, Portrait mode, and all computational filters; locking of exposure, white balance, and focus; and enforcement of maximum resolution and RAW/DNG format whenever supported. The end user would not need to perform any technical adjustments, ensuring reproducibility of captures across users and smartphones. The application would also integrate an on-screen graphic mask, a **gyroscope** lock fixed at 45°, and real-time RGB histogram analysis to intercept and reject abnormal shots (*hard cases*) before inference. Development of this application is **outside the scope of the current internship** (time constraints over the 8-week period) and constitutes the first priority of the V1 roadmap for industrial deployment.
- **Colorimetric extension through intra-vehicle comparison**: To improve model sensitivity in high-end partial-repair cases where the textural signature alone may be insufficient, a future product enhancement could use an internal colorimetric reference within the vehicle (typically the roof, which is statistically rarely repainted). This approach would calculate a color difference (ΔE, CIELAB color space) between the reference panel and the inspected panel, directly using the existing Setup F without additional equipment. It would require prior empirical calibration of the decision threshold, since ΔE values obtained from field smartphone captures are not comparable to spectrophotometric laboratory thresholds (typically ΔE > 2.0 under standardized D65 lighting).
- **Luminance filtering (dual color space)**: Native sRGB mixes color and light intensity across its channels, making the analysis sensitive to parking-area weather conditions. One possible development would be to temporarily convert images to **CIELAB** to normalize brightness through the luminance channel (\(L\)), then convert them back to sRGB. The purpose would be to neutralize illumination biases while preserving the 3-channel sRGB format required for **EfficientNet-B0 Transfer Learning**.
- **Extension using classical texture descriptors**: If the internship results reveal difficult cases in which EfficientNet-B0 systematically confuses Original and Repaint for certain textures, a hybrid approach combining CNN predictions with classical texture descriptors (Gabor filters, Laplacian, Local Binary Patterns) could be explored. This direction remains **outside the scope of the current internship** because it would contradict the methodological principle of model-based machine learning, but it represents a potential development if performance reaches a plateau.
- **Enrichment of dataset V0.1**: If the internship results reveal a lack of representativeness (overfitting on certain makes, colors, or conditions), an expanded collection session will be planned after the internship to build version V0.2 with more than 1,000 diversified patches.

---

## 8. Study Limitations

A rigorous scientific approach requires the explicit identification of the limitations of this work. The following limitations are acknowledged from the project-scoping stage.

| Limitation                                        | Description                                                                                                                                                                                                                       | Potential Impact                                                                                                                        |
| :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Limited size of dataset V0.1**            | 450–500 patches from 30–50 vehicles constitute an initial exploratory version.                                                                                                                                                  | Risk of overfitting to makes and colors overrepresented in the dataset. Enrichment will be required for a production version.           |
| **Only one macro module tested**            | Setup F (all-in-one Apexel) is the only macro acquisition device evaluated experimentally. Other modules (Sandmarc 40x, Moment Macro) could offer different performance.                                                          | The selection of the optimal setup depends on equipment availability rather than an exhaustive comparison of all modules on the market. |
| **Absence of multi-season validation**      | All captures are performed during summer 2026 (July–August). Performance may vary under winter conditions (humidity, frost, different lighting).                                                                                 | The system has not been validated under diverse climatic conditions.                                                                    |
| **Absence of cross-country validation**     | The dataset is composed exclusively of vehicles available in Tunisia. Paint standards, dominant brands, and bodywork practices vary across markets.                                                                               | Generalization to other geographical markets is not guaranteed without dataset adaptation.                                              |
| **Actual magnification not certified**      | The actual magnification of the Apexel module is not the value advertised by the manufacturer (\~10x measured vs. 200x claimed). Effective resolution is a preliminary estimate that must be confirmed using a calibration ruler. | The effective resolution figures cited in this document are estimates to be experimentally validated in Week 4.                         |
| **Ground truth depends on human expertise** | Original/Repaint annotation relies on workshop history or a bodywork specialist's visual expertise, with inherent uncertainty in borderline cases.                                                                                | Incorrect annotation of a few images may reduce model performance in a way that is difficult to trace.                                  |
| **Mobile application outside the scope**    | This internship delivers a classification pipeline, not a deployed mobile application. Behavior under real-world usage conditions (non-expert operator, environmental pressure) is not evaluated.                                 | Internship results are intended to validate technical feasibility, not robustness in unsupervised field use.                            |

---

## 9. References & Validated Equipment

- **[Dong et al., AAAI 2024]** — *Exploiting Polarized Material Cues for Robust Car Detection* — [https://arxiv.org](https://arxiv.org)
- **[Associated PCDNet Code]** — *Polarized Detection Framework* — [https://github.com](https://github.com)
- **[ISRA Vision]** — *Car Paint Vision Systems for Industrial Automation* — [https://isravision.com](https://isravision.com)
- **[Micro-Epsilon]** — *reflectCONTROL Automotive Defect Detection* — [https://micro-epsilon.com](https://micro-epsilon.com)
- **[Semitela et al., Sensors 2025]** — *Combining Deflectometry and Deep Learning (ResNet-50) for Car Body Paint Inspection* — [https://doi.org](https://doi.org)
- **[OpenCV Documentation]** — *Color Constancy Framework (xphoto::GrayworldWB)* — [https://opencv.org](https://opencv.org)
- **[University of Helsinki]** — *Computer Vision Combined with Smartphone Helps See Colours Accurately* — [https://helsinki.fi](https://helsinki.fi)
- **[DeFelsko]** — *Automotive Paint Inspection (Paint Meters)* — [https://defelsko.com](https://defelsko.com)
- **[CarVertical]** — *Automotive Paint Thickness Gauge Guide* — [https://carvertical.com](https://carvertical.com)
- **[Apexel]** — *Smartphone Macro Lens Documentation* — [https://apexeloptic.com](https://apexeloptic.com)

---

### Validated Equipment Specifications for Ordering (Selected Setup F)

- **All-in-One Smartphone Macro Module (High Priority)**: *Apexel Macro Microscope with integrated LEDs and CPL Filter* (€37). Universal clip-on module offering macro magnification, integrated LEDs, and an integrated CPL polarizing filter, compatible with most smartphones. Carrying case included.

  - https://www.amazon.fr/Microscope-200X-smartphone-microscope-num%C3%A9rique/dp/B09QGQYG39?th=1

---

### Equipment Studied but Not Ordered (SOTA References)

- **NEEWER NL-36AI + Separate CPL Filter (Initially Considered Setup C)**: Grazing-lighting and polarization approach using separate accessories. Excluded because its effective resolution at 40 cm is insufficient compared with macro Setup F, and because of the operational complexity involved in handling separate accessories (LED + CPL + tripod).
- **ColorChecker Classic Mini (Optional Priority)**: Calibrated physical chart containing 24 patches for scientific reference calibration in case of laboratory drift (Setup D). (£74.00)

  - [Official link: Calibrite.com](https://calibrite.com/product/colorchecker-classic-mini/)
- **Spectro 1 Mobile Spectrophotometer (Setup B)**: Multi-band point spectral acquisition device for extracting pure pigment signatures. Excluded from the V1 product because it provides an isolated local measurement rather than a complete 2D image, making it incompatible with a CNN model. ($299.99)

  - [Commercial link: Amazon.com](https://www.amazon.com/Spectro-Spectrophotometer-Matching-Analysis-Quality/dp/B0B4TWMRDJ)
- **Rhopoint TAMS — Total Appearance Measurement System (Setup E)**: Heavy industrial deflectometry equipment measuring the distortion of reflections from structured patterns (waviness, DOI, defects). Excluded because it is a fixed metrology system with prohibitive cost, making it impossible to adapt to autonomous pocket-sized embedded deployment.

  - [Manufacturer link: RhopointAmericas.com](https://www.rhopointamericas.com/product/rhopoint-tams-total-appearance-measurement-system/)
- **Industrial USB Cameras (Basler, IDS, FLIR)**: Professional solutions evaluated but excluded from the internship for three reasons: (1) prohibitive cost (€500–3,000), (2) the permanent need for a laptop, and (3) lower nominal resolution than the smartphone (1–5 MP compared with 48 MP). Considered as a V2 perspective for a fixed inspection station.
