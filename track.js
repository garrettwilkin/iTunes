/*
 Simple object to hold Track information.  This is included just for ease of understanding getTrack.
 */

function Track( trackName, trackId, trackViewUrl, artistId, artworkUrl60, artworkUrl100, artistName) {
    this.name = trackName;
    this.id = trackId;
    this.url = trackViewUrl;
    this.artistId = artistId;
    this.artworkUrl60 = artworkUrl60;
    this.artworkUrl100 = artworkUrl100;
    this.artist = artistName;
};
exports.Track= Track;

/*
 * Example result JSON from album query
 *
{
  "wrapperType":"track",
  "kind":"song",
  "artistId":3536235,
  "collectionId":271953392,
  "trackId":271953487,
  "artistName":"Jolie Holland",
  "collectionName":"Escondida",
  "trackName":"Goodbye California",
  "collectionCensoredName":"Escondida",
  "trackCensoredName":"Goodbye California",
  "artistViewUrl":"http://itunes.apple.com/us/artist/jolie-holland/id3536235?uo=4",
  "collectionViewUrl":"http://itunes.apple.com/us/album/goodbye-california/id271953392?i=271953487&uo=4",
  "trackViewUrl":"http://itunes.apple.com/us/album/goodbye-california/id271953392?i=271953487&uo=4",
  "previewUrl":"http://a3.mzstatic.com/us/r1000/059/Music/f0/8e/f0/mzm.symtkvoz.aac.p.m4a",
  "artworkUrl30":"http://a6.mzstatic.com/us/r1000/032/Music/17/31/d2/mzi.eiykbhvl.30x30-50.jpg",
  "artworkUrl60":"http://a6.mzstatic.com/us/r1000/032/Music/17/31/d2/mzi.eiykbhvl.60x60-50.jpg",
  "artworkUrl100":"http://a5.mzstatic.com/us/r1000/032/Music/17/31/d2/mzi.eiykbhvl.100x100-75.jpg",
  "collectionPrice":9.99,
  "trackPrice":1.29,
  "releaseDate":"2008-01-29 08:00:00 Etc/GMT",
  "collectionExplicitness":"notExplicit",
  "trackExplicitness":"notExplicit",
  "discCount":1,
  "discNumber":1,
  "trackCount":12,
  "trackNumber":7,
  "trackTimeMillis":208800,
  "country":"USA",
  "currency":"USD",
  "primaryGenreName":"Alternative",
  "contentAdvisoryRating":null,
  "shortDescription":null,
  "longDescription":null
}
*
*/
