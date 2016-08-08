var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=bullet.js.map