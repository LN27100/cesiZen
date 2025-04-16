<template>
    <div class="info">
      <h1>Mentions légales</h1>
      <div class="info_container">
        <p>En vigueur au 12/05/2025</p>
        <p>
          Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie
          numérique, il est porté à la connaissance des utilisateurs et visiteurs, ci-après l' "Utilisateur", du site
          http://localhost:8080/, ci-après le "Site", les présentes mentions légales.
        </p>
        <p>
          La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans
          réserve des présentes mentions légales.
          Ces dernières sont accessibles sur le Site à la rubrique "Mentions légales".
        </p>
  
        <h2>Édition du site</h2>
        <p>
          L’édition et la direction de la publication du Site est assurée par Madame Hélène Poirier-Halley,
          domiciliée 69 rue de la science 27100 Val de Reuil, dont le numéro de téléphone est 0602400216, et
          l'adresse e-mail heloceinlove@laposte.net.
          ci-après l'"Editeur".
        </p>
  
        <h2>Hébergeur</h2>
        <p>
          L'hébergeur du Site est la société hostinger, dont le siège social est situé au Hostinger, UAB Jonavos
          g. 60C 44192 Kaunas.
        </p>
  
        <h2>Accès au site</h2>
        <p>
          Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, l'Editeur pourra, à tout
          moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou
          des modifications de son contenu. L'Editeur ne pourra en aucun cas être tenu responsable des
          conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.
        </p>
  
        <h2>Collecte des données</h2>
        <p>
          Le Site assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect
          de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
          et aux libertés et dans le respect de la règlementation applicable en matière de traitement des données
          à caractère personnel conformément au règlement (UE) 2016/679 du Parlement européen et du
          Conseil du 27 avril 2016 (ci-après, ensemble, la "Règlementation applicable en matière de
          protection des Données à caractère personnel").
        </p>
        <p>
          En vertu de la Règlementation applicable en matière de protection des Données à caractère
          personnel, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de
          ses données personnelles. L'Utilisateur peut exercer ce droit :
          · depuis son espace personnel ;
        </p>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site,
          sans autorisation expresse de l’Editeur est prohibée et pourra entraîner des actions et poursuites
          judiciaires telles que prévues par la règlementation en vigueur.
        </p>
        <p>Rédigé sur http://legalplace.fr</p>
      </div>
    </div>
  </template>

<script>
export default {
  name: "LegalView",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;700&display=swap');

.info {
  margin-top: 10rem;
  margin-bottom:4rem;
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

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-top: 2rem;
  text-align: center;
}

p {
  margin: 1rem 2rem;
  text-align: left;
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
