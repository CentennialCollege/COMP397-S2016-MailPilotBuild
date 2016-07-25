module scenes {
    export class Play extends objects.Scene {
        //  PRIVATE INSTANCE VARIABLES
        private _ocean: objects.Ocean;
        private _island: objects.Island;
        private _player: objects.Player;
        private _clouds: objects.Cloud[];

        /**
         * Creates an instance of Menu.
         * 
         */
        constructor() {
            super();
        }

        /**
         * 
         */
        public Start():void {
            // ocean object
            this._ocean = new objects.Ocean("ocean");
            this.addChild(this._ocean);

            // island object
            this._island = new objects.Island("island");
            this.addChild(this._island);

            // player object
            this._player = new objects.Player("plane");
            this.addChild(this._player);

            // cloud array
            this._clouds = new Array<objects.Cloud>();
            for(let count = 0; count < 3; count++) {
                this._clouds.push(new objects.Cloud("cloud"));
                this.addChild(this._clouds[count]);
            }

            // add this scene to the global scene container
            core.stage.addChild(this);
        }

        public Update():void {
            this._ocean.update();
            this._island.update();
            this._player.update();
            
            // update each cloud
            this._clouds.forEach(cloud => {
                cloud.update();
            });
        }

        // EVENT HANDLERS ++++++++++++++++

        private _startButtonClick(event:createjs.MouseEvent):void {
            // Switch the scene
            core.scene = config.Scene.OVER;
            core.changeScene();
        }
    }
}