/**
 * Created by Kenny on 17/05/2017.
 */

///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;
    }

    public execute() {
        // TODO: Show gameover screen
    }
}