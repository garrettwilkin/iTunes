/*
 * 
 * iTunes interface for Node.js
 * Author: Garrett Wilkin 
 * Date  : 2011/1/7 
 * 
 * 
 */

var sys = require('sys');
var http = require('http');
var querystring = require('querystring');
var Divider = require('./divider');
/*
 * 
 * Simple stopwatch like class.  I noticed that the requests seemed to lag.
 * Now I can easily monitor how much they are lagging without clouding up
 * my code.
 * 
 */

function timer() {
    this.date = new Date();
    this.bigBang = this.date.getTime();
    this.lastTime = 0;
};

timer.prototype.set = function() {
    var now = new Date();
    this.lastTime = now.getTime();
}

timer.prototype.elapsed = function() {
    var millsPerSecond = 1000;
    var now = new Date();
    var nowMills = now.getTime();
    var elapsedMills = nowMills - this.lastTime;
    var elapsedSeconds = elapsedMills / millsPerSecond;
    pretty.print('Time elapsed: ' + elapsedSeconds);
    return elapsedSeconds;
};


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
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

function iResults() {
    this.dataString = '';
}

iResults.prototype.clean = function (data) {
    var garbage = '';
    var sliced = data.split('\n');
    var length = sliced.length;
    pretty.print('Data has ' + length + ' rows.');
    pretty.print(sliced.toString());
    garbage = sliced.shift();
    garbage = sliced.shift();
    garbage = sliced.shift();
    garbage = sliced.pop();
    garbage = sliced.pop();
    garbage = sliced.pop();
    length = sliced.length;
    pretty.print('Data has ' + length + ' rows.');
    pretty.print(sliced.toString());
    return sliced.toString();
};

iResults.prototype.capture = function (data) {
    
//    this.dataString = this.clean(data);
    this.dataString = data;
    this.obj = JSON.parse(this.dataString);
    this.dataArray = this.obj.results;
    pretty.print(JSON.stringify(this.dataArray));
    
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
    var clock = new timer();
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

pretty = new divider();
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
