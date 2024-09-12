"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Helpers;
(function (Helpers) {
    var _this = this;
    Helpers.wait = function (time) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) {
                    setTimeout(resolve, time);
                })];
        });
    }); };
    Helpers.toRad = function (degrees) {
        return degrees * Math.PI / 180;
    };
    Helpers.isBoxIntersecting = function (a, b) {
        return (a.x <= (b.x + b.width) &&
            b.x <= (a.x + a.width) &&
            a.y <= (b.y + b.height) &&
            b.y <= (a.y + a.height));
    };
})(Helpers || (Helpers = {}));
var Floppy;
(function (Floppy) {
    var testLocalStorageWorks = function () {
        try {
            window.localStorage.setItem('test', 'test');
            window.localStorage.removeItem('test');
            return true;
        }
        catch (_a) {
            return false;
        }
    };
    var isLsEnabled = testLocalStorageWorks();
    Floppy.storage = {
        setHighScore: function (score) {
            if (!isLsEnabled) {
                return;
            }
            window.localStorage.setItem('highscore', score.toString());
        },
        getHighScore: function () {
            var _a;
            if (!isLsEnabled) {
                return 0;
            }
            return parseInt((_a = window.localStorage.getItem('highscore')) !== null && _a !== void 0 ? _a : '0');
        },
    };
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var Assets;
    (function (Assets) {
        Assets.sounds = {
            jump: new Howl({ src: ['assets/sounds/sfx_wing.ogg'], volume: 0.3 }),
            score: new Howl({ src: ['assets/sounds/sfx_point.ogg'], volume: 0.3 }),
            hit: new Howl({ src: ['assets/sounds/sfx_hit.ogg'], volume: 0.3 }),
            die: new Howl({ src: ['assets/sounds/sfx_die.ogg'], volume: 0.3 }),
            swoosh: new Howl({ src: ['assets/sounds/sfx_swooshing.ogg'], volume: 0.3 }),
        };
    })(Assets = Floppy.Assets || (Floppy.Assets = {}));
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var Bird = (function () {
        function Bird(domElement, flyingProperties) {
            this.domElement = domElement;
            this.flyingProperties = flyingProperties;
            this.reset();
        }
        Bird.prototype.reset = function () {
            this.width = 34;
            this.height = 24;
            this.velocity = 0;
            this.position = 180;
            this.rotation = 0;
            this.box = { x: 60, y: 180, width: 34, height: 24 };
        };
        Bird.prototype.jump = function () {
            this.velocity = this.flyingProperties.jumpVelocity;
            Floppy.Assets.sounds.jump.play();
        };
        Bird.prototype.die = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.domElement.style.transition = "\n                transform 1s cubic-bezier(0.65, 0, 0.35, 1)\n            ";
                            this.position = this.flyingProperties.flightAreaBox.height - this.height;
                            this.rotation = 90;
                            Floppy.Assets.sounds.hit.play();
                            return [4, Helpers.wait(500)];
                        case 1:
                            _a.sent();
                            Floppy.Assets.sounds.die.play();
                            return [4, Helpers.wait(500)];
                        case 2:
                            _a.sent();
                            this.domElement.style.transition = '';
                            return [2];
                    }
                });
            });
        };
        Bird.prototype.tick = function () {
            this.velocity += this.flyingProperties.gravity;
            this.rotation = Math.min((this.velocity / 10) * 90, 90);
            this.position += this.velocity;
            if (this.position < 0) {
                this.position = 0;
            }
            if (this.position > this.flyingProperties.flightAreaBox.height) {
                this.position = this.flyingProperties.flightAreaBox.height;
            }
            var rotationInRadians = Math.abs(Helpers.toRad(this.rotation));
            var widthMultiplier = this.height - this.width;
            var heightMultiplier = this.width - this.height;
            this.box.width = this.width + (widthMultiplier * Math.sin(rotationInRadians));
            this.box.height = this.height + (heightMultiplier * Math.sin(rotationInRadians));
            var xShift = (this.width - this.box.width) / 2;
            var yShift = (this.height - this.box.height) / 2;
            this.box.x = 60 + xShift;
            this.box.y = this.position + yShift + this.flyingProperties.flightAreaBox.y;
        };
        Bird.prototype.draw = function () {
            gameDebugger.drawBox(this.domElement, this.box);
            this.domElement.style.transform = "\n                translate3d(0px, " + this.position + "px, 0px)\n                rotate3d(0, 0, 1, " + this.rotation + "deg)\n            ";
        };
        return Bird;
    }());
    Floppy.Bird = Bird;
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var Common;
    (function (Common) {
        var GameState;
        (function (GameState) {
            GameState[GameState["Loading"] = 0] = "Loading";
            GameState[GameState["SplashScreen"] = 1] = "SplashScreen";
            GameState[GameState["Playing"] = 2] = "Playing";
            GameState[GameState["PlayerDying"] = 3] = "PlayerDying";
            GameState[GameState["PlayerDead"] = 4] = "PlayerDead";
            GameState[GameState["ScoreScreen"] = 5] = "ScoreScreen";
        })(GameState = Common.GameState || (Common.GameState = {}));
    })(Common = Floppy.Common || (Floppy.Common = {}));
})(Floppy || (Floppy = {}));
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Floppy;
(function (Floppy) {
    var Game = (function () {
        function Game(domElements, options) {
            this.medals = [
                [40, 'platinum'],
                [30, 'gold'],
                [20, 'silver'],
                [10, 'bronze'],
            ];
            this.domElements = domElements;
            this.bird = new Floppy.Bird(domElements.bird, {
                gravity: 0.25,
                jumpVelocity: -4.6,
                flightAreaBox: domElements.flightArea.getBoundingClientRect(),
            });
            this.pipes = new Floppy.PipeManager(domElements.flightArea, options.isEasyModeOn);
            this.land = new Floppy.Land(domElements.land);
            this.state = Floppy.Common.GameState.Loading;
            this.domElements.replayButton.onclick = this.onReplayTouch.bind(this);
            this.highScore = Floppy.storage.getHighScore();
            this.currentScore = 0;
            this.setGameOptionButtons(options);
            requestAnimationFrame(this.draw.bind(this));
        }
        Game.prototype.onScreenTouch = function (ev) {
            if (this.state === Floppy.Common.GameState.Playing) {
                this.bird.jump();
            }
            else if (this.state === Floppy.Common.GameState.SplashScreen) {
                this.start();
            }
            else if (this.state === Floppy.Common.GameState.ScoreScreen && ev instanceof KeyboardEvent) {
                this.reset();
            }
        };
        Game.prototype.splash = function () {
            return __awaiter(this, void 0, void 0, function () {
                var splashImage;
                return __generator(this, function (_a) {
                    splashImage = document.getElementById('splash');
                    splashImage.classList.add('visible');
                    Floppy.Assets.sounds.swoosh.play();
                    this.state = Floppy.Common.GameState.SplashScreen;
                    return [2];
                });
            });
        };
        Object.defineProperty(Game.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (newState) {
                gameDebugger.logStateChange(this._state, newState);
                document.body.className = "state-" + Floppy.Common.GameState[newState];
                this._state = newState;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "currentScore", {
            get: function () {
                return this._currentScore;
            },
            set: function (newScore) {
                var _a, _b;
                this._currentScore = newScore;
                (_a = this.domElements.bigScore).replaceChildren.apply(_a, __spreadArray([], __read(this.numberToImageElements(newScore, 'big')), false));
                (_b = this.domElements.currentScore).replaceChildren.apply(_b, __spreadArray([], __read(this.numberToImageElements(newScore, 'small')), false));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "highScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newScore) {
                var _a;
                this._highScore = newScore;
                (_a = this.domElements.highScore).replaceChildren.apply(_a, __spreadArray([], __read(this.numberToImageElements(newScore, 'small')), false));
                Floppy.storage.setHighScore(newScore);
            },
            enumerable: false,
            configurable: true
        });
        Game.prototype.setGameOptionButtons = function (options) {
            var optionsButtons = document.getElementById('game-options');
            var easyMode = optionsButtons.getElementsByClassName('option-easy')[0];
            var debugMode = optionsButtons.getElementsByClassName('option-debug')[0];
            easyMode.innerText = "easy mode (" + (options.isEasyModeOn ? 'ON' : 'OFF') + ")";
            easyMode.href = '?';
            easyMode.href += options.isEasyModeOn ? '' : 'easy';
            easyMode.href += options.isDebugOn ? 'debug' : '';
            debugMode.innerText = "debug (" + (options.isDebugOn ? 'ON' : 'OFF') + ")";
            debugMode.href = '?';
            debugMode.href += options.isEasyModeOn ? 'easy' : '';
            debugMode.href += options.isDebugOn ? '' : 'debug';
        };
        Game.prototype.onReplayTouch = function () {
            if (this.state === Floppy.Common.GameState.ScoreScreen) {
                this.reset();
            }
        };
        Game.prototype.reset = function () {
            return __awaiter(this, void 0, void 0, function () {
                var scoreboard;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.state = Floppy.Common.GameState.Loading;
                            Floppy.Assets.sounds.swoosh.play();
                            scoreboard = document.getElementById('scoreboard');
                            scoreboard.classList.add('slide-up');
                            return [4, Helpers.wait(750)];
                        case 1:
                            _a.sent();
                            scoreboard.classList.remove('visible', 'slide-up');
                            Array.from(scoreboard.getElementsByClassName('visible')).forEach(function (e) { return e.classList.remove('visible'); });
                            gameDebugger.resetBoxes();
                            this.pipes.removeAll();
                            this.bird.reset();
                            this.currentScore = 0;
                            Array.from(document.getElementsByClassName('animated')).forEach(function (e) {
                                e.style.animationPlayState = 'running';
                                e.style.webkitAnimationPlayState = 'running';
                            });
                            this.splash();
                            return [2];
                    }
                });
            });
        };
        Game.prototype.start = function () {
            var splashImage = document.getElementById('splash');
            splashImage.classList.remove('visible');
            this.state = Floppy.Common.GameState.Playing;
            this.gameLoop = setInterval(this.tick.bind(this), 1000 / 60);
            this.bird.jump();
        };
        Game.prototype.die = function () {
            return __awaiter(this, void 0, void 0, function () {
                var scoreboard, replay, wonMedal, medalContainer, medal;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearInterval(this.gameLoop);
                            this.state = Floppy.Common.GameState.PlayerDying;
                            Array.from(document.getElementsByClassName('animated')).forEach(function (e) {
                                e.style.animationPlayState = 'paused';
                                e.style.webkitAnimationPlayState = 'paused';
                            });
                            return [4, this.bird.die()];
                        case 1:
                            _a.sent();
                            this.state = Floppy.Common.GameState.PlayerDead;
                            return [4, Helpers.wait(500)];
                        case 2:
                            _a.sent();
                            Floppy.Assets.sounds.swoosh.play();
                            scoreboard = document.getElementById('scoreboard');
                            scoreboard.classList.add('visible');
                            return [4, Helpers.wait(600)];
                        case 3:
                            _a.sent();
                            Floppy.Assets.sounds.swoosh.play();
                            replay = document.getElementById('replay');
                            replay.classList.add('visible');
                            wonMedal = this.medals.find(function (_a) {
                                var _b = __read(_a, 1), minimumScore = _b[0];
                                return _this.currentScore >= minimumScore;
                            });
                            if (wonMedal) {
                                gameDebugger.log('Medal won!', wonMedal);
                                medalContainer = document.getElementById('medal');
                                medal = new Image();
                                medal.src = "assets/medal_" + wonMedal[1] + ".png";
                                medalContainer.replaceChildren(medal);
                                medalContainer.classList.add('visible');
                            }
                            return [4, Helpers.wait(300)];
                        case 4:
                            _a.sent();
                            this.state = Floppy.Common.GameState.ScoreScreen;
                            return [2];
                    }
                });
            });
        };
        Game.prototype.score = function () {
            gameDebugger.log('Score!');
            Floppy.Assets.sounds.score.play();
            this.currentScore++;
            if (this.currentScore > this.highScore) {
                gameDebugger.log('New highscore!', this.currentScore);
                this.highScore = this.currentScore;
            }
        };
        Game.prototype.numberToImageElements = function (digits, size) {
            return digits.toString().split('').map(function (n) {
                var imgDigit = new Image();
                imgDigit.src = "assets/font_" + size + "_" + n + ".png";
                return imgDigit;
            });
        };
        Game.prototype.tick = function () {
            var now = Date.now();
            this.bird.tick();
            this.pipes.tick(now);
            var unscoredPipe = this.pipes.nextUnscoredPipe();
            if (unscoredPipe && unscoredPipe.hasCrossed(this.bird.box)) {
                unscoredPipe.scored = true;
                this.score();
            }
            if (this.pipes.intersectsWith(this.bird.box) || this.land.intersectsWith(this.bird.box)) {
                this.die();
            }
        };
        Game.prototype.draw = function () {
            requestAnimationFrame(this.draw.bind(this));
            this.bird.draw();
        };
        return Game;
    }());
    Floppy.Game = Game;
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var GameDebugger = (function () {
        function GameDebugger(enabled) {
            this.domLogs = document.getElementById('debug-logs');
            this.domState = document.getElementById('debug-state');
            this.domBoxContainer = document.getElementById('debug');
            this.domBoxes = new Map();
            this.enabled = enabled;
        }
        GameDebugger.prototype.drawBox = function (key, box) {
            if (!this.enabled) {
                return;
            }
            if (!this.domBoxes.has(key)) {
                var newDebugBox = document.createElement('div');
                newDebugBox.className = 'boundingbox';
                this.domBoxContainer.appendChild(newDebugBox);
                this.domBoxes.set(key, newDebugBox);
            }
            var boudingBox = this.domBoxes.get(key);
            if (boudingBox == null) {
                this.log("couldn't create a debug box for " + key);
                return;
            }
            boudingBox.style.top = box.y + "px";
            boudingBox.style.left = box.x + "px";
            boudingBox.style.width = box.width + "px";
            boudingBox.style.height = box.height + "px";
        };
        GameDebugger.prototype.resetBoxes = function () {
            var _this = this;
            if (!this.enabled) {
                return;
            }
            this.domBoxes.forEach(function (debugBox, pipe) {
                if (pipe.className.includes('pipe')) {
                    debugBox.remove();
                    _this.domBoxes.delete(pipe);
                }
            });
        };
        GameDebugger.prototype.logStateChange = function (oldState, newState) {
            if (!this.enabled) {
                return;
            }
            this.log('Changing state', Floppy.Common.GameState[oldState], Floppy.Common.GameState[newState]);
            this.domState.innerText = Floppy.Common.GameState[newState];
        };
        GameDebugger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!this.enabled) {
                return;
            }
            var shortTime = ("00000" + Date.now() % 100000).slice(-5);
            console.log.apply(console, __spreadArray(["[" + shortTime + "]"], __read(args), false));
            this.domLogs.innerText += "[" + shortTime + "] " + args.map(function (a) { return a === null || a === void 0 ? void 0 : a.toString(); }).join(' ') + "\n";
        };
        return GameDebugger;
    }());
    Floppy.GameDebugger = GameDebugger;
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var Land = (function () {
        function Land(domElement) {
            this.domElement = domElement;
            this.box = domElement.getBoundingClientRect();
            gameDebugger.drawBox(this.domElement, this.box);
        }
        Land.prototype.intersectsWith = function (box) {
            return Helpers.isBoxIntersecting(this.box, box);
        };
        return Land;
    }());
    Floppy.Land = Land;
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var Pipe = (function () {
        function Pipe(options) {
            this.scored = false;
            this.upperBox = { x: 0, y: 0, width: 0, height: 0 };
            this.lowerBox = { x: 0, y: 0, width: 0, height: 0 };
            this.domElement = document.createElement('div');
            this.domElement.className = 'pipe animated';
            this.upperPipeDomElement = document.createElement('div');
            this.upperPipeDomElement.className = 'pipe_upper';
            this.upperPipeDomElement.style.height = options.topPipeHeight + "px";
            this.lowerPipeDomElement = document.createElement('div');
            this.lowerPipeDomElement.className = 'pipe_lower';
            this.lowerPipeDomElement.style.height = options.bottomPipeHeight + "px";
            this.domElement.appendChild(this.upperPipeDomElement);
            this.domElement.appendChild(this.lowerPipeDomElement);
        }
        Pipe.prototype.isOffScreen = function () {
            return this.upperBox.x <= -100;
        };
        Pipe.prototype.hasCrossed = function (box) {
            return this.upperBox.width !== 0 && this.upperBox.x + this.upperBox.width <= box.x;
        };
        Pipe.prototype.intersectsWith = function (box) {
            return Helpers.isBoxIntersecting(this.upperBox, box) || Helpers.isBoxIntersecting(this.lowerBox, box);
        };
        Pipe.prototype.tick = function () {
            this.upperBox = this.upperPipeDomElement.getBoundingClientRect();
            this.lowerBox = this.lowerPipeDomElement.getBoundingClientRect();
            gameDebugger.drawBox(this.upperPipeDomElement, this.upperBox);
            gameDebugger.drawBox(this.lowerPipeDomElement, this.lowerBox);
        };
        return Pipe;
    }());
    Floppy.Pipe = Pipe;
})(Floppy || (Floppy = {}));
var Floppy;
(function (Floppy) {
    var PipeManager = (function () {
        function PipeManager(pipeAreaDomElement, easyMode) {
            if (easyMode === void 0) { easyMode = false; }
            this.pipeDelay = 1400;
            this.lastPipeInsertedTimestamp = 0;
            this.pipes = [];
            this.pipeAreaDomElement = pipeAreaDomElement;
            this.easyMode = easyMode;
        }
        PipeManager.prototype.tick = function (now) {
            this.pipes.forEach(function (pipe) { return pipe.tick(); });
            if (now - this.lastPipeInsertedTimestamp < this.pipeDelay) {
                return;
            }
            gameDebugger.log('inserting pipe after', now - this.lastPipeInsertedTimestamp, 'ms');
            this.lastPipeInsertedTimestamp = now;
            var pipeDimension = this.createPipeDimensions({
                gap: this.easyMode ? 140 : 90,
            });
            var pipe = new Floppy.Pipe(pipeDimension);
            this.pipes.push(pipe);
            this.pipeAreaDomElement.appendChild(pipe.domElement);
            this.pipes = this.pipes.filter(function (pipe) {
                if (pipe.isOffScreen()) {
                    gameDebugger.log('pruning a pipe');
                    pipe.domElement.remove();
                    return false;
                }
                return true;
            });
        };
        PipeManager.prototype.intersectsWith = function (box) {
            return this.pipes.find(function (pipe) { return pipe.intersectsWith(box); }) != null;
        };
        PipeManager.prototype.removeAll = function () {
            this.pipes.forEach(function (pipe) { return pipe.domElement.remove(); });
            this.pipes = [];
        };
        PipeManager.prototype.nextUnscoredPipe = function () {
            return this.pipes.find(function (pipe) { return pipe.scored === false; });
        };
        PipeManager.prototype.createPipeDimensions = function (options) {
            var topPipeBuffer = 80;
            var bottomPipeBuffer = 420 - options.gap - topPipeBuffer;
            var topPipeHeight = this.randomNumberBetween(topPipeBuffer, bottomPipeBuffer);
            var bottomPipeHeight = 420 - options.gap - topPipeHeight;
            return { topPipeHeight: topPipeHeight, bottomPipeHeight: bottomPipeHeight };
        };
        PipeManager.prototype.randomNumberBetween = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        return PipeManager;
    }());
    Floppy.PipeManager = PipeManager;
})(Floppy || (Floppy = {}));
var isDebugOn = window.location.search.includes('debug');
var isEasyModeOn = window.location.search.includes('easy');
var gameDebugger = new Floppy.GameDebugger(isDebugOn);
(function () {
    var bird = document.getElementById('player');
    var land = document.getElementById('land');
    var flightArea = document.getElementById('flyarea');
    var replayButton = document.getElementById('replay');
    var bigScore = document.getElementById('bigscore');
    var currentScore = document.getElementById('currentscore');
    var highScore = document.getElementById('highscore');
    if (bird == null || flightArea == null || land == null || replayButton == null || bigScore == null || currentScore == null || highScore == null) {
        throw new Error('Missing an element');
    }
    var game = new Floppy.Game({ bird: bird, land: land, flightArea: flightArea, replayButton: replayButton, bigScore: bigScore, currentScore: currentScore, highScore: highScore }, { isDebugOn: isDebugOn, isEasyModeOn: isEasyModeOn });
    document.onkeydown = function (ev) { ev.keyCode == 32 && game.onScreenTouch(ev); };
    if ('ontouchstart' in document) {
        document.ontouchstart = game.onScreenTouch.bind(game);
    }
    else {
        document.onmousedown = game.onScreenTouch.bind(game);
    }
    game.splash();
})();
//# sourceMappingURL=game.js.map