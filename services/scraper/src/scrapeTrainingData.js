const fs = require("fs");
const {JiraScraper} = require("scrapers/");
const {chainingPromisePool} = require("utils/");

/* Get configuration for which model we'll be scraping data for */

const args = process.argv.slice(2);
let modelToScrapeFor = "contributors";

if (args.length) {
    modelToScrapeFor = args[0];
}

/* Instantiate the scraper and start scraping */

// Note that at least JIRA_AUTH_TOKEN has to be present as an environment variable for this to work
const jiraScraper = new JiraScraper();

switch (modelToScrapeFor) {
    case "contributors":
        (async () => {
            try {
                const projects = await jiraScraper.getProjects();

                const listsOfIssues = await chainingPromisePool(projects, jiraScraper.getIssues.bind(jiraScraper));
                const issues = [].concat(...listsOfIssues);

                fs.writeFileSync("./raw_issues.json", JSON.stringify(issues));

                console.log("Finished scraping.");
            } catch (e) {
                console.log(e);
                console.log("Ya dun goofed");

                process.exitCode = 1;
            }
        })();
        break;
    default:
        console.log(`Invalid model '${modelToScrapeFor}'. Options: ['contributors']`);
}
