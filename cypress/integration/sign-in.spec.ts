/// <reference types="Cypress" />

context.skip('Auth', () => {
  beforeEach(() => {
    cy.visit('localhost:4311/auth/signin');
  });

  it('signin works', () => {
    cy.get('#email').type(Cypress.env('USER_EMAIL'), { log: false });
    cy.get('#password').type(Cypress.env('USER_PWD'), { log: false });
    cy.get('.form button').click();
  });
});
