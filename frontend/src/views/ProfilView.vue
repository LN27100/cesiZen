<template>
  <div class="container">
  <h1>Mon Profil</h1>
  <div class="profile">
    <div v-if="user" class="profile-details">
      <p>
        <strong class="label">Prénom :</strong>
        <span class="value">{{ user.prenom }}</span>
      </p>
      <p>
        <strong class="label">Nom :</strong>
        <span class="value">{{ user.nom }}</span>
      </p>
      <p>
        <strong class="label">Email :</strong>
        <span class="value">{{ user.email }}</span>
      </p>
      <p>
        <strong class="label">Pseudo :</strong>
        <span class="value">{{ user.pseudo }}</span>
      </p>
      <div class="buttons">
        <button @click="editUser">Modifier</button>
        <button @click="deleteUser">Supprimer</button>
      </div>
      <div class="buttons">
        <button class="reinitialButton" @click="showResetPasswordForm">
          Réinitialiser le mot de passe
        </button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Chargement des informations utilisateur...</p>
    </div>
    <div v-if="editing" class="edit-form">
      <hr class="separator" />
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
        <div class="buttons">
          <button type="submit">Mettre à jour</button>
          <button type="button" @click="cancelEdit">Annuler</button>
        </div>
      </form>
    </div>
    <div v-if="resettingPassword" class="reset-password-form">
      <hr class="separator" />
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="oldPassword">Ancien mot de passe :</label>
          <input type="password" id="oldPassword" v-model="passwords.oldPassword" />
        </div>
        <div class="form-group">
          <label for="newPassword">Nouveau mot de passe :</label>
          <input type="password" id="newPassword" v-model="passwords.newPassword" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmer le nouveau mot de passe :</label>
          <input type="password" id="confirmPassword" v-model="passwords.confirmPassword" />
        </div>
        <div class="buttons">
          <button type="submit">Réinitialiser</button>
          <button type="button" @click="cancelResetPassword">Annuler</button>
        </div>
      </form>
    </div>
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
      resettingPassword: false,
      editedUser: {
        prenom: "",
        nom: "",
        email: "",
        pseudo: "",
      },
      passwords: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
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

        const response = await axios.put(
          `/users/${this.user.id_utilisateur}`,
          updatedUser
        );

        alert("Profil mis à jour avec succès !");
        this.user = response.data;
        this.editing = false;

        // rafraichi la page pour actualiser après la modif
        window.location.reload();
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
    showResetPasswordForm() {
      this.resettingPassword = true;
    },
    async resetPassword() {
      if (!this.passwords.oldPassword || !this.passwords.newPassword || !this.passwords.confirmPassword) {
        alert("Tous les champs de mot de passe sont requis.");
        return;
      }

      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        alert("Les nouveaux mots de passe ne correspondent pas.");
        return;
      }

      try {
        const response = await axios.post(
          `/users/${this.user.id_utilisateur}/resetPassword`,
          {
            oldPassword: this.passwords.oldPassword,
            newPassword: this.passwords.newPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Réponse de la réinitialisation du mot de passe:", response.data);
        alert("Mot de passe réinitialisé avec succès !");
        this.resettingPassword = false;
      } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error.response || error);
        alert(error.response?.data?.message || "Une erreur s'est produite. Veuillez réessayer.");
      }
    },
    cancelResetPassword() {
      this.resettingPassword = false;
      this.passwords = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.container {
  margin-top:10rem;
  margin-bottom:4rem;
}

.profile {
  max-width: 92%;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 3px #a9b66d;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-details p {
  font-size: 1.1rem;
  color: white;
  text-align: left;
}

.label {
  color: white;
}

.value {
  color: white;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.buttons button {
  padding: 0.3rem 0.8rem;
  background-color: #84b66d;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 0.5rem;
  width: 10rem;
}

#app > div.content > div > div > div:nth-child(6) > button {
  padding: 0.3rem 0.8rem;
  background-color: #84b66d;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 0.5rem;
  width: 21.1rem;
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
  color: white;
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

.separator {
  border: 0;
  border-top: 2px solid white;
  margin: 2rem 1rem;
}


/*  RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
  margin-top: 20rem;
}
.profile {
    max-width: 80%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.profile {
    max-width: 50%;
  }
}
</style>
