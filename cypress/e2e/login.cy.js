/**
 * Login spec
 * 1. Visits the login page and verifies the expected elements are visible.
 * 3. toggle hide/show password must works
 * 4. if user fails login then will sees an error message.
 * 5. Successfully logs in with a valid username and password, and is redirected
 * to the threads page.
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Your Email Address"]').should('be.visible');
    cy.get('input[placeholder="Your Password"]').should('be.visible');
    cy.get('button').contains(/^Submit$/).should('be.visible');
  });
  it('should toggles the password field visibility', () => {
    cy.get('input[placeholder="Your Password"]').type('testExample');

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
  it('displays an error message if login fails', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    });
    cy.get('input[placeholder="Your Email Address"]').type('test@testmail.com');
    cy.get('input[placeholder="Your Password"]').type('testuser123');
    cy.get('button').contains(/^Submit$/).click();
    cy.contains('.go3958317564', 'Invalid credentials');
  });
  it('navigates to the threads page after successful login', () => {
    cy.get('input[placeholder="Your Email Address"]').type('afif12@gmail.com');
    cy.get('input[placeholder="Your Password"]').type('12345678');
    cy.get('button').contains(/^Submit$/).click();
    cy.url().should('include', '/threads');
  });
});
