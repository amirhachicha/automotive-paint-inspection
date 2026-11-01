
## Ways to Reduce Overfitting

- Add more data
- Data Augmentation
- Dropout
- Batch Normalization
- Reduce model complexity

# Data Augmentation

![1784124287325](image/rapport_test_data_augmentation/1784124287325.png)

📊 **COMPARATIVE TABLE — Impact of Data Augmentation**

| Metric                        | Without Augmentation | With Augmentation |
| :---------------------------- | :------------------: | :---------------: |
| **Best Epoch**          |          29          |        13        |
| **Train Accuracy**      |        0.6264        |      0.5156      |
| **Validation Accuracy** |        0.5790        |      0.5074      |
| **Train Loss**          |        0.8996        |      1.1192      |
| **Validation Loss**     |        1.0357        |      1.1981      |
| **Overfitting Gap**     |        0.0474        |      0.0082      |

---

### 💡 VERDICT

- **✅ Drastic reduction in overfitting (82.7% reduction)**

  - *Overfitting gap without augmentation:* 0.0474
  - *Overfitting gap with augmentation:* 0.0082
- **⚠️ Decrease in overall performance**

  - Validation accuracy decreased by **7.2 percentage points**.

# Visualization of Augmented Images

![1784124465781](image/rapport_test_data_augmentation/1784124465781.png)

# Inference (Final Test)

![1784124525088](image/rapport_test_data_augmentation/1784124525088.png)
