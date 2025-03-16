<template>
  <div>
    <h1>Dashboard avec stats</h1>
    <div class="card">
      <h2>Nombre d'utilisateurs</h2>
      <p>{{ userCount }}</p>
    </div>
    <div class="card">
      <h2>Nombre d'activités</h2>
      <p>{{ activityCount }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "DashboardAdmin",
  data() {
    return {
      userCount: 0,
      activityCount: 0
    };
  },
  created() {
    this.fetchUserCount();
  },
  methods: {
    async fetchUserCount() {
      try {
        const token = localStorage.getItem("token"); // Récupère le token stocké
        if (!token) {
          console.error("Aucun token trouvé, l'utilisateur doit se connecter.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/users/count", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.userCount = response.data.userCount;
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
      }
    }
  }
};

</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
