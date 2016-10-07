var ArrayExtension = (function(){
    'use strict';
    
    // shuffle array with pieces.
    var shuffle = function(array) {
        var j, x, i;
        for (i = array.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = array[i - 1];
            array[i - 1] = array[j];
            array[j] = x;
        }
        return array;
    };

    return {
        shuffle: shuffle
    };
})();