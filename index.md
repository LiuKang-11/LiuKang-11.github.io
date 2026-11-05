---
layout: default
title: "Home"
---

<section class="hero-panel">
  <div class="hero-copy reveal">
    <p class="hero-role">Machine Learning Engineer • Applied AI Builder</p>
    <h1 class="hero-title">Leslie Liu</h1>
    <p class="hero-subtitle">
      I build applied AI systems across RAG, LLM agents, knowledge graphs,
      ML pipelines, and full-stack product prototypes.
    </p>

    <div class="hero-actions">
      <a class="button" href="{{ '/projects' | relative_url }}">View Projects</a>
      <a class="button-secondary" href="{{ '/about' | relative_url }}">About Me</a>
      <a class="button-secondary" href="mailto:s9172051212@gmail.com">Contact</a>
    </div>


  </div>

  <div class="hero-visual reveal">
    <div class="portrait-card">
      <div class="portrait-color portrait-color--blue" aria-hidden="true"></div>
      <div class="portrait-color portrait-color--red" aria-hidden="true"></div>
      <div class="portrait-color portrait-color--yellow" aria-hidden="true"></div>
      <span class="portrait-badge">Open to building practical AI products</span>
      <img src="{{ '/assets/images/selfie3.png' | relative_url }}" alt="Portrait of Leslie Liu" width="534" height="762" fetchpriority="high">
    </div>
  </div>
    <div class="stats-grid">
      <div class="stat-card">
        <strong>AI Systems</strong>
        <span>RAG apps, knowledge graphs, model evaluation, and production-style inference workflows</span>
      </div>
      <div class="stat-card">
        <strong>3rd</strong>
        <span>place at HackNCState with a production-ready crypto reliability scoring product</span>
      </div>
      <div class="stat-card">
        <strong>Cloud + Ship</strong>
        <span>experience with GCP/AWS pipelines, APIs, CI/CD, and deployable AI prototypes</span>
      </div>
    </div>
</section>

<section class="section-panel reveal">
  <div class="section-header">
    <div>
      <span class="section-label">Selected Work</span>
      <h2>selected project</h2>
    </div>
  </div>

  <div class="project-grid">
    <article class="project-card">
      <span class="pill">RAG • Knowledge Graphs</span>
      <h3>Notipala</h3>
      <p>
        A full-stack AI research workspace that turns conversations and files into
        evolving knowledge maps, grounded answers, and reusable research memory.
      </p>
      <div class="pill-row">
        <span class="pill">LLM agents</span>
        <span class="pill">Hybrid retrieval</span>
        <span class="pill">React + Cloud Run</span>
      </div>
      <div class="project-links">
        <a href="{{ '/projects' | relative_url }}#notipala">Read More</a>
        <a href="https://notipala.pages.dev/">App</a>
        <a href="https://www.youtube.com/watch?v=HDfLC3WSvJ8">Demo</a>
      </div>
    </article>

    <article class="project-card">
      <span class="pill">Hackathon • Multi-agent AI</span>
      <h3>BigScore</h3>
      <p>
        A crypto reliability scoring platform that combines multi-source market, development,
        and security signals into an explainable 0-100 trust score.
      </p>
      <div class="pill-row">
        <span class="pill">Agentic workflow</span>
        <span class="pill">Scoring pipeline</span>
        <span class="pill">API-backed UI</span>
      </div>
      <div class="project-links">
        <a href="{{ '/projects' | relative_url }}#bigscore">Read More</a>
      </div>
    </article>

    <article class="project-card">
      <span class="pill">Materials ML</span>
      <h3>Thermoplastic Elastomer Predictor</h3>
      <p>
        Forward and inverse ML models for polymer stress-strain prediction, paired with
        Bayesian optimization to guide performance-oriented material design.
      </p>
      <div class="pill-row">
        <span class="pill">Scientific ML</span>
        <span class="pill">Bayesian optimization</span>
        <span class="pill">Inverse design</span>
      </div>
      <div class="project-links">
        <a href="{{ '/projects' | relative_url }}#thermoplastic">Read More</a>
      </div>
    </article>

  </div>
</section>

<section class="section-panel skills-panel reveal">
  <div class="section-header">
    <div>
      <span class="section-label">Skills</span>
      <h2>Technical Skills</h2>
    </div>
    
  </div>

  <div class="skills-list">
    <div class="skill-row">
      <span class="skill-label">Languages</span>
      <span class="skill-values">Python, C/C++, Java, SQL, R, Matlab, JavaScript/TypeScript</span>
    </div>
    <div class="skill-row">
      <span class="skill-label">Machine Learning</span>
      <span class="skill-values">PyTorch, TensorFlow, scikit-learn, RAG, LLM agents, knowledge graphs, vector/hybrid search, reranking, LLM evaluation, Bayesian optimization</span>
    </div>
    <div class="skill-row">
      <span class="skill-label">MLOps & Systems</span>
      <span class="skill-values">Docker, Airflow, GitHub Actions, DVC, CI/CD, experiment tracking, model serving, monitoring</span>
    </div>
    <div class="skill-row">
      <span class="skill-label">Cloud & Full-Stack</span>
      <span class="skill-values">GCP, Cloud Run, BigQuery, Cloud Composer, AWS Lambda, S3, AWS CDK, React, FastAPI, MySQL, PostgreSQL, ChromaDB</span>
    </div>
    <div class="skill-row">
      <span class="skill-label">Data & Scientific Computing</span>
      <span class="skill-values">Pandas, NumPy, data analysis, visualization, scientific modeling, experimentation workflows</span>
    </div>
  </div>
</section>

<section class="section-panel contact-panel reveal" id="contact">
  <div class="section-header">
    <h2>Contact</h2>
  </div>

  <div class="contact-grid">
    <article class="contact-card">
      <h3>Email</h3>
      <p><a href="mailto:s9172051212@gmail.com">s9172051212@gmail.com</a></p>
    </article>
    <article class="contact-card">
      <h3>GitHub</h3>
      <p><a href="https://github.com/LiuKang-11">github.com/LiuKang-11</a></p>
    </article>
    <article class="contact-card">
      <h3>Resume</h3>
      <p><a href="https://drive.google.com/drive/folders/1c9TB_iGpKQIuBhPy9GeznBRWCzmMFXTM?usp=sharing">View Resume Folder</a></p>
    </article>
  </div>
</section>
