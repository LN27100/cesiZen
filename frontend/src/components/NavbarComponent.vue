<template>
  <div>
    <!-- Navbar pour les écrans de bureau -->
    <nav class="navbar navbar-expand-lg desktop-navbar">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item3 first-nav-item nav-item-margin">
              <a class="nav-link active" aria-current="page" href="#" @click.prevent="goTo('HomeView')">Accueil</a>
            </li>
            <li class="nav-item3 dropdown nav-item-margin">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Activitiés
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click.prevent="goTo('CategoriesView')">Activités détente</a></li>
                <li><a class="dropdown-item disabled" href="#">Exercices de respiration</a></li>
              </ul>
            </li>
            <li class="nav-item3 nav-item-margin">
              <a class="nav-link" href="#" @click.prevent="goTo('Info')">Informations santé</a>
            </li>
            <li class="nav-item3 dropdown nav-item-margin">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Utilisateur
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click.prevent="goTo('Profil')">Profil</a></li>
                <li><a class="dropdown-item disabled" href="#">Tracker d'émotions</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="goTo('FavorisView')">Vos favoris</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="goTo('Parametres')">Paramètres</a></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="isLoggedIn ? logout() : goTo('LoginView')">
                    {{ isLoggedIn ? 'Déconnexion' : 'Connexion' }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Navbar pour les écrans mobiles -->
    <div class="mobile-navbar">
      <div class="nav-item2">
        <img src="@/assets/icones/diagnosis.png" alt="Diagnostic" class="nav-icon" />
      </div>
      <div class="nav-item" @click="goTo('ActivitiesView')">
        <img src="@/assets/icones/detente_blanc.png" alt="Activities" class="nav-icon2" />
      </div>
      <div class="nav-item" @click="goTo('HomeView')">
        <img src="@/assets/icones/home_blanc.png" alt="Accueil" class="nav-icon" />
      </div>
      <div class="nav-item" @click="goTo('Info')">
        <img src="@/assets/icones/book_info.png" alt="Info" class="nav-icon" />
      </div>
      <div class="nav-item" @click="goTo('Users')">
        <img src="@/assets/icones/user.png" alt="Utilisateur" class="nav-icon3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
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

      // Réinitialise le rôle dans le composant App
      this.$parent.checkUserRole();

      // Redirige vers la page de connexion
      this.$router.push({ name: 'LoginView' });
    },
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    },
  },
  watch: {
    // Surveille les changements de route pour mettre à jour le statut de connexion
    $route: 'checkLoginStatus',
  },
};
</script>

<style scoped>
.navbar {
  background-color: #84B66D;
}

.desktop-navbar {
  display: none;
}

.mobile-navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #A06DB6;
  padding: 10px 0;
  z-index: 1000;
  margin-left: -8px;
  font-family: 'Open Sans', sans-serif;
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

.nav-item2 {
  display: flex;
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  background-color: rgb(198, 191, 191);
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.nav-item3 {
  display: flex;
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

.nav-icon2 {
  width: 55px;
  height: 55px;
}

.nav-icon3 {
  width: 45px;
  height: 45px;
}

.nav-item span {
  display: block;
  font-size: 14px;
  color: white;
}

@media (min-width: 1024px) {
  .desktop-navbar {
    display: block;
    position: static;
    margin-top: 100px;
  }

  .mobile-navbar {
    display: none;
  }

  .first-nav-item {
    margin-left: 15rem;
  }

  .nav-item-margin {
    margin-right: 2rem;
  }

  .dropdown-item.disabled {
    pointer-events: none; /* Désactive les interactions de la souris */
    opacity: 0.65; /* Rend l'élément légèrement transparent pour indiquer qu'il est désactivé */
  }
}
</style>
