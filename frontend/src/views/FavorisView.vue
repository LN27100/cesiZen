<template>
  <div class="favoris">
    <h1>Vos favoris</h1>
    <div v-if="favorites.length === 0" class="no-favorites">
      <p>Aucun favori trouvé</p>
    </div>
    <div v-else>
      <div v-for="favorite in favorites" :key="favorite.id_favori" class="favorite-item">
        <p>{{ favorite.id_activite }}</p>
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
          Authorization: token
        }
      })
        .then(response => {
          this.favorites = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des favoris:', error);
        });
    }
  }
};
</script>

<style scoped>
.favoris {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: #333;
}

.no-favorites {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #888;
}

.favorite-item {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
}
</style>
