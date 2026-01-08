<template>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <h2>What Our Users Say</h2>
      <p class="section-subtitle">Success stories from job seekers and employers</p>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-content">
            <p>"VJobs helped me find my dream job in tech. The platform is intuitive and the job matching is spot on!"</p>
          </div>
          <div class="testimonial-author">
            <img src="https://picsum.photos/seed/sarah/60/60.jpg" alt="Sarah Johnson" />
            <div class="author-info">
              <h4>Sarah Johnson</h4>
              <p>Software Engineer</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <p>"As a hiring manager, I've found exceptional talent through VJobs. The quality of candidates is outstanding."</p>
          </div>
          <div class="testimonial-author">
            <img src="https://picsum.photos/seed/michael/60/60.jpg" alt="Michael Chen" />
            <div class="author-info">
              <h4>Michael Chen</h4>
              <p>HR Director</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-content">
            <p>"The career coaching feature helped me transition into a new industry. Highly recommended!"</p>
          </div>
          <div class="testimonial-author">
            <img src="https://picsum.photos/seed/emily/60/60.jpg" alt="Emily Rodriguez" />
            <div class="author-info">
              <h4>Emily Rodriguez</h4>
              <p>Marketing Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
.testimonials {
  padding: 6rem 0;
  background-color: #f8f9fa;
}

.testimonials h2 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 4rem;
  font-size: 1.2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info h4 {
  color: var(--secondary-color);
  margin-bottom: 0.25rem;
}

.author-info p {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style> 