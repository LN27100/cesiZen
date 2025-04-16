<template>
  <div class="info">
    <h1>Foire aux questions</h1>
    <div class="info_container">
      <p>Une question? Vous trouverez votre réponse ici !</p>
    </div>

    <div
      v-for="(article, index) in paginatedArticles"
      :key="index"
      class="article"
    >
      <h2 class="article-title">{{ article.question }}</h2>
      <p>{{ article.response }}</p>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Suivant
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "faqsView",
  data() {
    return {
      articles: [
        {
          question: "Qu'est-ce que CESIZen ?",
          response:
            "CESIZen est une application conçue pour aider les utilisateurs à gérer leur bien-être mental au quotidien. Elle offre des outils interactifs, des informations fiables et des exercices pratiques pour réduire le stress et améliorer la santé mentale.",
        },
        {
          question: "Qui peut utiliser CESIZen ?",
          response:
            "CESIZen est destinée à un large public, y compris les individus soucieux de leur bien-être mental, les professionnels de santé mentale, et les jeunes adultes confrontés au stress quotidien.",
        },
        {
          question:
            "Quels sont les outils interactifs disponibles sur CESIZen ?",
          response:
            "CESIZen propose des tests interactifs pour l'auto-diagnostic, des exercices de respiration personnalisables, un journal de suivi des émotions, et un catalogue d'activités de détente.",
        },
        {
          question: "Comment puis-je accéder aux activités de détente ?",
          response:
            "Vous pouvez consulter le catalogue d'activités de détente directement dans l'application. Les visiteurs anonymes peuvent voir les activités disponibles, tandis que les utilisateurs connectés peuvent marquer leurs favorites et suivre leurs progrès.",
        },
        {
          question: "Quels types d'activités de détente sont disponibles ?",
          response:
            "Le catalogue propose diverses activités telles que la méditation, l'écoute musicale, des exercices de relaxation, et bien d'autres. Ces activités sont conçues pour aider à réduire le stress et améliorer le bien-être général.",
        },
        {
          question:
            "Puis-je ajouter mes propres activités de détente au catalogue ?",
          response:
            "Actuellement, seuls les administrateurs peuvent ajouter, modifier ou désactiver des activités dans le catalogue. Cependant, nous prenons en compte les suggestions des utilisateurs pour enrichir notre offre.",
        },
        {
          question: "Les activités de détente sont-elles personnalisables ?",
          response:
            "Bien que les activités elles-mêmes ne soient pas personnalisables, vous pouvez choisir celles qui vous conviennent le mieux et les marquer comme favorites pour un accès rapide.",
        },
        {
          question:
            "Puis-je partager mes activités de détente favorites avec d'autres utilisateurs ?",
          response:
            "Actuellement, il n'est pas possible de partager directement vos activités favorites avec d'autres utilisateurs. Cependant, vous pouvez recommander l'application et ses fonctionnalités à vos amis et votre famille.",
        },
        {
          question:
            "Comment les activités de détente sont-elles sélectionnées pour le catalogue ?",
          response:
            "Les activités sont sélectionnées par notre équipe en fonction de leur efficacité à réduire le stress et à améliorer le bien-être mental. Nous nous basons sur des recherches et des retours d'utilisateurs pour enrichir notre catalogue.",
        },
        {
          question:
            "Y a-t-il une limite au nombre d'activités de détente que je peux marquer comme favorites ?",
          response:
            "Il n'y a pas de limite au nombre d'activités que vous pouvez marquer comme favorites. Vous pouvez organiser vos préférences comme bon vous semble pour un accès facile.",
        },
        {
          question: "Comment fonctionne le journal de suivi des émotions ?",
          response:
            "Le journal permet aux utilisateurs de suivre et d'analyser leurs émotions quotidiennes. Ils peuvent ajouter, modifier et supprimer des entrées, et visualiser des rapports pour mieux comprendre leurs schémas émotionnels.",
        },
        {
          question: "Comment créer un compte sur CESIZen ?",
          response:
            "Pour créer un compte, suivez les instructions d'inscription. Vous devrez fournir une adresse e-mail valide et créer un mot de passe.",
        },
        {
          question: "Puis-je utiliser l'application sans créer de compte ?",
          response:
            "Oui, les visiteurs anonymes peuvent accéder à certaines informations générales et utiliser des fonctionnalités limitées sans se connecter.",
        },
        {
          question: "Mes données personnelles sont-elles sécurisées ?",
          response:
            "Oui, CESIZen prend la confidentialité et la sécurité des données très au sérieux. Toutes les informations personnelles sont stockées de manière sécurisée et ne sont pas partagées avec des tiers sans votre consentement.",
        },
        {
          question:
            "Comment puis-je personnaliser les exercices de respiration ?",
          response:
            "Les utilisateurs connectés peuvent choisir et personnaliser leurs exercices de respiration en fonction de leurs besoins, en ajustant la durée et le type d'exercice.",
        },
        {
          question: "Puis-je marquer mes activités de détente préférées ?",
          response:
            "Oui, les utilisateurs connectés peuvent marquer leurs activités de détente préférées dans le catalogue pour un accès rapide.",
        },
        {
          question:
            "Que faire si j'ai des questions ou des problèmes techniques ?",
          response:
            "Vous pouvez consulter notre centre d'aide ou contacter notre support technique via l'application ou notre site web.",
        },
      ],
      currentPage: 1,
      articlesPerPage: 5,
    };
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.articles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    },
  },
  methods: {
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
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;700&display=swap");

.info {
  margin-top: 10rem;
  margin-bottom: 4rem;
  padding: 0 1rem;
  font-family: "Open Sans", sans-serif;
}

h1 {
  font-size: 32px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  color: #000000;
  text-align: center;
}

.info_container {
  max-width: 90%;
  margin: 0 auto 2rem auto;
  padding: 1rem;
  background-color: #a06db6;
  border: solid 3px #a9b66d;
  border-radius: 10px;
  color: white;
  text-align: center;
}

h2.article-title {
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  font-weight: bold;
}

p {
  margin: 1rem 2rem;
  text-align: left;
}

li {
  text-align: left;
}

.article {
  border: solid 3px #a9b66d;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.article img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}

.article-source {
  font-size: 0.9rem;
  color: #555;
  text-align: right;
  margin-top: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.pagination button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #a9b66d;
  background-color: #a06db6;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/*  RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  .info {
  margin-top: 12rem;
  margin-bottom: 4rem;
}

h1 {
    margin-top: 8rem;
  }

  h2 {
    font-size: 18px;
  }

  p {
    margin: 1rem;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
    .info {
  margin-top: 2rem;
  margin-bottom: 4rem;
}

h1 {
    margin-top: 1rem;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
