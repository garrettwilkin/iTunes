/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var MetaMedia = require('./metamedia.js').MetaMedia;
var Divider = require('./divider').Divider;

/*
 * Demo
 */

pretty = new Divider();
pretty.print('iTunes API Implementation in node.js');

artistData = new MetaMedia();
artistData.getArtist('Bon Iver');

artistData2 = new MetaMedia();
artistData2.getArtist('Smashing Pumpkins');

artistData3 = new MetaMedia();
artistData3.getArtist('We Are Scientists');

artistData4 = new MetaMedia();
artistData4.getArtist('John Coltrane');
