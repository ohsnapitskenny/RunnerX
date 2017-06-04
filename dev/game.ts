class Game {
    //Main
    private static gameInstance: Game;

    //Objects
    private player: Player;
    private obstacles: Array<Kart>;

    //Properties
    private gameOver: boolean = false;
    private score: number = 0;

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
        this.obstacles = new Array();

        // Create obstacles and put it in Array.
        for (let i = 0; i < 5; i++) {
            let obstacle = new Obstacle(container);
            this.obstacles.push(obstacle);
            obstacle.move();
        }

        //Loop gameLoop function
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.player.move();

        if (!this.gameOver) {
            for (let obstacle of this.obstacles) {
                if (Utils.checkCollision(obstacle, this.player)) {
                    this.endGame();
                } else {
                    obstacle.move();
                    this.score = this.score + 1;

                    // Display Score
                    let scoreText: string = "Score: " + this.score;
                    let board = document.getElementsByTagName("score")[0];
                    board.innerHTML = scoreText;
                }
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private endGame() {
        this.gameOver = true;

        // Stop all cars
        for (let obstacle of this.obstacles) {
            obstacle.setSpeed(0);
        }
    }

    public getGameStatus(): boolean {
        return this.gameOver;
    }
}

// load game
window.addEventListener("load", function () {
    Game.getInstance();
});