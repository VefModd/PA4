
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
    game.start();

    this.move = false;

    /*
     * Event listeners for game
     */
    $(window).on('keydown', function(e) {
        if(e.keyCode === 32 && !game.isPlaying) {
            $('.Scoreboard').removeClass('is-visible');
            game.start();
        }
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
        if(!game.isPlaying) {
            $('.Scoreboard').removeClass('is-visible');
            game.start();
        }
        if(!this.move) {
            game.player.startFlapp();
            this.move = true;
        }
    });
    $('.GameCanvas').on('touchend mouseup', function() {
        game.player.endFlapp();
        this.move = false;
    });

    var resize = function () {
        var fontSize = Math.min(window.innerWidth / 102.4, window.innerHeight / 57.6);
        $('.GameCanvas').css('font-size', fontSize + 'px');
        $('.Foreground').css('-webkit-animation-duration', (114 / (fontSize * 25)) + 's');
    };

    resize();
    $(window).on('resize', resize);
});

