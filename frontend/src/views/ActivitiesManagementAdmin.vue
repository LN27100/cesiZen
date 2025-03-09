<template>
  <div class="admin-container">
    <div class="header">
      <h1>Gestion des activités</h1>
      <button class="add-btn" @click="openAddForm">
        <i class="fas fa-plus"></i> Ajouter</button>
    </div>

    <table class="info-table">
      <thead>
        <tr>
          <th>Nom de l'activité</th>
          <th>Description</th>
          <th>Catégorie</th>
          <th>Status</th>
          <th>Durée (minutes)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activite) in paginatedActivities" :key="activite.id_activite">
          <td>{{ activite.nom_activite }}</td>
          <td>{{ activite.description_activite }}</td>
          <td>{{ activite.id_categorie }}</td>
          <td>{{ activite.status_activite_détente }}</td>
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

    <!-- Modal d'édition / ajout -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h2>{{ isEditing ? "Modifier l'activité" : "Ajouter une activité" }}</h2>
        <label>Nom de l'activité:</label>
        <input v-model="activiteForm.nom_activite" type="text" required />

        <label>Description:</label>
        <textarea v-model="activiteForm.description_activite" required></textarea>

        <label>Catégorie:</label>
        <input v-model="activiteForm.id_categorie" type="number" required />

        <label>Status:</label>
        <input v-model="activiteForm.status_activite_détente" type="text" required />

        <label>Durée (minutes):</label>
        <input v-model="activiteForm.duree_minutes" type="number" required />

        <div class="modal-actions">
          <button @click="saveActivity">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
          <button @click="closeForm">Annuler</button>
        </div>
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
      showForm: false,
      isEditing: false,
      activiteForm: { id_activite: null, nom_activite: "", description_activite: "", status_activite_détente: "", id_categorie: "", duree_minutes: "" }
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

    async deleteActivity(activityId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
        try {
          await axios.delete(`http://localhost:3000/api/activities/${activityId}`);
          this.fetchActivities(); // Rafraîchir la liste après suppression
        } catch (error) {
          console.error("Erreur lors de la suppression de l'activité:", error);
        }
      }
    },

    openEditForm(activity) {
      this.activiteForm = { ...activity };
      this.isEditing = true;
      this.showForm = true;
    },

    openAddForm() {
      this.activiteForm = { id_activite: null, nom_activite: "", description_activite: "", status_activite_détente: "", id_categorie: "", duree_minutes: "" };
      this.isEditing = false;
      this.showForm = true;
    },

    async saveActivity() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/api/activities/${this.activiteForm.id_activite}`, this.activiteForm);
        } else {
          await axios.post("http://localhost:3000/api/activities", this.activiteForm);
        }
        this.closeForm();
        this.fetchActivities();
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'activité:", error);
      }
    },

    closeForm() {
      this.showForm = false;
      this.activiteForm = { id_activite: null, nom_activite: "", description_activite: "", status_activite_détente: "", id_categorie: "", duree_minutes: "" };
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
  justify-content:center;
  align-items: center;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  font-family: "Nunito", sans-serif; 
}

.add-btn {
  margin-left: 1rem;
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
  font-weight: semi-bold;
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
  font-family: "Open Sans", sans-serif;
}

th {
  background-color: #A06DB6;
  color: white;
  font-size: 16px;
  font-weight: semi-bold;
}

td {
  font-size: 16px;
  color: #000000;
}

.edit-btn {
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 5px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
  font-weight: semi-bold;
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
  font-family: "Open Sans", sans-serif;
  font-weight: semi-bold;
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
  font-family: "Open Sans", sans-serif;
  font-weight: semi-bold;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  font-family: "Open Sans", sans-serif;
}

.modal-content h2 {
  font-size: 24px;
  font-weight: semi-bold;
  color: #000000; 
}

.modal label {
  font-size: 16px;
  color: #000000;
}

.modal input,
.modal textarea {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #A9B66D;
  border-radius: 5px;
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px 20px;
  border: none;
  font-weight: semi-bold;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
}

.modal-actions button:first-child {
  background-color: #A06DB6; 
  color: white;
}

.modal-actions button:first-child:hover {
  background-color: #5F3870; 
}

.modal-actions button:last-child {
  background-color: #84B66D;
  color: white;
}

.modal-actions button:last-child:hover {
  background-color: #69A050; 
}

</style>
