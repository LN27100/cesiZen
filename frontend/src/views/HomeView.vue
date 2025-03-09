<template>
  <div class="home">
    <h1>CESIZen</h1>
    <p>“L’application de votre santé mentale”</p>

    <div class="card mt-4">
      <div class="card-body">
        <p class="card-text">
          Bienvenue sur votre espace de sérénité ! CESIZen est une application
          dédiée à votre bien-être mental. Découvrez nos fonctionnalités et
          commencez votre voyage pour mieux comprendre vos émotions, réduire
          votre stress et cultiver votre bien-être au quotidien.
        </p>
      </div>
    </div>

    <br>
    <h3>Activités à la une !</h3>

    <!-- Carrousel -->
    <div
      id="carouselExampleControls"
      class="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          v-for="(category, index) in categories"
          :key="category.id_categorie"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="carousel-row">
            <div
              class="category-item"
              @click="navigateToActivities(category.id_categorie, category.nom_categorie)"
            >
              {{ category.nom_categorie }}
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get("http://localhost:3000/api/categories")
      .then(response => {
          // Limiter à seulement les 3 premières catégories
          this.categories = response.data.slice(0, 3);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des catégories :', error);
        });
    },
    navigateToActivities(categoryId, categoryName) {
      this.$router.push({
        name: 'ActivitesDetenteView',
        params: { id: categoryId, category: categoryName }
      });
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.home {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
}

h1 {
  font-size: 32px;
  color: black;
  font-family: "Nunito", sans-serif;
}

p {
  font-size: 16px;
  color: black;
  font-family: "Open Sans", sans-serif;
}

.card {
  width: 90%;
  margin: 20px auto;
  background-color: #a06db6;
  border: solid 2px #a9b66d;
  border-radius: 10px;
  padding: 15px;
}

.carousel {
  width: 100%;
  margin: 20px auto;
  background-color: #a06db6;
}

.carousel-row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.category-item {
  width: 80%;
  max-width: 400px;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 20px;
}

.category-item:hover {
  background-color: #69a050;
  color: #fff;
}

/* RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) {
  h1 {
    margin-top: 2rem;
    font-size: 32px;
  }

  .card {
    width: 80%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .card {
    max-width: 600px;
  }

  .carousel {
    max-width: 60%;
  }
}
</style>
