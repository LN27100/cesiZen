<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <div v-if="user" class="profile-details">
      <p><strong>Prénom :</strong> {{ user.prenom }}</p>
      <p><strong>Nom :</strong> {{ user.nom }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Pseudo :</strong> {{ user.pseudo }}</p>
      <div class="buttons">
        <button @click="editUser">Modifier</button>
        <button @click="deleteUser">Supprimer</button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Chargement des informations utilisateur...</p>
    </div>
    <div v-if="editing" class="edit-form">
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="prenom">Prénom :</label>
          <input type="text" id="prenom" v-model="editedUser.prenom" />
        </div>
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="editedUser.nom" />
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="editedUser.email" />
        </div>
        <div class="form-group">
          <label for="pseudo">Pseudo :</label>
          <input type="text" id="pseudo" v-model="editedUser.pseudo" />
        </div>
        <div class="form-group">
          <label for="mot_de_passe">Nouveau mot de passe :</label>
          <input
            type="password"
            id="mot_de_passe"
            placeholder="Laissez vide pour conserver l'ancien"
            v-model="editedUser.mot_de_passe"
          />
        </div>
        <button type="submit" class="btn-submit">Mettre à jour</button>
        <button type="button" @click="cancelEdit" class="btn-cancel">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";

export default {
  name: "ProfileView",
  data() {
    return {
      user: null,
      editing: false,
      editedUser: {
        prenom: "",
        nom: "",
        email: "",
        pseudo: "",
        mot_de_passe: "",
      },
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Vous devez vous connecter.");
        this.$router.push("/login");
        return;
      }

      if (!userId) {
        alert("Impossible de trouver l'ID utilisateur.");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.get(`/users/${userId}`);
        console.log("Réponse de l'API:", response.data);
        if (response.data.length > 0) {
          this.user = response.data[0];
          console.log("État user mis à jour:", this.user);
        } else {
          alert("Aucun utilisateur trouvé.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur:",
          error
        );
        const message =
          error.response?.data?.message ||
          "Impossible de récupérer les informations utilisateur.";
        alert(message);

        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          this.$router.push("/login");
        }
      }
    },
    editUser() {
      this.editing = true;
      this.editedUser = { ...this.user };
    },
    async updateUser() {
      try {
        const updatedUser = { ...this.editedUser };
        if (!updatedUser.mot_de_passe) {
          delete updatedUser.mot_de_passe;
        }

        console.log("Données envoyées pour la mise à jour:", updatedUser); // Ajoutez ce log

        const response = await axios.put(
          `/users/${this.user.id_utilisateur}`,
          updatedUser
        );

        console.log("Réponse de la mise à jour:", response.data); // Ajoutez ce log

        alert("Profil mis à jour avec succès !");
        this.user = response.data;
        this.editing = false;
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du profil:",
          error.response || error
        );
        alert(
          error.response?.data?.message ||
            "Une erreur s'est produite. Veuillez réessayer."
        );
      }
    },
    cancelEdit() {
      this.editing = false;
      this.editedUser = {
        prenom: "",
        nom: "",
        email: "",
        pseudo: "",
        mot_de_passe: "",
      };
    },
    async deleteUser() {
      if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
        try {
          await axios.delete(`/users/${this.user.id_utilisateur}`);
          alert("Compte supprimé avec succès !");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          this.$router.push("/login");
        } catch (error) {
          console.error(
            "Erreur lors de la suppression du compte:",
            error.response || error
          );
          alert(
            error.response?.data?.message ||
              "Une erreur s'est produite. Veuillez réessayer."
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-details p {
  font-size: 1.1rem;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.buttons button {
  padding: 10px 20px;
  background-color: #84b66d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buttons button:hover {
  background-color: #69a050;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.edit-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus {
  border-color: #84b66d;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #84b66d;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #69a050;
}

.btn-cancel {
  width: 100%;
  padding: 10px;
  background-color: #ccc;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-cancel:hover {
  background-color: #aaa;
}
</style>
