const common=`
--require-module ts-node/register 
--require src/hooks/setup.ts
--require src/tests/stepdefinitions/*.ts 
--format json:./testresults/report.json
--format html:./testresults/reports.html
--format-options '{"snippetInterface":"async-await"}'
--publish-quiet
`

module.exports = {
    default: `${common} src/tests/features/*.feature`,
}