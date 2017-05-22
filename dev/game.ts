class Game {
    //Main
    private static gameInstance: Game;

    //Objects
    private player:Player;

    //Properties
    private score: number;

    //Get Instance of game or create one (SingleTon)
    public static getInstance() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        return Game.gameInstance;
    }

    //Create instance of game
    private constructor() {
        //Main container of the game
        let container = document.getElementById("container");

        //Create GameObjects
        this.player = new Player(container);

        //Loop gameLoop function
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.player.move();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// load game
window.addEventListener("load", function () {
    Game.getInstance();
});