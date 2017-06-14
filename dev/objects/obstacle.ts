///<reference path="gameobject.ts"/>
///<reference path="../observers/observer.ts"/>

class Obstacle extends GameObject implements Observer {

    //Models
    public kart: Kart;

    // Properties
    private static obstacleY: number = 0;
    public speed: number;

    constructor(parent: HTMLElement) {
        // Construct obstacle and add a kart
        super("player", parent, Utils.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99);
        this.kart = new Kart(this.div, 10, 0, 93, 99);

        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Toad Sprite.
        this.setPlayer();
        this.setSpeed(Utils.getRandomInt(-1, -8));

        this.draw();

        // After constructing one obstacle, add the Y position with 125px so obstacles have other heights
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
    }

    //Methods
    public setPlayer(): void {
        this.div.classList.add("toad");
    }

    public move(): void {
        if (this.getX() < -200) {
            this.setX(Utils.getRandomInt(800, 1000));
            this.setSpeed(Utils.getRandomInt(-1, -6));
        } else {
            this.x += this.speed;
            this.draw();
        }

    }

    // Getters & Setters
    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(s: number): void {
        this.speed = s;
    }

    public notify(): void {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
    }
}