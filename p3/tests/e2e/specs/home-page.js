// https://docs.cypress.io/api/introduction/api.html

describe('Home Page', () => {
  it('Visits the home page', () => {
    cy.visit('/');
    cy.contains('h2', 'Available Decks');
    cy.get('.deck-name').should('have.length', 2);
  })

  it('attempts to access deck unauthorized', () => {

    const deck = {
      name: 'geography'
    }

    cy.visit('/');
    cy.get('.deck-name').contains(deck.name).click();
    cy.contains('h1', "Access Denied");
  })

})
