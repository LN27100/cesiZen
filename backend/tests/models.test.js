const db = require('../config/db');
jest.mock('../config/db');

// Correction des importations
const User = require('../models/User');               
const Activite = require('../models/Activites');      
const Emotion = require('../models/Emotion');
const Favoris = require('../models/Favoris');         
const Categorie = require('../models/Categorie');
const Info = require('../models/Info');


describe('Models', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('User model', () => {
    it('should create a user', () => {
      const mockUser = { prenom: 'Test', nom: 'User', email: 'test@example.com', mot_de_passe: 'pass', pseudo: 'testuser', role: 'user' };
      User.create(mockUser, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all users', () => {
      User.findAll(() => {});
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM utilisateur', expect.any(Function));
    });

    it('should find user by email', () => {
      User.findByEmail('test@example.com', () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should update a user', () => {
      const updatedUser = { prenom: 'New', nom: 'Name', email: 'new@example.com', mot_de_passe: 'newpass', pseudo: 'newpseudo', role: 'admin' };
      User.update(1, updatedUser, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete a user', () => {
      User.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('Activite model', () => {
    it('should create an activity', () => {
      const mockActivite = { nom_activite: 'Yoga', description_activite: 'Relaxation', status_activite_détente: 'active', id_categorie: 1, duree_minutes: 30, sous_categorie: 'zen', nom_image: 'yoga.jpg', nom_image_2: 'yoga2.jpg', lien_video: 'link' };
      Activite.create(mockActivite, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all activities', () => {
      Activite.findAll(() => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find activity by category', () => {
      Activite.findByCategory(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should update an activity', () => {
      const updatedActivite = { nom_activite: 'Pilates', description_activite: 'Stretching', status_activite_détente: 'inactive', id_categorie: 2, duree_minutes: 45, sous_categorie: 'souplesse', nom_image: 'pilates.jpg', nom_image_2: 'pilates2.jpg', lien_video: 'link2' };
      Activite.update(1, updatedActivite, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete an activity', () => {
      Activite.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('Emotion model', () => {
    it('should create an emotion', () => {
      const mockEmotion = { nom_emotion: 'Joie', id_type: 1 };
      Emotion.create(mockEmotion, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all emotions', () => {
      Emotion.findAll(() => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find emotion by id', () => {
      Emotion.findById(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should update an emotion', () => {
      const updatedEmotion = { nom_emotion: 'Tristesse', id_type: 2 };
      Emotion.update(1, updatedEmotion, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete an emotion', () => {
      Emotion.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('Favoris model', () => {
    it('should create a favorite', () => {
      const mockFavori = { id_activite: 1, id_exercice: null, id_utilisateur: 2 };
      Favoris.create(mockFavori, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all favorites', () => {
      Favoris.findAll(() => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find favorite by id', () => {
      Favoris.findById(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find favorites by user id', () => {
      Favoris.findByUserId(2, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should update a favorite', () => {
      const updatedFavori = { id_activite: 3, id_exercice: null, id_utilisateur: 2 };
      Favoris.update(1, updatedFavori, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete a favorite', () => {
      Favoris.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('Categorie model', () => {
    it('should create a category', () => {
      const mockCategorie = { nom_categorie: 'Relaxation' };
      Categorie.create(mockCategorie, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all categories', () => {
      Categorie.findAll(() => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find category by id', () => {
      Categorie.findById(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find category by name', () => {
      Categorie.findByName('Relaxation', () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should update a category', () => {
      const updatedCategorie = { nom_categorie: 'Sport' };
      Categorie.update(1, updatedCategorie, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete a category', () => {
      Categorie.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });
});

  describe('Info model', () => {
    it('should create an info', () => {
      const mockInfo = { titre: 'News', description: 'Big update', auteur: 'Admin', nom_image: 'news.jpg' };
      Info.create(mockInfo, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all infos', () => {
      Info.findAll(() => {});
      expect(db.query).toHaveBeenCalledWith(
        'SELECT id_information, titre, description AS content, auteur, nom_image AS image FROM information',
        expect.any(Function)
      );
    });

    it('should update an info', () => {
      const updatedInfo = { titre: 'Updated News', description: 'Major update', auteur: 'Admin', nom_image: 'updated.jpg' };
      Info.update(1, updatedInfo, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete an info', () => {
      Info.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });


  describe('Info model', () => {
    it('should create an info', () => {
      const mockInfo = { titre: 'News', description: 'Big update', auteur: 'Admin', nom_image: 'news.jpg' };
      Info.create(mockInfo, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should find all infos', () => {
      Info.findAll(() => {});
      expect(db.query).toHaveBeenCalledWith(
        'SELECT id_information, titre, description AS content, auteur, nom_image AS image FROM information',
        expect.any(Function)
      );
    });

    it('should update an info', () => {
      const updatedInfo = { titre: 'Updated News', description: 'Major update', auteur: 'Admin', nom_image: 'updated.jpg' };
      Info.update(1, updatedInfo, () => {});
      expect(db.query).toHaveBeenCalled();
    });

    it('should delete an info', () => {
      Info.delete(1, () => {});
      expect(db.query).toHaveBeenCalled();
    });
  });
