const randomstring = require('randomstring')

const username = randomstring.generate();
const email = `${username}@test.com`
const password = 'greaterthanten'

describe('Index', () => {
  it('should display the page correctly if a user is not logged in', () => {
    cy.visit('/');
    cy.get('h1').contains('Exercises');
    cy.get('.navbar-burger').click();
    cy.get('a').contains('User Status').should('not.be.visible');
    cy.get('a').contains('Log Out').should('not.be.visible');
    cy.get('a').contains('Register');
    cy.get('a').contains('Log In');
    cy.get('a').contains('Swagger');
    cy.get('a').contains('Users');
    cy.get('.notification.is-success').should('not.be.visible');
  });

  it('should display the page correctly if a user is logged in', () => {
    cy.server();
    cy.route('POST', 'auth/register').as('createUser')

    cy.visit('/register');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();
    cy.wait('@createUser');

    cy.get('h1').contains('Exercises');
    cy.get('.navbar-burger').click();
    cy.get('a').contains('User Status');
    cy.get('a').contains('Log Out');
    cy.get('a').contains('Register').should('not.be.visible');
    cy.get('a').contains('Log In').should('not.be.visible');
    cy.get('a').contains('Swagger');
    cy.get('a').contains('Users');
    cy.get('button').contains('Run Code');
    cy.get('.notification.is-warning').should('not.be.visible');
    cy.get('.notification.is-success').should('not.be.visible');
    
  });
});
