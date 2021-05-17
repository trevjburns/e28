// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// https://on.cypress.io/custom-commands

// User
const user = {
    id: 3,
    name: 'test',
    email: 'test@test.com',
    password: 'testeight'
}

Cypress.Commands.add('login', () => {
    cy.visit('/account');
    cy.get('[data-test=email-input]').clear().type(user.email);
    cy.get('[data-test=password-input]').clear().type(user.password);
    cy.get('[data-test=login-button]').click();
    cy.contains('[data-test="welcome-message"]', user.name);
})