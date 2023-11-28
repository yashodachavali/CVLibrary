import{Given,When} from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { expect } from '@playwright/test';

let homePage:HomePage;

Given('I access CV library site', async function () {
    homePage=new HomePage(this.page);
    await homePage.navigateToUrl();
  });

When('I accept manage policy', async function(){
  await homePage.acceptPolicy();
});

When('I click on {string} button', async function (button) {
   if(button==='More search options')
   await homePage.clickOnMoreSearchOptionsButton();
   else if(button==='Find Jobs')
   await homePage.clickOnFindJobsButton();
  });
When('I enter {string},{string},{string},{string}', async function (keywords, location, minSalary, maxSalary) {
    const isKeywordsInputValueEditable=await homePage.enterKeywordsOrJobTitleOrJobReferenceSearchBox(keywords);
    const isLocationEditable=await homePage.enterLocation(location);
    const isSalaryMinEditable=await homePage.enterMinimumSalaryOfJobRole(minSalary);
    const isSalaryMaxEditable=await homePage.enterMaximumSalaryOfJobRole(maxSalary);
    expect(isKeywordsInputValueEditable).toBeTruthy();
    expect(isLocationEditable).toBeTruthy();
    expect(isSalaryMinEditable).toBeTruthy();
    expect(isSalaryMaxEditable).toBeTruthy();

  });
When('I selected {string},{string},{string}', async function (distance, salaryType, jobType) {
    await homePage.selectDistanceOrSalaryTypeOrJobType(distance,salaryType,jobType);
  });
  When('I only enter {string},{string}', async function (minSalary,maxSalary) {      
     await homePage.enterMinimumSalaryOfJobRole(minSalary);
     await homePage.enterMaximumSalaryOfJobRole(maxSalary);
  });


