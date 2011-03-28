/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */
require.paths.unshift(require('path').join(__dirname));

var http = require('http');
var iResults= require('iresults').iResults;
var Timer = require('timer').Timer;
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
    this.limit = '1';
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
    this.server = 'ax.itunes.apple.com';
};
exports.iTunes = iTunes;

// Converts class' parameters JSON to a query string.
iTunes.prototype.getQuery = function() {
    var query = querystring.stringify(this.params);
    return query;
};

/*
 This function fires off the http request to iTunes.
 The type of data object to be returned must be specified.
 A callback must now be provided. This callback will be given two parameters:
    - error - a boolean indicating whether or not there was an error
    - data - an object encapsulating the information relevant to the request. 
 */

iTunes.prototype.request = function(dataType, callback) {
    var self = this;
    var results = new iResults();
    var clock = new Timer(self.params.term);
    var apple = http.createClient(80,self.server);
    var query = self.getQuery();
    var path = self.basePath + query;
    var request = apple.request('GET',path,{host:self.server});
    apple.request('GET',path);
    request.end();
    clock.set();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            clock.elapsed('data');
            results.capture(chunk);
        });
        response.on('end',function() {
            clock.elapsed('end');
            self.responseEnd(dataType,results,callback);
        });
    });
};

/*
 As the request to the iTunes store completes, this function is called to process that response.  It passes the job of parsing the results off to the iResults class.  It then determines what type of object should be passed to the callback function based on the dataType requested by they user. The idea here is that in the future, additional objects other than albums will be supported.  That future planning makes dataType necessary.
 */

iTunes.prototype.responseEnd = function(dataType, results, callback) {
    var self = this;
    var error = 0;
    var data = '';
    if (results.parse()) {
        switch(dataType)
        {
        case 'album':
            if (results.hits > 1) {
                error = 1;
            } else if ( results.hits == 0)  {
                error = 1;
            } else {
                data = results.getAlbum();
            };
            break;
        case 'artist':
            if (results.hits > 1) {
                error = 1;
            } else if ( results.hits == 0)  {
                error = 1;
            } else {
                data = results.getArtist();
            };
            break;
        case 'track':
            if (results.hits > 1) {
                //console.log('iTunes.responseEnd : ' + dataType + ' : too many results');
                error = 1;
            } else if ( results.hits == 0)  {
                error = 1;
            } else {
                //console.log('iTunes.responseEnd : ' + dataType + ' 1 hit!');
                data = results.getTrack();
            };
            break;
        case 'raw':
            data = results.data; // returns JSON for full results
        default:
            error = 1;
        }
    } else {
        error = 1;
    }
    callback(error,data);
};

/*
 This function: 1 - sets the parameters required for looking up an album.
                2 - requests that an Album data type be passed to the callback.
 */

iTunes.prototype.lookupAlbum = function(params, callback) {
    var self = this;
    var artist = params.artist;
    var album = params.album;
    self.params.media='music';
    self.params.entity='album';
    self.params.attribute='albumTerm';
    self.params.term=album;
    self.request('album',callback);
};

iTunes.prototype.lookupArtist = function(params, callback) {
    var self = this;
    var artist = params.artist;
    self.params.media='music';
    self.params.entity='musicArtist';
    self.params.attribute='artistTerm';
    self.params.term=artist;
    self.request('artist',callback);
};

iTunes.prototype.lookupTrack = function(params, callback) {
    var self = this;
    var artist = params.artist;
    var track = params.track;
    self.params.media='music';
    self.params.entity='musicTrack';
    self.params.attribute='musicTrackTerm';
    self.params.term = track;
    self.request('track',callback);
}
