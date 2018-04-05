//UNIT TESTING


const testingUrl = `${process.env.REACT_APP_LOCALHOST_3000}/#`;


// describe('Login Page Test', function () {
//     it('Log In', function() {
//         cy.visit(testingUrl)
//         cy.get('.login_button')
//         //.click() for auth0
//     })
// })



// describe('Add Dog Info Page Test', function() {
//     it('Add Dog Info To Inputs', function() {
//         cy.visit(testingUrl+'/adddoginfo')
//         cy.url()
//         .should('include', '/adddoginfo')
//         cy.get('input')
//             .first()
//             .type('Max')
//             .next()
//             .next()
//             .type('Pitbull')
//             .next()
//             .next()
//             .select('5')
//             .next()
//             .next()
//             .select('Male')
//     })
// })



// describe('Add New Dog', function() {
//     it('Submit New Dog', function() {
//         cy.visit(testingUrl+'/adddoginfo')
//         cy.get('input')
//             .first()
//             .type('Max')
//             .next()
//             .next()
//             .type('Pitbull')
//             .next()
//             .next()
//             .select('5')
//             .next()
//             .next()
//             .select('Male')
//         cy.get('.add_dog_info_next_button')
//             .click()
//         cy.url()
//             .should('include', '/uploadimage')
//             cy.get('#img-preview')
//             .click()
//             cy.get('.upload_image_next_button')
//             .click()
//         cy.url()
//             .should('include', '/photospage')
//             cy.get('.photospage_next_button')
//             .click()
//         cy.url()
//             .should('include', '/adddescription')
//             cy.get('textarea')
//             .first()
//             .type('This is where the description goes bruh!')
//             cy.get('.nextBut')
//             .click()
//         cy.url()
//             .should('include', '/dogcreated')
//             cy.get('.dogCreatedFinish')
//             .click()
//         cy.url()
//             .should('include', '/swiping')
//     })
// })



// describe('Settings page test', function() {
//     it('Change Settings', function() {
//         cy.visit(testingUrl+'/settings')
//         cy.get('.my_location_title')
//         cy.get('.rangeslider').trigger('mousedown')
//         cy.get('.rangeslider__handle').trigger('mousedown')
//         cy.get('[value="Both"]')
//         .click()
//         cy.get(':nth-child(3) > .input-range__slider').trigger('mousedown')
//         cy.get('[value="Breeding"]')
//         .click()
//         cy.get('.delete_account_button')
//         .click()
//     })
// })



// describe('Swiping Page Test', function() {
//     it('Swipe!', function() {
//         cy.visit(testingUrl+'/swiping')
//         cy.url()
//         .should('include', '/swiping')
//     })
// })



// describe('Profile Page Test', function() {
//     it('Navigate Profile Page', function() {
//         cy.visit(testingUrl+'/profile')
//         cy.url()
//         .should('include', '/profile')
//         cy.get('.profilePic')
//         cy.get('.nameAndAge')
//         cy.get('.settingsBut')
//         // .click()
//         // cy.url()
//         // .should('include', '/settings')
        
//         cy.get('.editBut')
//         // .click()
//         // cy.url()
//         // .should('include', '/editinfo')
//         cy.get('.logBut')
//         // click()
//         // cy.url()
//         // .should('include', '/')
//     })
// })



// describe('Edit Info Page Test', function() {
//     it('Navigate Edit Info Page', function() {
//         cy.visit(testingUrl+'/editinfo')
//         cy.url()
//         .should('include', '/editinfo')
//         cy.get('.image1 > #img-preview')
//         cy.get('.file-upload-container1')
//         .click()
//         cy.get(':nth-child(2) > #img-preview')
//         cy.get(':nth-child(2) > .file-upload-container2')
//         .click()
//         cy.get(':nth-child(3) > #img-preview')
//         cy.get(':nth-child(3) > .file-upload-container2')
//         .click()
//         cy.get(':nth-child(4) > #img-preview')
//         cy.get(':nth-child(4) > .file-upload-container3')
//         .click()
//         cy.get(':nth-child(5) > #img-preview')
//         cy.get(':nth-child(5) > .file-upload-container3')
//         .click()
//         cy.get(':nth-child(6) > #img-preview')
//         cy.get(':nth-child(6) > .file-upload-container2')
//         .click()
//         cy.get('.name_input')
//         .type('New Name')
//         cy.get('.breed_input')
//         .type('New Breed')
//         cy.get('.age_input')
//         .type('15')
//         cy.get('.gender_input')
//         .type('New Gender')
//         cy.get('.description_input')
//         .type('New Description')
//         // cy.get('save_button')
//         // .click()
//         // cy.get('cancel_button')
//         // .click()
//     })
// })