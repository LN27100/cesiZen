<template>
  <header class="header">
    <div class="header-content">
      <!-- Image à gauche, plus grande -->
      <img src="../assets/images/flower.jpg" alt="Background Image" class="header-image" />
      <!-- Logo à droite avec fond vert, superposé sur l'image -->
      <div class="logo-container">
        <img src="../assets/icones/logoCesiZen.png" alt="Logo" class="logo" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.header {
  background-color: #A06DB6;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  height: 100px;
  margin: 0;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.header-image {
  width: 13%;
  height: auto;
}

.logo-container {
  position: absolute;
  top: 50%;
  right: 84.2%;
  transform: translateY(-50%);
  background-color: #84B66D;
  padding: 0 16px;
  z-index: 1; /* Assure que le logo reste au-dessus de l'image */
}

.logo {
  width: 60px;
  height: auto;
}

/* Media Queries pour écrans plus petits */
@media (max-width: 1024px) {
  .header {
    height: 140px;
  }

  .header-image {
    width: 35%;
  }

  .logo-container {
    right: 59%;
  }

  .logo {
    width: 75px;
    height: auto;
  }
}

@media (max-width: 768px) {
  .header {
    height: 140px;
  }

  .header-image {
    width: 40%;
  }

  .logo-container {
    right: 35%;
  }

  .logo {
    width: 70px;
    height: auto;
  }
}

@media (max-width: 480px) {
  .header {
    height: 120px;
  }

  .header-image {
    width: 69%;
  }

  .logo-container {
    right: 18%; 
  }

  .logo {
    width: 62px;
    height: auto;
  }
}

@media (max-width: 320px) {
  .header-image {
    width: 62%;
  }

  .logo-container {
    right: 25%;
  }

  .logo {
    width: 50px;
    height: auto;
  }

  .header {
    height: 90px;
    padding: 15px;
  }
}
</style>
