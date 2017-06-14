class Game {
    //Main
    private static gameInstance: Game;

    //Objects
    private player: Player;
    private obstacles: Array<Obstacle>;

    //Properties
    private gameOver: boolean = false;

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

        //Set score to zero
        this.player.score = 0;

        // Create obstacles and put it in Array.
        for (let i = 0; i < 5; i++) {
            //Create Obstacle and push it to the array
            let obstacle = new Obstacle(container, this.player);
            this.obstacles.push(obstacle);


            // Subscribe to player
            this.player.subscribe(obstacle);
        }

        //Loop gameLoop function
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.player.move();

        // Check if player's game is over.
        if (!this.gameOver) {
            // For every obstacle. Check the collision
            for (let obstacle of this.obstacles) {
                if (Utils.checkCollision(obstacle, this.player)) {
                    this.endGame();
                } else {
                    obstacle.move();
                    this.player.score = this.player.score + 1;

                    // Display Score
                    let scoreText: string = "Score: " + this.player.score;
                    let board = document.getElementsByTagName("score")[0];
                    board.innerHTML = scoreText;
                }
            }
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private endGame(): void {
        this.gameOver = true;
    }

    public getGameStatus(): boolean {
        return this.gameOver;
    }

    public getObstacles(): Array<Obstacle> {
        return this.obstacles;
    }
}

// load game
window.addEventListener("load", function () {
    Game.getInstance();
});