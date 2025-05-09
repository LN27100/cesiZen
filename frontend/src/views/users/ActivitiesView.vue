<template>
  <div class="activities">
    <h1>Activités</h1>
    <div class="card mt-4">
      <div class="card-body">
        <p class="card-text">
          Prenez soin de vous à votre rythme ! Explorez des outils simples et
          pratiques pour vous aider à vous relaxer et à recentrer vos pensées.
        </p>
      </div>
    </div>
    <img src="../../assets/images/lotus_2.png" alt="Activité" class="lotus" />
    <div class="buttons">
      <div class="button-container">
        <button class="action-button" @click="handleClick">
          <img
            src="../../assets/icones/activités_détentes.png"
            alt="Activités détente"
            class="icon"
          />
        </button>
        <p class="button-label">Activités<br />détente</p>
      </div>
      <div class="button-container">
        <button class="action-button" disabled>
          <img
            src="../../assets/icones/exercices_respi.png"
            alt="Exercices de respiration"
            class="icon"
          />
        </button>
        <p class="button-label">Exercices<br />de respiration</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivitiesView",
  methods: {
    handleClick() {
      this.$router.push({ name: "CategoriesView" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activities {
  text-align: center;
  margin-top: 2rem;
}

h1 {
  margin-top: 9rem;
  font-size: 32px;
  font-weight: bold;
  color: #000000;
  font-family: "Nunito", sans-serif;
}

.card {
  max-width: 80%;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 2px #a9b66d;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 1rem;
  color: #ffffff;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.lotus {
  display: block;
  margin: 20px auto;
  max-width: 100%;
  height: auto;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.button-container {
  text-align: center;
  margin-bottom: 4rem;
}

.action-button {
  background-color: #8850a1;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
}

.action-button:hover {
  background-color: #5f3870;
}

.action-button:disabled {
  background-color: #8850a1;
  cursor: not-allowed;
}

.action-button:disabled:hover {
  background-color: #ccc;
}

.button-label {
  margin-top: 10px;
  font-size: 1rem;
  color: #000000;
  font-family: "Open Sans", sans-serif;
}

.icon {
  width: 50px;
  height: 50px;
}

/*  RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) and (max-width: 1023px) {
  h1 {
    margin-top: 10rem;
  }

  .buttons {
    flex-direction: row;
  }

  .card {
    max-width: 80%;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .card {
    max-width: 600px;
  }
}
</style>
