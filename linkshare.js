/*
 *
 * Simple class for retrieving linkshare links. Original use case was for generating clickable iTunes links. Theoretically it can be used with any LinkShare merchant ID and URL.
 * Author: Garrett Wilkin
 * Date  : 2011/01/17
 *
 */

require.paths.unshift(require('path').join(__dirname));

var http = require('http');
var Divider = require('divider').Divider;
var Timer = require('timer').Timer;

/*
 * Constructor takes all information required by LinkShare to generate links.
 */
function LinkShare(token,merchant,url) {
    this.token = token;
    this.merchant = merchant;
    this.url = url;
    this.server = 'feed.linksynergy.com';
    this.URL =  { script:'/createcustomlink.shtml?',
                  token:'token=',
                  merchant:'&mid=',
                  url:'&murl='};
    this.trackingUrl =  '';
};
exports.LinkShare = LinkShare;

/*
 * Concatenates all parameter names and values for interacting with linkshare.
 */
LinkShare.prototype.getQuery = function() {
    return this.URL.script + this.URL.token + this.token + this.URL.merchant + this.merchant + this.URL.url + this.url;
};

/*
 * Fires off a request to linkshare to generate a click tracking URL.  executes callback on completion of returned data.
 */
LinkShare.prototype.getLink = function(callback) {
    var self = this;
    var clock = new Timer(self.url);
    var linksynergy = http.createClient(80,self.server);
    var request = linksynergy.request('GET',self.getQuery(),{host:self.server});
    linksynergy.request('GET',self.getQuery());
    request.end();
    clock.set();
    request.on('response', function(response) {
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            clock.elapsed();
            self.trackingUrl+=chunk;
        });
        response.on('end',function() {
            clock.elapsed();
            callback(self.trackingUrl);
        });
    });
};
