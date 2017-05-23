///<reference path="gameobject.ts"/>

class Player extends GameObject {

    //Models
    private kart: Kart;

    //Properties
    private speed: number;
    public behavior: Behavior;

    constructor(parent: HTMLElement) {
        super("player", parent, 100, 250, 93, 99);
        this.kart = new Kart(this.div, 100, 250, 93, 99);

        // Set default behavior Driving
        this.behavior = new Driving(this);

        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Mario Sprite.
        this.div.classList.add("mario");

        //Set Speed
        this.setSpeed(2);
    }

    //Getter & Setters
    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setY(yPos: number): void {
        this.y = yPos;
    }

    public getY(): number {
        return this.y;
    }

    //Methods
    public move() {
        this.behavior.execute();
    }
}