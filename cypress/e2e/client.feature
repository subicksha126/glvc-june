Feature: Client management
  As a user I want to add and view clients

  Scenario: Create a new client
    Given I am on the Clients page
    When I click "New Client"
    And I fill the form with valid details
    And I submit the form
    Then I should see the new client in the list
