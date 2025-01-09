<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <p>Modifiez vos informations personnelles ci-dessous :</p>
    <div v-if="user" class="profile-form">
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="prenom">Prénom :</label>
          <input type="text" id="prenom" v-model="user.prenom" />
        </div>
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="user.nom" />
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
        <div class="form-group">
          <label for="pseudo">Pseudo :</label>
          <input type="text" id="pseudo" v-model="user.pseudo" />
        </div>
        <div class="form-group">
          <label for="mot_de_passe">Nouveau mot de passe :</label>
          <input
            type="password"
            id="mot_de_passe"
            placeholder="Laissez vide pour conserver l'ancien"
            v-model="user.mot_de_passe"
          />
        </div>
        <button type="submit" class="btn-submit">Mettre à jour</button>
      </form>
    </div>
    <div v-else class="loading">
      <p>Chargement des informations utilisateur...</p>
    </div>
  </div>
</template>

<script>
import { getUserById, updateUser } from "@/services/api";

export default {
  name: "ProfileView",
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
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

      getUserById(userId)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
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
        });
    },
    async updateProfile() {
      try {
        const updatedUser = { ...this.user };
        if (!updatedUser.mot_de_passe) {
          delete updatedUser.mot_de_passe;
        }

        const response = await updateUser(updatedUser);

        alert("Profil mis à jour avec succès !");
        this.user = response.data;
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

p {
  text-align: center;
  margin-bottom: 20px;
}

.profile-form {
  display: flex;
  flex-direction: column;
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

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
