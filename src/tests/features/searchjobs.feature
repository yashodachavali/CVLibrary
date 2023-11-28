Feature: Validation of search functionality
  this feature demonstrates search functionality of CV library with valid inputs and invalid inputs

Background: Navigating to CV library official site 
Given I access CV library site 
And I accept manage policy

Scenario Outline: Validation of search functionality with valid inputs
When I click on "More search options" button
And I enter "<Keywords / Job Title/ Job Ref>","<Location>","<Salary Min>","<Salary Max>"
And I selected "<Distance>","<Salary Type>","<Job Type>"
And I click on "Find Jobs" button 
Then I navigated to search results page
Then I validated search results related to "<Keywords / Job Title/ Job Ref>"
Then I validated search results related to "<Job Type>"
Examples:
|Keywords / Job Title/ Job Ref|Location          |Distance          |Salary Min|Salary Max|Salary Type|Job Type      |
|QA                           |Bournemouth       |10 miles          |50000     |80000     |Per annum  |Permanent     |
|Qa Engineer                  |London            |15 miles          |4000      |5000      |Per month  |Contract      |
|220657587                    |London            |25 miles          |200       |300       |Per week   |Part Time     |
|Retail                       |Portsmouth        |1 mile            |20        |40        |Per day    |Temporary     |
|0000239568_1700844153        |Liecester         |100 miles         |20        |25        |Per hour   |Apprenticeship|

Scenario Outline: Validation Salary inputs validation
When I click on "More search options" button
And I only enter "<Salary Min>","<Salary Max>"
And I click on "Find Jobs" button 
Then I navigated to search results page 
Then I validated error message is not populating

Examples:
|Salary Min|Salary Max|
|10000     |0         |