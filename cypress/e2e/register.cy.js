describe('User Registration Flow', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:8080/register');
    cy.contains('h1', 'Inscription').should('be.visible'); // Vérifie que le titre "Inscription" est visible
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('#acceptTerms').check();

    // Intercepter la requête et simuler une réponse réussie
    cy.intercept('POST', 'http://localhost:3000/api/users/register', {
      statusCode: 201,
      body: { message: 'User registered successfully' },
    }).as('register');

    cy.get('form').submit();

    // Attendre que la requête soit interceptée
    cy.wait('@register');

    // Vérifie que l'utilisateur est redirigé vers la page de connexion
    cy.url().should('eq', 'http://localhost:8080/login');
  });
});
