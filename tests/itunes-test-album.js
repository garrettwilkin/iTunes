var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('../itunes').iTunes;
    Album = require('../album').Album;
    Track = require('../track').Track;
    Artist = require('../artist').Artist;
    iError = require('../ierror').iError;

var api = {
    track: function (target) {
        return function () {
            new iTunes().lookupAlbum({artist:target.artist,
                                      album:target.album}, 
                                      this.callback);
        };
    }
};

function albumValidator(title){
    return function (error, album) {
	    assert.isNull(error);
	    assert.isNotNull(album);
	    assert.isObject(album);
	    assert.instanceOf(album,Album);
	    assert.equal(title.toLowerCase(),
                         album.name.toLowerCase());
	    }
};

var suite = vows.describe('itunes')
.addBatch({
    'iTunes Object': {
        'Aerosmith - Get A Grip': {
            topic : api.track({artist:'Aerosmith',album:'Get A Grip'}),
            'Get A Grip': albumValidator('Get A Grip')
        },
        'Billy Joel - River of Dreams': {
            topic : api.track({artist:'Billy Joel',album:'River of Dreams'}),
            'River of Dreams': albumValidator('River of Dreams')
        },
        'Smashing Pumpkins - Gish': {
            topic : api.track({artist:'Smashing Pumpkins',album:'Gish'}),
            'Gish': albumValidator('Gish')
        }
    }
})
.export(module);
