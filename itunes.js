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
var Divider = require('./divider').Divider;
var Timer = require('./timer.js').Timer;
var iResults= require('./iresults.js').iResults;


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
    this.limit = '100';
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

iTunes.prototype.getQuery = function() {
    console.log(this.params);
    var query = querystring.stringify(this.params);
    console.log('QUERY : ' + query);
    return query;
};

/*
 * 
 * Generic Search class for retrieving music data.
 * 
 */

function Search() {
    this.AppleMedia = new iTunes();
    this.iresults = new iResults();
};

Search.prototype.setArtist = function(artist) {
   this.AppleMedia.params.term = artist.replace(/ /g,'+'); 
   this.AppleMedia.params.entity = 'musicArtist'; 
   this.AppleMedia.params.attribute= 'artistTerm'; 
   this.AppleMedia.params.media = 'music'; 
};


Search.prototype.request = function(method) {
    var ok = 1;
    var clock = new Timer();
    if (method == 'itunes') {
        console.log('Initiating iTunes request.');
        var apple = http.createClient(80,this.AppleMedia.server);
        var query = this.AppleMedia.getQuery();
        var path = this.AppleMedia.basePath + query;
        console.log('SERVER: ' + this.AppleMedia.server);
        console.log('PATH: ' + path);
        var request = apple.request('GET',path,{host:this.AppleMedia.server});
        apple.request('GET',path);
        request.end();
        clock.set();
        request.on('response', function(response) {
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS ' + JSON.stringify(response.headers));
            pretty.spacer(3);
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                clock.elapsed();
                pretty.print('BODY: ' + chunk);
                trackData.iresults.capture(chunk);
            });
        });
    } else {
        pretty.print('method (' + method + ') not yet implemented');
    }
    return ok;
};

/*
 * Demo
 */

pretty = new Divider();
pretty.print('iTunes API Implementation in node.js');

trackData = new Search();
trackData.setArtist('John Coltrane');
trackData.request('itunes');

trackData2 = new Search();
trackData2.setArtist('Smashing Pumpkins');
trackData2.request('itunes');

trackData3 = new Search();
trackData3.setArtist('Miles Davis');
trackData3.request('itunes');
