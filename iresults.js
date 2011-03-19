/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

require.paths.unshift(require('path').join(__dirname,'./util'));

var Album = require('album').Album;
var Track = require('track').Track;

//Track total and completed instances of the class for debugging purposes.
var total = 0;
var complete = 0;


function iResults() {
    this.glob = '';
    this.numGlobs = 0;
    this.data = '';
    this.rawJSON = '';
    total++;
};
exports.iResults = iResults;

//Debugging function.
iResults.prototype.stats = function () {
   return {"complete":complete, "total":total}
};

//Builds the intermediary string of results returned by the iTunes web service in pieces.
iResults.prototype.capture = function (data) {
    this.numGlobs++;
    this.glob += data;
};

/*
 iTunes returns a JSON that contains two elements:
    a count of the results
    a single element array containing a JSON of the result set.
 This function sets the self.data to the actual itunes data set and returns 1 if parsing was successful, 0 otherwise.
 In this way, the function can be used in an if statement.
 e.g. if (self.parse) {
        //analyze & process the data
      } else {
        //raise a warning
      }
 */

iResults.prototype.parse = function () {
    var self = this;
    complete++;
//    self.stats();
    var success = 1;
    try
    {
        self.rawJSON= JSON.parse(self.glob);
        self.data = self.rawJSON.results[0];
        self.hits= self.rawJSON.resultCount;
    }
    catch (err)
    {
        success = 0;
    }
    if (self.data == 'undefined') {
    }
    return success;
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getAlbum = function() {
    var album = '';
    if (this.data.wrapperType == 'collection' && this.data.collectionType == 'Album') {
        var album = new Album(this.data.collectionViewUrl,
                              this.data.amgArtistId, 
                              this.data.artistId, 
                              this.data.collectionName,
                              this.data.artworkUrl60,
                              this.data.artworkUrl100);
    } else {
    }
    return album;
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getTrack = function() {
    var track = '';
    console.log('iResults.prototype.getTrack : data ' + JSON.stringify(this.data));
        /*
    if (this.data.wrapperType == 'collection' && this.data.collectionType == 'Track') {
        var track = new Track(this.data.collectionViewUrl,
                              this.data.amgArtistId, 
                              this.data.artistId, 
                              this.data.collectionName,
                              this.data.artworkUrl60,
                              this.data.artworkUrl100);
    } else {
    }
        */
    return track;
};
