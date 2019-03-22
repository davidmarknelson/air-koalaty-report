describe('Navbar', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  describe('a user who isn\'t logged in', () => {
    it('should have the brand link to the home page', () => {
      cy.get('[data-test=brand-button]').click().url().should('include', '');
    });
  });
});