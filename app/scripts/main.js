
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    game.start();

    this.move = false;

    $(window).on('keydown', function(e) {
        if(e.keyCode === 32 && !this.move) {
            game.player.startFlapp();
            this.move = true;
        }
    });

    $(window).on('keyup', function() {
        game.player.endFlapp();
        this.move = false;
    });

    $('.GameCanvas').on('touchstart mousedown', function() {
        if(!this.move) {
            game.player.startFlapp();
            this.move = true;
        }
    });
    $('.GameCanvas').on('touchend mouseup', function() {
        game.player.endFlapp();
        this.move = false;
    });
});
