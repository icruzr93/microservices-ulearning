const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;
const password = 'greaterthanten';


describe('Exercises', () => {
    it('should display the exercises correctly if a user is not logged in', () => {
        cy.visit('/')
        cy.contains('h1', 'Exercises')
        cy.contains('.notification.is-warning', 'Please log in to submit an exercise.')
        cy.get('button').should('not.be.visible');
    });

    it('should allow a user to submit an exercise if logged in', () => {
        cy.server();
        cy.route('POST', 'auth/register').as('createUser');
        cy.route('POST', Cypress.env('REACT_APP_API_GATEWAY_URL')).as('gradeExercise');

        // register a new user
        cy
            .visit('/register')
            .get('input[name="username"]').type(username)
            .get('input[name="email"]').type(email)
            .get('input[name="password"]').type(password)
            .get('input[type="submit"]').click()
            .wait('@createUser');
        
        // assert exercises are displayed correctly
        cy.contains('h1','Exercises');
        cy.contains('.notification.is-success', 'Welcome!');
        cy.get('.notification.is-danger').should('not.be.visible');
        cy.contains('button.button.is-primary', 'Run Code');

        // assert user can submit an exercise
        cy.get('button').contains('Run Code').click().wait(900)
        cy.contains('h5 > .grade-text', 'Incorrect!');
    });
});