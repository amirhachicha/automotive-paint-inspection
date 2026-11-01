# Internship Schedule (8 Weeks)

---

# Week 1 — Literature Review and Project Scoping *(Completed)*

## Objective

Establish the scientific framework of the project and define the experimental strategy.

| Day                 | Objective                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Understand the industrial requirements, the problem of **original paint vs. repainted paint**, and the internship objectives.            |
| **Tuesday**   | Study existing scientific research (computer vision, automotive paint inspection, Deep Learning).                                               |
| **Wednesday** | Identify the different hardware solutions (smartphone, CPL filter, LED lighting, spectrophotometer, ColorChecker, Rhopoint TAMS, macro lenses). |
| **Thursday**  | Compare the solutions in terms of performance, constraints, and compatibility with a smartphone application.                                    |
| **Friday**    | Finalize the SOTA document, define the selected setup as the reference solution, and establish the project's experimental strategy.             |

### Expected Deliverable

- **Deliverable 1:** Benchmark matrix comparing setups (A/B/C/D/E/F), including cost, time, constraints, and expected performance.

---

# Week 2 — AI Pipeline Preparation *(Completed)*

## Objective

Acquire the skills required to develop the computer vision pipeline before receiving the equipment.

| Day                 | Objective                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Discover the fundamental principles of computer vision and the general operation of an image classification system.*(Playlist – Day 1: Introduction to Computer Vision)*                                                                                                                                                                                                                               |
| **Tuesday**   | Master image processing operations using OpenCV (reading, displaying, filtering, geometric transformations, and color spaces).*(Playlist – Day 2: Image & Video Processing using OpenCV Python)*                                                                                                                                                                                                       |
| **Wednesday** | Correct, restructure, and complete the SOTA document as well as the benchmark methodology protocol.                                                                                                                                                                                                                                                                                                       |
| **Thursday**  | Understand how CNNs work, including convolutions, pooling, and automatic feature extraction, in preparation for selecting the**EfficientNet-B0** model. *(Playlist – Day 3: CNN & Feature Extractor)*                                                                                                                                                                                            |
| **Friday**    | Study how to train a neural network on a custom dataset and understand the concepts of datasets, labels, epochs, batch size, loss functions, and validation. Validate the end-to-end pipeline (data loading → training loop → evaluation KPIs) using a public proxy dataset to verify the technical workflow before receiving Setup F.*(Playlist – Day 7: Training CNN from Scratch on Custom Data)* |

---

# Week 3 — Further Literature Review and Hardware Selection Validation *(Completed)*

## Objective

Conduct further research into portable optical acquisition devices and finalize the selection of Setup F through preliminary empirical validation.

| Day                 | Objective                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Conduct in-depth research on portable optical acquisition devices (industrial USB cameras, compact cameras, smartphone clip-on macro lenses).                                                                       |
| **Tuesday**   | Perform a detailed comparative analysis of the different solutions: monochrome cameras (Basler, IDS, FLIR, Innomaker), cameras (Ricoh GR, Canon, Nikon), and smartphone clip-on modules (Apexel, Sandmarc, Moment). |
| **Wednesday** | Specifically study smartphone macro lenses and evaluate their suitability for revealing the orange-peel texture signal at the pixel level.                                                                          |
| **Thursday**  | Conduct a preliminary feasibility test of the macro imaging concept using the smartphone's native macro mode to validate the approach before purchasing the final Apexel module.                                    |
| **Friday**    | Finalize the selection of Setup F (all-in-one Apexel module with integrated LED lighting and CPL filter). Update the SOTA document with the newly selected configuration. Confirm the equipment order.              |

---

# Week 4 — Software Pipeline Development *(In Progress)*

## Objective

Build the first complete software pipeline and technically validate it using a public dataset before receiving the Setup F equipment.

| Day                 | Objective                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Monday**    | Study**Data Augmentation** techniques (rotation, flipping, brightness, contrast) and evaluate their potential to improve the robustness of the future model. *(Playlist – Day 8: Data Augmentation)*                                                                                                                  |
| **Tuesday**   | Understand the principle of**Transfer Learning**, compare pretrained models, and prepare to use **EfficientNet-B0**. *(Playlist – Day 10: Transfer Learning & Pretrained Models)*                                                                                                                               |
| **Wednesday** | Study the implementation of image classification using**Keras / TensorFlow** (the selected framework for **TensorFlow Lite** compatibility and final smartphone deployment). Understand the structure of a training project: `Sequential`, `compile`, `model.fit()`, `callbacks`, and `ModelCheckpoint`. |
| **Thursday**  | Develop an initial software pipeline: image loading, OpenCV preprocessing, resizing to**384 × 384**, and data preparation for **Keras** (`image_dataset_from_directory`, `Rescaling`, `tf.data.AUTOTUNE`).                                                                                                  |
| **Friday**    | Perform a**technical test** of the complete software pipeline using a public dataset reorganized into two classes to verify the entire workflow (loading, preprocessing, data augmentation, Phase 1 + Phase 2 training, evaluation, inference, and saving).                                                              |

---

# Week 5 — Final Preparation and Start of Data Collection

## Objective

Finalize the acquisition protocol using the Redmi Note 12 + Apexel module, prepare traceability tools, and begin collecting the proprietary dataset.

| Day                 | Objective                        | Details                                                                                                                                                                                                          |
| ------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Test the Apexel module           | Receive and test the Apexel module with the Redmi Note 12. Check framing, focusing, working distance, integrated lighting, and the different capture modes. Identify potential lighting or image quality issues. |
| **Tuesday**   | Write the field SOP              | Write the`protocole_experimental_final.md` protocol: surface preparation, cleaning, module positioning, working distance, focusing, lighting, number of captures, and quality criteria.                        |
| **Wednesday** | Structure traceability           | Prepare`metadata_atelier.csv` and the file naming protocol. Organize the Original, Repainted, and Unknown folders. Check the equipment and take a few validation images before starting the campaign.          |
| **Thursday**  | Start data collection (Day 1)    | Capture the first automotive surfaces using the Redmi Note 12 + Apexel. Record the information associated with the images and check their quality.                                                               |
| **Friday**    | Continue data collection (Day 2) | Continue capturing images of different vehicles, panels, and colors. Collect comparable Original and Repainted examples whenever possible. Perform a quick image quality check at the end of the day.            |

**Week 5 Deliverables:**

- `docs/protocole_experimental_final.md`
- `data/metadata_atelier.csv`

---

# Week 6 — Completion of Data Collection and AI Experimentation

## Objective

Complete the data collection campaign, prepare the proprietary dataset, and conduct an initial complete experiment using EfficientNet-B0 to obtain results that can be used in the internship report.

| Day                 | Objective                              | Details                                                                                                                                                                                                                                 |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Continue data collection (Day 3)       | Capture additional Original and Repainted surfaces from different vehicles. Complete the metadata and verify the labels with the workshop.                                                                                              |
| **Tuesday**   | Address data gaps (Day 4)              | Continue data collection, prioritizing panels, colors, and situations that are still underrepresented. Perform a quick quality check on the newly captured images.                                                                      |
| **Wednesday** | Complete data collection (Day 5)       | Finalize the campaign. Check the total number of images and the distribution of labels, vehicles, panels, and colors. Identify technically unusable images or images whose labels remain uncertain.                                     |
| **Thursday**  | Prepare the dataset and Phase 1        | Finalize the dataset: quality control, exclusion of unusable images, label validation, organization into Original / Repainted / Unknown categories, and Train / Validation / Test splitting. Start EfficientNet-B0 training in Phase 1. |
| **Friday**    | Evaluate the model and perform Phase 2 | Evaluate the model (Accuracy, Precision, Recall, F1-score, confusion matrix, AUC). Perform Phase 2 fine-tuning if the dataset and results allow it. Test inference and the Uncertain mechanism. Save the results.                       |

**Week 6 Deliverables:**

- Finalized and partitioned proprietary dataset (Train / Validation / Test)
- EfficientNet-B0 model (Phase 1 and, if applicable, Phase 2)
- Training history (`training_history`)
- Evaluation metrics, confusion matrix, and classification report
- Inference results and preliminary error analysis

---

# Week 7 — Remote Work: Report Writing and Finalization

## Objective

Use the results obtained during the two weeks of workshop activities to write the internship report, document the methodology, and present the experimental results, limitations, and future prospects of the project.

| Day                 | Objective                  | Details                                                                                                                                                                                                          |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | Write the Introduction     | Write Chapter 1 — Introduction: industrial context, problem statement, internship objectives, overall approach, and project organization.                                                                       |
| **Tuesday**   | Write the State of the Art | Write Chapter 2 — State of the Art based on`revue_SOTA.md`. Present the investigated approaches, the limitations of standard RGB imaging, and the justification for selecting Setup F with the Apexel module. |
| **Wednesday** | Write the Methodology      | Write Chapter 3 — Methodology: Setup F, Redmi Note 12, acquisition protocol, data collection, annotation, dataset preparation, preprocessing, EfficientNet-B0, and training strategy.                           |
| **Thursday**  | Write the Results          | Write Chapter 4 — Results and Discussion: description of the collected dataset, training results, metrics, confusion matrix, error analysis, and lighting issues on black surfaces.                             |
| **Friday**    | Finalize the deliverables  | Finalize the report: limitations, future prospects, conclusion, figures, tables, bibliography, and proofreading. Finalize the defense presentation and check repository consistency.                             |

**Week 7 Deliverables:**

- `rapport_stage.pdf`
- Internship defense presentation
- Finalized Git repository

---

## Git Repository Software Architecture

To ensure development traceability, version control, and proper organization of internship deliverables, a Git repository architecture is proposed. This organization is based on a main `develop` branch and development (`feature`) branches corresponding to the different project stages.

**Important note:** The root-level files (`README.md`, `requirements.txt`, `config.yaml`) will be finalized and documented in **Week 8** of the internship, once the complete pipeline has been stabilized and the Python dependencies have been confirmed.

```text
==================================================================================================
       GIT REPOSITORY ARCHITECTURE & FILE STRUCTURE
==================================================================================================

develop (Reference branch, stable and clean)
 │
 ├──► [S1 + S2 + S3] — Issue #3
 │     Branch: feature-s1s2s3-sota-review
 │
 │     ├── 📄 revue_SOTA.md
 │     │      (SOTA review and justification for Setup F)
 │     │
 │     └── 📄 planning_detaille.md
 │            (Revised internship schedule)
 │
 │
 ├──► [S4] — Issue #5
 │     Branch: feature-s4-pipeline-logiciel
 │
 │     ├── 📁 docs/requirements/
 │     │    ├── 📄 data_augmentation.md
 │     │    ├── 📄 rapport_test_data_augmentation.md
 │     │    ├── 📄 rapport_transfer_learning.md
 │     │    └── 📄 data_storage.md
 │     │
 │     ├── 📁 src/
 │     │    └── 📄 pipeline_initial.py
 │     │
 │     └── 📁 tests/
 │          ├── 📓 custom_arch_data_augmentation_cardd.ipynb
 │          ├── 📓 transfer_learning_efficientnetb0.ipynb
 │          ├── 📓 test_pipeline_binaire.ipynb
 │          └── 📓 test_pipeline_binaire_morphologie.ipynb
 │
 │
 ├──► [S5+S6] — Issue #6
 │     Branch: feature-s5-preparation
 │
 │     ├── 📁 docs/
 │     │    │
 │     │    |── 📄 rapport_entrainement_dataset_atelier.md
 │     │    |       (Training methodology, results, and limitations)
 │     │    ├── 📄 protocole_experimental_final.md
 │     │           (Field SOP using the Redmi Note 12 + Apexel)
 │     │
 │     ├── 📁 src\peint_defects\
 │          │
 │          ├── 📓 principale_code.ipynb
 │          │      (Phase 1 and Phase 2, evaluation, inference, and Uncertain status)
 |          |
 │          ├── 📁 dataset_final_splits_v2/
 │          |    ├── 📁 train/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    ├── 📁 val/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    ├── 📁 test/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    └── 📄 metadata_atelier.csv
 |          |
 │          ├── 📁 outputs_training_atelier_v2/
 │               ├── 📁 figures/
 │               ├── 📁 metrics/
 │               ├── 📁 predictions/
 │               └── 📁 weights/
 │
 └──► [S7]
       Issue #8
       Branch: feature-s7-rapport-final-distance
   
       ├── 📄 rapport_stage.pdf
       │      (Final report manuscript)
       │
       ├── 📁 presentation/
       │    └── 📄 slides_soutenance.pdf
```

# Planning prévisionnel du stage (8 semaines)

---

# Semaine 1 — Revue bibliographique et cadrage du projet *(Réalisée)*

## Objectif

Établir le cadre scientifique du projet et définir la stratégie expérimentale.

| Jour               | Objectif                                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Comprendre le besoin industriel, la problématique**« peinture d'origine vs repeinte »** et les objectifs du stage.                                                 |
| **Mardi**    | Étudier les travaux scientifiques existants (vision par ordinateur, inspection de peinture automobile, Deep Learning).                                               |
| **Mercredi** | Identifier les différentes solutions matérielles (Smartphone, filtre CPL, éclairage LED, spectrophotomètre, ColorChecker, Rhopoint TAMS, modules macroscopiques). |
| **Jeudi**    | Comparer les solutions selon leurs performances, leurs contraintes et leur compatibilité avec une application smartphone.                                            |
| **Vendredi** | Finaliser le document SOTA, définir le setup retenu comme solution de référence et établir la stratégie expérimentale du projet.                                |

### Livrable attendu

- **Livrable 1 :** Matrice de benchmark des setups (A/B/C/D/E/F) avec coût, temps, contraintes et performances attendues.

---

# Semaine 2 — Préparation du pipeline IA *(Réalisée)*

## Objectif

Acquérir les compétences nécessaires pour développer le pipeline de vision par ordinateur avant la réception du matériel.

| Jour               | Objectif                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Découvrir les principes fondamentaux de la vision par ordinateur et le fonctionnement général d'un système de classification d'images.*(Playlist – Day 1 : Introduction to Computer Vision)*                                                                                                                                                                                                                              |
| **Mardi**    | Maîtriser les opérations de traitement d'images avec OpenCV (lecture, affichage, filtrage, transformations géométriques, espaces couleur).*(Playlist – Day 2 : Image & Video Processing using OpenCV Python)*                                                                                                                                                                                                             |
| **Mercredi** | Corriger, restructurer et compléter le document SOTA ainsi que le protocole méthodologique du benchmark.                                                                                                                                                                                                                                                                                                                       |
| **Jeudi**    | Comprendre le fonctionnement des CNN, des convolutions, du pooling et de l'extraction automatique des caractéristiques afin de préparer le choix du modèle**EfficientNet-B0**. *(Playlist – Day 3 : CNN & Feature Extractor)*                                                                                                                                                                                        |
| **Vendredi** | Étudier comment entraîner un réseau de neurones sur un dataset personnalisé, comprendre les notions de dataset, labels, epochs, batch size, loss function et validation. Valider le pipeline end-to-end (data loading → training loop → evaluation KPIs) sur un dataset public proxy afin de vérifier la chaîne technique avant réception du Setup F.*(Playlist – Day 7 : Training CNN from Scratch on Custom Data)* |

---

# Semaine 3 — Approfondissement de l'état de l'art et validation du choix matériel *(Réalisée)*

## Objectif

Approfondir la recherche bibliographique sur les dispositifs d'acquisition optique portables et finaliser le choix du Setup F par validation empirique préalable.

| Jour               | Objectif                                                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Recherche approfondie sur les dispositifs d'acquisition optique portables (caméras industrielles USB, appareils photo compacts, modules macroscopiques clip-on).                                                    |
| **Mardi**    | Analyse comparative détaillée des différentes solutions : caméras monochromes (Basler, IDS, FLIR, Innomaker), appareils photo (Ricoh GR, Canon, Nikon) et modules clip-on smartphone (Apexel, Sandmarc, Moment). |
| **Mercredi** | Étude spécifique des modules macroscopiques pour smartphone et évaluation de leur pertinence pour la révélation du signal peau d'orange en pixel-perfect.                                                       |
| **Jeudi**    | Test préalable de faisabilité du concept macroscopique avec le mode macro natif du smartphone pour valider l'approche avant l'achat définitif du module Apexel.                                                   |
| **Vendredi** | Finalisation du choix du Setup F (Module Apexel tout-en-un avec LED et CPL intégrés). Mise à jour du document SOTA avec la nouvelle configuration retenue. Confirmation de la commande matériel.                 |

---

# Semaine 4 — Développement du pipeline logiciel *(En cours)*

## Objectif

Construire le premier pipeline logiciel complet et le valider techniquement sur un dataset public avant la réception du matériel Setup F.

| Jour               | Objectif                                                                                                                                                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Lundi**    | Étudier les techniques de**Data Augmentation** (rotation, retournement, luminosité, contraste) et évaluer leur intérêt pour améliorer la robustesse du futur modèle. *(Playlist – Day 8 : Data Augmentation)*                                                                                                        |
| **Mardi**    | Comprendre le principe du**Transfer Learning**, comparer les modèles pré-entraînés et préparer l'utilisation d'**EfficientNet-B0**. *(Playlist – Day 10 : Transfer Learning & Pretrained Models)*                                                                                                                |
| **Mercredi** | Étudier la mise en œuvre d'une classification d'images sous**Keras / TensorFlow** (framework retenu pour compatibilité **TensorFlow Lite** — déploiement smartphone final). Comprendre la structure d'un projet d'entraînement : `Sequential`, `compile`, `model.fit()`, `callbacks`, `ModelCheckpoint`. |
| **Jeudi**    | Développer un premier pipeline logiciel : chargement des images, prétraitement OpenCV, redimensionnement en**384 × 384**, préparation des données pour **Keras** (`image_dataset_from_directory`, `Rescaling`, `tf.data.AUTOTUNE`).                                                                           |
| **Vendredi** | Réaliser un**test technique** du pipeline logiciel complet sur un dataset public réorganisé en 2 classes afin de vérifier le bon fonctionnement de la chaîne complète (chargement, prétraitement, data augmentation, entraînement Phase 1 + Phase 2, évaluation, inférence, sauvegarde).                             |

---

## Semaine 5 — Préparation finale et lancement de la collecte

### Objectif

Finaliser le protocole d'acquisition avec le Redmi Note 12 + module Apexel, préparer les outils de traçabilité et commencer la collecte du dataset propriétaire.

| Jour               | Objectif                        | Détails                                                                                                                                                                                                                                                              |
| :----------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Tester le module Apexel         | Réceptionner et tester le module Apexel avec le Redmi Note 12. Vérifier le cadrage, la mise au point, la distance de travail, l'éclairage intégré et les différents modes de capture. Identifier les éventuels problèmes d'éclairage ou de qualité d'image. |
| **Mardi**    | Rédiger le SOP terrain         | Rédiger le protocole`protocole_experimental_final.md` : préparation de la surface, nettoyage, positionnement du module, distance de travail, mise au point, éclairage, nombre de captures et critères de qualité.                                              |
| **Mercredi** | Structurer la traçabilité     | Préparer`metadata_atelier.csv` et le protocole de nommage. Organiser les dossiers origine, repeint et inconnu. Vérifier le matériel et effectuer quelques captures de validation avant la campagne.                                                              |
| **Jeudi**    | Lancer la collecte (Jour 1)     | Capturer les premières surfaces automobiles avec le Redmi Note 12 + Apexel. Enregistrer les informations associées aux images et vérifier leur qualité.                                                                                                           |
| **Vendredi** | Poursuivre la collecte (Jour 2) | Poursuivre les captures sur différents véhicules, pièces et couleurs. Rechercher autant que possible des exemples Origine et Repeint comparables. Effectuer un contrôle rapide des images en fin de journée.                                                     |

**Livrables S5 :**

* `docs/protocole_experimental_final.md`
* `data/metadata_atelier.csv`

---

## Semaine 6 — Fin de collecte et expérimentation IA

### Objectif

Finaliser la campagne de collecte, préparer le dataset propriétaire et réaliser une première expérimentation complète avec EfficientNet-B0 afin d'obtenir des résultats exploitables pour le rapport.

| Jour               | Objectif                        | Détails                                                                                                                                                                                                                                               |
| :----------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Continuer la collecte (Jour 3)  | Capturer de nouvelles surfaces Origine et Repeint sur des véhicules différents. Compléter les métadonnées et vérifier les labels avec l'atelier.                                                                                                 |
| **Mardi**    | Cibler les manques (Jour 4)     | Poursuivre la collecte en privilégiant les pièces, couleurs et situations encore sous-représentées. Effectuer un contrôle rapide de la qualité des nouvelles captures.                                                                           |
| **Mercredi** | Clôturer la collecte (Jour 5)  | Finaliser la campagne. Vérifier le nombre total d'images, la répartition des labels, des véhicules, des pièces et des couleurs. Identifier les images techniquement inutilisables ou dont le label reste incertain.                                |
| **Jeudi**    | Préparer le dataset et Phase 1 | Finaliser le dataset : contrôle qualité, exclusion des images inutilisables, validation des labels, organisation Origine / Repeint / Inconnu et séparation Train / Validation / Test. Lancer l'entraînement EfficientNet-B0 en Phase 1.            |
| **Vendredi** | Évaluer le modèle et Phase 2  | Évaluer le modèle (Accuracy, Precision, Recall, F1-score, matrice de confusion, AUC). Réaliser la Phase 2 de fine-tuning si le dataset et les résultats le permettent. Tester l'inférence et le mécanisme Incertain. Sauvegarder les résultats. |

**Livrables S6 :**

* Dataset propriétaire finalisé et partitionné (Train / Validation / Test)
* Modèle EfficientNet-B0 (Phase 1 et éventuellement Phase 2)
* Historique d'entraînement (`training_history`)
* Métriques d'évaluation, matrice de confusion et rapport de classification
* Résultats d'inférence et analyse préliminaire des erreurs

---

## Semaine 7 — Travail à distance : rédaction et finalisation du rapport

### Objectif

Exploiter les résultats obtenus pendant les deux semaines de travail en atelier pour rédiger le rapport de stage, documenter la méthodologie et présenter les résultats expérimentaux, les limites et les perspectives du projet.

| Jour               | Objectif                  | Détails                                                                                                                                                                                                              |
| :----------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lundi**    | Rédiger l'Introduction   | Rédiger le Chapitre 1 — Introduction : contexte industriel, problématique, objectifs du stage, démarche générale et organisation du projet.                                                                     |
| **Mardi**    | Rédiger l'État de l'art | Rédiger le Chapitre 2 — État de l'art à partir de`revue_SOTA.md`. Présenter les approches étudiées, les limites du RGB standard et la justification du Setup F avec module Apexel.                           |
| **Mercredi** | Rédiger la Méthodologie | Rédiger le Chapitre 3 — Méthodologie : Setup F, Redmi Note 12, protocole d'acquisition, collecte, annotation, préparation du dataset, prétraitement, EfficientNet-B0 et stratégie d'entraînement.              |
| **Jeudi**    | Rédiger les Résultats   | Rédiger le Chapitre 4 — Résultats et discussion : description du dataset obtenu, résultats d'entraînement, métriques, matrice de confusion, analyse des erreurs et problèmes d'éclairage sur surfaces noires. |
| **Vendredi** | Finaliser le livrable     | Finaliser le rapport : limites, perspectives, conclusion, figures, tableaux, bibliographie et relecture. Finaliser la présentation de soutenance et vérifier la cohérence du dépôt.                              |

**Livrables S7 :**

* `rapport_stage.pdf`
* Support de présentation pour la soutenance
* Dépôt Git finalisé

---

## Architecture logicielle du dépôt Git

Dans le but d'assurer la traçabilité des développements, la gestion des versions et l'organisation des livrables du stage, une architecture de dépôt Git est proposée. Cette organisation repose sur une branche principale `develop` et des branches de développement (`feature`) correspondant aux différentes étapes du projet.

**Note importante** : Les fichiers racine (`README.md`, `requirements.txt`, `config.yaml`) sont finalisés et documentés en **Semaine 8** du stage, une fois le pipeline complet stabilisé et les dépendances Python confirmées.

```text
==================================================================================================
       ARCHITECTURE DU DÉPÔT GIT & ARBORESCENCE DES FICHIERS
==================================================================================================

develop (Branche de référence, stable, propre)
 │
 ├──► [S1 + S2 + S3] — Issue #3
 │     Branche : feature-s1s2s3-sota-review
 │
 │     ├── 📄 revue_SOTA.md
 │     │      (Revue SOTA et justification du Setup F)
 │     │
 │     └── 📄 planning_detaille.md
 │            (Planning révisé du stage)
 │
 │
 ├──► [S4] — Issue #5
 │     Branche : feature-s4-pipeline-logiciel
 │
 │     ├── 📁 docs/requirements/
 │     │    ├── 📄 data_augmentation.md
 │     │    ├── 📄 rapport_test_data_augmentation.md
 │     │    ├── 📄 rapport_transfer_learning.md
 │     │    └── 📄 data_storage.md
 │     │
 │     ├── 📁 src/
 │     │    └── 📄 pipeline_initial.py
 │     │
 │     └── 📁 tests/
 │          ├── 📓 custom_arch_data_augmentation_cardd.ipynb
 │          ├── 📓 transfer_learning_efficientnetb0.ipynb
 │          ├── 📓 test_pipeline_binaire.ipynb
 │          └── 📓 test_pipeline_binaire_morphologie.ipynb
 │
 │
 ├──► [S5+S6] — Issue #6
 │     Branche : feature-s5-preparation
 │
 │     ├── 📁 docs/
 │     │    │
 │     │    |── 📄 rapport_entrainement_dataset_atelier.md
 │     │    |       (Méthode, résultats et limites de l'entraînement)
 │     │    ├── 📄 protocole_experimental_final.md
 │     │           (SOP terrain avec le Redmi Note 12 + Apexel)
 │     │
 │     ├── 📁 src\peint_defects\
 │          │
 │          ├── 📓 principale_code.ipynb
 │          │      (Phase 1 et Phase 2 , Évaluation, inférence et état Incertain)
 |          |
 │          ├── 📁 dataset_final_splits_v2/
 │          |    ├── 📁 train/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    ├── 📁 val/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    ├── 📁 test/
 │          |    │    ├── 📁 origine/
 │          |    │    └── 📁 repeint/
 │          |    └── 📄 metadata_atelier.csv
 |          |
 │          ├── 📁 outputs_training_atelier_v2/
 │               ├── 📁 figures/
 │               ├── 📁 metrics/
 │               ├── 📁 predictions/
 │               └── 📁 weights/
 │
 └──► [S7]
       Issue #8
       Branche : feature-s7-rapport-final-distance
   
       ├── 📄 rapport_stage.pdf
       │      (Manuscrit final du rapport)
       │
       ├── 📁 presentation/
       │    └── 📄 slides_soutenance.pdf
```
