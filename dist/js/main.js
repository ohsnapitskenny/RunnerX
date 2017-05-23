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
        return (instance1.x < instance2.x + instance2.width &&
            instance1.x + instance1.width > instance2.x &&
            instance1.y < instance2.y + instance2.height &&
            instance1.height + instance1.y > instance2.y);
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
        this.moveSpeed = 3;
        this.player = p;
        window.addEventListener("keydown", function (e) {
            return _this.onKeyDown(e);
        });
    }

    Driving.prototype.execute = function () {
        this.player.draw();
    };
    Driving.prototype.onKeyDown = function (e) {
        var yPosition;
        if (e.key === this.moveUp && this.player.behavior instanceof Driving) {
            yPosition = this.player.getY() - this.moveSpeed;
        }
        else if (e.key === this.moveDown && this.player.behavior instanceof Driving) {
            yPosition = this.player.getY() + this.moveSpeed;
        }
        else {
            return;
        }
        this.player.setY(yPosition);
        this.execute();
    };
    Driving.prototype.crashed = function () {
        var _this = this;
        window.removeEventListener("keydown", function (e) {
            return _this.onKeyDown(e);
        });
        this.player.behavior = new Crashed(this.player);
    };
    return Driving;
}());
var GameObject = (function () {
    function GameObject(element, parent, x, y, width, height) {
        this.div = document.createElement(element);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    GameObject.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
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
        _this.div.classList.add("mario");
        _this.setSpeed(2);
        return _this;
    }
    Player.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };
    Player.prototype.getSpeed = function () {
        return this.speed;
    };
    Player.prototype.setY = function (yPos) {
        this.y = yPos;
    };
    Player.prototype.getY = function () {
        return this.y;
    };
    Player.prototype.move = function () {
        this.behavior.execute();
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map