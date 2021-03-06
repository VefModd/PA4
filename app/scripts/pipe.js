window.Pipe = (function() {
    'use strict';
    var SPEED = 25;
    var GAP = 12;

    var NewPipe = function(pipe, xcoord, ycoord) {
        this.pipe = pipe;
        this.pos = { x: xcoord, y: ycoord };
    };

    var Pipe = function(el, game) {
        this.el = el;
        this.game = game;
        this.pipes = [
            {
                name: 'firstPipe',
                top: new NewPipe(this.el.find('.PipeUp1'), this.game.WORLD_WIDTH, 0),
                bottom: new NewPipe(this.el.find('.PipeDown1'), this.game.WORLD_WIDTH, 0)
            },
            {
                name: 'secondPipe',
                top: new NewPipe(this.el.find('.PipeUp2'), this.game.WORLD_WIDTH + this.game.WORLD_WIDTH / 2, 0),
                bottom: new NewPipe(this.el.find('.PipeDown2'), this.game.WORLD_WIDTH + this.game.WORLD_WIDTH / 2, 0)
            },
            {
                name: 'thirdPipe',
                top: new NewPipe(this.el.find('.PipeUp3'), this.game.WORLD_WIDTH * 2, 0),
                bottom: new NewPipe(this.el.find('.PipeDown3'), this.game.WORLD_WIDTH * 2, 0)
            }
        ];
    };

    $('input[name="Difficulty"]').change(function() {
        GAP = parseInt(this.value);
    });

    Pipe.prototype.reset = function() {
        for(var i = 0; i < this.pipes.length; i++) {
            this.pipes[i].top.pos.x = this.game.WORLD_WIDTH + this.game.WORLD_WIDTH * (i * 0.5);
            this.pipes[i].bottom.pos.x = this.game.WORLD_WIDTH + this.game.WORLD_WIDTH * (i * 0.5);
        }

        var upperHeight;
        var downHeight;
        for(i = 0; i < this.pipes.length * 2; i = i + 2) {
            upperHeight = getRandomHeight();
            downHeight = this.game.WORLD_HEIGHT - (upperHeight + GAP);

            this.el[i].style.height = upperHeight + 'em';
            this.el[i + 1].style.height = downHeight + 'em';
        }
    };

    Pipe.prototype.onFrame = function(delta) {
        for(var i = 0; i < this.pipes.length; i++) {
            this.pipes[i].top.pos.x -= delta * SPEED;
            this.pipes[i].bottom.pos.x -= delta * SPEED;
        }

        var upperHeight;
        var downHeight;
        var pipeWidth = 7.5;

        for(i = 0; i < this.pipes.length; i++) {
            if(this.pipes[i].bottom.pos.x + pipeWidth < 0) {
                this.pipes[i].top.pos.x = this.game.WORLD_WIDTH + this.game.WORLD_WIDTH / 2;
                this.pipes[i].bottom.pos.x = this.game.WORLD_WIDTH + this.game.WORLD_WIDTH / 2;

                upperHeight = getRandomHeight();
                downHeight = this.game.WORLD_HEIGHT - (upperHeight + GAP);
                this.el[2 * i].style.height = upperHeight + 'em';
                this.el[2* i + 1].style.height = downHeight + 'em';
            }

        }

        for(i = 0; i < this.pipes.length; i++) {
            this.el[2 * i].style.transform = 'translate3d(' + this.pipes[i].top.pos.x + 'em, ' + this.pipes[i].top.pos.y + 'em, 0em)';
            this.el[2 * i].style.webkitTransform = 'translate3d(' + this.pipes[i].top.pos.x + 'em, ' + this.pipes[i].top.pos.y + 'em, 0em)';
            this.el[2 * i].style.MozTransform = 'translate3d(' + this.pipes[i].top.pos.x + 'em, ' + this.pipes[i].top.pos.y + 'em, 0em)';
            this.el[2 * i + 1].style.transform = 'translate3d(' + this.pipes[i].bottom.pos.x + 'em, ' + this.pipes[i].bottom.pos.y + 'em, 0em)';
            this.el[2 * i + 1].style.webkitTransform = 'translate3d(' + this.pipes[i].bottom.pos.x + 'em, ' + this.pipes[i].bottom.pos.y + 'em, 0em)';
            this.el[2 * i + 1].style.MozTransform = 'translate3d(' + this.pipes[i].bottom.pos.x + 'em, ' + this.pipes[i].bottom.pos.y + 'em, 0em)';
        }
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
