///<reference path="gameobject.ts"/>
///<reference path="../observers/observer.ts"/>

class Obstacle extends GameObject implements Observer {

    //Models
    private kart: Kart;

    // Properties
    private static obstacleY: number = 0;
    private speed: number;

    constructor(parent: HTMLElement, p: Player) {
        // Construct obstacle and add a kart
        super("obstacle", parent, Utils.Numbers.getRandomInt(1000, 1200), Obstacle.obstacleY, 93, 99);
        this.kart = new Kart(this.div, 10, 0, 93, 99);

        this.setPlayer();
        this.setSpeed(Utils.Numbers.getRandomInt(-1, -8));

        this.draw();

        // After constructing one obstacle, add the Y position with 125px so obstacles have other heights
        Obstacle.obstacleY = Obstacle.obstacleY + 125;
    }

    //Methods
    public setPlayer(): void {
        this.div.classList.add("toad");
    }

    public move(): void {
        // If Obstacle is moving out of screen. Place it on the right side somewhere between 800,1000, Also give it a random speed. Else just keep driving
        if (this.getX() < -200) {
            this.setX(Utils.Numbers.getRandomInt(800, 1000));
            this.setSpeed(Utils.Numbers.getRandomInt(-1, -6));
        } else {
            this.x += this.speed;
            this.draw();
        }

    }

    public notify(): void {
        this.div.classList.remove("toad");
        this.div.classList.add("toad_laugh");
        this.setSpeed(0);
    }

    // Getters & Setters
    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(s: number): void {
        this.speed = s;
    }
}