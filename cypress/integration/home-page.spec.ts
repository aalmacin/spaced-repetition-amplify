/// <reference types="Cypress" />

context('Home Page', () => {
  beforeEach(() => {
    cy.visit('localhost:4311');
  });

  it('loaded', () => {
    cy.get('app-landing-page').contains('Spaced Repetition');
    cy.get('.nav-displayed__login').should('be.visible');
    cy.get('.nav-list-container').should('not.be.visible');

    cy.get('.banner-cta__button').contains('Start now');

    cy.get('.nav-displayed__toggle-label').click();
    cy.get('.nav-list-container').should('be.visible');

    cy.get('.nav-list-close').should('be.visible');
    cy.get('.nav-list-close').click();
    cy.get('.nav-list-close').should('not.be.visible');
  });
});
