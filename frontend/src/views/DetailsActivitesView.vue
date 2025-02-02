<template>
  <div class="activity-details" v-if="activity">
    <div class="header-container">
      <button class="back-button" @click="goBack">
        <img src="@/assets/icones/back.png" alt="Retour" />
      </button>
      <h1>{{ activity.nom_activite }}</h1>
      <button class="favorite-button" @click="addToFavorites">
        <img src="@/assets/icones/heart.png" alt="Ajouter aux favoris" />
      </button>
    </div>
    
    <p>Durée: {{ activity.duree_minutes }} minutes</p>
    <p>{{ activity.description_activite }}</p>
    <img v-if="activity.nom_image" :src="getImagePath(activity.nom_image)" :alt="activity.nom_activite" class="activity-image">
    
    <div v-if="activity.lien_video" class="video-container">
      <iframe :src="activity.lien_video" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'DetailsActivitesView',
  data() {
    return {
      activity: null
    };
  },
  created() {
    this.fetchActivityDetails();
  },
  methods: {
    fetchActivityDetails() {
      const activityId = this.$route.params.id;
      if (activityId) {
        axios.get(`http://localhost:3000/api/activities/${activityId}`)
          .then(response => {
            console.log('API Response:', response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
              this.activity = response.data[0];
            } else {
              this.activity = response.data;
            }
          })
          .catch(error => {
            console.error('Error fetching activity details:', error);
          });
      } else {
        console.error('ID de l\'activité manquant');
      }
    },
    getImagePath(imageName) {
      return require(`@/assets/images/${imageName}`);
    },
    goBack() {
      this.$router.push({ name: 'CategoriesView' });
    },
    addToFavorites() {
  const favorite = {
    id_activite: this.activity.id_activite,
    id_exercice: null
  };

  axios.get('http://localhost:3000/api/favoris')
    .then(response => {
      const favoris = response.data;
      const alreadyAdded = favoris.some(fav => fav.id_activite === this.activity.id_activite);

      if (alreadyAdded) {
        alert('Vous avez déjà ajouté cette activité à vos favoris');
      } else {
        axios.post('http://localhost:3000/api/favoris', favorite)
          .then(() => {
            alert('Activité ajoutée aux favoris');
          })
          .catch(error => {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
            alert('Erreur lors de l\'ajout aux favoris');
          });
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des favoris:', error);
    });
}
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activity-details {
  text-align: center;
  margin-top: 50px;
  padding: 0 1rem;
  font-family: 'Open Sans', sans-serif;
  position: relative;
}

/* Conteneur boutons */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Bouton Retour */
.back-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.back-button img {
  width: 2.5rem;
  height: 2.5rem;
  background-color: #a9b66d;
  border-radius: 50%;
  padding: 0.3rem;
}

/* Bouton Favoris */
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.favorite-button img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  padding: 0.3rem;
}

h1 {
  font-size: 2.2rem;
  color: black;
  font-family: "Nunito", sans-serif;
  margin-top: 1rem;
  word-wrap: break-word;
  max-width: 90%;
  margin-left: 2rem;
  margin-right: 2rem;
}

p {
  font-size: 1.2rem;
  margin: 1rem 0;
}

/* Images et vidéos */
.activity-image,
.video-container {
  max-width: 100%;
  height: auto;
  margin-top: 2rem;
}

.video-container iframe {
  width: 100%;
  height: 315px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header-container {
    max-width: 100%;
    padding: 0 1rem;
  }

  h1 {
    font-size: 1.8rem;
    max-width: 100%;
  }

  .back-button img,
  .favorite-button img {
    width: 2rem;
    height: 2rem;
    padding: 0.2rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    font-size: 1.6rem;
  }

  .back-button img,
  .favorite-button img {
    width: 2.2rem;
    height: 2.2rem;
  }
}

</style>
