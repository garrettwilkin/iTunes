/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */
var http = require('http');
var iResults= require('./iresults').iResults;
var Timer = require('./util/timer').Timer;
var querystring = require('querystring');
var iError = require('./ierror').iError;

/*
 * 
 * Seperate object for parameters to facilitate use with query string. 
 * Specific to iTunes. This is the full set of searchable fields.
 * 
 */

function iParameters(media,entity,attribute,term) {

    this.term = term;
    this.country = 'us';
    this.media = media;
    this.entity = entity;
    this.attribute = attribute;
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
    this.basePath = '/WebObjects/MZStoreServices.woa/wa/wsSearch?';
    this.server = 'ax.itunes.apple.com';
};
exports.iTunes = iTunes;

// Converts class' parameters JSON to a query string.
iTunes.prototype.getQuery = function(params) {
    var query = querystring.stringify(params);
    return query;
};

/*
 This function fires off the http request to iTunes.
 The type of data object to be returned must be specified.
 A callback must now be provided. This callback will be given two parameters:
    - error - a boolean indicating whether or not there was an error
    - data - an object encapsulating the information relevant to the request. 
 */

iTunes.prototype.request = function(dataType, target, params, callback) {
    var self = this;
    var results = new iResults();
    var clock = new Timer(params.term);
    var query = self.getQuery(params);
    var path = self.basePath + query;
    var options = {
        host: self.server,
        port: 80,
        path: path,
        method: 'GET'
    }
    var request = http.request(options);
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
            self.responseEnd(dataType,target,results,callback);
        });
    });
};

/*
 As the request to the iTunes store completes, this function is called to process that response.  It passes the job of parsing the results off to the iResults class.  It then determines what type of object should be passed to the callback function based on the dataType requested by they user. The idea here is that in the future, additional objects other than albums will be supported.  That future planning makes dataType necessary.
 */

iTunes.prototype.responseEnd = function(dataType, target, results, callback) {
    var self = this;
    var error = null;
    var data = null;
    if (results.parse()) {
        switch(dataType)
        {
        case 'album':
            results.getAlbum(target,callback);
            break;
        case 'artist':
            results.getArtist(target,callback);
            break;
        case 'track':
            results.getTrack(target,callback);
            break;
        case 'raw':
            data = results.data; // returns JSON for full results
            break;
        default:
            error = iError(8);
            callback(error,data);
        }
    } else {
        error = iError(2);
        callback(error,data);
    };
};

/*
 This function: 1 - sets the parameters required for looking up an album.
                2 - requests that an Album data type be passed to the callback.
 */

iTunes.prototype.lookupAlbum = function(target, callback) {
    var self = this;
    params = new iParameters('music',
                             'album',
                             'albumTerm',
                             target.album);
    self.request('album',target,params,callback);
};

iTunes.prototype.lookupArtist = function(target, callback) {
    var self = this;
    params = new iParameters('music',
                             'musicArtist',
                             'artistTerm',
                             target.artist);
    self.request('artist',target,params,callback);
};

iTunes.prototype.lookupTrack = function(target, callback) {
    var self = this;
    params = new iParameters('music',
                             'musicTrack',
                             'musicTrackTerm',
                             target.track);
    self.request('track',target,params,callback);
}
