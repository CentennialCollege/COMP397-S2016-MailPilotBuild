/// <reference path="_reference.ts"/>

/**
 * @author Tom Tsiliopoulos ttsliop@my.centennialcollege.ca
 * @studentID 300818577
 * @date July 11, 2016
 * @description This file is the entry point for the game
 * @version 0.1 - Initial version of the boilerplate
 */

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

namespace core {

    // Variable Declarations

    // declare a reference to the Preloader
    export let assets: createjs.LoadQueue;

    // declare textureAtlas
    export let textureAtlas: createjs.SpriteSheet;

    // make a reference to the canvas element
    let canvas: HTMLElement = document.getElementById("canvas");
    // create a reference to a stage container
    export let stage: createjs.Stage;

    // score and lives variables
    export let score: number = 0;
    export let highScore: number = 0;
    export let lives: number = 5;

    let helloLabel: objects.Label;

    let startButton: objects.Button; // reference to our button class

    // declare scene variables
    let currentScene: objects.Scene;
    export let scene: number;

    let menu: scenes.Menu;
    let over: scenes.Over;
    let play: scenes.Play;

    // asset manifest for images and sounds
    let assetData: objects.Asset[] = [
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
    function preload(): void {
        assets = new createjs.LoadQueue(); // instantiates the loader
        assets.installPlugin(createjs.Sound);
        assets.on("complete", init, this);
        assets.loadManifest(assetData);
    }


    /**
     * This method is the entry point for the application
     * 
     * @method init
     * @return {void}
     */
    function init(): void {
        stage = new createjs.Stage(canvas); // instatiate the stage container
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", gameLoop); // create an event listener for the tick event

        let atlasData = {

            "images": [
                assets.getResult("atlas")
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
        textureAtlas = new createjs.SpriteSheet(atlasData);

        // setup the default scene
        scene = config.Scene.MENU;
        changeScene();
    }

    /**
     * This is the main game loop
     * 
     * @method gameLoop
     * @param {createjs.Event} event
     * @returns {void}
     */
    function gameLoop(event: createjs.Event): void {

        // call the scenes's update
        currentScene.Update();

        stage.update(); // refreshes the stage
    }

    /**
     * This is the startButton click event handler
     * 
     * @param {createjs.MouseEvent} event
     */
    function startButtonClick(event: createjs.MouseEvent) {
        helloLabel.text = "clicked!";
    }

    export function changeScene(): void {

        //Launch Various Scenes
        switch (scene) {
            // Show the MENU Scene
            case config.Scene.MENU:
                stage.removeAllChildren();
                menu = new scenes.Menu();
                currentScene = menu;
                break;
            // Show the PLAY Scene
            case config.Scene.PLAY:
                stage.removeAllChildren();
                play = new scenes.Play();
                currentScene = play;
                break;
            // Show the GAME OVER Scene
            case config.Scene.OVER:
                stage.removeAllChildren();
                over = new scenes.Over();
                currentScene = over;
                break;
        }
    }



    //wait until the window object is finished loading then call the init method
    window.addEventListener("load", preload);

}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++