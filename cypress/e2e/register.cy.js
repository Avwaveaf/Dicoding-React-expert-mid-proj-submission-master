/**
 * Register spec
1. verifying that the registration form is displayed correctly
2. testing the functionality of a password toggle button
3. checking for error messages when registration fails or when the password does not match
4. verifying that the user is redirected to the login page after successful registration.
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Your Usernmame"]').should('be.visible');
    cy.get('input[placeholder="Your Email Address"]').should('be.visible');
    cy.get('input[placeholder="Your Password"]').should('be.visible');
    cy.get('input[placeholder="Confirm Your Password"]').should('be.visible');
    cy.get('button').contains(/^Submit$/).should('be.visible');
  });
  it('should toggles the password field visibility', () => {
    cy.get('input[placeholder="Your Password"]').type('should shown now');
    cy.get('input[placeholder="Confirm Your Password"]').type('should shown now');

    cy.get('[data-testid="toggle-password-button"]')
      .click()
      .then(() => {
        cy.get('#password-field')
          .should('have.attr', 'type', 'text');
      });

    cy.get('[data-testid="toggle-password-button"]')
      .click()
      .then(() => {
        cy.get('#password-field')
          .should('have.attr', 'type', 'password');
      });
  });

  it('displays an error message if register fails', () => {
    cy.get('input[placeholder="Your Usernmame"]').type('tester');
    cy.get('input[placeholder="Your Email Address"]').type('afif12@gmail.com');
    cy.get('input[placeholder="Your Password"]').type('12345678');
    cy.get('input[placeholder="Confirm Your Password"]').type('12345678');
    cy.get('button').contains(/^Submit$/).click();
    cy.get('.go3958317564').should('be.visible');
  });
  it('displays an error message if password not match', () => {
    cy.get('input[placeholder="Your Usernmame"]').type('testuser');
    cy.get('input[placeholder="Your Email Address"]').type('sampleTest1@gmail.com');
    cy.get('input[placeholder="Your Password"]').type('12345678');
    cy.get('input[placeholder="Confirm Your Password"]').type('1234567810');
    cy.get('button').contains(/^Submit$/).click();
    cy.get('.go3958317564').should('be.visible');
  });

  it('navigates to the login page after successful register', () => {
    cy.get('input[placeholder="Your Usernmame"]').type('sampleuser23456');
    cy.get('input[placeholder="Your Email Address"]').type('testUser331ase1221@gmail.com');
    cy.get('input[placeholder="Your Password"]').type('12345678');
    cy.get('input[placeholder="Confirm Your Password"]').type('12345678');
    cy.get('button').contains(/^Submit$/).click();
    cy.url().should('include', '/login');
  });
});
