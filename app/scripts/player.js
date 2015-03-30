window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 10;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
        this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		//this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.onFrame = function(delta) {
        if(Controls.keys.mousedown || Controls.keys.touchstart || Controls.keys.space) {
            //this.pos.y -= 3;
            document.getElementById('Flapp').play();
            this.pos.y -= delta * SPEED + 1.5;
        }
        else {
            //this.pos.y += delta + 0.5;
            this.pos.y += delta * SPEED;
        }

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

        this.checkCollisionWithBounds();
        this.checkCollisionWithPipes();

	};

    Player.prototype.checkCollisionWithPipes = function() {
        var pipeWidth = 7.5;
        for(var i = 0; i < this.game.pipe.pipes.length; i++) {
            /*
            console.log('this.el: ', this.game.pipe.el);
            console.log('xcoord: ', this.game.pipe.pipes[i].top.pos.x);
            console.log('ycoord1: ', parseFloat(this.game.pipe.el[2 * i].style.height));
            console.log('ycoord2: ', (this.game.WORLD_HEIGHT - parseFloat(this.game.pipe.el[2 * i + 1].style.height)));
            console.log('height1: ', parseFloat(this.game.pipe.el[2 * i].style.height));
            console.log('height2: ', parseFloat(this.game.pipe.el[2 * i + 1].style.height));
            console.log('width: ', pipeWidth);
            */
            var pipeX = this.game.pipe.pipes[i].top.pos.x - pipeWidth;

            // between x-coord
            if((pipeX > 0 && pipeX < this.game.WORLD_WIDTH && pipeX < (this.pos.x + WIDTH) && (pipeX > this.pos.x - WIDTH))) {
                console.log('first check true');
                //console.log('i: ', i);
                //console.log(this.game.pipe.pipes[i]);
                //var height1 = parseFloat(this.game.pipe.el[2 * i].style.height);
                //console.log('height1: ', height1);
                //console.log('this.pos.y - HEIGHT: ', this.pos.y - HEIGHT);
                //console.log(this.game.pipe.el);
                /*
                if(this.pos.y < height1) {
                    console.log('second check TRUE');
                    console.log('height1: ', height1);
                    console.log('this.pos.y: ', this.pos.y);
                    return this.game.gameover();
                }
                else {
                    console.log('second check FALSE');
                }
                */
            }
            else {
                console.log('first check FALSE');
            }

        }
    };

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
            document.getElementById('End').play();
			return this.game.gameover();
		}
	};

	return Player;

})();
