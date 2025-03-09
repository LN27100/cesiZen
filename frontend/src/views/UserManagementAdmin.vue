<template>
  <div>
    <h3>Gestion des utilisateurs
      <button class="add-user-button" @click="openModal">Ajouter un utilisateur</button>
    </h3>

    <!-- Modal pour ajouter un utilisateur -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h4>Ajouter un nouvel utilisateur</h4>
        <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="firstName">Prénom</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>
      <div class="input-group">
        <label for="lastName">Nom</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>
      <div class="input-group">
        <label for="username">Pseudo</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Mot de passe (provisoire)</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          autocomplete="new-password"
        />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          autocomplete="new-password"
        />
      </div>
      <div class="input-group">
        <label for="role">Rôle</label>
        <select id="role" v-model="role" required>
          <option value="Utilisateur">Utilisateur</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div>
        <input
        class= "checkMargin"
          type="checkbox"
          id="acceptTerms"
          v-model="acceptTerms"
          required
        />
        <label for="acceptTerms">J'accepte les conditions générales d'utilisation</label>
      </div>
      <button type="submit">Ajouter</button>
    </form>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Email</th>
          <th>Rôle</th>
          <th class="statut-column">Statut</th>
          <th class="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id_utilisateur">
          <td>{{ user.pseudo }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td class="statut-column">
            <button
              :class="{
                actif: user.statut_compte === 'actif',
                suspendu: user.statut_compte === 'suspendu',
              }"
              @click="toggleStatus(user)"
            >
              {{ user.statut_compte }}
            </button>
          </td>
          <td class="actions-column">
            <button class="supprimer" @click="deleteUser(user.id_utilisateur)">
              <i class="fas fa-trash-can"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManagementAdmin",
  data() {
    return {
      users: [],
      showModal: false,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Utilisateur",
      acceptTerms: false,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: { "x-access-token": localStorage.getItem("token") },
        });
        if (response.status === 200) {
          this.users = response.data;
        } else {
          console.error("Unexpected status code:", response.status);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      }
    },

    async toggleStatus(user) {
      const newStatus = user.statut_compte === "actif" ? "suspendu" : "actif";
      try {
        await axios.put(
          `http://localhost:3000/api/users/${user.id_utilisateur}/status`,
          { statut_compte: newStatus },
          {
            headers: { "x-access-token": localStorage.getItem("token") },
          }
        );
        user.statut_compte = newStatus;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
      }
    },

    async deleteUser(userId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${userId}`, {
            headers: { "x-access-token": localStorage.getItem("token") },
          });
          this.fetchUsers();
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur:",
            error
          );
        }
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.newUser = { prenom: '', nom: '', email: '', mot_de_passe: '', pseudo: '', role: 'Utilisateur' };
    },
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }

      if (!this.acceptTerms) {
        alert("Vous devez accepter les conditions générales d'utilisation.");
        return;
      }

      const userData = {
        prenom: this.firstName,
        nom: this.lastName,
        email: this.email,
        mot_de_passe: this.password,
        pseudo: this.username,
        role: this.role,
      };

      try {
        const response = await fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }

        if (response.ok) {
          console.log("User registered:", data);
          this.$router.push({ name: "LoginView" });
        } else {
          alert(`Erreur lors de l'inscription: ${data.error || data.message || "Erreur inconnue"}`);
          console.error("Error registering user:", data);
        }
      } catch (error) {
        alert("Une erreur est survenue lors de l'inscription.");
        console.error("Error:", error);
      }
    },
  }
};
</script>

<style scoped>
h3 {
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-user-button {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #84B66D;
  color: #ffffff;
}

.add-user-button:hover {
  background-color: #69A050;
}

@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

body {
  font-family: "Open Sans", sans-serif;
  background-color: #f4f4f9;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 500px; /* Largeur augmentée pour correspondre au formulaire */
  max-height: 80vh; /* Limite la hauteur à 80% de la fenêtre */
  overflow-y: auto; /* Ajoute une barre de défilement si nécessaire */
  border: 2px solid #a9b66d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
}

.modal h4 {
  font-family: "Nunito", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #000000;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #84b66d;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #69a050;
}


table {
  width: 80%;
  border-collapse: collapse;
  font-family: "Open Sans", sans-serif;
  margin: 0 auto;
}

th,
td {
  border: 1px solid #a9b66d;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #a06db6;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600; /* Semi-gras */
}

td {
  font-size: 16px;
  color: #000000;
}

button {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 120px;
  text-align: center;
  box-sizing: border-box;
}

button.actif {
  background-color: #28a745;
  color: #ffffff;
}

button.suspendu {
  background-color: #d0021b;
  color: #ffffff;
}

button.actif:hover {
  background-color: #7bc28b;
}

button.suspendu:hover {
  background-color: #c74454;
}

button.supprimer {
  background-color: darkred;
  color: #ffffff;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

button.supprimer:hover {
  background-color: #d52f2f;
}

button.supprimer i {
  font-weight: 300;
}

th.actions-column,
td.actions-column {
  width: 50px;
  text-align: center;
}

th.statut-column,
td.statut-column {
  width: 50px;
  text-align: center;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  h3 {
    font-size: 24px;
  }

  th,
  td {
    padding: 10px;
    font-size: 14px;
  }

  button {
    padding: 8px 15px;
    font-size: 14px;
    width: 100px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  h3 {
    font-size: 28px;
  }

  th,
  td {
    padding: 12px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    width: 110px;
  }
}
/* Responsive Design */
@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    padding: 15px;
  }

  .modal h4 {
    font-size: 22px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    padding: 7px;
  }

  button[type="submit"] {
    padding: 9px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    padding: 10px;
  }

  .modal h4 {
    font-size: 20px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    padding: 6px;
  }

  button[type="submit"] {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
