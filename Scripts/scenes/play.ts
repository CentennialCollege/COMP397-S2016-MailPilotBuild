module scenes {
    export class Play extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _ocean: objects.Ocean;
        private _island: objects.Island;
        private _player: objects.Player;
        private _clouds: objects.Cloud[];
        private _collision: managers.Collision;
        private _scoreLabel: objects.Label;
        private _livesLabel: objects.Label;
        private _engineSound: createjs.AbstractSoundInstance;

        /**
         * Creates an instance of Menu.
         * 
         */
        constructor() {
            super();
        }

        private _updateScoreBoard() {
            this._livesLabel.text = "Lives: " + core.lives;
            this._scoreLabel.text = "Score: " + core.score;
        }

        /**
         * 
         */
        public Start(): void {
            // ocean object
            this._ocean = new objects.Ocean("ocean");
            this.addChild(this._ocean);

            // island object
            this._island = new objects.Island("island");
            this.addChild(this._island);

            // player object
            this._player = new objects.Player("plane");
            this.addChild(this._player);
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;

            // cloud array
            this._clouds = new Array<objects.Cloud>();
            for (let count = 0; count < 3; count++) {
                this._clouds.push(new objects.Cloud("cloud"));
                this.addChild(this._clouds[count]);
            }

            // include a collision managers
            this._collision = new managers.Collision();

            // add lives and score label
            this._livesLabel = new objects.Label("Lives: " + core.lives, "40px", "Consolas", "#FFFF00", 10, 5, false);
            this.addChild(this._livesLabel);

            this._scoreLabel = new objects.Label("Score: " + core.score, "40px", "Consolas", "#FFFF00", 350, 5, false);
            this.addChild(this._scoreLabel);

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public Update(): void {
            this._ocean.update();
            this._island.update();
            this._player.update();
            this._collision.check(this._player, this._island);


            // update each cloud
            this._clouds.forEach(cloud => {
                cloud.update();
                this._collision.check(this._player, cloud);
            });

            this._updateScoreBoard();

            if (core.lives < 1) {
                this._engineSound.stop();
                core.scene = config.Scene.OVER;
                core.changeScene();
            }
        }

        // EVENT HANDLERS ++++++++++++++++

        private _startButtonClick(event: createjs.MouseEvent): void {
            // Switch the scene
            core.scene = config.Scene.OVER;
            core.changeScene();
        }
    }
}