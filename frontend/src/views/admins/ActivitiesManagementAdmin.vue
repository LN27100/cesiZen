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
          <th>Nom</th>
          <th>Description</th>
          <th>Catégorie</th>
          <th>Statut</th>
          <th>Durée (minutes)</th>
          <th>Image</th>
          <th>Image 2</th>
          <th>Vidéo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activite) in paginatedActivities" :key="activite.id_activite">
          <td>{{ activite.nom_activite }}</td>
          <td>{{ activite.description_activite }}</td>
          <td>{{ activite.id_categorie }}</td>
          <td class="center-cell">
            <button
              :class="{
                actif: activite.status_activite_détente === 'actif',
                suspendu: activite.status_activite_détente === 'suspendue',
              }"
              @click="toggleStatus(activite)"
            >
              {{ activite.status_activite_détente }}
            </button>
          </td>
          <td>{{ activite.duree_minutes }}</td>
          <td>{{ activite.nom_image }}</td>
          <td>{{ activite.nom_image_2 }}</td>
          <td>{{ activite.lien_video }}</td>
          <td class="center-cell">
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
        <button class="close-btn" @click="closeForm">
          <i class="fas fa-times"></i>
        </button>
        <h2>{{ isEditing ? "Modifier l'activité" : "Ajouter une activité" }}</h2>
        <label>Nom de l'activité</label>
        <input v-model="activiteForm.nom_activite" type="text" required />

        <label>Description</label>
        <textarea v-model="activiteForm.description_activite" required></textarea>

        <label>Catégorie</label>
        <select v-model="activiteForm.id_categorie" required>
          <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">
            {{ categorie.nom_categorie }}
          </option>
        </select>

        <label>Sous-catégorie</label>
        <select v-model="activiteForm.sous_categorie" required>
          <option v-for="sousCategorie in sousCategories" :key="sousCategorie">
            {{ sousCategorie }}
          </option>
        </select>

        <label>Statut</label>
        <select v-model="activiteForm.status_activite_détente" required>
          <option v-for="status_activite_détente in statuts" :key="status_activite_détente">
            {{ status_activite_détente }}
          </option>
        </select>

        <label>Durée (minutes)</label>
        <input v-model="activiteForm.duree_minutes" type="number" required />

        <label>Nom de l'image</label>
        <input v-model="activiteForm.nom_image" type="text" />

        <label>Nom de l'image 2</label>
        <input v-model="activiteForm.nom_image_2" type="text" />

        <label>Lien vidéo</label>
        <input v-model="activiteForm.lien_video" type="text" />

        <div class="modal-actions">
          <button @click="saveActivity">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
          <button @click="closeForm">Annuler</button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation -->
<!-- Modal de confirmation -->
<div v-if="showConfirmationModal" class="modal">
  <div class="modal-content">
    <button class="close-btn" @click="closeConfirmationModal">
      <i class="fas fa-times"></i>
    </button>
    <h2>Activité créée avec succès</h2>
    <div class="modal-actions">
      <button @click="closeConfirmationModal">OK</button>
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
      showConfirmationModal: false,
      activities: [],
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
      ],
      statuts: ["actif", "suspendue"],
      currentPage: 1,
      activitiesPerPage: 5,
      showForm: false,
      isEditing: false,
      activiteForm: {
        id_activite: null,
        nom_activite: "",
        description_activite: "",
        status_activite_détente: "actif",
        id_categorie: "",
        duree_minutes: "",
        sous_categorie: "",
        nom_image: null,
        nom_image_2: null,
        lien_video: ""
      }
    };
  },
  created() {
    this.fetchActivities();
    this.fetchCategories();
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
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/activities`);
        this.activities = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des activités:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/categories`);
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    async deleteActivity(activityId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
        try {
          await axios.delete(`${process.env.VUE_APP_API_URL}/activities/${activityId}`);
          this.fetchActivities(); // Rafraîchir la liste après suppression
          this.currentPage = 1;
        } catch (error) {
          console.error("Erreur lors de la suppression de l'activité:", error);
        }
      }
    },
    async toggleStatus(activite) {
      const newStatus = activite.status_activite_détente === "actif" ? "suspendue" : "actif";
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URL}/activities/${activite.id_activite}/status`,
          { status_activite_détente: newStatus },
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        );
        activite.status_activite_détente = newStatus;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
      }
    },
    openEditForm(activity) {
      this.activiteForm = { ...activity };
      this.isEditing = true;
      this.showForm = true;
    },
    openAddForm() {
      this.activiteForm = {
        id_activite: null,
        nom_activite: "",
        description_activite: "",
        status_activite_détente: "",
        id_categorie: "",
        duree_minutes: "",
        sous_categorie: "",
        nom_image: "",
        nom_image_2: "",
        lien_video: ""
      };
      this.isEditing = false;
      this.showForm = true;
    },
    async saveActivity() {
      try {
        if (this.isEditing) {
          await axios.put(`${process.env.VUE_APP_API_URL}/activities/${this.activiteForm.id_activite}`, this.activiteForm);
        } else {
          await axios.post(`${process.env.VUE_APP_API_URL}/activities`, this.activiteForm);
        }
        this.closeForm();
        this.fetchActivities();
        this.showConfirmationModal = true; 
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'activité:", error);
      }
    },
    closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.currentPage = this.totalPages; // Rediriger vers la dernière page des activités
  },
    closeForm() {
      this.showForm = false;
      this.activiteForm = {
        id_activite: null,
        nom_activite: "",
        description_activite: "",
        status_activite_détente: "",
        id_categorie: "",
        duree_minutes: "",
        sous_categorie: "",
        nom_image: "",
        nom_image_2: "",
        lien_video: ""
      };
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
  padding: 1rem;
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
  font-family: "Nunito", sans-serif;
}

.add-btn {
  margin-left: 1rem;
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
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
  margin-top: 1.5rem;
}

th, td {
  border: 1px solid #A9B66D;
  padding: 1rem;
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

.center-cell {
  text-align: center;
}

.edit-btn {
  background-color: #A06DB6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  width: 8rem;
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
  width: 8rem;
  padding: 0.5rem 0.5rem;
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
  margin-top: 2rem;
}

.pagination button {
  padding: 1rem;
  border-radius: 5px;
  margin: 0 0.5rem;
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
  padding: 1rem;
  border-radius: 5px;
  width: 30%;
  max-height: 95%;
  overflow-y: auto;
  font-family: "Open Sans", sans-serif;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #A06DB6;
}

.close-btn:hover {
  color: #5F3870;
}

.modal-content h2 {
  font-size: 24px;
  font-weight: semi-bold;
  color: #A06DB6;
  text-align: center;
}

.modal label {
  font-size: 16px;
  color: #000000;
  text-align: left;
  display: block;
  margin-top: 1rem;
}

.modal input,
.modal select {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #A9B66D;
  border-radius: 5px;
}

.modal textarea {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #A9B66D;
  border-radius: 5px;
  min-height: 10rem;
  resize: vertical;
}

.modal-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
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

button.actif {
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  display: inline-block;
  padding: 0.5rem 1rem;
}

button.suspendu {
  background-color: #d0021b;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  display: inline-block;
  padding: 0.5rem 1rem;
}

button.actif:hover {
  background-color: #7bc28b;
}

button.suspendu:hover {
  background-color: #c74454;
}
</style>
