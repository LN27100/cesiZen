<template>
  <div class="activities">
    <img
      src="@/assets/icones/activités_détentes_black.png"
      alt="icone activités détente"
      class="icone"
    />
    <h1>Activités détente</h1>

    <button class="back-button" @click="goBack">
      <img src="@/assets/icones/back.png" alt="Retour" />
    </button>

    <div class="button-container">
      <button
        v-for="category in categories"
        :key="category.id_categorie"
        class="activity-button"
        @click="goToCategory(category.id_categorie, category.nom_categorie)"
      >
        <span>{{ category.nom_categorie }}</span>
        <img
          :src="getIconPath(normalizeCategoryName(category.nom_categorie))"
          :alt="'icone ' + category.nom_categorie"
        />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CategorieView",
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'ActivitiesView' });
    },
    goToCategory(categoryId, categoryName) {
      this.$router.push({
        name: "ActivitesDetenteView",
        params: { id: categoryId, category: categoryName },
      });
    },
    getIconPath(categoryName) {
      const iconMap = {
        Mandalas: require("@/assets/icones/mandala.png"),
        "Relaxation Sonore": require("@/assets/icones/relaxation_sonore.png"),
        Méditation: require("@/assets/icones/meditation.png"),
        "Étirements Doux": require("@/assets/icones/etirements_doux.png"),
        "Activités Expressives": require("@/assets/icones/activites_expressives.png"),
      };
      return iconMap[categoryName] || "";
    },
    normalizeCategoryName(categoryName) {
      const normalizationMap = {
        "Étirements doux": "Étirements Doux",
        Méditations: "Méditation",
        "Relaxation sonore": "Relaxation Sonore",
        "Activités expressives": "Activités Expressives",
      };
      return normalizationMap[categoryName] || categoryName;
    },
    fetchCategories() {
      axios
        .get("http://localhost:3000/api/categories")
        .then((response) => {
          console.log("Catégories récupérées :", response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des catégories :",
            error
          );
        });
    },
  },
  created() {
    this.fetchCategories();
  },
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

.icone {
  margin-bottom: 1rem;
  width: 5rem;
  height: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* Styles généraux pour les boutons */
button {
  height: 5rem;
  width: 100%;
  background-color: #84b66d;
  border: solid 1px #ffffff;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  position: relative;
}

button:hover {
  background-color: #69a050;
}

button img {
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: 1rem;
}

button span {
  flex: 1;
  text-align: center;
  margin-right: 3rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #ccc;
}

/* Styles spécifiques pour le bouton "retour" */
.back-button {
  position: absolute;
  top: 11rem;
  left: 4rem;
  background: none;
  border: none;
  cursor: pointer;
  height: auto; 
  width: auto;
  padding: 0; 
  box-shadow: none;
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

/* RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) {
  .icone {
    margin-top: 2rem;
  }
  .button-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    width: 45%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .button-container {
    flex-direction: row;
  }

  button {
    width: 40rem;
  }
}
</style>
