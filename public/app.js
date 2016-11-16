/// <reference path="/Users/michaelolson/workspace/Final_Project/pixi.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/phaser.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/p2.d.ts" />
var DougTheSlug = (function () {
    function DougTheSlug() {
        this.score = 0;
        // highScore = JSON.parse(localStorage.getItem('highscore'));
        this.nextTree = 3000;
        this.nextTree2 = 3000;
        this.nextSnowman = 5000;
        this.descendTimer = 5000;
        this.nextMushroom = 5000;
        this.startTimer = 5000;
        this.specTimer = 10000;
        this.evilTimer = 13000;
        this.WebFontConfig = {
            google: {
                families: ['VT323']
            }
        };
        this.game = new Phaser.Game(1088, 640, Phaser.AUTO, "content", { preload: this.preload,
            create: this.create,
            update: this.update,
            startScreen: this.startScreen,
            startText: this.startText,
            startText2: this.startText,
            endText: this.endText,
            endText2: this.endText2,
            treefall: this.treefall,
            treefall2: this.treefall2,
            nextTree: this.nextTree,
            nextTree2: this.nextTree2,
            snowMaker: this.snowMaker,
            nextSnowman: this.nextSnowman,
            nextMushroom: this.nextMushroom,
            startTimer: this.startTimer,
            specTimer: this.specTimer,
            specMush: this.specMush,
            evilMaker: this.evilMaker,
            evilTimer: this.evilTimer,
            astCollide: this.astCollide,
            evilCollide: this.evilCollide,
            specMushCollide: this.specMushCollide,
            collisionHandler: this.collisionHandler,
            mushMaker: this.mushMaker,
            score: this.score,
            highscore: this.highScore,
            scoreBoard: this.scoreBoard,
            reset: this.reset,
            render: this.render });
    }
    DougTheSlug.prototype.preload = function () {
        this.game.load.script('webfont', 'https://fonts.googleapis.com/css?family=VT323');
        this.game.load.image("doug", "/images/doug.png");
        this.game.load.image("ast", "/images/a.png");
        this.game.load.image("gem", "/images/greenGem.png");
        this.game.load.image("mushroom", "/images/mushroom.png");
        this.game.load.image("evilmush", "/images/evilmush.png");
        this.game.load.image("space", "/images/space.png");
        this.game.load.image("planet19", "/images/planet_19.png");
        this.game.load.image("planet26", "/images/planet_26.png");
        this.game.load.image("saltshaker", "/images/salt-shaker2.png");
        this.game.load.image("greenmush", "/images/greenmush.png");
        this.game.load.audio("coin", "/sounds/coin.ogg");
        this.game.load.audio("gameover", "/sounds/gameover.ogg");
        this.game.load.audio("upgrade", "/sounds/upgrade.ogg");
        this.game.load.audio("evil", "/sounds/evil.ogg");
        this.game.load.audio("slugtheme", ["/sounds/slugtheme.mp3", "/sounds/slugtheme.ogg"]);
    };
    DougTheSlug.prototype.render = function () {
        // This renders debug information about physics bodies
        // this.game.debug.bodyInfo(this.doug, 200, 32);
        // this.game.debug.body(this.doug);
    };
    DougTheSlug.prototype.startScreen = function () {
        this.game.world.remove(this.startText);
        this.game.world.remove(this.startText2);
    };
    DougTheSlug.prototype.treefall = function () {
        this.lefttree = this.trees.create(-10, -100, "planet26");
        this.lefttree.body.collideWorldBounds = false;
        // lefttree.body.gravity.y = 350;    
        this.lefttree.lifespan = 10000;
        this.lefttree.scale.setTo(0.25, 0.25);
    };
    DougTheSlug.prototype.treefall2 = function () {
        this.righttree = this.trees2.create(950, -100, "planet19");
        this.righttree.body.collideWorldBounds = false;
        // lefttree.body.gravity.y = 350;    
        this.righttree.lifespan = 10000;
        this.righttree.scale.setTo(0.25, 0.25);
    };
    DougTheSlug.prototype.snowMaker = function () {
        //CREATE SNOWMEN
        for (var i = 0; i < 4; i++) {
            this.snowman = this.snowmen.create(this.game.world.randomX, -75, "saltshaker");
            this.snowman.body.collideWorldBounds = false;
            // this.snowman.body.gravity.y = 200; 
            this.snowman.body.immovable = false;
            this.snowman.lifespan = 3000;
        }
    };
    DougTheSlug.prototype.mushMaker = function () {
        for (var i = 0; i < 2; i++) {
            this.mushroom = this.mushrooms.create(this.game.world.randomX, -75, "mushroom");
            this.mushroom.body.collideWorldBounds = false;
            // this.mushroom.body.gravity.y = 200; 
            this.mushroom.body.immovable = true;
            this.mushroom.lifespan = 3000;
        }
    };
    DougTheSlug.prototype.specMush = function () {
        for (var i = 0; i < 1; i++) {
            this.specialMushroom = this.specialMushrooms.create(this.game.world.randomX, -75, "greenmush");
            this.specialMushroom.body.collideWorldBounds = false;
            this.specialMushroom.body.immovable = true;
            this.specialMushroom.lifespan = 5000;
        }
    };
    DougTheSlug.prototype.evilMaker = function () {
        for (var i = 0; i < 1; i++) {
            this.evilMushroom = this.evilMushrooms.create(this.game.world.randomX, -75, "evilmush");
            this.evilMushroom.body.collideWorldBounds = false;
            this.evilMushroom.body.immovable = true;
            this.evilMushroom.lifespan = 5000;
        }
    };
    DougTheSlug.prototype.specMushCollide = function (doug, specialMushroom) {
        this.upgrade.play();
        this.specialMushrooms.remove(specialMushroom);
        this.score *= 2;
        this.doug.scale.y += 0.4;
        this.doug.scale.x -= 0.1;
        this.scoreText.text = ("" + this.score);
    };
    DougTheSlug.prototype.evilCollide = function (doug, evilMushroom) {
        this.evilMushrooms.remove(evilMushroom);
        this.evil.play();
        this.roid = this.roids.create(this.game.world.randomX, -500, "ast");
        this.roid.body.gravity.y = 200;
        this.roid.scale.setTo(5, 5);
    };
    DougTheSlug.prototype.astCollide = function (doug, roid) {
        this.emitter.x = this.doug.x + 50;
        this.emitter.y = this.doug.y;
        this.emitter.start(true, 10000, null, 60);
        this.doug.kill();
        this.gameover.play();
        this.snowmen.remove(roid);
        this.endText = this.game.add.text(0, this.game.height / 2 - 150, "DOUG DIED", { fontSize: '240px', fill: "#00FF00", font: "VT323", align: "center" });
        this.endText2 = this.game.add.text(0, this.game.height - 100, "spacebar to live again", { fontSize: '80px', fill: "#00FF00", font: "VT323", align: "center" });
    };
    DougTheSlug.prototype.collisionHandler = function (doug, snowman) {
        this.emitter.x = this.doug.x + 50;
        this.emitter.y = this.doug.y;
        this.emitter.start(true, 10000, null, 60);
        this.doug.kill();
        this.gameover.play();
        this.snowmen.remove(snowman);
        this.endText = this.game.add.text(0, this.game.height / 2 - 150, "DOUG DIED", { fontSize: '240px', fill: "#00FF00", font: "VT323", align: "center" });
        this.endText2 = this.game.add.text(0, this.game.height - 100, "spacebar to live again", { fontSize: '80px', fill: "#00FF00", font: "VT323", align: "center" });
    };
    DougTheSlug.prototype.scoreBoard = function (doug, mushroom) {
        this.mushrooms.remove(mushroom);
        //add to score
        this.coin.play();
        this.score += 1;
        this.scoreText.text = ("" + this.score);
        // if (localStorage.getItem('highScore') === null){
        //     localStorage.setItem('highscore', this.scoreText.text)
        // }
        // else if (this.score > this.highScore){
        //     localStorage.setItem('highscore', this.scoreText.text)
        // }
        // this.highScoreText.text = ("HIGH SCORE: " + this.highScore);
    };
    DougTheSlug.prototype.reset = function () {
        this.game.state.start(this.game.state.current);
        this.music.restart("slugtheme", 1, 1, true);
        this.score = 0;
    };
    DougTheSlug.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.snowField = this.game.add.tileSprite(0, 0, 1088, 640, "space");
        this.music = this.game.sound.play("slugtheme", 1, true);
        this.coin = this.game.add.audio("coin");
        this.gameover = this.game.add.audio("gameover");
        this.upgrade = this.game.add.audio("upgrade");
        this.evil = this.game.add.audio("evil");
        //CREATE DOUG
        this.doug = this.game.add.sprite(this.game.width / 2, 0, "doug");
        this.doug.scale.setTo(2.5, 2.5);
        this.game.physics.enable(this.doug, Phaser.Physics.ARCADE);
        this.doug.body.collideWorldBounds = true;
        this.doug.body.gravity.y = 4000;
        this.doug.body.bounce.y = 0.2;
        this.doug.body.setSize(15, 25, 9, 8);
        //tree group
        this.trees = this.game.add.group();
        this.trees.enableBody = true;
        // this.trees.physicsBodyType = Phaser.Physics.ARCADE;
        //tree2 group
        this.trees2 = this.game.add.group();
        this.trees2.enableBody = true;
        // this.trees2.physicsBodyType = Phaser.Physics.ARCADE;
        //snowmen group
        this.snowmen = this.game.add.group();
        this.snowmen.enableBody = true;
        this.snowmen.physicsBodyType = Phaser.Physics.ARCADE;
        //mushrooms group
        this.mushrooms = this.game.add.group();
        this.mushrooms.enableBody = true;
        this.mushrooms.physicsBodyType = Phaser.Physics.ARCADE;
        //special mushrooms group
        this.specialMushrooms = this.game.add.group();
        this.specialMushrooms.enableBody = true;
        this.specialMushrooms.physicsBodyType = Phaser.Physics.ARCADE;
        //evil mushrooms group
        this.evilMushrooms = this.game.add.group();
        this.evilMushrooms.enableBody = true;
        this.evilMushrooms.physicsBodyType = Phaser.Physics.ARCADE;
        //roids group
        this.roids = this.game.add.group();
        this.roids.enableBody = true;
        this.roids.physicsBodyType = Phaser.Physics.ARCADE;
        //create score
        this.scoreText = this.game.add.text(0, 0, "0", { fontSize: '100px', fill: "#00FF00", font: "VT323" });
        //create high score
        // this.highScoreText = this.game.add.text(700,0,"0", {fontSize: '50px', fill: "#00FF00", font: "VT323" });
        //emitter
        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles("gem");
        this.emitter.gravity = 50;
        //cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //starttext
        this.startText = this.game.add.text(0, this.game.height / 2 - 100, "DOUG THE SLUG", { fontSize: '120px', fill: "#00FF00", font: "VT323", align: "center" });
        this.startText2 = this.game.add.text(0, this.game.height / 2, "go left / go right / eat mushrooms", { fontSize: '60px', fill: "#00FF00", font: "VT323", align: "center" });
    };
    DougTheSlug.prototype.update = function () {
        this.game.input.update();
        if (this.game.time.now > this.startTimer) {
            this.startScreen();
            this.startTimer = this.game.time.now + 500;
        }
        this.snowField.tilePosition.y += 12;
        if (this.game.time.now > this.nextTree) {
            this.treefall();
            this.nextTree = this.game.time.now + 5000;
        }
        if (this.game.time.now > this.nextTree2) {
            this.treefall2();
            this.nextTree2 = this.game.time.now + 5000;
        }
        if (this.game.time.now > this.nextSnowman) {
            this.snowMaker();
            this.nextSnowman = this.game.time.now + 600;
        }
        if (this.game.time.now > this.nextMushroom) {
            this.mushMaker();
            this.nextMushroom = this.game.time.now + 600;
        }
        if (this.game.time.now > this.specTimer) {
            this.specMush();
            this.specTimer = this.game.time.now + 1200;
        }
        if (this.game.time.now > this.evilTimer) {
            this.evilMaker();
            this.evilTimer = this.game.time.now + 1000;
        }
        //move items Y axis
        this.mushrooms.forEach(function (mushroom) {
            mushroom.y += 5;
        }, this, false);
        this.specialMushrooms.forEach(function (specialMushroom) {
            specialMushroom.y += 4;
        }, this, false);
        this.evilMushrooms.forEach(function (evilMushroom) {
            evilMushroom.y += 4;
        }, this, false);
        this.snowmen.forEach(function (snowman) {
            snowman.y += 5;
        }, this, false);
        this.trees.forEach(function (lefttree) {
            lefttree.y += 3;
        }, this, false);
        this.trees2.forEach(function (righttree) {
            righttree.y += 3;
        }, this, false);
        //look for collision
        this.game.physics.arcade.overlap(this.doug, this.snowmen, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.doug, this.mushrooms, this.scoreBoard, null, this);
        this.game.physics.arcade.overlap(this.doug, this.specialMushrooms, this.specMushCollide, null, this);
        this.game.physics.arcade.overlap(this.doug, this.evilMushrooms, this.evilCollide, null, this);
        this.game.physics.arcade.overlap(this.doug, this.roids, this.astCollide, null, this);
        if (this.cursors.right.isDown)
            (this.doug.position.x += 15);
        if (this.cursors.left.isDown)
            (this.doug.position.x -= 15);
        if (this.space.isDown)
            // (location.reload()); 
            this.reset();
    };
    return DougTheSlug;
}());
window.onload = function () {
    var game = new DougTheSlug();
};
