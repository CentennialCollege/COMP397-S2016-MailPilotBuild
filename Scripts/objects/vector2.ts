module objects {
    /**
     * This class extends the CreateJS Point class
     * 
     * @export
     * @class Vector2
     * @extends {createjs.Point}
     */
    export class Vector2 extends createjs.Point {
        constructor(x:number = 0, y:number = 0) {
            super(x, y);
        }
    
        /**
         * This method returns the distance between two Vector2 objects (a and b)
         * 
         * @static
         * @method distance
         * @param {Vector2} a
         * @param {Vector2} b
         * @returns {number}
         */
        public static distance(a:Vector2, b:Vector2):number {
            return Math.floor(Math.sqrt(Math.pow((b.x - a.x),2) + Math.pow((b.y - a.y), 2)));
        }
    }
}