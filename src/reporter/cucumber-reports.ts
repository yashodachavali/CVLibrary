import reporter, { Options } from 'cucumber-html-reporter';


const options: Options = {
    theme: 'bootstrap',
    jsonFile: './testresults/report.json', 
    output: './testresults/reports.html',
    screenshotsDirectory: './testresults/screenshots',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: false,
    ignoreBadJsonFile: false,
    noInlineScreenshots: false,
    scenarioTimestamp:true ,
   metadata: {
    "App Version":"1.0.0",
    "Test Environment": "QA",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
   }

    };

reporter.generate(options);