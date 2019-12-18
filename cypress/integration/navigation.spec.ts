/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('localhost:4311');
  });

  it('loads pages', () => {
    cy.url().should('contain', '/home/landing');

    cy.get('.nav-displayed__toggle-label').click();

    cy.get('a.nav-list__link[href="/auth/signin"').click();

    cy.url().should('contain', '/auth/signin');

    cy.visit('localhost:4311');

    cy.get('.nav-displayed__toggle-label').click();

    cy.get('a.nav-list__link[href="/app/home"').click();
  });
});
