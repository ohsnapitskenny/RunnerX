var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameOver = false;
        this.score = 0;
        var container = document.getElementById("container");
        this.player = new Player(container);
        this.obstacles = new Array();
        for (var i = 0; i < 5; i++) {
            var obstacle = new Obstacle(container);
            this.obstacles.push(obstacle);
            obstacle.move();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.player.move();
        if (!this.gameOver) {
            for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
                var obstacle = _a[_i];
                if (Utils.checkCollision(obstacle, this.player)) {
                    this.endGame();
                }
                else {
                    obstacle.move();
                    this.score = this.score + 1;
                    var scoreText = "Score: " + this.score;
                    var board = document.getElementsByTagName("score")[0];
                    board.innerHTML = scoreText;
                }
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        this.gameOver = true;
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            obstacle.setSpeed(0);
        }
    };
    Game.prototype.getGameStatus = function () {
        return this.gameOver;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (instance1, instance2) {
        return (instance1.getX() < instance2.getX() + instance2.getWidth() &&
            instance1.getX() + instance1.getWidth() > instance2.getX() &&
            instance1.getY() < instance2.getY() + instance2.getHeight() &&
            instance1.getHeight() + instance1.getY() > instance2.getY());
    };
    Utils.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    return Utils;
}());
var Crashed = (function () {
    function Crashed(p) {
        this.player = p;
    }
    Crashed.prototype.execute = function () {
    };
    return Crashed;
}());
var Driving = (function () {
    function Driving(p) {
        var _this = this;
        this.moveUp = "ArrowUp";
        this.moveDown = "ArrowDown";
        this.moveSpeedY = 0;
        this.player = p;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function () { return _this.onKeyUp(); });
    }
    Driving.prototype.execute = function () {
        var position;
        position = this.player.getY() + this.getMoveSpeedY();
        if (position == 0 || position == 500) {
        }
        else {
            this.player.setY(position);
        }
        var g = Game.getInstance();
        if (!g.getGameStatus()) {
            this.player.draw();
        }
        else {
            this.crashed();
        }
    };
    Driving.prototype.onKeyDown = function (e) {
        if (e.key === this.moveUp && this.player.behavior instanceof Driving) {
            this.setMoveSpeedY(-5);
        }
        else if (e.key === this.moveDown && this.player.behavior instanceof Driving) {
            this.setMoveSpeedY(5);
        }
        else {
            return;
        }
    };
    Driving.prototype.onKeyUp = function () {
        this.setMoveSpeedY(0);
    };
    Driving.prototype.crashed = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.player.behavior = new Crashed(this.player);
    };
    Driving.prototype.getMoveSpeedY = function () {
        return this.moveSpeedY;
    };
    Driving.prototype.setMoveSpeedY = function (s) {
        this.moveSpeedY = s;
    };
    return Driving;
}());
var GameObject = (function () {
    function GameObject(element, parent, x, y, width, height) {
        this.div = document.createElement(element);
        parent.appendChild(this.div);
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
    };
    GameObject.prototype.update = function (x, y) {
        this.setX(x);
        this.setY(y);
    };
    GameObject.prototype.getX = function () {
        return this.x;
    };
    GameObject.prototype.setX = function (xPos) {
        this.x = xPos;
    };
    GameObject.prototype.getY = function () {
        return this.y;
    };
    GameObject.prototype.setY = function (yPos) {
        this.y = yPos;
    };
    GameObject.prototype.getWidth = function () {
        return this.width;
    };
    GameObject.prototype.setWidth = function (width) {
        this.width = width;
    };
    GameObject.prototype.getHeight = function () {
        return this.height;
    };
    GameObject.prototype.setHeight = function (height) {
        this.height = height;
    };
    return GameObject;
}());
var Kart = (function (_super) {
    __extends(Kart, _super);
    function Kart(parent, x, y, width, height) {
        return _super.call(this, "kart", parent, x, y, width, height) || this;
    }
    return Kart;
}(GameObject));
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(parent) {
        var _this = _super.call(this, "player", parent, Utils.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99) || this;
        _this.kart = new Kart(_this.div, 10, 0, 93, 99);
        _this.setPlayer();
        _this.setSpeed(Utils.getRandomInt(-1, -8));
        _this.draw();
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
        return _this;
    }
    Obstacle.prototype.setPlayer = function () {
        this.div.classList.add("toad");
    };
    Obstacle.prototype.move = function () {
        if (this.getX() < -200) {
            this.setX(Utils.getRandomInt(800, 1000));
            this.setSpeed(Utils.getRandomInt(-1, -6));
        }
        else {
            this.x += this.speed;
            this.draw();
        }
    };
    Obstacle.prototype.getSpeed = function () {
        return this.speed;
    };
    Obstacle.prototype.setSpeed = function (s) {
        this.speed = s;
    };
    return Obstacle;
}(GameObject));
Obstacle.obstacleY = 0;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(parent) {
        var _this = _super.call(this, "player", parent, 50, 250, 93, 99) || this;
        _this.kart = new Kart(_this.div, 100, 250, 93, 99);
        _this.behavior = new Driving(_this);
        _this.setPlayer();
        return _this;
    }
    Player.prototype.setPlayer = function () {
        this.div.classList.add("luigi");
    };
    Player.prototype.move = function () {
        this.behavior.execute();
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map