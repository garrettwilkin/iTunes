var http = require('http');
var querystring = require('querystring');

console.log('iTunes API Implementation in node.js');

/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */



/*
 * 
 * Seperate object for parameters to facilitate use with query string. 
 * 
 */

function iParameters() {

    this.term = '';
    this.country = 'us';
    this.media = 'all';
    this.entity = 'musicTrack';
    this.attribute = 'all';
    this.callback = 'wsSearchCB';
    this.limit = '100';
    this.lang = 'en_us';
    this.version = '2';
    this.explicit = 'Yes';

};


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
};

Search.prototype.setArtist = function(artist) {
   this.AppleMedia.params.term = artist; 
   this.AppleMedia.params.entity = 'musicArtist'; 
   this.AppleMedia.params.attribute= 'artistTerm'; 
   this.AppleMedia.params.media = 'music'; 
};


Search.prototype.request = function(method) {
    var ok = 1;
        console.log('Initiating iTunes request.');
        var apple = http.createClient(80,this.AppleMedia.server);
        var query = this.AppleMedia.getQuery();
        var path = this.AppleMedia.basePath + query;
        console.log('SERVER: ' + this.AppleMedia.server);
        console.log('PATH: ' + path);
        var request = apple.request('GET',path,{host:this.AppleMedia.server});
        apple.request('GET',path);
        request.end();
        request.on('response', function(response) {
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS ' + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                console.log('BODY: ' + chunk);
            });
        });
    return ok;
};

trackData = new Search();
trackData.setArtist('Smashing+Pumpkins');
trackData.request('itunes');
