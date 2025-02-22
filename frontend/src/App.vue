<template>
  <div id="app">
    <!-- Header affiché sur toutes les pages -->
    <Header />

    <!-- Navbar conditionnelle -->
    <component :is="navbarComponent" />

    <!-- Contenu de la page -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import Header from './components/HeaderComponent.vue';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    NavbarAdmin,
    Header,
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
        const decodedToken = jwtDecode(token);
        this.userRole = decodedToken.role;
      }
    },
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
