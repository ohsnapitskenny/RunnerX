class Game {
    //Main
    private static gameInstance: Game;

    //Objects
    private car: Car;
    private block: Block;

    //Properties
    private score: number;

    //Get Instance of game or create one (SingleTon)
    public static getInstance() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
            console.log("Created GameInstance");
        }
        return Game.gameInstance;
    }

    //Create instance of game
    private constructor() {
        //Main container of the game
        let container = document.getElementById("container");

        //Create GameObjects
        this.car = new Car(container);
        this.block = new Block(container);

        //Loop gameLoop function
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.car.draw();
        this.block.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// load game
window.addEventListener("load", function () {
    Game.getInstance();
});