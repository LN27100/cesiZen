<template>
      <h1>Vos favoris</h1>

  <div class="favoris-container">
    <div v-if="favorites.length === 0" class="no-favorites">
      <p>Aucun favori trouvé</p>
    </div>
    <div v-else>
      <div v-for="favorite in favorites" :key="favorite.id_favori" class="favorite-item">
        <p @click="goToActivity(favorite.id_activite)" class="favorite-name">{{ favorite.nom_activite }}</p>
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
  padding: 8px 10px;
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
    padding: 5px;
  }
}
</style>
