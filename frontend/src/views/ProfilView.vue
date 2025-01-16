<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <div v-if="user" class="profile-details">
      <p><strong>Prénom :</strong> {{ user.prenom }}</p>
      <p><strong>Nom :</strong> {{ user.nom }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Pseudo :</strong> {{ user.pseudo }}</p>
    </div>
    <div v-else class="loading">
      <p>Chargement des informations utilisateur...</p>
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  name: "ProfileView",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Vous devez vous connecter.");
        this.$router.push("/login");
        return;
      }

      if (!userId) {
        alert("Impossible de trouver l'ID utilisateur.");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`/users/${userId}`);
        console.log("Réponse de l'API:", response.data); 
        if (response.data.length > 0) {
          this.user = response.data[0]; 
          console.log("État user mis à jour:", this.user); 
        } else {
          alert("Aucun utilisateur trouvé.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          error
        );
        const message =
          error.response?.data?.message ||
          "Impossible de récupérer les informations utilisateur.";
        alert(message);

        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-details p {
  font-size: 1.1rem;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
