<template>
  <div id="app">
    <!-- Header affiché sur toutes les pages -->
    <Header />

    <!-- Navbar affichée sur toutes les pages -->
    <Navbar />

    <!-- Contenu de la page -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavbarComponent.vue';
import Header from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Header,
  }
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.content {
  margin-top: 8rem;
  margin-bottom: 5rem;
}

@media (min-width: 1024px) {
  .content {
    margin-top: 2rem;
  }
}
</style>
