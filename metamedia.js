/*
 * Meta data retriever for media items (songs, artists, albums).
 * Plan to provide simple evented interface to multiple media meta data sites. 
 *     *iTunes
 *     *Last.fm
 *     *Amazon
 */

var http = require('http');
var iResults= require('./iresults').iResults;
var Timer = require('./timer').Timer;
var Divider = require('./divider').Divider;
var iTunes = require('./itunes').iTunes;
var http = require('http');

function MetaMedia() {
    this.AppleMedia = new iTunes();
    this.iresults = new iResults();
};
exports.MetaMedia = MetaMedia;

MetaMedia.prototype.getArtist = function(artist) {
   this.AppleMedia.params.term = artist.replace(/ /g,'+');
   this.AppleMedia.params.entity = 'musicArtist';
   this.AppleMedia.params.attribute= 'artistTerm';
   this.AppleMedia.params.media = 'music';
   this.request('itunes',this.AppleMedia.params.term)
};


MetaMedia.prototype.request = function(source, label) {
    var self = this;
    var ok = 1;
    var clock = new Timer(label);

    if (source== 'itunes') {
        console.log('Initiating iTunes request.');
        var apple = http.createClient(80,self.AppleMedia.server);
        var query = self.AppleMedia.getQuery();
        var path = self.AppleMedia.basePath + query;
        console.log('SERVER: ' + self.AppleMedia.server);
        console.log('PATH: ' + path);
        var request = apple.request('GET',path,{host:self.AppleMedia.server});
        apple.request('GET',path);
        request.end();
        clock.set();
        request.on('response', function(response) {
//            console.log('STATUS: ' + response.statusCode);
//            console.log('HEADERS ' + JSON.stringify(response.headers));
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
    } else {
        ok = 0;
        pretty.print('source (' + source + ') not yet implemented');
    }
    return ok;
};
