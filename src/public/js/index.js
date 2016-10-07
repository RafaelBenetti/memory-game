var MemoryGame = (function () {
    'use strict';

    var pieces = ['html', 'css', 'js', 'html', 'css', 'js'];

    var configureGame = function () {
        
        $('.back').each(function(){
            var piece = getRandomPiece();
            $(this).attr('piece', piece);
        });

        $('.back').click(function(){
            turnPiece(this);
        });
    };

    var getRandomPiece = function(){
        var index = Math.floor(Math.random() * pieces.length);        
        var piece = pieces[index];
        pieces.splice(index, 1);
        return piece;
    };

    var turnPiece = function(element){
        var piece = $('#templates .item-' + $(element).attr('piece')).clone();        
        $(element).parent().parent().append(piece);
        $(element).parent().addClass('hidden');

        if (isFirstPiece(piece)){
            return;
        }

        if (isMyPair(piece)){
            $('.row .incomplete').removeClass('incomplete');
            return;
        }

        setTimeout(function(){            
            resetOptions(piece);
        }, 1500);        
    };

    var isFirstPiece = function(){
        var total = $('.row .hidden').length;
        return total % 2 != 0;
    };

    var isMyPair = function(piece){
        var total = $('.row .hidden').parent().find('.' + $(piece).attr('piece')).length;
        return total == 2;
    };

    var resetOptions = function(piece){
          $('.row .incomplete').parent().find('.hidden').removeClass('hidden').parent().find('.incomplete').remove();
    };
    
    return {
        init: configureGame
    };
      
})();

$(document).ready(function(){
    MemoryGame.init();
});