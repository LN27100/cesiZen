describe('User Registration Flow', () => {
  it('should register a new user', () => {
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: { message: 'User registered successfully' },
    }).as('register');

    cy.visit('http://localhost:8080/register');

    cy.contains('h1', 'Inscription').should('be.visible');
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#username').type('johndoe'); // Champ pseudo
    cy.get('#email').type('john.doe@example.com');
    cy.get('#password').type('Password123!');
    cy.get('#confirmPassword').type('Password123!');
    cy.get('#acceptTerms').check();

    cy.get('form').submit();
    cy.wait('@register');

    cy.url().should('eq', 'http://localhost:8080/login');
  });
});
