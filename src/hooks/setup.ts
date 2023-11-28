import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, LaunchOptions, chromium, firefox, webkit} from "@playwright/test"
import * as dotenv from "dotenv"
import { logger } from '../testutils/logger'
dotenv.config();

let browser: Browser;


BeforeAll(async function () {
  const automationBrowser = process.env.uiAutomationBrowser;
  switch (automationBrowser) {
    case ('chromium'):
      browser = await chromium.launch({
        headless: false
      });
      global.browser=browser;
      break;
    case ('firefox'):
      browser = await firefox.launch({
        headless: false
      });
      global.browser=browser;
      break;
    case ('webkit'):
      browser = await webkit.launch({
        headless: false
      });
      global.browser=browser;
      break;
  }
  
});

AfterAll(async function () {
  try{
    await global.browser.close();
  }catch(error){
    logger.info(`Browser can't close-${error}`);
    throw new Error('Browser closure failed');
  }
});
Before(async function (){
  const contextOptions={
    recordVideo:{
      dir:process.env.videoPath
    }
  }
  this.context= await global.browser.newContext(contextOptions);
  this.page= await this.context.newPage();
});
After(async function (scenario) {
  const scenarioStatus = scenario.result?.status;
  const video = this.page.video();
 
 try{
  if (scenarioStatus === 'FAILED') {
    const baseDir = process.env.videoPath;
    const baseScreenshotDir=process.env.screenshotPath;
    const scenarioName = scenario.pickle.name.replace(/\W/g, "_");
    await this.page.screenshot({ path: `${baseScreenshotDir}/${scenario.pickle.name}.png` });
    if (video != null) {
      video.saveAs(`${baseDir}/${scenarioName}.webm`);
      video.delete(); //delete old video
     }
  } else if (video !=null && scenarioStatus === 'PASSED') {
    video.delete(); // delete video
  }
}catch(error){
  logger.info(`connection failed after scenario... -${error}`)
}
   await this.page.close();
   await this.context.close();
});

