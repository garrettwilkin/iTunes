var http = require('http');

console.log('iTunes API Implementation in node.js');

function iTunes() {
    this.term = '';
    this.media = '';
    this.entity = '';
    this.attribute = '';
    this.callback = '';
    this.seperator = '&';
    this.joiner = '+';
    this.basePath = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?'
};

iTunes.prototype.setKeyValues = function( term, media) {
    this.term = term;
    this.media = media;
};

iTunes.prototype.getSearchUrl = function() {
    var term = 'term=';
    var media = 'media=';
    var url = this.basePath + term + this.term + this.seperator + media + this.media;
    console.log(url);
};

itunesApi = new iTunes();
itunesApi.setKeyValues('smashing+pumpkins','music');
itunesApi.getSearchUrl();
