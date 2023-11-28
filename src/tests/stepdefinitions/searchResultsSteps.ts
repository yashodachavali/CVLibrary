import{Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SearchResultsPage } from '../pages/SearchResultsPage';
 let searchResultsPage:SearchResultsPage;

Then('I navigated to search results page', async function () {
   searchResultsPage=new SearchResultsPage(this.page);
   const isSearchResultsPageVisible= await searchResultsPage.validatedSearchResultsHeaderSection();
   expect(isSearchResultsPageVisible).toBeTruthy();
});
Then('I validated error message is not populating', async function () {        
   const isErrorMeaageVisible= await searchResultsPage.validateErrorMessage();
   expect(isErrorMeaageVisible).toBeFalsy();
});
Then('I validated search results related to {string}',async function(inputValue){
   if(inputValue === 'QA'){
   const isSearchResultsContainsKeywords=await searchResultsPage.validateSearchResults();
   expect(isSearchResultsContainsKeywords).toContain(inputValue);
   }else if(inputValue === 'Permanent') {
      const isJobTypePresentInSearchResults=await searchResultsPage.ValidateJobTypeInSearchResults(inputValue);
      expect(isJobTypePresentInSearchResults).toBeTruthy();
   }
});