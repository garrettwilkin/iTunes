/*
 Simple object to hold Track information.  This is included just for ease of understanding getTrack.
 */
require.paths.unshift(require('path').join(__dirname));

function Track(storeUrl, amgArtistId, itunesArtistId, name, artworkUrl60, artworkUrl100) {
    this.storeUrl = storeUrl;
    this.amgArtistId = amgArtistId;
    this.itunesArtistId = itunesArtistId;
    this.artworkUrl60 = artworkUrl60;
    this.artworkUrl100 = artworkUrl100;
    this.itunesArtistId = itunesArtistId;
    this.name = name;
    this.artist = 'bajoley';
};
exports.Track= Track;

/*
 * Example result JSON from album query
 *
{
        "wrapperType":"collection",
        "collectionType":"Album",
        "artistId":1971863,
        "collectionId":14319958,
        "amgArtistId":10,
        "amgVideoArtistId":null,
        "artistName":"Beastie Boys",
        "collectionName":"Paul's Boutique",
        "collectionCensoredName":"Paul's Boutique",
        "artistViewUrl":"http://itunes.apple.com/us/artist/beastie-boys/id1971863?uo=4",
        "collectionViewUrl":"http://itunes.apple.com/us/album/pauls-boutique/id14319958?uo=4",
        "artworkUrl60":"http://a1.phobos.apple.com/us/r1000/017/Features/42/3b/dc/dj.pktszsjv.60x60-50.jpg",
        "artworkUrl100":"http://a1.phobos.apple.com/us/r1000/017/Features/42/3b/dc/dj.pktszsjv.100x100-75.jpg",
        "collectionPrice":6.99,
        "collectionExplicitness":"explicit",
        "contentAdvisoryRating":"Explicit",
        "trackCount":15,
        "copyright":"1989 Capitol Records, Inc.. All rights reserved.",
        "country":"USA",
        "currency":"USD",
        "releaseDate":"1989-07-31T07:00:00Z",
        "primaryGenreName":"Hip Hop/Rap"
}
*
*/
