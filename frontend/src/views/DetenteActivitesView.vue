<template>
  <div class="activities">
    <img src="@/assets/icones/activités_détentes_black.png" alt="icone activités détente" class="icone">
    <h1>Activités détente</h1>

    <div class="button-container">
      <button class="activity-button" @click="goToCategory('Mandala')">
        <span>Mandala</span>
        <img src="@/assets/icones/mandala.png" alt="icone mandala" />
      </button>
      <button class="activity-button" @click="goToCategory('Relaxation Sonore')">
        <span>Relaxation Sonore</span>
        <img src="@/assets/icones/relaxation_sonore.png" alt="icone relaxation sonore" />
      </button>
      <button class="activity-button" @click="goToCategory('Méditation')">
        <span>Méditation</span>
        <img src="@/assets/icones/meditation.png" alt="icone méditation" />
      </button>
      <button class="activity-button" @click="goToCategory('Étirements Doux')">
        <span>Étirements Doux</span>
        <img src="@/assets/icones/etirements_doux.png" alt="icone étirements doux" />
      </button>
      <button class="activity-button" @click="goToCategory('Activités Expressives')">
        <span>Activités Expressives</span>
        <img src="@/assets/icones/activites_expressives.png" alt="icone activités expressives" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetenteActivitesView',
  methods: {
    goToCategory(category) {
      this.$router.push({ name: 'CategoriesView', params: { category } });
    }
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activities {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 32px;
  color: black;
  font-family: "Nunito", sans-serif;
}

.icone {
  margin-top: 2rem;
  margin-bottom: 1rem;
  width: 5rem;
  height: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  height: 5rem;
  width: 15rem;
  background-color: #84B66D;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
  position: relative;
}

button:hover {
  background-color: #69A050;
}

button img {
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: 1rem;
}

button span {
  flex: 1;
  text-align: center;
  margin-right: 3rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #ccc;
}
</style>
