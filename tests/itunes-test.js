var vows = require('vows');
    assert = require('assert');
    querystring = require('querystring');
    iTunes = require('../itunes').iTunes;
    Album = require('../album').Album;
    Track = require('../track').Track;
    Artist = require('../artist').Artist;


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
            'Returns Album': function(err,album) { //Vow
                assert.isNull(err);
                assert.isObject(album);
                assert.instanceOf(album,Album);
            }
        },
        'lookupTrack unique': {               //Sub-Context
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins',
                                          track:'I Am One'},
                                          this.callback)
            },
            'Returns Track': function(err,track) { //Vow
                assert.isNull(err);
                assert.isObject(track);
                if (track != '' ) {
                    assert.instanceOf(track,Track);
                } else {
                    assert.equal('I Am One',track.name);
                }
            }
        },
        'lookupTrack Duplicate 1': {          //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'The Eels',
                                         track:'The Dog Faced Boy'},
                                         this.callback)
            },
            'Correct artist': function(err,track) { //Vow
                assert.equal('The Eels',track.artist);
            }
        },
        'lookupTrack Duplicate 2': {          //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Corinne Bailey Rae',
                                          track:'Like A Star'},
                                          this.callback)
            },
            'Correct artist': function(err,track) { //Vow
                assert.isNull(err);
                assert.equal('Corinne Bailey Rae',track.artist);
            }
        },
        'lookupArtist Artist': {                      //Sub-Context
        //lookupArtist returns an instance of the Artist object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},
                                          this.callback)
            },
            'Returns Artist': function(err,artist) { //Vow
                assert.isNull(err);
                assert.isObject(artist);
                assert.instanceOf(artist,Artist);
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
