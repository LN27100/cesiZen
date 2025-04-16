<template>
  <div class="container">
  <h1>Inscription</h1>

  <div class="register-container">
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
        <label for="password">Mot de passe</label>
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
      <button type="submit">S'inscrire</button>
    </form>

    <div class="divider"></div>

    <p>
      Vous avez déjà un compte ?
      <a href="/login" class="login-button">Connectez-vous</a>
    </p>
  </div>
</div>
</template>



<script>
export default {
  name: "RegisterView",
  data() {
    return {
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
  methods: {
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
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.container {
  margin-top: 10rem;
  margin-bottom: 4rem;
}

.register-container {
  max-width: 400px;
  margin: auto; 
  padding: 20px;
  background-color: #A06DB6; 
  border: 2px solid #A9B66D; 
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-size: 32px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #FFFFFF;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #CCC;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #84B66D;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #69A050;
}

.login-button {
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

.login-button:hover {
  background-color: #69a050;
}

/* Trait blanc */
.divider {
  width: 50%; 
  height: 2px;
  background-color: white;
  margin: 20px auto;
}

.checkMargin {
  margin-top: 1rem;
}

/*  RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
  margin-top: 20rem;
}
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
}
</style>
