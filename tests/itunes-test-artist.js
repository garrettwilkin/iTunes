var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('../itunes').iTunes;
    Album = require('../album').Album;
    Track = require('../track').Track;
    Artist = require('../artist').Artist;
    iError = require('../ierror').iError;

var api = {
    artist: function (target) {
        return function () {
            new iTunes().lookupArtist({artist:target.artist},
                                      this.callback);
        };
    }
};

function artistValidator(title){
    return function (error, artist) {
            assert.isNull(error);
            assert.isNotNull(artist);
            assert.isObject(artist);
            assert.instanceOf(artist,Artist);
            assert.equal(title.toLowerCase(),
                         artist.artistName.toLowerCase());
            }
};

var suite = vows.describe('itunes')
.addBatch({
    'iTunes Object': {
        'Beirut': {
            topic : api.artist({artist:'Beirut'},
                                          this.callback),
            'Beirut': artistValidator('Beirut')
        },
        'Smashing Pumpkins' : {
            topic : api.artist({artist:'Smashing Pumpkins'},
                                          this.callback),
            'Smashing Pumpkins': artistValidator('Smashing Pumpkins')
        },
        'The Police' : {
            topic : api.artist({artist:'The Police'},
                                          this.callback),
            'The Police': artistValidator('The Police')
        }
    }
})
.export(module);
