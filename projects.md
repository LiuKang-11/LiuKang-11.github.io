---
layout: default
title: "Projects"
permalink: /projects/
---

# My Projects

---

## Project 1: Crypto Reliability Tracker (BigScore)
### Description
- **Built an end-to-end crypto reliability scoring service** that aggregates multi-source signals (market integrity, dev velocity, on-chain security) into a calibrated 0–100 master score with per-component rationales.
- **Implemented a multi-agent orchestrated scoring pipeline** (data fetch → schema normalization → subscore inference → weighted aggregation).
- **Deployed an API-backed UI** to score user-queried assets in real time; added fallbacks for non-EVM tokens and common data/infra failure cases.
- **Won 3rd place at HackNCState (Agency Track).**

Links:
- [GitHub repo](https://github.com/LiuKang-11/NChack_2026_BigScore)
- [Devpost](https://devpost.com/software/big-score-17u35c?ref_content=my-projects-tab&ref_feature=my_projects)

### Workflow
![BigScore Workflow](/assets/images/nchack_workflow.jpg)

### App Demo (YouTube)
<div style="max-width:600px">
  <iframe
    width="600"
    height="338"
    src="https://www.youtube.com/embed/JOYqxBs6asM"
    title="BigScore App Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

---

## Project 2: Thermoplastic Elastomer ML Predictor
### Description
- **ML Prediction:** Predict stress-strain curves from triblock copolymer parameters.
- **Bayesian Optimization:** Integrate Bayesian optimization for process improvement.
- **Simulation Data:** Link molecular chain length, monomer volume ratio, and irregular chain ratios with stress-strain behavior.
- **Modeling Framework:** Build forward and inverse models to enhance material performance predictions.

Link:
- [GitHub repo](https://github.com/LiuKang-11/Thermoplastic-Elastomer-inverse-design)

### Forward Prediction Demo
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/thermo1.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

### Inverse Design Demo
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/thermo2.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

---

## Project 3: CAE (CNN Autoencoder) Model for TSE (Twin Screw Extruder)
### Description
- Applied machine learning techniques to monitor and optimize the twin screw extruder process.
- Developed a **Convolutional Autoencoder Model** to analyze and reconstruct screw elements effectively.
- Utilized **Principal Component Analysis (PCA)** for visualizing encoded features of twin screw elements.

Link:
- [GitHub repo](https://github.com/LiuKang-11/CAE-model-for-twin-screw-process)

### Model Architecture
![CAE Architecture](https://user-images.githubusercontent.com/13636671/128841487-128e2580-7fa1-4dd5-9273-99b901ac9766.png)

### Results
> Visualizations include screw-image reconstruction, regression loss, and PCA-based clustering.

**Reconstruction**
![Reconstruction](https://user-images.githubusercontent.com/13636671/128842031-ee18f944-3665-4954-9fe2-ae2f4d85b6d3.png)

**Regression**
![Regression 1](https://user-images.githubusercontent.com/13636671/128842140-2793a577-1fca-4d76-a85c-2b29ebab2c5d.png)

![Regression 2](https://user-images.githubusercontent.com/13636671/128842154-ad8e8564-a1fd-4ac0-a6fb-ae18a48fd0bc.png)

**PCA Analysis**
![PCA](https://user-images.githubusercontent.com/13636671/128842304-a3f2ae84-4382-4345-a845-9340e007723b.png)

---

## Project 4: Game AI Design
### Description
- Implement basic AI behavior in games (orientation, evade, etc.).
- Implement path-finding algorithms **(Dijkstra and A\*)** for AI characters.
- Develop multi-agent AI with **reinforcement learning (RL)**.

Links:
- [GitHub repo (CSC584)](https://github.com/LiuKang-11/CSC584)
- [GitHub repo (Deadzone DQN)](https://github.com/LiuKang-11/Deadzone---DQN-AI-agent-for-2D-shooting-Game)

### DeadZone Demo
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/Deadzone_complete_game.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

### Flock Demo
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/HW2_Part4%20Video.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

### Path Finding Demo
<video width="600" controls>
  <source src="https://liukang-11.github.io/assets/videos/HW3.mp4" type="video/mp4">
  Your browser does not support video playback.
</video>

> If your original files are `.mov`, consider converting to `.mp4` (H.264) for the best browser compatibility.

---

## Project 5: NASA Close Approach ML Analysis
### Description
- **Objective:** Analyze Near-Earth Objects (NEOs) using NASA JPL data + real-time CAD API, and assess impact risks / trajectories.
- **Methodology:**
  - Merge CSV dataset with NASA JPL API data; clean duplicates/missing values; normalize numeric features.
  - EDA on feature distributions (distance, velocity, absolute magnitude).
  - **K-Means** clustering (2 clusters; choose via silhouette score).
  - **KNN** classification with 99% accuracy on normalized features.
  - **PCA** for dimensionality reduction and visualization.

Link:
- [GitHub repo](https://github.com/LiuKang-11/NASA-close-ML-Analysis)

### Workflow
![NASA Workflow](https://github.com/user-attachments/assets/a910af1e-c6da-4a15-8d6e-e2c723468bc8)
