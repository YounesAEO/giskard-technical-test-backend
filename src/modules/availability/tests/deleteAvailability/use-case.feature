Feature: Delete an existing availibility

Scenario: Delete an availibility
Given I provide valid availibility id
When I attempt to delete an availibility
Then the availibility should be deleted successfully

Scenario: Inexistent availibility
Given I provide invalid id
When I attempt to delete an availibility
Then I should get inexistent resource error