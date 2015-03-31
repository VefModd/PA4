window.Player = (function() {
	'use strict';

	//var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0;
    var GRAVITY = 1.0;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
        this.pos = { x: 0, y: 0 };
        $(window).on('keydown', function(e) {
            if(e.keyCode === 32) {
                SPEED = SPEED - 40;
                //console.log('inside keydown');
                return true;
            }
        });
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	    SPEED = 0;
		//this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.onFrame = function(delta) {
        SPEED = SPEED + GRAVITY;
        this.pos.y += delta * SPEED;

        /*
        if(Controls.keys.mousedown || Controls.keys.touchstart || Controls.keys.space) {
            //this.pos.y -= 3;
            document.getElementById('Flapp').play();
            this.pos.y -= delta * SPEED + 1.5;
        }
        else {
            this.pos.y += delta * SPEED;
        }
        */

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

        this.checkCollisionWithBounds();
        this.checkCollisionWithPipes();

	};

    Player.prototype.checkCollisionWithPipes = function() {
        var pipeWidth = 7.5;
        for(var i = 0; i < this.game.pipe.pipes.length; i++) {
            var pipeX = this.game.pipe.pipes[i].bottom.pos.x;
            var height1 = parseFloat(this.game.pipe.el[2 * i].style.height);
            var height2 = parseFloat(this.game.pipe.el[2 * i + 1].style.height);

            if((pipeX <= this.pos.x + WIDTH) &&
                (pipeX + pipeWidth >= this.pos.x) &&
                ((this.pos.y <= height1) ||
                ((this.pos.y + HEIGHT) >= (this.game.WORLD_HEIGHT - height2)))) {
                document.getElementById('End').play();
                return this.game.gameover();
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
