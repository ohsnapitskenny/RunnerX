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
        var container = document.getElementById("container");
        this.player = new Player(container);
        this.obstacles = new Array();
        this.player.score = 0;
        for (var i = 0; i < 5; i++) {
            var obstacle = new Obstacle(container, this.player);
            this.obstacles.push(obstacle);
            this.player.subscribe(obstacle);
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
                if (Utils.Game.checkCollision(obstacle, this.player)) {
                    this.endGame();
                }
                else {
                    obstacle.move();
                    this.player.score = this.player.score + 1;
                    var scoreText = "Score: " + this.player.score;
                    var board = document.getElementsByTagName("score")[0];
                    board.innerHTML = scoreText;
                }
            }
        }
        else {
            var container_1 = document.getElementById("container");
            var start = document.createElement("start");
            var scoreText = "Final Score: " + this.player.score;
            start.innerText = scoreText;
            document.body.appendChild(start);
            setTimeout(function () {
                container_1.remove();
            }, 2000);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        this.gameOver = true;
    };
    Game.prototype.getGameStatus = function () {
        return this.gameOver;
    };
    return Game;
}());
window.addEventListener("load", function () {
    var startText = "Runner X";
    var board = document.getElementsByTagName("score")[0];
    board.innerHTML = startText;
    var start = document.createElement("start");
    start.innerText = "Start Game";
    document.body.appendChild(start);
    start.addEventListener("click", function () {
        start.remove();
        Game.getInstance();
    });
});
var Utils;
(function (Utils) {
    var Game = (function () {
        function Game() {
        }
        Game.checkCollision = function (instance1, instance2) {
            return (instance1.getX() < instance2.getX() + instance2.getWidth() &&
                instance1.getX() + instance1.getWidth() > instance2.getX() &&
                instance1.getY() < instance2.getY() + instance2.getHeight() &&
                instance1.getHeight() + instance1.getY() > instance2.getY());
        };
        Game.removeFromGame = function (go, arr) {
            go.removeDiv();
            var i = arr.indexOf(go);
            if (i != -1) {
                arr.splice(i, 1);
            }
        };
        return Game;
    }());
    Utils.Game = Game;
    var Numbers = (function () {
        function Numbers() {
        }
        Numbers.getRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        return Numbers;
    }());
    Utils.Numbers = Numbers;
})(Utils || (Utils = {}));
var Crashed = (function () {
    function Crashed(p) {
        this.player = p;
        this.sound = new Howl({
            src: ['assets/dead.mp3'],
            autoplay: true,
            loop: false
        });
        this.player.setDeadLuigi();
    }
    Crashed.prototype.execute = function () {
    };
    return Crashed;
}());
var Keys;
(function (Keys) {
    Keys[Keys["ArrowUp"] = 38] = "ArrowUp";
    Keys[Keys["ArrowDown"] = 40] = "ArrowDown";
})(Keys || (Keys = {}));
var Driving = (function () {
    function Driving(p) {
        var _this = this;
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
        switch (e.keyCode) {
            case Keys.ArrowUp:
                this.setMoveSpeedY(-5);
                break;
            case Keys.ArrowDown:
                this.setMoveSpeedY(5);
                break;
            default:
                break;
        }
    };
    Driving.prototype.onKeyUp = function () {
        this.setMoveSpeedY(0);
    };
    Driving.prototype.crashed = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.removeEventListener("keyup", function () { return _this.onKeyUp(); });
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
    GameObject.prototype.move = function () {
        this.draw();
    };
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.getX() + "px," + this.getY() + "px)";
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
    GameObject.prototype.removeDiv = function () {
        this.div.remove();
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
    function Obstacle(parent, p) {
        var _this = _super.call(this, "obstacle", parent, Utils.Numbers.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99) || this;
        _this.kart = new Kart(_this.div, 10, 0, 93, 99);
        _this.setPlayer();
        _this.setSpeed(Utils.Numbers.getRandomInt(-1, -8));
        _this.draw();
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
        return _this;
    }
    Obstacle.prototype.setPlayer = function () {
        this.div.classList.add("toad");
    };
    Obstacle.prototype.move = function () {
        if (this.getX() < -200) {
            this.setX(Utils.Numbers.getRandomInt(800, 1000));
            this.setSpeed(Utils.Numbers.getRandomInt(-1, -6));
        }
        else {
            this.x += this.speed;
            this.draw();
        }
    };
    Obstacle.prototype.notify = function () {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
        this.setSpeed(0);
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
        _this.observers = new Array();
        _this.behavior = new Driving(_this);
        _this.setPlayer();
        return _this;
    }
    Player.prototype.setPlayer = function () {
        this.div.classList.add("luigi");
    };
    Player.prototype.setDeadLuigi = function () {
        this.div.classList.remove("luigi");
        this.div.classList.add("dead");
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.notify();
        }
    };
    Player.prototype.move = function () {
        this.behavior.execute();
    };
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.unsubscribe = function (o) {
        var i = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map