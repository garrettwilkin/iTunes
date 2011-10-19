/*
 Simple object to hold Artist information.  This is included just for ease of understanding getArtist.
 */

function Artist(storeUrl, amgArtistId, itunesArtistId, artistName) {
    this.storeUrl = storeUrl;
    this.amgArtistId = amgArtistId;
    this.itunesArtistId = itunesArtistId;
    this.artistName = artistName;
};
exports.Artist = Artist;

/*
 * Example result JSON from artist query
 *


{
  "wrapperType":"artist",
  "artistType":"Artist",
  "artistName":"Iron Horse",
  "artistLinkUrl":"http://itunes.apple.com/us/artist/iron-horse/id125711666?uo=4",
  "artistId":125711666,
  "amgArtistId":826486,
  "amgVideoArtistId":null,
  "primaryGenreName":"Country",
  "primaryGenreId":6
}

 *
 */
