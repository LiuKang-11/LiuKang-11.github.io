---
layout: default
title: "Projects"
---

# My projects

## Project 1：Thermoplastic Elastomer ML predictor
### Description：
- **ML Prediction:** Predict stress-strain curves from triblock copolymer parameters.
- **Bayesian Optimization:** Integrate Bayesian optimization for process improvement.
- **Simulation Data:** Use simulation to link molecular chain length, monomer volume ratio, and irregular chain ratios with stress-strain behavior.
- **Modeling Framework:** Build forward and inverse models to enhance material performance predictions.



Link：[Github repo](https://github.com/LiuKang-11/Thermoplastic-Elastomer-inverse-design)

* **Forward Prediction DEMO**
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/thermo1.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

* **Inverse Design DEMO**
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/thermo2.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>
---

## Project 2：CAE(CNN Autoencoder) Model for TSE (Twin screw extruder) process
### Description：  
- Applied machine learning techniques to monitor and optimize the twin screw extruder process.
- Developed a **Convolutional Autoencoder Model** to analyze and reconstruct screw elements effectively. 
- Utilized **Principal Component Analysis (PCA)** for visualizing encoded features of twin screw elements.

Link：[Github repo](https://github.com/LiuKang-11/CAE-model-for-twin-screw-process)

* **Model Architecture**

![image](https://user-images.githubusercontent.com/13636671/128841487-128e2580-7fa1-4dd5-9273-99b901ac9766.png)

* **Some result**
> We display the model's results with several visualizations, like the reconstruction of screw image, regression loss, and the PCA analysis for cluster

- * **Reconstruction**

![image](https://user-images.githubusercontent.com/13636671/128842031-ee18f944-3665-4954-9fe2-ae2f4d85b6d3.png)


- * **Regression**

![image](https://user-images.githubusercontent.com/13636671/128842140-2793a577-1fca-4d76-a85c-2b29ebab2c5d.png)

![image](https://user-images.githubusercontent.com/13636671/128842154-ad8e8564-a1fd-4ac0-a6fb-ae18a48fd0bc.png)


- * **PCA analysis**

![image](https://user-images.githubusercontent.com/13636671/128842304-a3f2ae84-4382-4345-a845-9340e007723b.png)

---

## Project 3：Game AI design
### Description： 
- Implement some basic AI behavior in game like orientation, evade...etc
- Implement path finding algorithm **(Dijkstra and A*)** into AI characters
- Develop multi AI agents by **RL algorithm** 

Link：[Github repo](https://github.com/LiuKang-11/CSC584)
Link：[Github repo](https://github.com/LiuKang-11/Deadzone---DQN-AI-agent-for-2D-shooting-Game)

* **DeadZone - DQN AI agent for 2D shooting game**
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/Deadzone_complete_game.mov" type="video/mp4">
  Your browser does not support video playback.
</video>

* **Flock DEMO**
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/HW2_Part4 Video.mov" type="video/mp4">
  Your browser does not support video playback.
</video>

* **Path Finding DEMO**
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/HW3.mov" type="video/mp4">
  Your browser does not support video playback.
</video>

---

## Project 4：NASA close Approach ML Analysis
### Description： 
- **Objective:**  
  - Analyze Near-Earth Objects (NEOs) to assess their trajectories and impact risks using NASA’s JPL data and real-time data from the CAD API.
  - Develop machine learning models for early identification of potentially hazardous objects (PHOs).

- **Methodology:**  
  - **Data Handling:**  
    - Merge CSV dataset with data from NASA’s JPL API.
    - Preprocess data by removing duplicates/missing values and normalizing numeric features.
  - **Exploratory Data Analysis (EDA):**  
    - Analyze feature distributions (e.g., distance, velocity, absolute magnitude).
  - **Machine Learning Techniques:**  
    - **K-Means Clustering:**  
      - Group NEOs into two clusters (hazardous vs. non-hazardous) using silhouette scores for optimal cluster determination.
    - **K-Nearest Neighbors (KNN):**  
      - Classify NEOs with 99% accuracy based on normalized features.
    - **Principal Component Analysis (PCA):**  
      - Reduce dimensionality for visualization and feature importance analysis.

Link：[Github repo](https://github.com/LiuKang-11/NASA-close-ML-Analysis)

- **Work Flow**

![alda2 drawio](https://github.com/user-attachments/assets/a910af1e-c6da-4a15-8d6e-e2c723468bc8)

---
