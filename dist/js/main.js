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
        this.car = new Car(container);
        this.block = new Block(container);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.getInstance = function () {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
            console.log("Created GameInstance");
        }
        return Game.gameInstance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.draw();
        this.block.draw();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Driving = (function () {
    function Driving(c) {
        var _this = this;
        this.car = c;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Driving.prototype.execute = function () {
        console.log("I am Driving!!!");
        if (this.car.x > 10) {
            this.car.x = this.car.x - 2;
        }
    };
    Driving.prototype.onKeyDown = function (e) {
        var _this = this;
        if (e.key == ' ' && this.car.state instanceof Driving) {
            window.removeEventListener("keydown", function (e) { return _this.onKeyDown(e); });
            this.car.state = new Jumping(this.car);
        }
    };
    return Driving;
}());
var Jumping = (function () {
    function Jumping(c) {
        this.car = c;
    }
    Jumping.prototype.execute = function () {
        this.car.x += this.car.speed;
        this.car.y += this.car.jumpDirection;
        if (this.car.y < 140)
            this.car.jumpDirection = 3;
        if (this.car.y > 217) {
            this.car.jumpDirection = -3;
            console.log(this.car.x);
            this.car.state = new Driving(this.car);
        }
    };
    return Jumping;
}());
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
var GameObject = (function () {
    function GameObject(element, parent, x, y, width, height) {
        this.div = document.createElement(element);
        parent.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return GameObject;
}());
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(parent) {
        var _this = _super.call(this, "block", parent, 800, 240) || this;
        _this.speed = -4;
        return _this;
    }
    Block.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Block;
}(GameObject));
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, offset) {
        var _this = _super.call(this) || this;
        _this.div = document.createElement("wheel");
        parent.appendChild(_this.div);
        _this.x = offset;
        _this.y = 30;
        _this.speed = 0;
        return _this;
    }
    Wheel.prototype.draw = function () {
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(parent) {
        var _this = _super.call(this, "car", parent, 10, 220, 245, 45) || this;
        _this.state = new Driving(_this);
        _this.state.execute();
        _this.speed = 2;
        _this.jumpDirection = -3;
        _this.wheel1 = new Wheel(_this.div, 20);
        _this.wheel2 = new Wheel(_this.div, 100);
        return _this;
    }
    Car.prototype.draw = function () {
        this.state.execute();
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        this.wheel1.draw();
        this.wheel2.draw();
    };
    return Car;
}(GameObject));
//# sourceMappingURL=main.js.map