class Utils {

    //Checks if there is a collision between two objects
    public static checkCollision(instance1, instance2): boolean {
        return (instance1.x < instance2.x + instance2.width &&
        instance1.x + instance1.width > instance2.x &&
        instance1.y < instance2.y + instance2.height &&
        instance1.height + instance1.y > instance2.y)
    }

    //Gives you a random number based on the minimum and maximum value
    public static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}