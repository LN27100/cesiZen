<template>
  <div class="activities">
    <img :src="iconPath" alt="icone activités détente" class="icone">
    <h1>{{ categoryName }}</h1>
    <button class="back-button" @click="goBack">
      <img src="@/assets/icones/back.png" alt="Retour" />
    </button>
    <div class="filter-bar">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input v-model="searchQuery" placeholder="Rechercher..." class="search-input" />
      </div>
      <select v-model="selectedSubCategory" class="filter-select">
        <option value="">Toutes les sous-catégories</option>
        <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">
          {{ subCategory }}
        </option>
      </select>
      <select v-model="selectedDuration" class="filter-select">
        <option value="">Toutes les durées</option>
        <option v-for="duration in durations" :key="duration" :value="duration">
          {{ duration }} minutes
        </option>
      </select>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <div v-if="filteredActivities.length === 0" class="no-results">
          <p>Aucun résultat</p>
        </div>
        <div v-for="activity in filteredActivities" :key="activity.id_activite" class="activity-card" @click="viewDetails(activity.id_activite)">
          <h3>{{ activity.nom_activite }}</h3>
          <p>Durée: {{ activity.duree_minutes }} minutes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ActivitesDetenteView',
  data() {
    return {
      categoryName: '',
      activities: [],
      searchQuery: '',
      selectedSubCategory: '',
      selectedDuration: '',
      subCategories: [],
      durations: []
    };
  },
  created() {
    this.categoryName = this.$route.params.category;
    this.fetchActivities();
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => {
        const matchesSearch = activity.nom_activite.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSubCategory = this.selectedSubCategory ? activity.sous_categorie === this.selectedSubCategory : true;
        const matchesDuration = this.selectedDuration ? activity.duree_minutes === parseInt(this.selectedDuration) : true;
        return matchesSearch && matchesSubCategory && matchesDuration;
      });
    },
    iconPath() {
      switch (this.categoryName) {
        case 'Mandalas':
          return require('@/assets/icones/mandala_noir.png');
        case 'Relaxation sonore':
          return require('@/assets/icones/relaxation_sonore_noir.png');
        case 'Méditations':
          return require('@/assets/icones/meditation_noir.png');
        case 'Étirements doux':
          return require('@/assets/icones/etirements_doux_noir.png');
        case 'Activités expressives':
          return require('@/assets/icones/activites_expressives_noir.png');
        default:
          return require('@/assets/icones/mandala_noir.png');
      }
    }
  },
  methods: {
    fetchActivities() {
      const categoryId = this.$route.params.id;
      axios.get(`http://localhost:3000/api/activities/category/${categoryId}`)
        .then(response => {
          this.activities = response.data;
          this.subCategories = [...new Set(this.activities.map(activity => activity.sous_categorie))];
          this.durations = [...new Set(this.activities.map(activity => activity.duree_minutes))];
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des activités:', error);
        });
    },
    goBack() {
      this.$router.push({ name: 'CategoriesView' });
    },
    viewDetails(activityId) {
      this.$router.push({ name: 'DetailsActivitesView', params: { id: activityId } });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activities {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  font-family: "Nunito", sans-serif;
}

.filter-bar {
  background-color: #8850A1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border: solid 2px #A9B66D;
  border-radius: 4px;
  width: 90%;
  margin: 0 auto;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #CCC;
}

.search-input {
  padding: 0.5rem 0.5rem 0.5rem 30px;
  width: 100%;
  border: 1px solid #CCC;
  border-radius: 4px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.filter-select {
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #CCC;
  border-radius: 4px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.card {
  max-width: 90%;
  margin: 20px auto;
  background-color: #A06DB6;
  border: solid 2px #A9B66D;
  padding: 2rem;
  box-sizing: border-box;
}

.card-body {
  width: 100%;
  margin: 0 auto;
}

.activity-card {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #FFFFFF;
  border: 1px solid #CCC;
  border-radius: 4px;
  cursor: pointer;
}

.activity-card h3 {
  margin-top: 0;
  font-size: 24px;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
}

.activity-card p {
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}

.no-results {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #8850A1;
  font-family: "Open Sans", sans-serif;
}

.icone {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 10rem;
  height: auto;
}

.back-button {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.back-button img {
  width: 2rem;
  height: 2rem;
  background-color: #A9B66D;
  border-radius: 50%;
}

.back-button:hover img {
  background-color: #5F3870;
}

.activity-card:hover {
  background-color: #69A050;
}

/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) {
  .filter-bar {
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
  }

  .search-container,
  .filter-select {
    width: 30%;
    margin-bottom: 0;
  }

  .card {
    max-width: 80%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .filter-bar {
    width: 70%;
  }

  .card {
    max-width: 700px;
  }
}
</style>
