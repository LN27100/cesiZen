<template>
  <div>
    <nav class="navbar navbar-expand-lg desktop-navbar">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item3 first-nav-item nav-item-margin">
              <a class="nav-link active" aria-current="page" href="#" @click.prevent="goTo('DashboardAdmin')">Dashboard</a>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="goTo('UserManagementAdmin')">Gestion Utilisateurs</a>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="goTo('InfosManagementAdmin')">Gestion Informations</a>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="goTo('ActivitiesManagementAdmin')">Gestion Activités</a>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="goTo('ProfilAdmin')">Profil</a>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="logout">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarAdmin",
  mounted() {
    console.log('NavbarAdmin component mounted');
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    logout() {
      // Supprimer le token du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');

      // Rediriger vers la page de connexion
      this.$router.push({ name: 'LoginView' });
    },
  },
};
</script>

<style scoped>
/* Styles pour les mobiles */
.navbar {
  background-color: #84B66D;
  margin-top: 7.5rem;
}

.nav-item {
  display: flex;
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  background-color: #84B66D;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #69A050;
}

.nav-icon {
  width: 47px;
  height: 47px;
}

.nav-item span {
  display: block;
  font-size: 14px;
  color: white;
}

/* Styles pour les tablettes */
@media (min-width: 768px) {
  .navbar {
    margin-top: 8.7rem; 
  }

  .desktop-navbar {
    display: block;
  }
}

/* Styles pour ordi bureaux */
@media (min-width: 1024px) {
  .navbar {
    margin-top: 6.2rem;
  }

  .desktop-navbar {
    display: block; 
  }
}
</style>
