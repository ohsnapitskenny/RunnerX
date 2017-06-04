///<reference path="gameobject.ts"/>

class Player extends GameObject {

    //Models
    private kart: Kart;

    //Properties
    public behavior: Behavior;

    constructor(parent: HTMLElement) {
        super("player", parent, 50, 250, 93, 99);
        this.kart = new Kart(this.div, 100, 250, 93, 99);

        // Set default behavior Driving
        this.behavior = new Driving(this);

        //TODO: Set Sprite so player can choose which character he/she wants to play. Now hardcoded Luigi Sprite.
        this.setPlayer();
    }

    //Methods
    public setPlayer() {
        this.div.classList.add("luigi");
    }

    public move() {
        this.behavior.execute();
    }
}