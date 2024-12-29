<template>
  <div class="activities">
    <h1>Activités détente</h1>
    <div class="card mt-4">
      <div class="card-body">
        <!-- Contenu de la carte -->
      </div>
    </div>
    <img src="../assets/images/lotus_2.png" alt="Activité" class="lotus">
  </div>
</template>

<script>
export default {
  name: 'detenteActivities',
  methods: {
    handleClick() {
      alert("Activités détente cliqué !");
    }
  }
};
</script>

<style scoped>
/* Import de la police Nunito */
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.activities {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: black;
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
  color: white;
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
}

.action-button {
  background-color: #8850A1;
  color: white;
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
  background-color: #5F3870;
}

.action-button:disabled {
  background-color: #8850A1;
  cursor: not-allowed;
}

.action-button:disabled:hover {
  background-color: #ccc;
}

.button-label {
  margin-top: 10px;
  font-size: 1rem;
  color: black;
}

.icon {
  width: 50px;
  height: 50px;
}
</style>
