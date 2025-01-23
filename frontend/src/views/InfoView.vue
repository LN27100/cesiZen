<template>
  <div class="info">
    <h1>Informations utiles</h1>
    <div class="info_container">
      <p>
        Vous trouverez ici des informations sur la gestion du stress et la santé
        mentale.
      </p>
    </div>

    <div v-for="(article, index) in paginatedArticles" :key="index" class="article">
      <h2 class="article-title">{{ article.title }}</h2>
      <p v-html="article.content"></p>
      <img v-if="article.image" :src="require(`@/assets/images/${article.image}`)" :alt="article.title">
      <p class="article-source">Source croixrouge.ca</p>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import articles from '@/assets/articles.json';

export default {
  name: "InfoView",
  data() {
    return {
      articles: articles,
      currentPage: 1,
      articlesPerPage: 5
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
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;700&display=swap');

.info {
  margin-top: 50px;
  padding: 0 1rem;
  font-family: 'Open Sans', sans-serif;
}

h1 {
  font-size: 32px;
  font-family: 'Nunito', sans-serif;
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

/* Media Queries */
@media (max-width: 1200px) {
  h1 {
    font-size: 2rem;
  }

  h2.article-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  h2.article-title {
    font-size: 1.125rem;
  }

  p {
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    margin-top: 10rem;
    font-size: 1.5rem;
  }

  h2.article-title {
    font-size: 1rem;
  }

  p {
    margin: 0.5rem;
  }

  .info_container {
    padding: 0.5rem;
  }
}
</style>
