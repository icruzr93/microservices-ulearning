const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';


describe('Register', () => {
  it('should display the registration form', () => {
    cy
      .visit('/register')
      .get('h1').contains('Register')
      .get('form')
      .get('input[disabled]')
      .get('.validation-list');
    cy.get('.validation-list > .error').first().contains(
        'Username must be greater than 5 characters.');
  });

  it('should allow a user to register', () => {
    // register user
    cy
      .visit('/register')
      .get('input[name="username"]').type(username)
      .get('input[name="email"]').type(email)
      .get('input[name="password"]').type(password)
      .get('input[type="submit"]').click()
  
    // assert user is redirected to '/'
    cy.get('.notification.is-success').contains('Welcome!');
    cy.get('.navbar-burger').click();
    cy.contains('Users').click();
    // assert '/all-users' is displayed properly
    cy.get('.navbar-burger').click();
    cy.location().should((loc) => { expect(loc.pathname).to.eq('/all-users') });
    cy.contains('All Users');
    cy
      .get('table')
      .find('tbody > tr').last()
      .contains('td', username);
    cy.get('.navbar-burger').click();
    cy.get('.navbar-menu').within(() => {
      cy
        .get('.navbar-item').contains('User Status')
        .get('.navbar-item').contains('Log Out')
        .get('.navbar-item').contains('Log In').should('not.be.visible')
        .get('.navbar-item').contains('Register').should('not.be.visible');
    });
  });

  it('should validate the password field', () => {
    cy
      .visit('/register')
      .get('H1').contains('Register')
      .get('form')
      .get('input[disabled]');
    cy.get('.validation-list > .error').contains(
        'Password must be greater than 10 characters.');
    cy.get('input[name="password"]').type('greaterthanten');
    cy.get('.validation-list > .error').contains(
        'Password must be greater than 10 characters.').should('not.be.visible');
    cy.get('.validation-list > .success').contains(
        'Password must be greater than 10 characters.');
    cy.get('.navbar-burger').click();
    cy.get('.navbar-item').contains('Log In').click();
    cy.get('.navbar-item').contains('Register').click();
    cy.get('.validation-list > .error').contains(
      'Password must be greater than 10 characters.');
  });

  it('should throw an error if the username is taken', () => {
        // register user with duplicate user name
    cy
      .visit('/register')
      .get('input[name="username"]').type(username)
      .get('input[name="email"]').type(`${email}unique`)
      .get('input[name="password"]').type(password)
      .get('input[type="submit"]').click();

    // assert user registration failed
    cy.contains('All Users').should('not.be.visible');
    cy.contains('Register');
    cy.get('.navbar-burger').click();
    cy.get('.navbar-menu').within(() => {
      cy.contains('.navbar-item', 'User Status').should('not.be.visible');
      cy.contains('.navbar-item', 'Log Out').should('not.be.visible');
      cy.contains('.navbar-item', 'Log In');
      cy.contains('.navbar-item', 'Register');
    });
    cy.get('.notification.is-success').should('not.be.visible')
    cy.get('.notification.is-danger').contains('That user already exists.');
  });

  it('should throw an error if the email is taken', () => {
    // register user with duplicate email
    cy
      .visit('/register')
      .get('input[name="username"]').type(`${username}unique`)
      .get('input[name="email"]').type(email)
      .get('input[name="password"]').type(password)
      .get('input[type="submit"]').click();

    // assert user registration failed
    cy.contains('All Users').should('not.be.visible');
    cy.contains('Register');
    cy.get('.navbar-burger').click();
    cy.get('.navbar-menu').within(() => {
      cy.contains('.navbar-item', 'User Status').should('not.be.visible');
      cy.contains('.navbar-item', 'Log Out').should('not.be.visible');
      cy.contains('.navbar-item', 'Log In');
      cy.contains('.navbar-item', 'Register');
    });
    cy.get('.notification.is-success').should('not.be.visible')
    cy.contains('.notification.is-danger', 'That user already exists.');
  });
});