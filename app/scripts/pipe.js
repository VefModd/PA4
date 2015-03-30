window.Pipe = (function() {
    'use strict';

    //var SPEED = 10;
    //var GAP = 25;

    var NewPipe = function(pipe, xcoord, ycoord) {
        this.pipe = pipe;
        this.pos = { x: xcoord, y: ycoord };
    };

    var Pipe = function(el, game) {
        this.el = el;
        this.game = game;
        this.pipes = [
            {
                name: 'FirstPipe',
                top: new NewPipe(this.el.find('.PipeUp1'), 10, 10),
                bottom: new NewPipe(this.el.find('.PipeDown1'), 10, 10)
            }
        ];
    };

    Pipe.prototype.reset = function() {
        this.pipes[0].top.pos.x = 10;
        this.pipes[0].bottom.pos.x = 10;
    };

    return Pipe;

})();
