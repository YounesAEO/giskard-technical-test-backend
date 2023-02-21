Feature: Delete a new reservation

Scenario: Delete a reservation
Given I provide valid reservation id
When I attempt to delete a reservation
Then the reservation should be deleted successfully

Scenario: Reservation not found
Given I provide invalid id
When I attempt to delete a reservation
Then I should get reservation not found error