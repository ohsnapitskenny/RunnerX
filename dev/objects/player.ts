/**
 * Created by Kenny on 17/05/2017.
 */

///<reference path="gameobject.ts"/>

class Player extends GameObject {

    //Models
    private kart: Kart;

    //Properties
    private speed: number;

    constructor(parent: HTMLElement) {
        super("player", parent, 100, 250, 93, 99);

        this.kart = new Kart(this.div,100,250,93,99);

        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Mario Sprite.
        this.div.classList.add("mario");
    }

    //Getter & Setters
    public getSpeed(speed: number): void {
        this.speed = speed;
    }

    public setSpeed(): number {
        return this.speed;
    }

    //Methods
    public move() {
        this.draw();
    }
}