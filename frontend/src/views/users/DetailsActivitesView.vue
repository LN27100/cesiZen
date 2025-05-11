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
    <img v-if="activity.nom_image_2" :src="getImagePath(activity.nom_image_2)" :alt="activity.nom_activite" class="activity-image">

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
        axios.get(`${process.env.VUE_APP_API_URL}/activities/${activityId}`)
          .then(response => {
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

  axios.get(`${process.env.VUE_APP_API_URL}/favoris/user`) // <-- récupère SEULEMENT les favoris du user connecté
    .then(response => {
      const favoris = response.data;
      const alreadyAdded = favoris.some(fav => fav.id_activite === this.activity.id_activite);

      if (alreadyAdded) {
        alert('Vous avez déjà ajouté cette activité à vos favoris');
      } else {
        axios.post(`${process.env.VUE_APP_API_URL}/favoris`, favorite)
          .then(() => {
            alert('Activité ajoutée aux favoris');
          })
          .catch(error => {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
            alert('Vous devez être connecté pour ajouter aux favoris !');
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
  margin-top: 1rem;
  padding: 0 1rem;
  font-family: 'Open Sans', sans-serif;
  position: relative;
}

.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.back-button img {
  width: 2rem;
  height: 2rem;
  background-color: #A9B66D;
  border-radius: 50%;
  padding: 0.3rem;
}

.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.favorite-button img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

h1 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #000000;
  font-family: "Nunito", sans-serif;
  margin-top: 12rem;
  word-wrap: break-word;
  max-width: 90%;
}

p {
  font-size: 1.2rem;
  margin: 1rem 0;
  font-family: "Open Sans", sans-serif;
}

.activity-image,
.video-container {
  max-width: 100%;
  height: auto;
  margin-top: 2rem;
  margin-bottom:4rem;
}

.video-container iframe {
  width: 100%;
  height: 20rem;
}

/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .header-container {
    margin-top: 5rem;
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    font-size: 1.8rem;
  }

  .back-button img,
  .favorite-button img {
    width: 2rem;
    height: 2rem;
    padding: 0.2rem;
  }

  .activity-image,
.video-container {
  max-width: 90%;
  height: auto;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom:4rem;
}

.video-container iframe {
  width: 100%;
  height: 30rem;
}
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  h1 {
    font-size: 1.6rem;
  }

  .back-button img,
  .favorite-button img {
    width: 2.2rem;
    height: 2.2rem;
  }

  .header-container {
    justify-content: space-between; 
  }

  .back-button,
  .favorite-button {
    margin-top: 0.5rem; 
  }

  .back-button {
    margin-right: 1rem; 
  }

  .favorite-button {
    margin-left: 1rem; 
  }
  .activity-image,
.video-container {
  max-width: 70%;
  height: auto;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom:4rem;
}

.video-container iframe {
  width: 100%;
  height: 40rem;
}
}

</style>
