import { World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";


/**
 @description World.ts is used by cucumber to set each test its own separate scenario context when executing storing the browser type and page(s) being actioned
*/
 export interface ScenarioWorld extends World {
  context: BrowserContext;
  page: Page;
 }