var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('../itunes').iTunes;
    Album = require('../album').Album;
    Track = require('../track').Track;
    Artist = require('../artist').Artist;
    iError = require('../ierror').iError;

function assertError(e) {
    if (e != null) {
        console.log(e.message);
    };
    return function (e, res) {
        assert.isNull(e);
    }
}

var suite = vows.describe('itunes')
.addBatch({                                         //Batch
    'iTunes Object': {                              //Context
    //Make vows on the iTunes class
        'artist': {                      //Sub-Context
        //lookupArtist returns an instance of the Artist object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},
                                          this.callback)
            },
            'artist instance': function(err,artist) { //Vow
                assert.isNull(err);
                assert.isObject(artist);
                assert.instanceOf(artist,Artist);
                assert.equal(artist.artistName,'Smashing Pumpkins');
            }
        }
    }
})
.export(module);
