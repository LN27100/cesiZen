<template>
  <div id="app">
    <!-- Header affiché sur toutes les pages -->
    <Header />

    <!-- Navbar conditionnelle -->
    <component :is="navbarComponent" />

    <!-- Contenu de la page -->
    <div class="content-wrapper">
      <div class="content">
        <router-view />
      </div>
      <!-- Footer affiché sur les versions desktop -->
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Header from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    NavbarAdmin,
    Header,
    FooterComponent,
  },
  data() {
    return {
      userRole: null,
    };
  },
  computed: {
    navbarComponent() {
      return this.userRole === 'Admin' ? 'NavbarAdmin' : 'NavbarComponent';
    },
  },
  created() {
    this.checkUserRole();
  },
  methods: {
    checkUserRole() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          this.userRole = decodedToken.role;
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
        }
      } else {
        this.userRole = null; // Réinitialiser le rôle si aucun token n'est présent
      }
    },
  },
  watch: {
    // Surveiller les changements de route pour mettre à jour le rôle de l'utilisateur
    $route: 'checkUserRole',
  },
};
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .content {
    margin-top: 2rem;
  }
}
</style>
