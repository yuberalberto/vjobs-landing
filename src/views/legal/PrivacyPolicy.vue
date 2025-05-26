<template>
  <article class="legal-document">
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last updated: May 26, 2024</p>
    
    <section>
      <h2>1. Introduction</h2>
      <p>At VJobs, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
    </section>
    
    <section>
      <h2>2. Information We Collect</h2>
      <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
      <ul>
        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
        <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
      </ul>
    </section>
    
    <section>
      <h2>3. How We Use Your Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>To register you as a new customer</li>
        <li>To process and deliver your requests</li>
        <li>To manage our relationship with you</li>
        <li>To improve our website, products/services, marketing, or customer relationships</li>
        <li>To recommend products or services that may be of interest to you</li>
      </ul>
    </section>
    
    <section>
      <h2>4. Data Security</h2>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.</p>
    </section>
    
    <section>
      <h2>5. Your Legal Rights</h2>
      <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
      <ul>
        <li>Request access to your personal data</li>
        <li>Request correction of your personal data</li>
        <li>Request erasure of your personal data</li>
        <li>Object to processing of your personal data</li>
        <li>Request restriction of processing your personal data</li>
        <li>Request transfer of your personal data</li>
        <li>Right to withdraw consent</li>
      </ul>
    </section>
    
    <section>
      <h2>6. Contact Us</h2>
      <p>If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@vjobs.ca</p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  mounted() {
    document.title = 'Privacy Policy | VJobs';
  }
}
</script>

<style scoped>
.legal-document {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.last-updated {
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
}

h2 {
  color: var(--primary-color);
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
}

p, li {
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

li {
  margin-bottom: 0.5rem;
}

strong {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .legal-document {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
}
</style>
