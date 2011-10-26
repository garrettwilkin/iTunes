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
        'lookupAlbum Object': {                     //Sub-Context
        //lookupAlbum function returns an object.
            topic : function () {                   //topic
                new iTunes().lookupAlbum({artist:'Smashing Pumpkins', album:'Gish'},this.callback)
            },
            'Returns Object': function(err,album) { //Vow
                assert.isObject(album);
            }
        },
        'lookupAlbum Album': {                      //Sub-Context
        //lookupAlbum an instance of the Album object.
            topic : function () {                   //topic
                new iTunes().lookupAlbum({artist:'Smashing Pumpkins', album:'Gish'},this.callback)
            },
            'Returns Album': function(err,album) { //Vow
                assert.instanceOf(album,Album);
            }
        },
        'lookupTrack Object': {                     //Sub-Context
        //lookupTrack function returns an object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins', track:'I Am One'},this.callback)
            },
            'Returns Object': function(err,track) { //Vow
                assert.isObject(track);
            }
        },
        'lookupTrack Track Unique': {                      //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Smashing Pumpkins', track:'I Am One'},this.callback)
            },
            'Returns Track': function(err,track) { //Vow
                if {$track != '' } {
                    assert.instanceOf(track,Track);
                } else if {
                    assert.equal('',track, 'LookupTrack doesnt return string or track.');
                }
            }
        },
        'lookupTrack Track Duplicate 1': {                      //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'The Eels', track:'The Dog Faced Boy'},this.callback)
            },
            'Track is by artist in query 1': function(err,track) { //Vow
                assert.equal('The Eels',track.artist, 'Artists are not equal, expected \'The Eels\' received ' + track.artist );
            }
        },
        'lookupTrack Track Duplicate 2': {                      //Sub-Context
        //lookupTrack returns an instance of the Track  object.
            topic : function () {                   //topic
                new iTunes().lookupTrack({artist:'Corinne Bailey Rae', track:'Like A Star'},this.callback)
            },
            'Track is in query 2': function(err,track) { //Vow
                assert.equal('Corinne Bailey Rae',track.artist, 'Artists are not equal, expected \'Corinne Bailey Rae\' received ' + track.artist );
            }
            'Track is by artist in query 2': function(err,track) { //Vow
                assert.equal('Corinne Bailey Rae',track.artist, 'Artists are not equal, expected \'Corinne Bailey Rae\' received ' + track.artist );
            }
        },
        'lookupArtist Object': {                     //Sub-Context
        //lookupArtist returns an object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},this.callback)
            },
            'Returns Object': function(err,artist) { //Vow
                assert.isObject(artist);
            }
        },
        'lookupArtist Artist': {                      //Sub-Context
        //lookupArtist returns an instance of the Artist object.
            topic : function () {                   //topic
                new iTunes().lookupArtist({artist:'Smashing Pumpkins'},this.callback)
            },
            'Returns Artist': function(err,artist) { //Vow
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
