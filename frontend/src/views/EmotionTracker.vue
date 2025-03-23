<template>
    <div>
      <h1>Tracker d'Émotions Quotidien</h1>
      <div v-if="!isAuthenticated">
        <p>Veuillez vous connecter pour suivre vos émotions.</p>
        <button @click="redirectToLogin">Se connecter</button>
      </div>
  
      <div v-else class="emotion-tracker">
        <!-- Affichage en liste sur mobile -->
        <div class="mobile-view">
          <div v-for="type in typesEmotions" :key="type.id_type" class="emotion-group">
            <h2>
              <img :src="getIconPath(type.nom_type)" :alt="type.nom_type" width="30" height="30" />
            </h2>
            <ul>
              <li v-for="emotion in emotionsByType(type.id_type)" :key="emotion.id_emotion">
                <button @click="selectEmotion(emotion)">{{ emotion.nom_emotion }}</button>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Affichage en tableau sur les tablettes et écrans bureaux -->
        <table class="desktop-view">
          <thead>
            <tr>
              <th v-for="type in typesEmotions" :key="type.id_type">
                <img :src="getIconPath(type.nom_type)" :alt="type.nom_type" width="30" height="30" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="type in typesEmotions" :key="type.id_type">
                <ul>
                  <li v-for="emotion in emotionsByType(type.id_type)" :key="emotion.id_emotion">
                    <button @click="selectEmotion(emotion)">{{ emotion.nom_emotion }}</button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-if="selectedEmotion" class="selected-emotion">
          <h3>Émotion sélectionnée : {{ selectedEmotion.nom_emotion }}</h3>
          <textarea v-model="commentaire" placeholder="Ajouter un commentaire"></textarea>
          <button @click="saveEmotion">Enregistrer l'émotion</button>
        </div>
  
        <div class="emotion-history-card">
          <h3>Historique des émotions enregistrées</h3>
          <div v-if="trackerEmotions.length > 0">
            <ul>
              <li v-for="emotion in trackerEmotions" :key="emotion.id_emotion">
                <p>
                  <strong>{{ emotion.nom_emotion || 'Émotion inconnue' }}</strong>
                  -
                  {{ formatDate(emotion.date_emotion) }}
                </p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Aucune émotion enregistrée pour le moment.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmotionTrackerView',
    data() {
      return {
        emotions: [],
        typesEmotions: [],
        selectedEmotion: null,
        commentaire: '',
        isAuthenticated: false,
        trackerEmotions: []
      };
    },
    async created() {
      this.checkAuthentication();
      if (this.isAuthenticated) {
        await this.fetchEmotions();
        await this.fetchTypesEmotions();
        await this.fetchTrackerEmotions();
      }
    },
    methods: {
      formatDate(date) {
        const dateObj = new Date(date);
  
        if (isNaN(dateObj)) {
          return date;
        }
  
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return dateObj.toLocaleDateString('fr-FR', options);
      },
      async fetchEmotions() {
        try {
          const response = await fetch('http://localhost:3000/api/emotions');
          const data = await response.json();
          if (Array.isArray(data)) {
            this.emotions = data;
          } else {
            console.error('Réponse inattendue de l\'API des émotions:', data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des émotions:', error);
        }
      },
      async fetchTypesEmotions() {
        try {
          const response = await fetch('http://localhost:3000/api/types-emotions');
          const data = await response.json();
          if (Array.isArray(data)) {
            this.typesEmotions = data;
          } else {
            console.error('Réponse inattendue de l\'API des types d\'émotions:', data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des types d\'émotions:', error);
        }
      },
      async fetchTrackerEmotions() {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Aucun token trouvé, impossible de récupérer les émotions suivies.');
          return;
        }
        try {
          const response = await fetch('http://localhost:3000/api/tracker-emotions', {
            headers: {
              'x-access-token': token
            }
          });
          const data = await response.json();
          if (response.ok && Array.isArray(data)) {
            // Lie les émotions enregistrées avec les émotions existantes
            this.trackerEmotions = data.map(trackerEmotion => {
              const emotion = this.emotions.find(e => e.id_emotion === trackerEmotion.id_emotion);
              if (emotion) {
                trackerEmotion.nom_emotion = emotion.nom_emotion;
              } else {
                trackerEmotion.nom_emotion = 'Émotion inconnue';
              }
              return trackerEmotion;
            });
          } else {
            console.error('Réponse inattendue de l\'API des émotions suivies:', data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des émotions suivies:', error);
        }
      },
      emotionsByType(id_type) {
        return this.emotions.filter(emotion => emotion.id_type === id_type);
      },
      selectEmotion(emotion) {
        this.selectedEmotion = emotion;
      },
      async saveEmotion() {
        if (!this.isAuthenticated) {
          alert('Vous devez être connecté pour enregistrer une émotion.');
          return;
        }
        const trackerEmotion = {
          id_emotion: this.selectedEmotion.id_emotion,
          commentaire: this.commentaire,
          date_emotion: new Date().toISOString().split('T')[0],
        };
        try {
          const response = await fetch('http://localhost:3000/api/tracker-emotions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(trackerEmotion)
          });
          if (response.ok) {
            alert('Émotion enregistrée avec succès !');
            this.selectedEmotion = null;
            this.commentaire = '';
            this.fetchTrackerEmotions();  
          } else {
            console.error('Erreur lors de l\'enregistrement de l\'émotion:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de l\'enregistrement de l\'émotion:', error);
        }
      },
      checkAuthentication() {
        const token = localStorage.getItem('token');
        this.isAuthenticated = !!token;
      },
      redirectToLogin() {
        this.$router.push({ name: 'Login' });
      },
      getIconPath(nomType) {
        const iconMap = {
          'joie': '@/assets/icones/happiness.png',
          'colère': '@/assets/icones/angry.png',
          'peur': '@/assets/icones/peur.png',
          'tristesse': '@/assets/icones/sad-face.png',
          'surprise': '@/assets/icones/surprise.png',
          'dégoût': '@/assets/icones/nauseated.png'
        };
        return iconMap[nomType] || '';
      }
    }
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");
  
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0;
  }
  
  h1 {
    font-family: "Nunito", sans-serif;
    font-size: 24px;
    text-align: center;
    margin: 1rem 0;
  }
  
  .emotion-tracker {
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    background-color: #a06db6;
    border: 3px solid #a9b66d;
    border-radius: 10px;
    padding: 1rem;
    color: white;
  }
  
  .mobile-view {
    display: block;
  }
  
  .emotion-group {
    margin-bottom: 1.5rem;
  }
  
  .emotion-group h2 {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
    color: white;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
  }
  
  li {
    margin: 5px 0;
  }
  
  button {
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #84b66d;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #69a050;
  }
  
  textarea {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  textarea:focus {
    border-color: #84b66d;
    outline: none;
  }
  
  .selected-emotion {
    margin-top: 20px;
  }
  
  .selected-emotion h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: white;
  }
  
  /* tableau masqué en mode mobile */
  .desktop-view {
    display: none;
  }
  
  /* Card d'historique des émotions */
  .emotion-history-card {
    margin-top: 20px;
    padding: 1rem;
    border-radius: 8px;
    color: #333;
  }
  
  .emotion-history-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .emotion-history-card ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
  }
  
  .emotion-history-card li {
    margin: 5px 0;
  }
  
  .emotion-history-card p {
    font-size: 1rem;
    color: #333;
  }
  
  /* RESPONSIVE */
  /* Tablettes (768px - 1024px) */
  @media (min-width: 768px) {
    h1 {
      font-size: 28px;
      margin-top: 4rem;
    }
  
    .emotion-tracker {
      max-width: 80%;
      padding: 2rem;
    }
  
    /* Masque la version liste pour afficher le tableau */
    .mobile-view {
      display: none;
    }
  
    .desktop-view {
      display: table;
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
  
    thead {
      display: table-header-group;
      background-color: #84b66d;
    }
  
    tbody {
      display: table-row-group;
    }
  
    tr {
      display: table-row;
    }
  
    th, td {
      display: table-cell;
      width: auto;
      text-align: center;
      padding: 10px;
      border: 1px solid #ccc;
    }
  
    th {
      color: white;
      font-size: 1rem;
    }
  }
  
  /* Ecran bureau (> 1024px) */
  @media (min-width: 1024px) {
    h1 {
      font-size: 32px;
      margin-top: 6rem;
    }
  
    .emotion-tracker {
      max-width: 70%;
    }
  
    th, td {
      padding: 15px;
      font-size: 1.1rem;
    }
  }
  </style>
  