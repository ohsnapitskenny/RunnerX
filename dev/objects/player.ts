///<reference path="gameobject.ts"/>
///<reference path="../observers/observable.ts"/>

class Player extends GameObject implements Observable {

    //Models
    private kart: Kart;

    //Properties
    public observers: Array<Obstacle>;
    public behavior: Behavior;
    public score: number;

    constructor(parent: HTMLElement) {
        super("player", parent, 50, 250, 93, 99);
        this.kart = new Kart(this.div, 100, 250, 93, 99);

        // Initialize Array
        this.observers = new Array();

        // Set default behavior Driving
        this.behavior = new Driving(this);


        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Luigi Sprite.
        this.setPlayer();
    }

    //Methods
    public setPlayer(): void {
        this.div.classList.add("luigi");
    }

    public setDeadLuigi(): void {
        this.div.classList.add("dead");

        // Foreach observer. Set speed to 0.
        for (let observer of this.observers) {
            observer.notify();
        }
    }

    public move(): void {
        this.behavior.execute();
    }

    // Observable methods
    public subscribe(o: Observer): void {
        this.observers.push(o);
    }

    public unsubscribe(o: Observer): void {
        let g = Game.getInstance();
        Utils.removeFromGame(o, g.getObstacles());
    }
}