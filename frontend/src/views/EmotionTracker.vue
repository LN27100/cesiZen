<template>
    <div>
      <h1>Tracker d'Émotions Quotidien</h1>
      <div v-if="!isAuthenticated">
        <p>Veuillez vous connecter pour suivre vos émotions.</p>
        <button @click="redirectToLogin">Se connecter</button>
      </div>
      <div v-else class="emotion-tracker">
        <table>
          <thead>
            <tr>
              <th v-for="type in typesEmotions" :key="type.id_type">{{ type.nom_type }}</th>
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
        isAuthenticated: false
      };
    },
    async created() {
      this.checkAuthentication();
      if (this.isAuthenticated) {
        await this.fetchEmotions();
        await this.fetchTypesEmotions();
      }
    },
    methods: {
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
          id_configuration: 1
        };
        try {
          const response = await fetch('http://localhost:3000/api/tracker-emotions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem('token') // Ajoutez le token dans les headers
            },
            body: JSON.stringify(trackerEmotion)
          });
          if (response.ok) {
            alert('Émotion enregistrée avec succès !');
            this.selectedEmotion = null;
            this.commentaire = '';
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
      }
    }
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Open+Sans:wght@400;600&display=swap");
  
  .emotion-tracker {
    max-width: 90%;
    margin: 0 auto;
    background-color: #a06db6;
    border: solid 3px #a9b66d;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  h1 {
    font-family: "Nunito", sans-serif;
    font-size: 32px;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #84b66d;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  th {
    color: white;
    font-size: 1.2rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  
  button {
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
    height: 100px;
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
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
  }
  
  /* Tablette : entre 768px et 1024px */
  @media (min-width: 768px) {
    h1 {
      margin-top: 6rem;
    }
  
    .emotion-tracker {
      max-width: 80%;
    }
  }
  
 
  </style>
  