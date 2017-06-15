///<reference path="behavior.ts"/>

// Constant values for the movement keys
enum Keys {
    ArrowUp = 38,
    ArrowDown = 40
}

class Driving implements Behavior {

    // Properties
    private moveSpeedY: number = 0;

    // Classes
    public player: Player;

    constructor(p: Player) {
        this.player = p;

        // Listen to keyboard input
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        // When you release key, It sets moveSpeed to 0
        window.addEventListener("keyup", () => this.onKeyUp());
    }

    public execute() {
        // Temporary variable to calculate Y position
        let position: number;
        position = this.player.getY() + this.getMoveSpeedY();

        // Check if Player moves out of screen
        if (position == 0 || position == 500) {
        } else {
            // Set first/new Y Position
            this.player.setY(position);
        }

        // Check if Player is crashed
        let g = Game.getInstance();

        // If not gameOver
        if (!g.getGameStatus()) {
            // Draw position of the player in container
            this.player.draw()
        } else {
            this.crashed();
        }


    }

    // Check which key is pressed, change the this.key to another Enum Value
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case Keys.ArrowUp:
                this.setMoveSpeedY(-5);
                break;
            case Keys.ArrowDown:
                this.setMoveSpeedY(5);
                break;
            default:
                break;
        }

    }

    // Reset movement when no key is pressed
    private onKeyUp(): void {
        this.setMoveSpeedY(0);
    }

    private crashed(): void {
        window.removeEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.removeEventListener("keyup", () => this.onKeyUp());
        this.player.behavior = new Crashed(this.player);
    }

    // Getter & Setters
    public getMoveSpeedY(): number {
        return this.moveSpeedY;
    }

    public setMoveSpeedY(s): void {
        this.moveSpeedY = s;
    }
}