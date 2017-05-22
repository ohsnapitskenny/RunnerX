/**
 * Created by Kenny on 17/05/2017.
 */

///<reference path="behavior.ts"/>

class Driving implements Behavior {

    // Constant variables (Keyboard movement)
    private readonly moveUp: string = "ArrowUp";
    private readonly moveDown: string = "ArrowDown";
    // private readonly moveSpeed: number = 5;

    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;

        // Listen to keyboard input
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    }

    public execute() {
        this.player.draw()
    }

    private onKeyDown(e: KeyboardEvent): void {
        // Temporary variable to save new Y Position
        let yPosition: number;

        // Check which button is pressed.
        if (e.key === this.moveUp && this.player.behavior instanceof Driving) {
            //TODO: Check that car doesn't move out the container.
            yPosition = this.player.getY() - 3;
        } else if (e.key === this.moveDown && this.player.behavior instanceof Driving) {
            //TODO: Check that car doesn't move out the container.
            yPosition = this.player.getY() + 3;
        } else {
            // If none of them, exit function
            return;
        }

        // Set new position and draw it.
        this.player.setY(yPosition);
        this.execute();
    }

    private crashed() {
        window.removeEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        this.player.behavior = new Crashed(this);
    }

}