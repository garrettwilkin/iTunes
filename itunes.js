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
var Timer = require('./timer').Timer;
var querystring = require('querystring');
var Divider = require('./divider.js').Divider;

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

function iTunes(apiKey) {
    this.params = new iParameters();
    this.basePath = '/WebObjects/MZStoreServices.woa/wa/wsSearch?';
    this.server = 'ax.itunes.apple.com';
    this.info = new Divider('iTunes');
    this.apiKey = apiKey;
};
exports.iTunes = iTunes;


/*
 Must be rewritten to support MetaMedia class.
iTunes.prototype.getArtist = function(artist) {
   this.params.term = artist.replace(/ /g,'+');
   this.params.entity = 'musicArtist';
   this.params.attribute= 'artistTerm';
   this.params.media = 'music';
   this.request('itunes',this.params.term)
};
*/


iTunes.prototype.getQuery = function() {
    this.info.print(this.params);
    var query = querystring.stringify(this.params);
    this.info.print('QUERY : ' + query);
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
    self.info.print('SERVER: ' + self.server);
    self.info.print('PATH: ' + path);
    var request = apple.request('GET',path,{host:self.server});
    apple.request('GET',path);
    request.end();
    clock.set();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            clock.elapsed();
            results.capture(chunk);
        });
        response.on('end',function() {
            clock.elapsed();
            self.responseEnd(dataType,results,callback);
        });
    });
};

/*
 As the request to the iTunes store completes, this function is called to process that response.  It passes the job of parsing the results off to the iResults class.  It then determines what type of object should be passed to the callback function based on the dataType requested by they user.
 */

iTunes.prototype.responseEnd = function(dataType, results, callback) {
    var self = this;
    var error = 0;
    results.parse();
    var data = '';
    switch(dataType)
    {
    case 'album':
        if (results.hits > 1) {
            self.info.print('Multiple results, cant choose');
        } else {
            data = results.getAlbum();
        };
        break;
    default:
        self.info.print('Unknown dataType.  Returning error.');
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
    self.info.print('artist: ' + artist + ' album: ' + album);  
    self.params.media='music';
    self.params.entity='album';
    self.params.attribute='albumTerm';
    self.params.term=album;
    self.request('album',callback);
};
