Feature: Create a new reservation

Scenario: Create a reservation
Given I provide valid reservation details
When I attempt to create a reservation
Then the reservation should be saved successfully

Scenario: Invalid reservation details
Given I provide invalid details
When I attempt to create a reservation
Then I should get invalid details error