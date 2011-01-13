/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var http = require('http');
var querystring = require('querystring');

/*
 * 
 * Seperate object for parameters to facilitate use with query string. 
 * Specific to iTunes. This is the full set of searchable fields.
 * 
 */

function iParameters() {

    this.term = '';
    this.country = 'us';
    this.media = 'all';
    this.entity = 'musicTrack';
    this.attribute = 'all';
//    this.callback = 'wsSearchCB';
    this.limit = '40';
    this.lang = 'en_us';
    this.version = '2';
    this.explicit = 'Yes';

};

/*
 * 
 * Object to hold iTunes specific attributes.
 * 
 */

function iTunes() {
    this.params = new iParameters();
    this.basePath = '/WebObjects/MZStoreServices.woa/wa/wsSearch?';
    this.server= 'ax.itunes.apple.com';
};
exports.iTunes = iTunes;

iTunes.prototype.getQuery = function() {
    console.log(this.params);
    var query = querystring.stringify(this.params);
    console.log('QUERY : ' + query);
    return query;
};
