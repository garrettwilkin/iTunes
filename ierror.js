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
        this.message = 'results.getAlbum returns null';
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
    }
};
exports.iError = iError;
