/*
 * Object to hold iTunes search query results.
 * The result from apple is JSON format. This class will support pulling out 
 * specific attributes.
 */

var Album = require('./album').Album;
var Artist = require('./artist').Artist;
var Track = require('./track').Track;
var iError = require('./ierror').iError;


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
        self.data = self.rawJSON.results;
        self.hits= self.rawJSON.resultCount;
    }
    catch (err)
    {
        success = 0;
    }
    if (self.data == 'undefined') {
        console.log('undefined data');
    }
    return success;
};

/*
 Removes an initial 'The' from strings during search.  In most cases 'The' should not prevent a match.
*/
noThe = function(title) {
    title = title.toLowerCase();
    var artArray = title.split(' ');
    var normal = title;
    if (artArray[0] == 'the') {
        artArray.reverse();
        artArray.pop();
        artArray.reverse();
    }
    normal = artArray.join(' ');
    return normal
}

/*
 Extracts a few items from the iTunes results for an artist search and returns them in an object.
 */
iResults.prototype.getArtist = function(target,callback) {
    var artist = null;
    var error = null;
    var i = 0;
    var found  = 0;
    while (this.data.length > i && found == 0) {
        var item = this.data[i];
        if (item.wrapperType == 'artist') {
            normItemArtist = noThe(item.artistName);
            normTargetArtist = noThe(target.artist);
            if (item.artistName == target.artist ||
                normItemArtist == normTargetArtist) {
                var artist = new Artist(item.artistLinkUrl,
                                        item.amgArtistId,
                                        item.artistId,
                                        item.artistName);
                found = 1;
            };
        };
        i++;
    };
    if (found == 0) {
        error = new iError(11);
    }
    callback(error,artist);
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getTrack = function(target,callback) {
    var track = null;
    var error = null;
    var i = 0;
    var found  = 0;
    var resultSet = '';
    normTargetArtist = noThe(target.artist);
    normTargetTrack  = noThe(target.track);
    var userd = {input:
                   {Track:normTargetTrack,
                    Artist:normTargetArtist}};
    //console.log(userd);
    while (this.data.length > i && found == 0) {
        var item = this.data[i];
        if (item.wrapperType == 'track' && 
            item.kind == 'song' ) {

            normItemArtist   = noThe(item.artistName);
            normItemTrack    = noThe(item.trackName);
            resultSet = {reply:
                           {Track:normItemTrack,
                            Artist:normItemArtist}};
         //   console.log(resultSet);
         /* console.log(
                       normTargetArtist + ' ' +
                       normItemArtist + ' ' +
                       normTargetTrack + ' ' +
                       normItemTrack + ' '
                       );*/

            if ((item.artistName == target.artist ||
                normTargetArtist == normItemArtist) &&
                (item.trackName == target.track ||
                 normTargetTrack == normItemTrack )) {

                var track = new Track(item.trackName,
                                      item.trackId, 
                                      item.trackViewUrl, 
                                      item.artistId,
                                      item.artworkUrl60,
                                      item.artworkUrl100,
                                      item.artistName);
                found = 1;
            };
        };
        i++;
    };
    if (found == 0) {
        error = new iError(9);
    };
    callback(error,track);
};

/*
 Extracts a few items from the iTunes results for an album search and returns them in an object.
 */
iResults.prototype.getAlbum = function(target,callback) {
    var album = null;
    var error = null;
    var i = 0;
    var found  = 0;
    while (this.data.length > i && found == 0) {
        var item = this.data[i];
        if (item.wrapperType == 'collection' && 
            item.collectionType == 'Album') {

            normTargetAlbum  = noThe(target.album );
            normItemAlbum    = noThe(item.collectionName);
            normTargetArtist = noThe(target.artist);
            normItemArtist   = noThe(item.artistName);

            if ((item.artistName == target.artist ||
                normTargetArtist == normItemArtist) &&
                (item.collectionName == target.album ||
                 normTargetAlbum == normItemAlbum )) {
                album = new Album(item.collectionViewUrl,
                                  item.amgArtistId, 
                                  item.artistId, 
                                  item.collectionName,
                                  item.artistName,
                                  item.artworkUrl60,
                                  item.artworkUrl100);
                found = 1;
            }
        };
        i++;
    };
    if (found == 0) {
        error = new iError(10);
    };
    callback(error,album);
};

