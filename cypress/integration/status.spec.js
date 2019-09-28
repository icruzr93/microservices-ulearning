const randomstring = require("randomstring");

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';

describe("Status", () => {

  it('should not display user info if a user is not logged in', () => {
      cy.visit("/status")
      cy.get("p").contains("You must be logged in to view this.")
      cy.get("a").contains("User Status").should("not.be.visible")
      cy.get("a").contains("Log Out").should("not.be.visible")
      cy.get("a").contains('Register')
      cy.get("a").contains('Log In');
  })

  it('should display user info if a user is logged in', () => {
    // register user
    cy.visit('/register')
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[type="submit"]').click()
    cy.get(".navbar-burger").click();

    cy.wait(500);

    // assert '/status' is displayed properly
    cy.visit('/status');
    cy.get('.navbar-burger').click();
    cy.contains('User Status').click();
    cy.get('li > strong').contains('User ID:')
    cy.get('li > strong').contains('Email:')
    cy.get('li').contains(email)
    cy.get('li > strong').contains('Username:')
    cy.get('li').contains(username)
    cy.get('a').contains('User Status')
    cy.get('a').contains('Log Out')
    cy.get('a').contains('Register').should('not.be.visible')
    cy.get('a').contains('Log In').should('not.be.visible');
  })
});
