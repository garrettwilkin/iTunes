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
        'lookupAlbum Album': {                      //Sub-Context
        //lookupAlbum an instance of the Album object.
            topic : function () {                   //topic
                new iTunes().lookupAlbum({artist:'Smashing Pumpkins', 
                                          album:'Gish'},
                                          this.callback)
            },
            'Returns album': function(err,album) { //Vow
                assert.isNull(err);
                assertError(err);
                assert.isObject(album);
                assert.instanceOf(album,Album);
                assert.equal(album.name,'Gish');
            }
        }
    }
})
.export(module);
