iTunes: an implementation of the iTunes API in Node.js.
======================================================

Authored by Garrett Wilkin (http://geethink.com/blog)

It uses both the iTunes API for retrieving media information and the LinkShare API for generating affiliate links to the iTunes store. See an example in simple-node.js.

Currently, the iTunes API is implemented and tested for searching for album information.  A callback function is required in order to use this package.  The basic steps to using it are:

1. Decide that you want to retrieve some media meta data (only albums supported currently)
2. Write a callback function to process this meta data (display it, store it in a database etc.)
3. Initialize an instance of iTunes.
4. Call lookupAlbum supplying the media information (e.g. album name, artist name) and the callback function that will process the result.

A very basic use:

    var itunesClient = new iTunes();
    itunesClient.lookupAlbum({artist: 'Smashing Pumpkins', album: 'Siamese Dream'}, function(error, album) {
      <callback function definition>
      }
    );


This library also includes the ability to generate tracking URLs via linkshare.

A very basic use of the LinkShare library:

    // Take your unique linkshare ID credential
    var token = '61513f782d1448d3e722acf3cd42a8a6bd7ac710b4badea2f1be0a685bd1b85e';

    // Use the iTunes merchant ID
    var merchantId = '13508';

    // pass these values to the LinkShare constructor with a previously queried iTunes store URL.
    var linkshare = new LinkShare(token,merchantId,track.itunesLink);

    // Now fire off a request to the linkshare API.  Supply your own callback function.
    linkshare.getLink(function(link) {
      console.log('LinkShare URL: ' + link);
    });

See demo files for a practical examples of the libraries in action.

Dependencies
------------
Winston - git://github.com/indexzero/winston.git
