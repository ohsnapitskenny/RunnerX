///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;
    }

    public execute() {
        this.player.setDeadLuigi();
    }
}