import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the Meetings page', () => {
  cy.visit('/meetings');
});
When('I click {string}', (label: string) => {
  cy.contains('button', label).click();
});
When('I select a client and enter meeting details', () => {
  cy.get('select[formcontrolname="clientId"]').select(0);
  cy.get('input[formcontrolname="title"]').type('Demo Meeting');
  cy.get('input[formcontrolname="when"]').type('2025-09-05T10:00');
});
When('I submit the meeting form', () => {
  cy.get('form').submit();
});
Then('I should see the meeting card listed', () => {
  cy.contains('Demo Meeting').should('exist');
});
