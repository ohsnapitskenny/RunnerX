///<reference path="behavior.ts"/>

class Crashed implements Behavior {
    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;

        // Look for audio and play it once.
        let audio = new Audio('assets/dead.mp3');
        audio.play();

        // Set DeadSprite
        this.player.setDeadLuigi();
    }

    public execute() {

    }
}