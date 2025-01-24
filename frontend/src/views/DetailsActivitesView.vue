<template>
    <div class="activity-details" v-if="activity">
      <h1>{{ activity.nom_activite }}</h1>
      <p>Durée: {{ activity.duree_minutes }} minutes</p>
      <p>{{ activity.description_activite }}</p>
      <img v-if="activity.image" :src="activity.image" :alt="activity.nom_activite" class="activity-image">
      <video v-if="activity.video" :src="activity.video" controls class="activity-video"></video>
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
            console.error('Erreur lors de la récupération des détails de l\'activité:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Import de la police Nunito */
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");
  
  .activity-details {
    text-align: center;
    margin-top: 50px;
    padding: 0 1rem;
    font-family: 'Open Sans', sans-serif;
  }
  
  h1 {
    font-size: 2.5rem;
    color: black;
    font-family: "Nunito", sans-serif;
  }
  
  p {
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  
  .activity-image,
  .activity-video {
    max-width: 100%;
    height: auto;
    margin-top: 2rem;
  }
  </style>
  