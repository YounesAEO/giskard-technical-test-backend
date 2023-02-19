Feature: Create a new availibility

Scenario: Create an availibility
Given I provide valid availibility details
When I attempt to create an availibility
Then the availibility should be saved successfully

Scenario: Invalid availibility details
Given I provide invalid start or end time
When I attempt to create an availibility
Then I should get invalid details error