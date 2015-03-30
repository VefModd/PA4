/**
 * Cross browser RequestAnimationFrame
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        'use strict';
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(/* function */ callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

var music = document.getElementsById('Music')[0];
var flapp = document.getElementsById('Flapp')[0];
var end = document.getElementsById('End')[0];
var muteButton = document.getElementById('mute');

muteButton.style.cursor = 'pointer';
muteButton.onclick = function() {
    'use strict';
    if(music.volume === 0) {
        $('#mute').toggleClass('fa-volume-up');
        $('#mute').toggleClass('fa-volume-off');
        music.volume = 1;
        flapp.volume = 1;
        end.volume = 1;
    } else {
        $('#mute').toggleClass('fa-volume-up');
        $('#mute').toggleClass('fa-volume-off');
        music.volume = 0;
        flapp.volume = 0;
        end.volume = 0;
    }
};
