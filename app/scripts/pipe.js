window.Pipe = (function() {
    'use strict';
    var SPEED = 10;
    var GAP = 25;

    var NewPipe = function(pipe, xcoord, ycoord) {
        this.pipe = pipe;
        /*
        this.pipe.css('height', '10px');
        console.log('pipe: ', this.pipe.css);
        */
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
        console.log('inside reset!');
        this.pipes[0].top.pos.x = 0;
        this.pipes[0].bottom.pos.x = 0;
        var upperHeight = getRandomHeight();
        var downHeight = this.game.WORLD_HEIGHT - (upperHeight + GAP);
        console.log('this.el :', this.el);
        console.log('this.e2l :', this.el[0]);
		//this.el[0].style.height = '10px';
		//this.el[1].style.height = '50px';

		this.el[0].style.height = upperHeight + 'em';
		this.el[1].style.height = downHeight + 'em';
    };

    Pipe.prototype.onFrame = function(delta) {
        this.pipes[0].top.pos.x -= delta * SPEED;
        this.pipes[0].bottom.pos.x -= delta * SPEED;

		this.el.css('transform', 'translate(' + this.pipes[0].top.pos.x + 'em, ' + this.pipes[0].top.pos.y + 'em)');
		this.el.css('transform', 'translate(' + this.pipes[0].bottom.pos.x + 'em, ' + this.pipes[0].bottom.pos.y + 'em)');
    };

    function getRandomHeight() {
        var rndNumber = Math.random() * 10;

        if(0 <= rndNumber && rndNumber < 2) {
            return 5;
        }
        else if(2 <= rndNumber && rndNumber < 4) {
            return 10;
        }
        else if(4 <= rndNumber && rndNumber < 6) {
            return 15;
        }
        else if(6 <= rndNumber && rndNumber < 8) {
            return 20;
        }
        else {
            return 25;
        }
    }

    return Pipe;

})();
