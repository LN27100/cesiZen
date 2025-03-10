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
      activitiesPerPage: 5
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

    async toggleStatus(activity) {
      const newStatus = activity.status_activite_détente === "actif" ? "suspendue" : "actif";
      
      try {
        await axios.put(`http://localhost:3000/api/activities/${activity.id_activite}`, {
          ...activity,
          status_activite_détente: newStatus
        });

        activity.status_activite_détente = newStatus; // Mettre à jour localement l'affichage
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
</style>
