Feature: Meeting management
  Scenario: Create a meeting for a client
    Given I am on the Meetings page
    When I click "New Meeting"
    And I select a client and enter meeting details
    And I submit the meeting form
    Then I should see the meeting card listed
