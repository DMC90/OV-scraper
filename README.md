READ ME FILE

//REQUIRED TO RUN SCRAPER
////
Install phatomjs to be able to run a headless browser (version must be version 1.9.8 or higher). You can either download Phantomjs from their website, clone it from their github repo or run the following code using npm:

'npm instsall phantomjs'

Current Phantomjs version is installed in the following folder:'/Users/William/node_modules/phantomjs/bin'

Install casperjs (version must be version 1.1.0-beta3 or higher) to actually be able to scrape te web with the scraper.js file. To install casperjs use brew to install it by running the following code:

'brew install casperjs --devel'

//SETTING UP CONFIG FILE
////
To be able to login on the ov-chipkaart website make sure to fill in your username and password in the config.yml file (config.dist.yml is used to push to git)


//RUN SCRAPERJS
////
To run the scraper.js file run the following code:

'casperjs scraper.js'

If there are complaints about https sites, make sure to run the casperjs with the following code:

'--ssl-protocol=tlsv1'
'--ignore-ssl-errors=true'
'--ssl-protocol=any'
