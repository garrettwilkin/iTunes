/*
 * Meta data retriever for media items (songs, artists, albums).
 * Plan to provide simple evented interface to multiple media meta data sites. 
 *     *iTunes
 *     *Last.fm
 *     *Amazon
 */
require.paths.unshift(require('path').join(__dirname));

var http = require('http');
var Divider = require('divider').Divider;
var iTunes = require('itunes').iTunes;
var http = require('http');

function MetaMedia() {
    this.AppleMedia = new iTunes('123456789-ABC');
};
exports.MetaMedia = MetaMedia;

MetaMedia.prototype.getArtist = function(artist) {
   this.AppleMedia.getArtist(artist);
};


MetaMedia.prototype.request = function(source, label) {
    var self = this;
    self.AppleMedia.request(source,label);
};
