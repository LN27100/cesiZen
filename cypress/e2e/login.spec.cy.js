describe('Test de non-régression - Composant de Connexion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('Doit afficher le formulaire de connexion', () => {
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Se connecter');
  });

  it('Doit permettre la soumission du formulaire avec des identifiants valides', () => {
    // JWT simulé valide pour éviter une erreur de décodage
    const validFakeJWT =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIn0.dummySignature123456789';

    cy.intercept('POST', '**/users/login', {
      statusCode: 200,
      body: {
        auth: true,
        token: validFakeJWT,
      },
    }).as('loginRequest');

    // Remplir les champs
    cy.get('input[type="email"]').type('fleur27@gmail.com');
    cy.get('input[type="password"]').type('02111979Lh');
    cy.get('button[type="submit"]').click();

    // Vérifie que l'appel a été fait
    cy.wait('@loginRequest');

    // Vérifie la redirection vers /
    cy.url().should('eq', 'http://localhost:8080/');
  });

  it('Doit afficher un message d\'erreur avec des identifiants invalides', () => {
    // Simule une réponse d'erreur
    cy.intercept('POST', '**/users/login', {
      statusCode: 401,
      body: {
        message: 'Identifiants incorrects',
      },
    }).as('loginRequestFail');

    // Surveille les alertes
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Identifiants incorrects');
    });

    cy.get('input[type="email"]').type('invaliduser@mail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequestFail');
  });
});
