<template>
  <div class="admin-container">
    <div class="header">
      <h1>Gestion des activités</h1>
      <button class="add-btn" @click="openAddForm">
        <i class="fas fa-plus"></i> Ajouter
      </button>
    </div>

    <table class="info-table">
      <thead>
        <tr>
          <th>Nom de l'activité</th>
          <th>Description</th>
          <th>Catégorie</th>
          <th>Statut</th>
          <th>Durée (minutes)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activite) in paginatedActivities" :key="activite.id_activite">
          <td>{{ activite.nom_activite }}</td>
          <td>{{ activite.description_activite }}</td>
          <td>{{ activite.id_categorie }}</td>
          <td>
            <button
              :class="activite.status_activite_détente === 'actif' ? 'active-status' : 'suspended-status'"
              @click="toggleStatus(activite)"
            >
              {{ activite.status_activite_détente === 'actif' ? 'Actif' : 'Suspendue' }}
            </button>
          </td>
          <td>{{ activite.duree_minutes }}</td>
          <td>
            <button class="edit-btn" @click="openEditForm(activite)">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="delete-btn" @click="deleteActivity(activite.id_activite)">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>

    <!-- Modale pour ajouter une activité -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Ajouter une nouvelle activité</h2>
        <form @submit.prevent="submitForm">
          <label for="nom">Nom de l'activité:</label>
          <input type="text" id="nom" v-model="newActivity.nom_activite" required>

          <label for="description">Description:</label>
          <input type="text" id="description" v-model="newActivity.description_activite" required>

          <label for="statut">Statut:</label>
          <select id="statut" v-model="newActivity.status_activite_détente" required>
            <option value="actif">Actif</option>
            <option value="suspendue">Suspendue</option>
          </select>

          <label for="categorie">Catégorie:</label>
          <select id="categorie" v-model="newActivity.id_categorie" required>
            <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">
              {{ categorie.nom_categorie }}
            </option>
          </select>

          <label for="duree">Durée (minutes):</label>
          <input type="number" id="duree" v-model="newActivity.duree_minutes" required>

          <label for="sous_categorie">Sous-catégorie:</label>
          <select id="sous_categorie" v-model="newActivity.sous_categorie" required>
            <option v-for="sousCategorie in sousCategories" :key="sousCategorie">
              {{ sousCategorie }}
            </option>
          </select>

          <label for="nom_image">Nom de l'image:</label>
          <input type="text" id="nom_image" v-model="newActivity.nom_image">

          <label for="nom_image_2">Nom de l'image 2:</label>
          <input type="text" id="nom_image_2" v-model="newActivity.nom_image_2">

          <label for="lien_video">Lien vidéo:</label>
          <input type="text" id="lien_video" v-model="newActivity.lien_video">

          <div class="modal-buttons">
            <button type="submit">Ajouter</button>
            <button type="button" @click="closeModal">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActivitiesManagementAdmin",
  data() {
    return {
      activities: [],
      currentPage: 1,
      activitiesPerPage: 5,
      showModal: false,
      newActivity: {
        nom_activite: '',
        description_activite: '',
        status_activite_détente: 'actif',
        id_categorie: '',
        duree_minutes: '',
        sous_categorie: '',
        nom_image: '',
        nom_image_2: '',
        lien_video: ''
      },
      categories: [],
      sousCategories: [
        "Méditation de pleine conscience",
        "Méditation guidée",
        "Bruitages de la nature",
        "Écriture expressive",
        "Coloriage de mandalas",
        "Étirements",
        "Musique de relaxation",
        "Art-thérapie",
        "Étirements matinaux",
        "Livres",
        "Exercices",
        "Création de mandalas personnalisés",
        "Postures de yoga doux"
      ]
    };
  },
  created() {
    this.fetchActivities();
  },
  computed: {
    paginatedActivities() {
      const start = (this.currentPage - 1) * this.activitiesPerPage;
      return this.activities.slice(start, start + this.activitiesPerPage);
    },
    totalPages() {
      return Math.ceil(this.activities.length / this.activitiesPerPage);
    }
  },
  methods: {
    async fetchActivities() {
      try {
        const response = await axios.get("http://localhost:3000/api/activities");
        this.activities = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des activités:", error);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },

    async toggleStatus(activity) {
      const newStatus = activity.status_activite_détente === "actif" ? "suspendue" : "actif";

      try {
        await axios.put(`http://localhost:3000/api/activities/${activity.id_activite}`, {
          ...activity,
          status_activite_détente: newStatus
        });

        activity.status_activite_détente = newStatus;
      } catch (error) {
        console.error("Erreur lors du changement de statut:", error);
      }
    },

    async deleteActivity(activityId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
        try {
          await axios.delete(`http://localhost:3000/api/activities/${activityId}`);
          this.fetchActivities();
        } catch (error) {
          console.error("Erreur lors de la suppression de l'activité:", error);
        }
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    },

    openAddForm() {
      this.fetchCategories();
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.newActivity = {
        nom_activite: '',
        description_activite: '',
        status_activite_détente: 'actif',
        id_categorie: '',
        duree_minutes: '',
        sous_categorie: '',
        nom_image: '',
        nom_image_2: '',
        lien_video: ''
      };
    },

    async submitForm() {
      try {
        console.log("Données envoyées :", this.newActivity); 

        await axios.post("http://localhost:3000/api/activities", this.newActivity);
        this.fetchActivities();
        this.closeModal();
      } catch (error) {
        console.error("Erreur lors de la création de l'activité:", error);
      }
    }
  }
};
</script>

<style scoped>
.admin-container {
  padding: 20px;
  font-family: "Open Sans", sans-serif;
  margin: 0 5rem;
  background-color: #FFFFFF;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
}

.add-btn {
  margin-left: 1rem;
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.add-btn:hover {
  background-color: #5F3870;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #A9B66D;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #A06DB6;
  color: white;
  font-size: 16px;
}

td {
  font-size: 16px;
  color: #000000;
}

.active-status {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.suspended-status {
  background-color: #D0021B;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.active-status:hover {
  background-color: #388E3C;
}

.suspended-status:hover {
  background-color: #B71C1C;
}

.edit-btn {
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 5px 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.edit-btn:hover {
  background-color: #5F3870;
}

.delete-btn {
  background-color: #D0021B;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn:hover {
  background-color: #D32F2F;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px;
  margin: 0 5px;
  background-color: #84B66D;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #FFFFFF;
  margin: auto;
  padding: 20px;
  border: 1px solid #A9B66D;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
  max-height: 70%; 
  overflow-y: auto; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}


.modal h2 {
  color: #A06DB6;
  font-size: 24px;
  margin-bottom: 20px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal label {
  margin-bottom: 5px;
  color: #000000;
  font-size: 16px;
}

.modal input,
.modal select {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #A9B66D;
  border-radius: 5px;
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal button {
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 48%;
}

.modal button:hover {
  background-color: #5F3870;
}

.modal button[type="button"] {
  background-color: #D0021B;
}

.modal button[type="button"]:hover {
  background-color: #B71C1C;
}
</style>
