import {Page,Locator} from '@playwright/test';
import { logger } from '../../testutils/logger';

export class SearchResultsPage{
    
    private readonly searchResultsPageObject:Page;
    private readonly searchResultsMainSection: Locator;
    private readonly searchResults: Locator;
    private readonly errorMassage: Locator;
    private readonly keywordsInSearchResults: Locator;
    private readonly jobTypeInSearchResults: Locator;
   
    
    public constructor(page:Page){
        this.searchResultsPageObject=page;
        this.searchResultsMainSection=this.searchResultsPageObject.locator('main#site-main');
        this.searchResults=this.searchResultsPageObject.locator('ol#searchResults>li');
        this.keywordsInSearchResults=this.searchResultsPageObject.locator('p#job-desc1');
        this.jobTypeInSearchResults=this.searchResultsPageObject.locator("//dt[@class='job__details-term job-type']//following-sibling::dd");
        this.errorMassage=this.searchResultsPageObject.locator("section[aria-label='Error message']");
    }
    public async validatedSearchResultsHeaderSection(){
      await this.searchResultsPageObject.waitForLoadState('load',{timeout:6000});
       return await this.searchResultsMainSection.isVisible();
    }
    public async validateSearchResults() {
      await this.searchResultsPageObject.waitForTimeout(3000);
        
        const issearchResultsVisible= await this.searchResults.isVisible();
        const allSearchResults=await this.searchResults.allInnerTexts();
        const count =allSearchResults.length;
       try{ 
        if(issearchResultsVisible && await this.keywordsInSearchResults.isVisible()){
          if(count>0)
          await this.searchResultsPageObject.waitForLoadState('load');
          return await this.keywordsInSearchResults.textContent();
        }
          }catch(error){
                 logger.info('Please check input values...');
          }
    }
    public async ValidateJobTypeInSearchResults(jobType:string){
      const results= await this.jobTypeInSearchResults.allTextContents();
      for(let i=0;i<results.length;i++){
        results[i].match(jobType)
        return true;
      }
    }
    
  public async validateErrorMessage() {
       return await this.errorMassage.isVisible();

     } 
 
    }
