<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Entrez votre adresse email"
        />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p>
      Pas encore de compte ?
      <router-link to="/register">Créer un compte</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.email && this.password) {
        try {
          console.log("URL de connexion:", process.env.VUE_APP_API_URL);

          const response = await axios.post(`${process.env.VUE_APP_API_URL}/users/login`, {
            email: this.email,
            mot_de_passe: this.password,
          });

          if (response.data.auth) {
            // Stocker le token JWT dans le localStorage
            localStorage.setItem("token", response.data.token);
            console.log("Connexion réussie pour:", this.email);

            // Rediriger vers la page principale après connexion
            this.$router.push("/");
          } else {
            alert("Échec de la connexion. Veuillez vérifier vos informations.");
          }
        } catch (error) {
          console.error("Erreur lors de la connexion:", error.response || error);
          alert(
            `Erreur lors de la connexion : ${
              error.response?.data?.message || "Veuillez réessayer."
            }`
          );
        }
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.login {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #84B66D;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
}

button:hover {
  background-color: #69A050;
}

p {
  margin-top: 15px;
  text-align: center;
}
</style>
