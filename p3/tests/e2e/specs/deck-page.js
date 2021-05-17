// https://docs.cypress.io/api/introduction/api.html

describe('Deck Page', () => {
    it('Logs in as user', () => {

        const user = {
            email: "test@test.com",
            password: "testeight",
            name: "test"
        }

        cy.visit('/account');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type(user.password);
        cy.get('[data-test=login-button]').click();
        cy.contains('[data-test="welcome-message"]', user.name);
    })

    it('Accesses a deck', () => {
        cy.login();
        cy.visit('/deck/geography');
        cy.get('.flashcard').should('have.length', 1);
    })

    it('Receives appropriate feedback for correct/incorrect answer', () => {
        cy.get('[data-test="card-input"]').clear().type('wrong answer');
        cy.get('[data-test="card-submit"]').click();
        cy.get('[data-test="negative-feedback"]').should('exist');
        cy.get('[data-test="positive-feedback"]').should('not.exist')
        cy.get('[data-test="card-input"]').clear().type('Moscow');
        cy.get('[data-test="card-submit"]').click();
        cy.get('[data-test="positive-feedback"]').should('exist');
        cy.get('[data-test="negative-feedback"]').should('not.exist')
    })
  
  })
  