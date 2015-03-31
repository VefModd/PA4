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
        this.space = false;
        this.mouse = false;
        this.touch = false;
        this.nextPipe = 'firstPipe';
        this.score = 0;

        $(window).on('keydown', function(e) {
            if(e.keyCode === 32 && !this.space) {
                SPEED = SPEED - 40;
                document.getElementById('Flapp').play();
                $('.Wing').css('transform-origin', 'bottom right');
                $('.Wing').css('transform', 'translateZ(0) rotate(-35deg)');
                this.space = true;
            }
        });
        $(window).on('keyup', function() {
            this.space = false;
            SPEED = SPEED / 2;
            $('.Wing').css('transform', 'translateZ(0) rotate(0)');
        });
        $(window).on('mousedown', function() {
            if(!this.mouse) {
                SPEED = SPEED - 40;
                document.getElementById('Flapp').play();
                $('.Wing').css('transform-origin', 'bottom right');
                $('.Wing').css('transform', 'translateZ(0) rotate(-35deg)');
                this.mouse = true;
            }
        });
        $(window).on('mouseup', function() {
            this.mouse = false;
            SPEED = SPEED / 2;
            $('.Wing').css('transform', 'translateZ(0) rotate(0)');
        });
        $(window).on('touchstart', function() {
            if(!this.touch) {
                SPEED = SPEED - 40;
                document.getElementById('Flapp').play();
                $('.Wing').css('transform-origin', 'bottom right');
                $('.Wing').css('transform', 'translateZ(0) rotate(-35deg)');
                this.touch = true;
            }
        });
        $(window).on('touchend', function() {
            this.touch = false;
            SPEED = SPEED / 2;
            $('.Wing').css('transform', 'translateZ(0) rotate(0)');
        });
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	    SPEED = 0;
        this.nextPipe = 'firstPipe';
        this.score = 0;
	};

	Player.prototype.onFrame = function(delta) {
        SPEED = SPEED + GRAVITY;
        this.pos.y += delta * SPEED;

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0em)');

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
                (pipeX + pipeWidth >= this.pos.x)) {
                if((this.pos.y <= height1) || ((this.pos.y + HEIGHT) >= (this.game.WORLD_HEIGHT - height2))) {
                    document.getElementById('End').play();
                    return this.game.gameover();
                }
                else if(this.game.pipe.pipes[i].name === this.nextPipe) {
                    this.score++;
                    this.nextPipe = this.game.pipe.pipes[(i + 1) % this.game.pipe.pipes.length].name;
                }
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
