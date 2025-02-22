<template>
  <div>
    <h3>Gestion des utilisateurs</h3>
    <table>
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id_utilisateur">
          <td>{{ user.pseudo }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button 
              :class="{ 'actif': user.statut_compte === 'actif', 'suspendu': user.statut_compte === 'suspendu' }"
              @click="toggleStatus(user)"
            >
              {{ user.statut_compte }}
            </button>
          </td>
          <td>
            <button @click="deleteUser(user.id_utilisateur)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserManagementAdmin",
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: { 'x-access-token': localStorage.getItem('token') }
        });
        if (response.status === 200) {
          this.users = response.data;
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    },

    async toggleStatus(user) {
      const newStatus = user.statut_compte === 'actif' ? 'suspendu' : 'actif';
      try {
        await axios.put(`http://localhost:3000/api/users/${user.id_utilisateur}/status`, 
          { statut_compte: newStatus }, 
          {
            headers: { 'x-access-token': localStorage.getItem('token') }
          }
        );
        user.statut_compte = newStatus; // Mettre à jour localement après succès
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
      }
    },

    async deleteUser(userId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${userId}`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
          });
          this.fetchUsers(); // Recharger la liste des utilisateurs après suppression
        } catch (error) {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

button {
  margin-right: 5px;
}

.actif {
  background-color: green;
  color: white;
}

.suspendu {
  background-color: red;
  color: white;
}
</style>
