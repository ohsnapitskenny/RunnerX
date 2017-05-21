/**
 * Created by Kenny on 17/05/2017.
 */

///<reference path="gameobject.ts"/>

class Player extends GameObject {

    private speed: number;

    constructor(parent: HTMLElement) {
        super("player", parent, 10, 220,245,45);
    }

    //Getter & Setters
    public getSpeed(speed:number):void {
        this.speed = speed;
    }

    public setSpeed():number {
        return this.speed;
    }


}