///<reference path="gameobject.ts"/>

class Obstacle extends GameObject {

    //Models
    private kart: Kart;

    // Properties
    private static obstacleY: number = 0;
    private speed: number;

    constructor(parent: HTMLElement) {
        super("kart", parent, Utils.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99);
        this.kart = new Kart(this.div, 10, 0, 93, 99);

        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Toad Sprite.
        this.setPlayer();
        this.setSpeed(Utils.getRandomInt(-1, -8));

        this.draw();
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
    }

    //Methods
    public setPlayer() {
        this.div.classList.add("toad");
    }

    public move() {
        if (this.getX() < -200) {
            this.setX(Utils.getRandomInt(800, 1000));
            this.setSpeed(Utils.getRandomInt(-2, -6));
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
}