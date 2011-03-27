require.paths.unshift(require('path').join(__dirname));

function Artist(storeUrl, amgArtistId, itunesArtistId, name) {
    this.storeUrl = storeUrl;
    this.amgArtistId = amgArtistId;
    this.itunesArtistId = itunesArtistId;
    this.name = name;
}
exports.Artist = Artist;
