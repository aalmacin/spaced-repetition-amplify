/// <reference types="Cypress" />

context('Home Page', () => {
  beforeEach(() => {
    cy.visit('localhost:4311');
  });

  it('loaded', () => {
    cy.get('app-landing-page').contains('Spaced Repetition');
  });
});
