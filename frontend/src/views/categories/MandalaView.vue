<template>
  <div class="activities">
    <img src="@/assets/icones/mandala_noir.png" alt="icone activités détente" class="icone">

    <h1>Mandalas</h1>
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
        <div v-for="activity in filteredActivities" :key="activity.id_activite" class="activity-card">
          <h3>{{ activity.nom_activite }}</h3>
          <p>{{ activity.description_activite }}</p>
          <p>Durée: {{ activity.duree_minutes }} minutes</p>
          <p>Sous-catégorie: {{ activity.sous_categorie }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MandalaView',
  data() {
    return {
      activities: [
        { id_activite: 1, nom_activite: 'Séance de coloriage', description_activite: 'Activité de coloriage de mandalas', duree_minutes: 30, sous_categorie: 'Coloriage de mandalas' },
        { id_activite: 2, nom_activite: 'Création de mandalas', description_activite: 'Création de mandalas personnalisés', duree_minutes: 45, sous_categorie: 'Création de mandalas personnalisés' },
        // Ajoutez d'autres activités ici
      ],
      searchQuery: '',
      selectedSubCategory: '',
      selectedDuration: '',
      subCategories: ['Coloriage de mandalas', 'Création de mandalas personnalisés'],
      durations: [30, 45]
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => {
        const matchesSearch = activity.nom_activite.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesSubCategory = this.selectedSubCategory ? activity.sous_categorie === this.selectedSubCategory : true;
        const matchesDuration = this.selectedDuration ? activity.duree_minutes === parseInt(this.selectedDuration) : true;
        return matchesSearch && matchesSubCategory && matchesDuration;
      });
    }
  },
  methods: {
   
  }
};
</script>

<style scoped>
/* Import de la police Nunito */
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activities {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: black;
  font-family: "Nunito", sans-serif;
}

.filter-bar {
  background-color: #8850A1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  border: solid 2px #a9b66d;
  border-radius: 4px;
  width: 60%;
  margin: 0 auto;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 10px;
  color: #ccc;
}

.search-input {
  padding: 0.5rem 0.5rem 0.5rem 30px;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-select {
  padding: 0.5rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card {
  max-width: 800px;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 2px #a9b66d;
  padding: 2rem;
  box-sizing: border-box;
}

.card-body {
  width: 80%;
  margin: 0 auto;
}

.activity-card {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.activity-card h3 {
  margin-top: 0;
}

.no-results {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #8850A1;
}

.icone {
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 10rem;
  height: auto;
}

/* Responsive */

@media (max-width: 1200px) {
  .filter-bar {
    width: 70%;
  }

  .card {
    max-width: 700px;
  }
}

@media (max-width: 992px) {
  .filter-bar {
    width: 90%;
  }

  .card {
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .filter-bar {
    width: 90%;
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    width: 100%;
    margin-bottom: 1rem;
  }

  .search-input {
    width: 100%;
  }

  .filter-select {
    width: 100%;
    margin-bottom: 1rem;
  }

  .card {
    max-width: 500px;
  }
}

@media (max-width: 576px) {
  .icone {
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 20%;
  height: auto;
}

  .filter-bar {
    width: 80%;
  }

  .card {
    max-width: 90%;
    padding: 1rem;
  }

  .card-body {
    width: 100%;
  }
}
</style>

