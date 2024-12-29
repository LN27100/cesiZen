<template>
  <div class="home">
    <h1>CESIZen</h1>
    <p>“L’application de votre santé mentale”</p>

    <div class="card mt-4">
      <div class="card-body">
        <p class="card-text">
          Bienvenue sur votre espace de sérénité ! CESIZen est une application
          dédiée à votre bien-être mental. Découvrez nos fonctionnalités et
          commencez votre voyage pour mieux comprendre vos émotions, réduire
          votre stress et cultiver votre bien-être au quotidien.
        </p>
      </div>
    </div>

    <br>
    <h3>Les plus consultées</h3>

    <!-- Carrousel -->
    <div
      id="carouselExampleControls"
      class="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="carousel-row">
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 1"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 2"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 3"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 4"
            />
          </div>
        </div>
        <div class="carousel-item">
          <div class="carousel-row">
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 4"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 5"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 6"
            />
            <img
              src="../assets/images/flower.jpg"
              class="d-block"
              alt="Slide 1"
            />
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
/* Import de la police Nunito */
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  color: black;
  font-family: "Nunito", sans-serif;
}

.card {
  max-width: 600px;
  margin: 0 auto;
  background-color: #a06db6;
  border: solid 2px #a9b66d;
}

.carousel {
  max-width: 60%;
  margin: 0 auto;
  background-color: #a06db6;
}

.carousel-row {
  display: flex;
  justify-content: space-between;
}

.carousel-item img {
  width: 200px;
  height: 200px;
  margin: 1rem;
}
</style>
