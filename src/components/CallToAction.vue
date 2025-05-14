<template>
  <section class="cta">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to Find Your Dream Job?</h2>
        <p>Join thousands of professionals who have already found their perfect match on VJobs</p>
        <div class="cta-buttons">
          <router-link to="/register" class="btn btn-large">Get Started</router-link>
          <router-link to="/jobs" class="btn btn-outline btn-large">Browse Jobs</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, #2c3e50 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background-color: white;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style> 