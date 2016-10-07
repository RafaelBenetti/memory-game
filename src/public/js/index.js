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

        blockOthersPieces();
    };

    var disableOthersPieces = function () {
        $('.row .back').attr('disabled', true);
    };

    var enableOthersPieces = function () {
        $('.row .back').attr('disabled', false);
    };

    var isFirstPiece = function () {
        var total = $('.row .hidden').length;
        return total % 2 != 0;
    };

    var isMyPair = function () {

        var pieces = $('.row').find('.piece-front');

        pieces.array.forEach(function (piece) {
            var text = piece.find('span').text();
            var total = pieces.find('span:contains(' + text + ')');
            if (total != 2)
                return false;
            else
                return true;
        });
    };

    return {
        init: init
    };

})();

$(document).ready(function () {
    Index.init();
});