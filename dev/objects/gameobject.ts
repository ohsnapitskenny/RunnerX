/**
 * Created by Kenny on 17/05/2017.
 */

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
}