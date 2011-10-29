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
        'unique track': {                           //Sub-Context
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins',
                                          track:'I Am One'},
                                          this.callback)
            },
            'Returns Track': function(err,track) { //Vow
                assert.isNull(err);
                assertError(err);
                assert.isNotNull(track);
                assert.isObject(track);
                assert.instanceOf(track,Track);
                assert.equal('I Am One',track.name);
            }
        },
        'duplicate track 1': {                      //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'The Eels',
                                         track:'The Dog Faced Boy'},
                                         this.callback)
            },
            'correct track artist 1, removes the': function(err,track) { //Vow
                assert.isNull(err);
                assertError(err);
                assert.isNotNull(track);
                assert.instanceOf(track,Track);
                assert.equal('Eels',track.artist);
            }
        },
        'duplicate track 2': {                      //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Corinne Bailey Rae',
                                          track:'Like A Star'},
                                          this.callback)
            },
            'correct track artist 2': function(err,track) { //Vow
                assert.isNull(err);
                assertError(err);
                assert.isNotNull(track);
                assert.instanceOf(track,Track);
                assert.equal('Corinne Bailey Rae',track.artist);
            }
        },
        'Basic Components': {
        //Assert that the getQuery method on the iTunes object returns a string 
            topic : new iTunes(),
            'getQuery returns String': function (topic) {
                assert.isString(topic.getQuery()); 
            }
        }
    }
})
.export(module);
