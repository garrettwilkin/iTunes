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

function iTunes(apiKey) {
    this.params = new iParameters();
    this.basePath = '/WebObjects/MZStoreServices.woa/wa/wsSearch?';
    this.server= 'ax.itunes.apple.com';
    this.iresults = new iResults();
    this.info= new Divider('iTunes');
    this.apiKey = apiKey;
};
exports.iTunes = iTunes;

iTunes.prototype.getArtist = function(artist) {
   this.params.term = artist.replace(/ /g,'+');
   this.params.entity = 'musicArtist';
   this.params.attribute= 'artistTerm';
   this.params.media = 'music';
   this.request('itunes',this.params.term)
};


iTunes.prototype.getQuery = function() {
    console.log(this.params);
    var query = querystring.stringify(this.params);
    console.log('QUERY : ' + query);
    return query;
};

iTunes.prototype.request = function() {
    var self = this;
    var clock = new Timer(self.params.term);
    var apple = http.createClient(80,self.server);
    var query = self.getQuery();
    var path = self.basePath + query;
    console.log('SERVER: ' + self.server);
    console.log('PATH: ' + path);
    var request = apple.request('GET',path,{host:self.server});
    apple.request('GET',path);
    request.end();
    clock.set();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            clock.elapsed();
            self.iresults.capture(chunk);
        });
        response.on('end', function() {
            clock.elapsed();
            self.iresults.parse();
        });
    });
};

iTunes.prototype.lookupAlbum = function(params, callback) {
    var self = this;
    var artist = params.artist;
    var album = params.album;
    self.info.print('artist: ' + artist + ' album: ' + album);  
    self.params.media='music';
    self.params.entity='album';
    self.params.attribute='albumTerm';
    self.params.term=album;
    self.request();
    self.iresults.getAlbum();
    callback(0,self.iresults.getAlbum());
};
