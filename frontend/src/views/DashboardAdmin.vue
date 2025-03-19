<template>
  <div>
    <h1>Dashboard Administrateur</h1>
    <div class="card">
      <p>
        Bienvenue sur le Dashboard Administrateur ! Vous pouvez gérer différents aspects de votre plateforme :
      </p>
      <ul>
        <li><strong>Gestion des utilisateurs :</strong> Ajoutez, modifiez ou supprimez des utilisateurs, et gérez leur rôle et statut.</li>
        <li><strong>Gestion des informations sur le stress et la santé mentale :</strong> Ajoutez, modifiez ou supprimez des informations pour aider les utilisateurs à mieux comprendre et gérer leur stress et leur bien-être mental.</li>
        <li><strong>Gestion des activités détentes :</strong> Ajoutez, modifiez ou supprimez des activités proposées pour aider les utilisateurs à se relaxer et à améliorer leur qualité de vie.</li>
      </ul>
      <p>
        Utilisez les différentes sections du dashboard pour naviguer et effectuer les actions nécessaires.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAdmin",
  data() {
    return {
      nombreUtilisateurs: 0,
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
.card {
  max-width: 90%;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 3px #a9b66d;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  color: white;
  text-align: left;
  padding-left: 10rem;
  padding-right: 10rem;
}

/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) {
  h1 {
    margin-top: 6rem;
  }

  .profile {
    max-width: 80%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .profile {
    max-width: 600px;
  }
}
</style>
