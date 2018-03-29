const testingUrl = 'http://localhost:3000/#';

describe('Login Page Test', function () {

    it('Log In', function() {
        cy.visit(testingUrl)

        cy.get('.login_button')
        //.click() for auth0
    })

})
describe('Add New Dog Page Test', function() {

    it('Add New Dog', function() {
        cy.visit(testingUrl+'/adddoginfo')

        cy.get('input')
            .first()
            .type('Max')
            .next()
            .next()
            .type('Pitbull')
            .next()
            .next()
            .select('5')
            .next()
            .next()
            .select('Male')
        cy.get('.add_dog_info_next_button')
            .click()

        cy.url()
            .should('include', '/uploadimage')
            cy.get('#img-preview')
            .click()
            cy.get('.upload_image_next_button')
            .click()
        cy.url()
            .should('include', '/photospage')
            cy.get('.photospage_next_button')
            .click()
        cy.url()
            .should('include', '/adddescription')
            cy.get('textarea')
            .first()
            .type('This is where the description goes bruh!')
            cy.get('.nextBut')
            .click()
        cy.url()
            .should('include', '/dogcreated')
    })
})