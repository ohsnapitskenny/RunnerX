# Runner X

## Game

- Your goal is keep driving and earn points.
- Avoid the obstacles using your arrow keys (Up and Down)

Visit this <a href="https://ohsnapitskenny.github.io/RunnerX/dist/" target="_blank">website</a> to play the game.

## Installation
Do you to download the files and work on it yourself?

Run this code in your terminal: 

`
$ git clone https://github.com/ohsnapitskenny/runnerX
`

### Singleton
This one can be found in `game.ts`
```
class Game {
    private static gameInstance: Game;

    //Get Instance of game or create one (SingleTon)
    public static getInstance() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    }
}
 
// load game
window.addEventListener("load", function () {
    Game.getInstance();
});
```

### Strategy Pattern
This one can be found in `/behavoir` directory

This is the interface of Behavior
```
interface Behavior {
    player: Player;
    execute(): void;
}
```

There is a driving and crashing behavior. Here is the class Crashed which implements the Behavior interface 
```
///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    
    public player: Player;
     
    constructor(p: Player) {
        this.player = p;
    }

    public execute() {
        ...
    }
}
```

### Observable / Observer Pattern
This one can be found in `/observers` directory
 
You can find two interfaces in this directory. Here are the interfaces Observable & Observer

### Observable interface + Object that implements it
```
interface Observable {
    observers: Array<Observer>;

    subscribe(o: Observer): void;
    unsubscribe(o: Observer): void;
}
```

```
///<reference path="gameobject.ts"/>
///<reference path="../observers/observable.ts"/>
 
class Player extends GameObject implements Observable {
   
    public observers: Array<Obstacle>;
   
    constructor(parent: HTMLElement) {
        super("player", parent, 50, 250, 93, 99);
        this.kart = new Kart(this.div, 100, 250, 93, 99);

        // Initialize Array
        this.observers = new Array();
    }
 
    // Observable methods
    public subscribe(o: Observer): void {
        this.observers.push(o);
    }
 
    public unsubscribe(o: Observer): void {
        let i: number = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    }
}
```

###Observer interface + Object that implements it
```
interface Observer {
    notify(): void;
}
```

```
///<reference path="gameobject.ts"/>
///<reference path="../observers/observer.ts"/>
 
class Obstacle extends GameObject implements Observer {

    private kart: Kart;

    constructor(parent: HTMLElement, p: Player) {
        // Construct obstacle and add a kart
        super("obstacle", parent, Utils.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99);
        this.kart = new Kart(this.div, 10, 0, 93, 99);

    }

    public notify(): void {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
        this.setSpeed(0);
    }
}
```

### Others
Besides the three strategy patterns. I've also implemented the following items:
- Encapsulation, Composition, Inheritance 
- Classes, Interfaces and Abstract
- Namespace, Polymorphism, Enum
 

### UML
![RunnerX UML](https://github.com/ohsnapitskenny/RunnerX/blob/master/RunnerX.jpg)
