import {Page,Locator} from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../../testutils/logger';

export class HomePage extends BasePage{
   private readonly homePageObject:Page;
   private readonly keywordsInput:Locator;
   private readonly moreSearchOptionsButton: Locator;
   private readonly locationInput: Locator;
   private readonly distanceDropdown: Locator;
   private readonly salaryMinimumInput: Locator;
   private readonly salaryMaximumInput: Locator;
   private readonly salaryTypeDropdown: Locator;
   private readonly jobTypeDropdown: Locator;
   private readonly findJobsButton: Locator;
   
    public constructor(page:Page){
      super(page);
      this.homePageObject=page;
      this.moreSearchOptionsButton=this.homePageObject.locator("#toggle-hp-search");
      this.keywordsInput=this.homePageObject.locator('#keywords');
      this.locationInput=this.homePageObject.locator('#location');
      this.distanceDropdown=this.homePageObject.locator('#distance');
      this.salaryMinimumInput=this.homePageObject.locator('#salarymin');
      this.salaryMaximumInput=this.homePageObject.locator('#salarymax');
      this.salaryTypeDropdown=this.homePageObject.locator('#salarytype');
      this.jobTypeDropdown=this.homePageObject.locator('#tempperm');
      this.findJobsButton=this.homePageObject.locator('#hp-search-btn');
    }
    public async enterKeywordsOrJobTitleOrJobReferenceSearchBox(keywordsOrJobTitleOrJobReference:string){
        try{
        await this.keywordsInput.isEditable();
        await this.keywordsInput.fill(keywordsOrJobTitleOrJobReference);
        return true;
        }catch(error){
            logger.info('Keywords input value is not editable....');
        }
    } 
    public async enterLocation(location:string){
        try{
        await this.locationInput.isEditable();
        await this.locationInput.fill(location);
        return true;
        }catch(error){
            logger.info('location cannot be edited.');
        }
    }
    public async selectDistanceOrSalaryTypeOrJobType(distance:string, salaryType:string, jobType:string){
        await this.distanceDropdown.selectOption({label:distance});
        await this.salaryTypeDropdown.selectOption({label:salaryType});
        await this.jobTypeDropdown.selectOption({label:jobType})
    }
    public async enterMinimumSalaryOfJobRole(minSalary:string){
       try{ 
        await this.salaryMinimumInput.isEditable();
        await this.salaryMinimumInput.fill(minSalary);
        return true;
       }catch(error){
          logger.info('Minsalary input box is not editable');
       }
    }
    public async enterMaximumSalaryOfJobRole(maxSalary:string){
      try{
        await this.salaryMaximumInput.isEditable();
        await this.salaryMaximumInput.fill(maxSalary);
        return true;
    }catch(error){
        logger.info('Maxsalary input box is not editable');
     }
    }
    public async clickOnFindJobsButton() {
      await this.findJobsButton.click();
      await this.homePageObject.waitForLoadState('load',{timeout:4000});
    }
    public async clickOnMoreSearchOptionsButton() {
      await this.moreSearchOptionsButton.click();
      await this.homePageObject.waitForLoadState('load');
    }
   
}   