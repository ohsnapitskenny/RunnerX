///<reference path="behavior.ts"/>
/// <reference types="howler" />

class Crashed implements Behavior {
    // Classes
    public player: Player;
    private sound: Howl;

    constructor(p: Player) {
        this.player = p;

        // Look for audio and play it once.

        this.sound = new Howl({
            src: ['assets/dead.mp3'],
            autoplay: true,
            loop: false
        });


        // Set DeadSprite
        this.player.setDeadLuigi();
    }

    public execute() {

    }
}