/*
 Error codes that can be referenced in classes and tests.
*/
 
function iError(code) {
    this.codes = code;
    switch(code)
    {
    case 0:
        this.message = 'Multiple results';
        break;
    case 1:
        this.message = 'Zero results';
        break;
    case 2:
        this.message = 'Could not parse results';
        break;
    case 3:
        this.message = 'Null results';
        break;
    case 4:
        this.message = 'iResults.getAlbum returns null';
        break;
    case 10:
        this.message = 'iResults.getAlbum target not found';
        break;
    case 5:
        this.message = 'iResults.getAlbum bad wrapperType or collectionType';
        break;
    case 6:
        this.message = 'iResults.getTrack bad wrapperType or kind';
        break;
    case 7:
        this.message = 'iResults.getTrack returns null';
        break;
    case 8:
        this.message = 'responseEnd: non-supported data type';
        break;
    case 9:
        this.message = 'iResults.getTrack target not found';
        break;
    case 11:
        this.message = 'iResults.getArtist target not found';
        break;
    }
};
exports.iError = iError;
