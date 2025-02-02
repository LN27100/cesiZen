<template>
  <div class="favoris-container">
    <h1>Vos favoris</h1>
    <div v-if="favorites.length === 0" class="no-favorites">
      <p>Aucun favori trouvé</p>
    </div>
    <div v-else>
      <div v-for="favorite in favorites" :key="favorite.id_favori" class="favorite-item">
        <p @click="goToActivity(favorite.id_activite)" class="favorite-name">{{ favorite.nom_activite }}</p>
        <button @click="confirmDelete(favorite.id_favori)" class="delete-button">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FavorisView',
  data() {
    return {
      favorites: []
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    fetchFavorites() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/api/favoris/user', {
        headers: {
          'x-access-token': token
        }
      })
        .then(response => {
          console.log('Favoris récupérés:', response.data);
          this.favorites = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des favoris:', error);
        });
    },
    goToActivity(activityId) {
      if (!activityId) {
        console.error("L'ID de l'activité est manquant !");
        return;
      }
      this.$router.push({ path: `/details-activites/${activityId}` });
    },
    confirmDelete(favoriteId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce favori?')) {
        this.deleteFavorite(favoriteId);
      }
    },
    deleteFavorite(favoriteId) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/api/favoris/${favoriteId}`, {
        headers: {
          'x-access-token': token
        }
      })
        .then(response => {
          console.log('Favori supprimé:', response.data);
          this.fetchFavorites(); // Recharge les favoris après suppression
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du favori:', error);
        });
    }
  }
};
</script>

<style scoped>
.favoris-container {
  max-width: 30%;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 3px #a9b66d;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  color: white;
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 24px;
  text-align: center;
  margin-bottom: 1rem;
}

.no-favorites {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #888;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  color: black;
}

.favorite-name {
  cursor: pointer;
}

.delete-button {
  background-color: red;
  border-radius: 5px;
  color: white;
  padding: 5px 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.delete-button i {
  font-size: 1rem;
}
</style>
