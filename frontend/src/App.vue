<template>
  <div id="app">
    <!-- Header affiché sur toutes les pages -->
    <Header />

    <!-- Navbar affichée en fonction du rôle de l'utilisateur -->
    <component :is="navbarComponent" />

    <!-- Contenu de la page -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Header from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    NavbarAdmin,
    Header,
  },
  data() {
    return {
      navbarComponent: null,
    };
  },
  async created() {
    this.NavbarComponent = markRaw((await import('./components/NavbarComponent.vue')).default);
    this.NavbarAdmin = markRaw((await import('./components/NavbarAdmin.vue')).default);
    this.checkUserAuthentication();
  },
  methods: {
    checkUserAuthentication() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');


      if (token) {
        if (role === 'Admin') {
          console.log('Admin detected, setting NavbarAdmin');
          this.navbarComponent = this.NavbarAdmin; // Affiche la Navbar pour les admins
        } else {
          console.log('User detected, setting NavbarComponent');
          this.navbarComponent = this.NavbarComponent;  // Affiche la Navbar pour les utilisateurs
        }
      } else {
        console.log('No token, setting NavbarComponent');
        this.navbarComponent = this.NavbarComponent;  // Affiche la Navbar pour les utilisateurs
      }
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.checkUserAuthentication();
      this.$router.push('/');
    }
  },
  watch: {
    '$route'() {
      this.checkUserAuthentication();
    }
  }
};
</script>


<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
