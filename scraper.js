
phantom.injectJs('sample2.js'); 

var casper = require('casper').create();

casper.start(URL, function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();
