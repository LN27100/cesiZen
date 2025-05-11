<template>
  <h1>Vos favoris</h1>
  <div class="favoris-container">
    <div v-if="favorites.length === 0" class="no-favorites">
      <p>Aucun favori trouvé</p>
    </div>
    <div v-else>
      <div v-for="favorite in favorites" :key="favorite.id_favori" class="favorite-item">
        <p @click="goToActivity(favorite)" class="favorite-name">{{ favorite.nom_activite }}</p>
        <button @click="confirmDelete(favorite.id_favori)" class="delete-button">
          <i class="fas fa-trash-can"></i>
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
      axios.get(`${process.env.VUE_APP_API_URL}/favoris/user`, {
        headers: {
          'x-access-token': token
        }
      })
        .then(response => {
          this.favorites = response.data;
          // Ajout d'un log pour inspecter les données
          this.favorites.forEach(favorite => {
          });
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des favoris:', error);
        });
    },
    goToActivity(favorite) {
      const activityId = favorite.id_activite;
      if (!activityId) {
        console.error("L'ID de l'activité est manquant pour le favori:", favorite);
        return;
      }
      this.$router.push({ path: `/details-activites/${activityId}` })
        .catch(error => {
          console.error('Erreur de navigation:', error);
        });
    },
    confirmDelete(favoriteId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce favori?')) {
        this.deleteFavorite(favoriteId);
      }
    },
    deleteFavorite(favoriteId) {
      const token = localStorage.getItem('token');
      axios.delete(`${process.env.VUE_APP_API_URL}/favoris/${favoriteId}`, {
        headers: {
          'x-access-token': token
        }
      })
        .then(response => {
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
  max-width: 40%;
  width: 100%;
  margin: 2rem auto;
  background-color: #a06db6;
  border: solid 3px #a9b66d;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  text-align: center;
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

.no-favorites {
  font-size: 1.2rem;
  color: #eee;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  background: white;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  color: black;
  transition: transform 0.2s ease-in-out;
}

.favorite-item:hover {
  transform: scale(1.02);
}

.favorite-name {
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.delete-button {
  background-color:#CC0000;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
}

.delete-button:hover {
  background-color: darkred;
}

.delete-button i {
  font-weight: 300; 
}

.favorite-item:hover {
  color: white;
  background-color: #69A050;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .favoris-container {
    max-width: 60%;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .favoris-container {
    max-width: 80%;
  }

  .favorite-item {
    font-size: 1rem;
    padding: 0.6rem;
  }

  .delete-button {
    padding: 6px;
  }
}

@media (max-width: 480px) {
  .favoris-container {
    max-width: 90%;
    padding: 1rem;
  }

  h1 {
    font-size: 32px;
    margin-top: 9rem;
  }

  .favorite-item {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  .delete-button {
    padding: 0.3rem;
  }
}
</style>
