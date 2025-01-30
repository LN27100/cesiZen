<template>
  <div class="profile">
    <h1>Nom utilisateur</h1>
  </div>

  <div class="button-container">
    <button class="profile-button" @click="goTo('Profil')">
      <span>Votre profil</span>
      <img src="../assets/icones/setting_profil.png" alt="icone profil" />
    </button>
    <button class="emotion-tracker-button" disabled>
      <span>Tracker d'émotions</span>
      <img src="../assets/icones/tracker_emo_blanc.png" alt="icone tracker émotions" />
    </button>
    <button class="progress-button" @click="goTo('FavorisView')">
      <span>Favoris</span>
      <img src="../assets/icones/favoris.png" alt="icone favoris" />
    </button>
    <button class="settings-button" @click="goTo('Parametres')">
      <span>Paramètres</span>
      <img src="../assets/icones/parametres.png" alt="icone paramètres" />
    </button>
    <button class="logout-button" @click="toggleLogin">
      <span>{{ isLoggedIn ? 'Déconnexion' : 'Connexion/Inscription' }}</span>
      <img src="../assets/icones/deconnexion.png" alt="icone connexion" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      isLoggedIn: false // Initialisez l'état de connexion à false
    };
  },
  methods: {
    goTo(page) {
      this.$router.push({ name: page });
    },
    toggleLogin() {
      if (this.isLoggedIn) {
        // Logique de déconnexion
        this.isLoggedIn = false;
        localStorage.removeItem('token');
        this.$router.push({ name: 'HomeView' });
      } else {
        // Logique de connexion
        this.$router.push({ name: 'LoginView' });
      }
    }
  },
  created() {
    // Vérifiez si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
    }
  }
};
</script>

<style scoped>
.profile {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: black;
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
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  font-size: 16px;
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
  background-color: #ccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #ccc;
}
</style>
