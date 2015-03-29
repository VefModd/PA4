window.Pipe = (function() {
    'use strict';

    //var SPEED = 10;
    //var GAP = 25;

    var NewPipe = function(pipe, x, y) {
        this.pipe = pipe;
        this.pos = { x: x, y: y };
    };

    var Pipe = function(el, game) {
        this.el = el;
        this.game = game;
        this.pipes = [
            { name: 'FirstPipe', top: new NewPipe(this.el.find('.PipeUp1'), 20, 30), bottom: new NewPipe(this.el.find('.PipeDown1'), 30, 30) }
        ];
    };



    return Pipe;

})();
