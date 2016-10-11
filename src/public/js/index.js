var Index = (function () {
    'use strict';

    var pieces = [];

    var init = function () {

        $.getJSON("js/pieces.json", function (json) {
            pieces = ArrayExtension.shuffle(json.concat(json));
            configureGame();
        });
    };

    var configureGame = function () {

        pieces.forEach(function (piece) {

            var element = $('#templates > div').clone();

            element.find('.piece-front .item').css('background-color', piece.backgroundColor);
            element.find('.piece-front').css('color', piece.fontColor);
            element.find('.piece-front').find('span').text(piece.name);

            element.find('.piece-back').click(turnPiece);

            $('.row').append(element);
        });
    };

    var turnPiece = function () {

        if($(this).hasClass('disabled'))
            return;

        var father = $(this).parent();
        $(father).find('.piece-front').removeClass('hidden');
        $(father).find('.piece-back').addClass('hidden');

        validatePiece();
    };

    var validatePiece = function () {
        if (isFirstPiece())
            return;

        if (isMyPair())
            return;

        disableOthersPieces();
        resetOptions();
    };

    var resetOptions = function () {

        setTimeout(function () {
            
            var front = $('.row .error');
            $(front).removeClass('error');
            $(front).addClass('hidden');
                 
            var back = front.parent().find('.piece-back');
            $(back).removeClass('hidden');
            
            enableOthersPieces();
        }, 1000);
    };

    var disableOthersPieces = function () {
        $('.row .piece-back').addClass('disabled');
    };

    var enableOthersPieces = function () {
        $('.row .piece-back').removeClass('disabled');
    };

    var isFirstPiece = function () {
        var total = $('.row .piece-back.hidden').length
        return total % 2 != 0;
    };

    var isMyPair = function () {

        var elements = Array.from($('.row .piece-front'));
        var isMyPair = true;

        elements.forEach(function (piece) {
            var text = $(piece).find('span').text();
            var total = $('.row .piece-front').not('.hidden').find('span:contains(' + text + ')').length;
            if (total == 1) {
                $(piece).addClass('error');
                isMyPair = false;
            }
                
        });

        return isMyPair;
    };

    return {
        init: init
    };

})();

$(document).ready(function () {
    Index.init();
});