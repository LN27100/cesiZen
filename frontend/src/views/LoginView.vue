<template>
  <h1>Connectez-vous</h1>

  <div class="login">
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Entrez votre adresse email"
        />
      </div>
      <div class="input-group">
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

    <div class="divider"></div>

    <p>
      Pas encore de compte ?
      <a href="/register" class="register-button">Inscrivez-vous</a>
    </p>
  </div>
</template>


<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
          const response = await axios.post(
            `${process.env.VUE_APP_API_URL}/users/login`,
            {
              email: this.email,
              mot_de_passe: this.password,
            }
          );

          if (response.data.auth) {
            // Stocker le token JWT dans le localStorage
            localStorage.setItem("token", response.data.token);

            // Décoder le token pour obtenir l'ID utilisateur et le rôle
            const decodedToken = jwtDecode(response.data.token);
            localStorage.setItem("userId", decodedToken.id);
            localStorage.setItem("userRole", decodedToken.role);

            console.log("Connexion réussie pour:", this.email);

            // Rediriger vers la page principale après connexion
            this.$router.push("/");
          } else {
            alert("Échec de la connexion. Veuillez vérifier vos informations.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la connexion:",
            error.response || error
          );
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
  margin: auto;
  padding: 30px;
  background-color: #a06db6;
  border: 2px solid #a9b66d;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

h1 {
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
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
  background-color: #84b66d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
}

button:hover {
  background-color: #69a050;
}

p {
  margin-top: 15px;
  text-align: center;
}

a {
  color: #84b66d;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.register-button {
  display: inline-block;
  padding: 2px 7px;
  background-color: #84b66d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
}

.register-button:hover {
  background-color: #69a050;
}

/* Trait blanc */
.divider {
  width: 50%;
  height: 2px;
  background-color: white;
  margin: 20px auto;
}
</style>
