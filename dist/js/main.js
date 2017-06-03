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
        var container = document.getElementById("container");
        this.player = new Player(container);
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
        requestAnimationFrame(function () { return _this.gameLoop(); });
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
        this.moveSpeed = 0;
        this.player = p;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function () {
            return _this.onKeyUp();
        });
    }
    Driving.prototype.execute = function () {
        var position;
        position = this.player.getY() + this.getMoveSpeed();
        this.player.setY(position);
        this.player.draw();
    };
    Driving.prototype.onKeyDown = function (e) {
        if (e.key === this.moveUp && this.player.behavior instanceof Driving) {
            this.setMoveSpeed(-5);
        }
        else if (e.key === this.moveDown && this.player.behavior instanceof Driving) {
            this.setMoveSpeed(5);
        }
        else {
            return;
        }
    };
    Driving.prototype.onKeyUp = function () {
        this.setMoveSpeed(0);
    };
    Driving.prototype.crashed = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.player.behavior = new Crashed(this.player);
    };
    Driving.prototype.getMoveSpeed = function () {
        return this.moveSpeed;
    };
    Driving.prototype.setMoveSpeed = function (s) {
        this.moveSpeed = s;
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(parent) {
        var _this = _super.call(this, "player", parent, 100, 250, 93, 99) || this;
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