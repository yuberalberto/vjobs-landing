<template>
  <section class="about" id="about">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2>About Me</h2>
          <p class="subtitle">Your trusted partner in career growth</p>
          <p class="description">
            At VJobs, we're dedicated to connecting talented professionals with their dream opportunities. 
            Our platform combines cutting-edge technology with personalized service to make job searching 
            and hiring more efficient and effective.
          </p>
          <div class="stats">
            <div class="stat-item">
              <h3>10K+</h3>
              <p>Active Jobs</p>
            </div>
            <div class="stat-item">
              <h3>5K+</h3>
              <p>Companies</p>
            </div>
            <div class="stat-item">
              <h3>50K+</h3>
              <p>Job Seekers</p>
            </div>
          </div>
        </div>
        <div class="about-image">
          <img src="../assets/aboutme_img.PNG" alt="About VJobs" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.about {
  padding: 6rem 0;
  background: linear-gradient(
    to bottom,
    var(--background-color) 0%,
    var(--background-color) 100%
  );
  position: relative;
  z-index: 1;
  margin-top: 0;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-item p {
  color: #666;
}

.about-image img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .stats {
    justify-content: center;
  }

  .about-image {
    order: -1;
  }
}
</style> 