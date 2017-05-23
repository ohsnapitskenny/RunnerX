class GameObject {

    //Properties
    protected div: HTMLElement;
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    constructor(element: string, parent: HTMLElement, x: number, y: number, width: number, height: number) {
        //Create element and append it to parent
        this.div = document.createElement(element);
        parent.appendChild(this.div);

        //Set position values in object
        this.x = x;
        this.y = y;

        //Set size values in object
        this.width = width;
        this.height = height;
    }

    //Display object on screen
    public draw(): void {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

    public update(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    // Getters & Setters

    public getX(): number {
        return this.x;
    }

    public setX(xPos: number): void {
        this.x = xPos;
    }

    public getY(): number {
        return this.y;
    }

    public setY(yPos: number): void {
        this.y = yPos;
    }

    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): void {
        this.width = width;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): void {
        this.height = height;
    }

}