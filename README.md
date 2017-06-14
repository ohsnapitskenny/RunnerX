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
![RunnerX UML](https://github.com/ohsnapitskenny/RunnerX/blob/master/RunnerX.jpg)
