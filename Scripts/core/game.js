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
//# sourceMappingURL=game.js.map