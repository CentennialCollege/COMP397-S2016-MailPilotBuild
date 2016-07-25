module managers {
    export class Collision {
        constructor() {

            this.start();
        }

        public start() {

        }

        public update() {

        }

        public check(player: objects.GameObject, other: objects.GameObject) {
            //check to see if object is colliding

            if (objects.Vector2.distance(player.position, other.position) < (player.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    other.isColliding = true;

                    // if plane collides with cloud
                    if(other.name === "cloud") {
                        createjs.Sound.play("thunder");
                    }

                    // if plane collides with island
                    if(other.name === "island") {
                        createjs.Sound.play("yay");
                    }
                }
            }
            else {
                other.isColliding = false;
            }
        }
    }
}