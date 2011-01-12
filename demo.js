/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var Search = require('./itunes.js').Search;
var Divider = require('./divider').Divider;

/*
 * Demo
 */

pretty = new Divider();
pretty.print('iTunes API Implementation in node.js');

trackData = new Search();
trackData.getArtist('Bon Iver');

trackData2 = new Search();
trackData2.getArtist('Smashing Pumpkins');

trackData3 = new Search();
trackData3.getArtist('We Are Scientists');
