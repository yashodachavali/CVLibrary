import {Page} from '@playwright/test';

export class BasePage{
    protected readonly page:Page;
    

    public constructor(page:Page){
        this.page=page;
    }
    public async navigateToUrl(){
     await this.page.waitForLoadState('load',{timeout:6000});
     await this.page.goto(process.env.officialSite);
    }
    public async acceptPolicy(){
        const frame = await this.page.frameLocator('#gdpr-consent-notice');
        await frame.locator('#save').click();
      } 
}  