// Step skeletons for client.feature
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the Clients page', () => {
  cy.visit('/clients');
});
When('I click {string}', (label: string) => {
  cy.contains('button', label).click();
});
When('I fill the form with valid details', () => {
  cy.get('input[formcontrolname="name"]').type('Test User');
  cy.get('input[formcontrolname="email"]').type('test.user@example.com');
});
When('I submit the form', () => {
  cy.get('form').submit();
});
Then('I should see the new client in the list', () => {
  cy.contains('td', 'Test User').should('exist');
});
