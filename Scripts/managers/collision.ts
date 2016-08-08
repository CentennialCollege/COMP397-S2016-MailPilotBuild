module managers {
    export class Collision {
        constructor() {

            this.start();
        }

        public start() {

        }

        public update() {

        }

        public check(prime: objects.GameObject, other: objects.GameObject) {
            //check to see if object is colliding
            

            if (objects.Vector2.distance(prime.position, other.position) < (prime.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    other.isColliding = true;

                    // if prime object collides with cloud
                    if(other.name === "cloud") {
                        createjs.Sound.play("thunder");
                        core.lives -= 1;
                    }

                    // if prime object collides with island
                    if(other.name === "island") {
                        createjs.Sound.play("yay");
                        core.score += 100;
                    }

                    // if prime object collides with bullet
                    if(other.name === "bullet") {
                        createjs.Sound.play("bulletHit");
                        prime.Reset();
                        other.Reset();
                        core.score += 100;
                    }
                }
            }
            else {
                other.isColliding = false;
            }
        }
    }
}