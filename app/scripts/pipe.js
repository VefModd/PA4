window.Pipe = (function() {
    'use strict';
    var SPEED = 10;
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
                top: new NewPipe(this.el.find('.PipeUp1'), 0, 0),
                bottom: new NewPipe(this.el.find('.PipeDown1'), 0, 0)
            }
        ];
    };

    Pipe.prototype.reset = function() {
        this.pipes[0].top.pos.x = 0;
        this.pipes[0].bottom.pos.x = 0;
    };

    Pipe.prototype.onFrame = function(delta) {
        this.pipes[0].top.pos.x -= delta * SPEED;
        this.pipes[0].bottom.pos.x -= delta * SPEED;

		this.el.css('transform', 'translate(' + this.pipes[0].top.pos.x + 'em, ' + this.pipes[0].top.pos.y + 'em)');
		this.el.css('transform', 'translate(' + this.pipes[0].bottom.pos.x + 'em, ' + this.pipes[0].bottom.pos.y + 'em)');
    };

    return Pipe;

})();
