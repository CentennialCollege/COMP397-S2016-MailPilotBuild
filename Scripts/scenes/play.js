var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function Play() {
            _super.call(this);
            this._frameCount = 0;
        }
        Play.prototype._updateScoreBoard = function () {
            this._livesLabel.text = "Lives: " + core.lives;
            this._scoreLabel.text = "Score: " + core.score;
        };
        /**
         *
         */
        Play.prototype.Start = function () {
            // ocean object
            this._ocean = new objects.Ocean("ocean");
            this.addChild(this._ocean);
            // island object
            this._island = new objects.Island("island");
            this.addChild(this._island);
            this._bullets = new Array();
            for (var bullet = 0; bullet < 10; bullet++) {
                this._bullets.push(new objects.Bullet("bullet"));
                this.addChild(this._bullets[bullet]);
            }
            // player object
            this._player = new objects.Player("plane");
            this.addChild(this._player);
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;
            // cloud array
            this._clouds = new Array();
            for (var count = 0; count < 3; count++) {
                this._clouds.push(new objects.Cloud("cloud"));
                this.addChild(this._clouds[count]);
            }
            // include a collision managers
            this._collision = new managers.Collision();
            this._keyboardControls = new objects.KeyboardControls();
            // add lives and score label
            this._livesLabel = new objects.Label("Lives: " + core.lives, "40px", "Dock51", "#FFFF00", 10, 5, false);
            this.addChild(this._livesLabel);
            this._scoreLabel = new objects.Label("Score: " + core.score, "40px", "Dock51", "#FFFF00", 350, 5, false);
            this.addChild(this._scoreLabel);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._frameCount++;
            this._ocean.update();
            this._island.update();
            this._player.update();
            this._collision.check(this._player, this._island);
            this._bullets.forEach(function (bullet) {
                // update each bullet
                bullet.update();
            });
            this._clouds.forEach(function (cloud) {
                // update each cloud
                cloud.update();
                // checks collisin with the player and each cloud
                _this._collision.check(_this._player, cloud);
            });
            // checks collisions between each cloud and each bullet
            this._clouds.forEach(function (cloud) {
                _this._bullets.forEach(function (bullet) {
                    _this._collision.check(cloud, bullet);
                });
            });
            // check if spacebar is pushed
            if (this._frameCount % 10 == 0) {
                if (this._keyboardControls.fire) {
                    for (var bullet in this._bullets) {
                        if (!this._bullets[bullet].InFlight) {
                            this._bullets[bullet].Fire(this._player.position);
                            break;
                        }
                    }
                }
            }
            this._updateScoreBoard();
            if (core.lives < 1) {
                this._engineSound.stop();
                core.scene = config.Scene.OVER;
                core.changeScene();
            }
        };
        // EVENT HANDLERS ++++++++++++++++
        Play.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.OVER;
            core.changeScene();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map