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
  _logStatus(casper, '1_login.png');

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
    _logStatus(casper, '2_userpage.png');
  }
);

/* 
 * Open OV travel history page
 */
casper.thenOpen(base.concat(userpage, history, _transactionUrl()), function() {
  _logStatus(casper, '3_history.png');
});

/* 
 * Run casper
 */
casper.run();


/* 
 * Custom funcions:
 * _logStatus - Echo current title and take screenshot.
 * _transactionUrl - Create part of URL to get transaction within a daterange
 * _formatDate - Format dates to correspond with the URL requirements
 */

/* 
 * Login with username and password
 */
function _logStatus (casper, pictureName)
{
  casper.echo(casper.getTitle());
  casper.capture(pictureName);
}

/* 
 * Create URL to dispaly all transactions from a specific period of time
 */
function _transactionUrl () 
{
  // Declare first and last day of the month
  var date      = new Date();
  var firstDay  = new Date(date.getFullYear(), date.getMonth(), 1);
  // var lastDay  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var dateUrl = '&begindate=' + _formatDate(firstDay) + '&enddate=' + _formatDate(date);

  return '?mediumid=' + dateUrl + '&type=#transactions';

}

/* 
 * Format the dates to correspond with the URL requirements
 */
function _formatDate (dateTime) 
{
  var day   = dateTime.getDate();
  var month   = dateTime.getMonth() + 1; // months start from 0, i.e. January = 0.
  var year  = dateTime.getFullYear();

  //Give days proper format: '09' instead of '9'
  day = day < 10 ? '0' + day : day;

  return day + '-' + month + '-' + year; 
}



