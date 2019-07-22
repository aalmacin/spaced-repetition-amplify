/// <reference types="Cypress" />

context('CTA', () => {
  beforeEach(() => {
    cy.visit('localhost:4311');
  });

  it('loaded', () => {
    cy.url().should('not.contain', '/app/study');
    cy.get('.banner-cta__button').click();
    cy.url().should('contain', '/app/study');
  });
});
