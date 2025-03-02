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
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");

.home {
  text-align: center;
  margin-top: 20px; 
  padding: 10px;
}

h1 {
  font-size: 32px; 
  color: black;
  font-family: "Nunito", sans-serif;
}

p {
  font-size: 16px;
  color: black;
  font-family: "Open Sans", sans-serif;
}

.card {
  width: 90%; 
  margin: 20px auto;
  background-color: #a06db6;
  border: solid 2px #a9b66d;
  border-radius: 10px;
  padding: 15px;
}

.carousel {
  width: 100%; 
  margin: 20px auto;
  background-color: #a06db6;
}

.carousel-row {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de s'empiler verticalement sur les petits écrans */
  justify-content: center;
}

.carousel-item img {
  width: 100px;
  height: 100px;
  margin: 10px;
}

/* RESPONSIVE */
/* Tablette : entre 768px et 1024px */
@media (min-width: 768px) {
  h1 {
    margin-top: 2rem;
    font-size: 32px;
  }

  .card {
    width: 80%;
  }

  .carousel-item img {
    width: 150px;
    height: 150px;
  }
}

/* Bureau : au-dessus de 1024px */
@media (min-width: 1024px) {
  .card {
    max-width: 600px;
  }

  .carousel {
    max-width: 60%;
  }

  .carousel-item img {
    width: 200px;
    height: 200px;
  }
}
</style>