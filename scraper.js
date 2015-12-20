/* 
 * Create casper object 
 */
var casper = require('casper').create(	{
  pageSettings: {
    webSecurityEnabled: true
  }
});

/* 
 * Include config file
 */
phantom.injectJs('config.js');

/* 
 * Set options for Casper (viewport, don't load images, timeout) 
 */ 
casper.options.viewportSize = {width: 1600, height: 950};
casper.options.pageSettings.loadImages = false;
casper.options.waitTimeout = 15000;
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36(KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36');

/* 
 * Required URL's
 */
var base 	= 'https://www.ov-chipkaart.nl';
var home 	= '/home.htm';
var login 	= '/inloggen.htm';
var userpage	= "/mijn-ovchipkaart";
var history	= "/mijn-ovreishistorie/mijn-ovreishistorie.htm";

/* 
 * Open login page and login 
 */
casper.start(base.concat(login), function() {
  _showTitlePicture(casper, '1_login.png');

  if (this.exists('#username') && this.exists('#password')) {
    this.fill('form#login-form', {
      'username': _user,
      'password': _password
    }, true);
  }

});

/* 
 * Wait for being redirected to userpage
 */
casper.waitFor(function check() {
  return (this.getCurrentUrl() === base.concat(userpage, '.htm'));
},
  function then() {
    _showTitlePicture(casper, '2_userpage.png');
  }
);

/* 
 * Run casper
 */
casper.run();


/* 
 * Login with username and password
 */
var _showTitlePicture = function (casper, pictureName)
{
  casper.echo(casper.getTitle());
  casper.capture(pictureName);
}


