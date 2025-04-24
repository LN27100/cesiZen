<template>
  <div class="admin-container">
    <div class="header">
      <h1>Gestion des information</h1>
      <button class="add-btn" @click="openAddForm">
        <i class="fas fa-plus"></i> Ajouter</button>
    </div>

    <table class="info-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Contenu</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article) in paginatedArticles" :key="article.id_information">
          <td>{{ article.titre }}</td>
          <td v-html="article.description"></td>
          <td>
            <button class="edit-btn" @click="openEditForm(article)">
              <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="delete-btn" @click="deleteArticle(article.id_information)">
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
        <h2>{{ isEditing ? "Modifier l'article" : "Ajouter un article" }}</h2>
        <label>Titre:</label>
        <input v-model="articleForm.titre" type="text" required />

        <label>Contenu:</label>
        <textarea v-model="articleForm.description" required></textarea>


        <div class="modal-actions">
          <button @click="saveArticle">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
          <button @click="closeForm">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InfosManagementAdmin",
  data() {
    return {
      articles: [],
      currentPage: 1,
      articlesPerPage: 5,
      showForm: false,
      isEditing: false,
      articleForm: { id_information: null, titre: "", description: "", nom_image: "" }
    };
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      return this.articles.slice(start, start + this.articlesPerPage);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axios.get("http://localhost:3000/api/info");
        this.articles = response.data.map(article => ({
          id_information: article.id_information,
          titre: article.titre,
          description: article.content,
          nom_image: article.image
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
      }
    },

    async deleteArticle(articleId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        try {
          await axios.delete(`http://localhost:3000/api/info/${articleId}`);
          this.fetchArticles(); // Rafraîchir la liste après suppression
        } catch (error) {
          console.error("Erreur lors de la suppression de l'article:", error);
        }
      }
    },

    openEditForm(article) {
      this.articleForm = { ...article };
      this.isEditing = true;
      this.showForm = true;
    },

    openAddForm() {
      this.articleForm = { id_information: null, titre: "", description: "", nom_image: "" };
      this.isEditing = false;
      this.showForm = true;
    },

    async saveArticle() {
      try {
        if (this.isEditing) {
          await axios.put(`${process.env.VUE_APP_API_URL}/info/${this.articleForm.id_information}`, this.articleForm);
        } else {
          await axios.post(`${process.env.VUE_APP_API_URL}/info`, this.articleForm);
        }
        this.closeForm();
        this.fetchArticles();
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'article:", error);
      }
    },

    closeForm() {
      this.showForm = false;
      this.articleForm = { id_information: null, titre: "", description: "", nom_image: "" };
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
  border: 1px solid #b0afaf;
  padding: 10px;
  text-align: left;
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
  background-color: #d32f2f; 
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
}

h2 {
  font-size: 24px; 
  font-weight: semi-bold; 
  color: #000000; 
}

label {
  font-size: 16px;
  font-weight: normal;
  color: #000000; 
}

input, textarea {
  font-size: 16px;
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #b0afaf;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px 15px;
  border-radius: 5px;
}

.modal-actions button:first-child {
  background-color: #84B66D; 
  color: white;
}

.modal-actions button:first-child:hover {
  background-color: #69A050; 
}

.modal-actions button:last-child {
  background-color: #D0021B;
  color: white;
}

.modal-actions button:last-child:hover {
  background-color: #d32f2f; 
}

</style>
