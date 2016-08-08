var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var config;
(function (config) {
    var Scene = (function () {
        function Scene() {
        }
        Scene.MENU = 0;
        Scene.PLAY = 1;
        Scene.OVER = 2;
        return Scene;
    }());
    config.Scene = Scene;
})(config || (config = {}));
/**
 * @author Tom Tsiliopoulos ttsliop@my.centennialcollege.ca
 * @studentID 300818577
 * @date July 4, 2016
 * @version 0.01 - Initial version of the button class
 */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * This is the generic objects namespace
 *
 * @module objects
 */
var objects;
(function (objects) {
    /**
     * This simple Button class extends the createjs.Bitmap object.
     * It includes two private methods to handle mouseover and mouseout events.
     *
     * @export
     * @class Button
     * @extends {createjs.Bitmap}
     */
    var Button = (function (_super) {
        __extends(Button, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Button.
         *
         * @constructor
         * @param {string} pathString
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         */
        function Button(imageString, x, y, isCentered) {
            _super.call(this, core.textureAtlas, imageString);
            // Check if user wants to change regX and regY values to the center 
            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }
            this.x = x;
            this.y = y;
            // binds the mouseover and mouseout events to the button object
            this.on("mouseover", this._mouseOver, this);
            this.on("mouseout", this._mouseOut, this);
        }
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This is an event handler for the mouseover event
         *
         * @private
         * @method _mouseOver
         * @param {createjs.MouseEvent} event
         */
        Button.prototype._mouseOver = function (event) {
            this.alpha = 0.7;
        };
        /**
         * This is an event handler for the mouseout event
         *
         * @private
         * @method _mouseOut
         * @param {createjs.MouseEvent} event
         */
        Button.prototype._mouseOut = function (event) {
            this.alpha = 1.0;
        };
        return Button;
    }(createjs.Sprite));
    objects.Button = Button;
})(objects || (objects = {}));
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
var objects;
(function (objects) {
    /**
     * This is a generic Label class for the Game BoilerPlate
     *
     * @export
     * @class Label
     * @extends {createjs.Text}
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            _super.call(this, labelString, (fontSize + " " + fontFamily), fontColour);
            this.labelString = labelString;
            this.fontSize = fontSize;
            this.fontFamily = fontFamily;
            this.fontColour = fontColour;
            if (isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            // assign label coordinates
            this.x = x;
            this.y = y;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
/// <reference path="_reference.ts"/>
/**
 * @author Tom Tsiliopoulos ttsliop@my.centennialcollege.ca
 * @studentID 300818577
 * @date July 11, 2016
 * @description This file is the entry point for the game
 * @version 0.1 - Initial version of the boilerplate
 */
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var core;
(function (core) {
    // make a reference to the canvas element
    var canvas = document.getElementById("canvas");
    // score and lives variables
    core.score = 0;
    core.highScore = 0;
    core.lives = 5;
    var helloLabel;
    var startButton; // reference to our button class
    // declare scene variables
    var currentScene;
    var menu;
    var over;
    var play;
    // asset manifest for images and sounds
    var assetData = [
        { id: "ocean", src: "../../Assets/images/ocean.gif" },
        { id: "atlas", src: "../../Assets/images/atlas.png" },
        { id: "thunder", src: "../../Assets/audio/thunder.ogg" },
        { id: "yay", src: "../../Assets/audio/yay.ogg" },
        { id: "engine", src: "../../Assets/audio/engine.ogg" },
        { id: "bulletHit", src: "../../Assets/audio/bulletHit.wav" },
        { id: "bulletHit", src: "../../Assets/audio/bulletFire.wav" }
    ];
    /**
     * This method preloads assets for the game
     *
     * @method preload
     * @returns {void}
     */
    function preload() {
        core.assets = new createjs.LoadQueue(); // instantiates the loader
        core.assets.installPlugin(createjs.Sound);
        core.assets.on("complete", init, this);
        core.assets.loadManifest(assetData);
    }
    /**
     * This method is the entry point for the application
     *
     * @method init
     * @return {void}
     */
    function init() {
        core.stage = new createjs.Stage(canvas); // instatiate the stage container
        core.stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", gameLoop); // create an event listener for the tick event
        var atlasData = {
            "images": [
                core.assets.getResult("atlas")
            ],
            "frames": [
                [1, 1, 226, 178, 0, 0, 0],
                [1, 181, 16, 16, 0, 0, 0],
                [229, 1, 200, 50, 0, 0, 0],
                [431, 1, 62, 62, 0, 0, 0],
                [229, 53, 200, 50, 0, 0, 0],
                [431, 65, 62, 51, 0, -3, -9],
                [229, 105, 200, 50, 0, 0, 0],
                [431, 118, 62, 51, 0, -3, -9],
                [229, 157, 200, 50, 0, 0, 0],
                [431, 171, 62, 51, 0, -3, -9]
            ],
            "animations": {
                "cloud": [0],
                "bullet": [1],
                "exitButton": [2],
                "island": [3],
                "nextButton": [4],
                "restartButton": [6],
                "startButton": [8],
                "plane": {
                    "frames": [5, 7, 9],
                    "speed": 0.5
                }
            }
        };
        // added textureAtlas
        core.textureAtlas = new createjs.SpriteSheet(atlasData);
        // setup the default scene
        core.scene = config.Scene.MENU;
        changeScene();
    }
    /**
     * This is the main game loop
     *
     * @method gameLoop
     * @param {createjs.Event} event
     * @returns {void}
     */
    function gameLoop(event) {
        // call the scenes's update
        currentScene.Update();
        core.stage.update(); // refreshes the stage
    }
    /**
     * This is the startButton click event handler
     *
     * @param {createjs.MouseEvent} event
     */
    function startButtonClick(event) {
        helloLabel.text = "clicked!";
    }
    function changeScene() {
        //Launch Various Scenes
        switch (core.scene) {
            // Show the MENU Scene
            case config.Scene.MENU:
                core.stage.removeAllChildren();
                menu = new scenes.Menu();
                currentScene = menu;
                break;
            // Show the PLAY Scene
            case config.Scene.PLAY:
                core.stage.removeAllChildren();
                play = new scenes.Play();
                currentScene = play;
                break;
            // Show the GAME OVER Scene
            case config.Scene.OVER:
                core.stage.removeAllChildren();
                over = new scenes.Over();
                currentScene = over;
                break;
        }
    }
    core.changeScene = changeScene;
    //wait until the window object is finished loading then call the init method
    window.addEventListener("load", preload);
})(core || (core = {}));
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
/// <reference path="../core/game.ts"/>
var objects;
(function (objects) {
    /**
     * This abstract scene class is used to create individual scenes
     *
     * @export
     * @abstract
     * @class Scene
     * @extends {createjs.Container}
     */
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.call(this);
            this.Start();
        }
        /**
         * Add game objects to the scene in this method
         *
         * @method Start
         * @returns {void}
         */
        Scene.prototype.Start = function () {
            core.stage.addChild(this);
        };
        /**
         * Updates Game objects in the Scene
         *
         * @method Update
         * @returns {void}
         */
        Scene.prototype.Update = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This class extends the CreateJS Point class
     *
     * @export
     * @class Vector2
     * @extends {createjs.Point}
     */
    var Vector2 = (function (_super) {
        __extends(Vector2, _super);
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.call(this, x, y);
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
        Vector2.distance = function (a, b) {
            return Math.floor(Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)));
        };
        return Vector2;
    }(createjs.Point));
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This class represents a generic Game Object used in the game
     *
     * @export
     * @class GameObject
     * @extends {createjs.Bitmap}
     */
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of the GameObject.
         *
         * @constructor
         * @param {string} imageString
         */
        function GameObject(imageString) {
            _super.call(this, core.textureAtlas, imageString);
            this._initialize(imageString);
            this.start();
        }
        Object.defineProperty(GameObject.prototype, "width", {
            // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfWidth", {
            get: function () {
                return this._width * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfHeight", {
            get: function () {
                return this._height * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (newName) {
                this._name = newName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (newState) {
                this._isColliding = newState;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype._initialize = function (imageString) {
            this.name = imageString;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.position = new objects.Vector2(this.x, this.y);
            this.isColliding = false;
        };
        GameObject.prototype.Reset = function () {
        };
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        GameObject.prototype.start = function () {
        };
        /**
        * This method updates the object's properties
        * every time it's called
        *
        * @public
        * @method update
        * @returns {void}
        */
        GameObject.prototype.update = function () {
        };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This is the Ocean object used in the game
     *
     * @export
     * @class Ocean
     * @extends {createjs.Bitmap}
     */
    var Ocean = (function (_super) {
        __extends(Ocean, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Ocean.
         *
         * @constructor
         * @param {string} imageString
         */
        function Ocean(imageString) {
            _super.call(this, core.assets.getResult(imageString));
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Ocean.prototype._reset = function () {
            this.y = -960;
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Ocean.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Ocean.prototype.start = function () {
            this._reset();
            this._dy = 5; // 5px per frame down
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Ocean.prototype.update = function () {
            this.y += this._dy;
            this._checkBounds();
        };
        return Ocean;
    }(createjs.Bitmap));
    objects.Ocean = Ocean;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This is the Island object used in the game
     *
     * @export
     * @class Island
     * @extends {objects.GameObject}
     */
    var Island = (function (_super) {
        __extends(Island, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Island.
         *
         * @constructor
         * @param {string} imageString
         */
        function Island(imageString) {
            _super.call(this, imageString);
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Island.prototype._reset = function () {
            this.y = -this.height;
            // get a random x location
            this.x = Math.floor((Math.random() * (640 - (this.width * 0.5))) + (this.width * 0.5));
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Island.prototype._checkBounds = function () {
            if (this.y >= (480 + (this.height * 0.5))) {
                this._reset();
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Island.prototype.start = function () {
            this._reset();
            this._dy = 5; // 5px per frame down
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Island.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this._checkBounds();
        };
        return Island;
    }(objects.GameObject));
    objects.Island = Island;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This is the Player object used in the game
     *
     * @export
     * @class Player
     * @extends {objects.GameObject}
     */
    var Player = (function (_super) {
        __extends(Player, _super);
        // PRIVATE INSTANCE VARIABLES ++++++++++++++++++++++++++++
        // PUBLIC PROPERTIES +++++++++++++++++++++++++++++++++++++++
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Island.
         *
         * @constructor
         * @param {string} imageString
         */
        function Player(imageString) {
            _super.call(this, imageString);
            this.start();
        }
        /**
        * This method checks if the object has reached its boundaries
        *
        * @private
        * @method _checkBounds
        * @returns {void}
        */
        Player.prototype._checkBounds = function () {
            // checkbounds to stop player from going outside
            // check right bounds
            if (this.x >= (640 - (this.width * 0.5))) {
                this.x = (640 - (this.width * 0.5));
            }
            // check left bounds
            if (this.x <= (0 + (this.width * 0.5))) {
                this.x = (0 + (this.width * 0.5));
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Player.prototype.start = function () {
            this.y = 430;
            this.x = 320;
            this.position.x = this.x;
            this.position.y = this.y;
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Player.prototype.update = function () {
            // player to follow mouse
            this.position = new objects.Vector2(this.x, this.y);
            this.x = core.stage.mouseX;
            this._checkBounds();
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
var objects;
(function (objects) {
    /**
     * This is the Cloud object used in the game
     *
     * @export
     * @class Cloud
     * @extends {createjs.Bitmap}
     */
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Island.
         *
         * @constructor
         * @param {string} imageString
         */
        function Cloud(imageString) {
            _super.call(this, imageString);
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++
        /**
         * Resets the object outside of the viewport
         * and sets the x and y locations
         *
         * @private
         * @method _reset
         * @returns {void}
         */
        Cloud.prototype.Reset = function () {
            this._dy = Math.floor((Math.random() * 5) + 5); // vertical speed
            this._dx = Math.floor((Math.random() * 4) - 2); // horizontal drift
            this.y = -this.height;
            // get a random x location
            this.x = Math.floor((Math.random() * (640 - (this.width * 0.5))) + (this.width * 0.5));
        };
        /**
         * This method checks if the object has reached its boundaries
         *
         * @private
         * @method _checkBounds
         * @returns {void}
         */
        Cloud.prototype._checkBounds = function () {
            if (this.y >= (480 + (this.height * 0.5))) {
                this.Reset();
            }
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++
        /**
         * This method is used to initialize public properties
         * and private instance variables
         *
         * @public
         * @method start
         * @returns {void}
         */
        Cloud.prototype.start = function () {
            this.Reset();
        };
        /**
         * This method updates the object's properties
         * every time it's called
         *
         * @public
         * @method update
         * @returns {void}
         */
        Cloud.prototype.update = function () {
            this.position = new objects.Vector2(this.x, this.y);
            this.y += this._dy;
            this.x += this._dx;
            this._checkBounds();
        };
        return Cloud;
    }(objects.GameObject));
    objects.Cloud = Cloud;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTORS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * Creates an instance of Island.
         *
         * @constructor
         * @param {string} imageString
         */
        function Bullet(imageString) {
            _super.call(this, imageString);
            this.start();
        }
        Object.defineProperty(Bullet.prototype, "Speed", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._speed;
            },
            set: function (newSpeed) {
                this._speed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "InFlight", {
            get: function () {
                return this._inFlight;
            },
            set: function (newState) {
                this._inFlight = newState;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        /**
         * This method resets the bullet object
         *
         * @public
         * @method _reset
         * @return {void}
         */
        Bullet.prototype.Reset = function () {
            this.position = this._defaultPosition;
            this.x = this.position.x;
            this.y = this.position.y;
            this.InFlight = false;
        };
        /**
         * Evaluates if the bullet has left the screen then calls reset
         *
         * @private
         * @method _checkBounds
         * @return {void}
         */
        Bullet.prototype._checkBounds = function () {
            if (this.position.y <= -this.height) {
                this.Reset();
            }
        };
        // PUBLIC METHODS
        /**
         * This method triggers the bullet being fired
         *
         * @method Fire
         * @param {Vector2} newPosition
         * @return {void}
         */
        Bullet.prototype.Fire = function (newPosition) {
            this.x = newPosition.x;
            this.y = newPosition.y;
            this.position = newPosition;
            this.InFlight = true;
            createjs.Sound.play("bulletFire");
        };
        Bullet.prototype.start = function () {
            this._defaultPosition = new objects.Vector2(1000, 1000);
            this.Speed = 10;
            this.Reset();
        };
        Bullet.prototype.update = function () {
            if (this.InFlight) {
                this.y -= this.Speed;
            }
            this.position = new objects.Vector2(this.x, this.y);
            this._checkBounds();
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
var managers;
(function (managers) {
    var Collision = (function () {
        function Collision() {
            this.start();
        }
        Collision.prototype.start = function () {
        };
        Collision.prototype.update = function () {
        };
        Collision.prototype.check = function (prime, other) {
            //check to see if object is colliding
            if (objects.Vector2.distance(prime.position, other.position) < (prime.halfHeight + other.halfHeight)) {
                if (!other.isColliding) {
                    other.isColliding = true;
                    // if prime object collides with cloud
                    if (other.name === "cloud") {
                        createjs.Sound.play("thunder");
                        core.lives -= 1;
                    }
                    // if prime object collides with island
                    if (other.name === "island") {
                        createjs.Sound.play("yay");
                        core.score += 100;
                    }
                    // if prime object collides with bullet
                    if (other.name === "bullet") {
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
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
var scenes;
(function (scenes) {
    var Over = (function (_super) {
        __extends(Over, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function Over() {
            _super.call(this);
        }
        /**
         *
         */
        Over.prototype.Start = function () {
            // Add Ocean Background
            this._ocean = new objects.Ocean("ocean");
            this.addChild(this._ocean);
            // Add Menu Label
            this._gameOverLabel = new objects.Label("GAME OVER", "60px", "Dock51", "#FFFF00", 320, 180, true);
            this.addChild(this._gameOverLabel);
            // Add Score Label
            this._finalScoreLabel = new objects.Label("SCORE: " + core.score, "60px", "Dock51", "#FFFF00", 320, 240, true);
            this.addChild(this._finalScoreLabel);
            // add the start button
            this._restartButton = new objects.Button("restartButton", 320, 420, true);
            this.addChild(this._restartButton);
            // Start button event listener
            this._restartButton.on("click", this._restartButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Over.prototype.Update = function () {
            // scene updates happen here...
            this._ocean.update();
        };
        // EVENT HANDLERS ++++++++++++++++
        Over.prototype._restartButtonClick = function (event) {
            // Switch the scene
            core.lives = 5;
            core.score = 0;
            core.scene = config.Scene.PLAY;
            core.changeScene();
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
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
var scenes;
(function (scenes) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        /**
         * Creates an instance of Menu.
         *
         */
        function Menu() {
            _super.call(this);
        }
        /**
         *
         */
        Menu.prototype.Start = function () {
            // Add Ocean Background
            this._ocean = new objects.Ocean("ocean");
            this.addChild(this._ocean);
            // Add Menu Label
            this._menuLabel = new objects.Label("MAIL PILOT", "60px", "Dock51", "#FFFF00", 320, 240, true);
            this.addChild(this._menuLabel);
            // add the start button
            this._startButton = new objects.Button("startButton", 320, 420, true);
            this.addChild(this._startButton);
            // Start button event listener
            this._startButton.on("click", this._startButtonClick, this);
            // add this scene to the global scene container
            core.stage.addChild(this);
        };
        Menu.prototype.Update = function () {
            // scene updates happen here...
            this._ocean.update();
        };
        // EVENT HANDLERS ++++++++++++++++
        Menu.prototype._startButtonClick = function (event) {
            // Switch the scene
            core.scene = config.Scene.PLAY;
            core.changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
/// <reference path="../../typings/index.d.ts"/>
/// <reference path="../config/scene.ts"/>
/// <reference path="../objects/asset.ts"/>
/// <reference path="../objects/button.ts"/>
/// <reference path="../objects/label.ts"/>
/// <reference path="../objects/scene.ts"/>
/// <reference path="../objects/vector2.ts"/>
/// <reference path="../objects/gameobject.ts"/>
/// <reference path="../objects/ocean.ts"/>
/// <reference path="../objects/island.ts"/>
/// <reference path="../objects/player.ts"/>
/// <reference path="../objects/cloud.ts"/>
/// <reference path="../objects/bullet.ts"/>
/// <reference path="../managers/collision.ts"/>
/// <reference path="../scenes/over.ts"/>
/// <reference path="../scenes/play.ts"/>
/// <reference path="../scenes/menu.ts"/> 
var objects;
(function (objects) {
    // KeyboardControls Class +++++++++++++++
    var KeyboardControls = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++    
        function KeyboardControls() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // PUBLIC METHODS
        KeyboardControls.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.moveForward = true;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.moveLeft = true;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = true;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = true;
                    break;
                case 32:
                    this.fire = true;
                    break;
                case 81:
                    this.paused = (this.paused) ? false : true;
                    break;
            }
        };
        KeyboardControls.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38: /*up arrow*/
                case 87:
                    this.moveForward = false;
                    break;
                case 37: /*left arrow*/
                case 65:
                    this.moveLeft = false;
                    break;
                case 40: /*down arrow*/
                case 83:
                    this.moveBackward = false;
                    break;
                case 39: /*right arrow*/
                case 68:
                    this.moveRight = false;
                    break;
                case 32:
                    this.fire = false;
                    break;
            }
        };
        return KeyboardControls;
    }());
    objects.KeyboardControls = KeyboardControls;
})(objects || (objects = {}));
//# sourceMappingURL=game.js.map