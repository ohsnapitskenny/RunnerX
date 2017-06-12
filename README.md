# Runner X

## Game

- Your goal is keep running and earn points. For each step you make you get points

Visit this <a href="https://ohsnapitskenny.github.io/RunnerX/dist/" target="_blank">website</a> to play the game.

## Installation
Do you to download the files and work on it yourself?

Run this code in your terminal: 

`
$ git clone https://github.com/ohsnapitskenny/runnerX
`

Besides using some design patterns. The basic techniques like: Encapsulation, Composition, Inheritance, Interfaces & Static methods are included in this project.   

### Singleton
This one can be found in `game.ts`
```
class Game {
    //Main
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

### Strategy Patterns
This one can be found in `/behavoir`

### UML
![RunnerX UML](https://github.com/ohsnapitskenny/RunnerX/blob/master/uml.jpg "UML")
