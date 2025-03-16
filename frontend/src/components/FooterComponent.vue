<template>
    <footer class="footer">
      <div class="footer-container">
        <a class="footer-link" @click="goTo('TermsView')">Conditions générales d'utilisation</a>
        <a class="footer-link" @click="goTo('LegalView')">Mentions légales</a>
        <a class="footer-link" @click="goTo('PrivacyView')">Politique de confidentialité</a>
        <a class="footer-link" @click="goTo('faqsView')">FAQs</a>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
    methods: {
      goTo(page) {
        this.$router.push({ name: page });
      },
    },
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #84B66D;
    padding: 10px 0;
    bottom: 0;
    width: 100%;
    display: none;
    text-align: center;
  }
  
  .footer-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .footer-link {
    color: black;
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    text-decoration: none;
    margin: 0 10px;
    cursor: pointer;
  }
  
  .footer-link:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 1024px) {
    .footer {
      display: block;
    }
  }
  </style>
  