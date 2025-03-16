<template>
  <div class="settings">
    <h1>Paramètres</h1>
  </div>

  <div class="button-container">
    <button class="terms-button" @click="goTo('TermsView')">
      <span>Conditions générales d'utilisation</span>
      <img src="../assets/icones/terms.png" alt="icone conditions générales" />
    </button>
    <button class="legal-button" @click="goTo('LegalView')">
      <span>Mentions légales</span>
      <img src="../assets/icones/legal.png" alt="icone mentions légales" />
    </button>
    <button class="privacy-button" @click="goTo('PrivacyView')">
      <span>Politique de confidentialité</span>
      <img src="../assets/icones/privacy.png" alt="icone politique de confidentialité" />
    </button>
    <button class="faqs-button" @click="goTo('faqsView')">
      <span>FAQs</span>
      <img src="../assets/icones/help.png" alt="icone faqs" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ParametresView',
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
  },
};
</script>

<style scoped>
.settings {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  font-family: "Nunito", sans-serif;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  height: 5rem;
  width: 15rem;
  background-color: #84B66D;
  border: solid 1px #FFFFFF;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  position: relative;
}

button:hover {
  background-color: #69A050;
}

button img {
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: 1rem;
}

button span {
  flex: 1;
  text-align: center;
  margin-right: 3rem;
}

button:disabled {
  background-color: #CCC;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #CCC;
}

@media (min-width: 1024px) {
  .button-container {
    display: none;
  }
}
</style>
