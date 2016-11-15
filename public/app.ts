/// <reference path="/Users/michaelolson/workspace/Final_Project/pixi.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/phaser.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/p2.d.ts" />


class DougTheSlug {

game: Phaser.Game;

music: Phaser.Sound;

coin: Phaser.Sound;

gameover: Phaser.Sound;

upgrade : Phaser.Sound;

snowmen: Phaser.Group;

snowman: Phaser.Sprite;

mushrooms: Phaser.Group;

mushroom: any;

specialMushrooms: Phaser.Group;

specialMushroom: any;

evilMushrooms: Phaser.Group;

evilMushroom: any;

map: Phaser.Tilemap;

doug: Phaser.Sprite;

trees: Phaser.Group;

trees2: Phaser.Group;

lefttree: Phaser.Sprite;

righttree: Phaser.Sprite;

cursors: Phaser.CursorKeys;

score: number = 0;

nextTree: number = 4000;
nextTree2: number = 4000;

nextSnowman: number = 5000;

descendTimer: number = 5000;

nextMushroom: number = 5000;

startTimer: number = 5000;

specTimer: number = 10000;

evilTimer: number = 13000;

snowField: Phaser.TileSprite;

emitter: any;

scoreText: Phaser.Text;

startText: Phaser.Text;

startText2: Phaser.Text;

endText: Phaser.Text;

endText2: Phaser.Text;

W: Phaser.Key;
A: Phaser.Key;
S: Phaser.Key;
D: Phaser.Key;
space: Phaser.Key;
  

    constructor() {
        this.game = new Phaser.Game(1088, 640, Phaser.AUTO, "content", 

        {   preload: this.preload, 
            create: this.create, 
            update:this.update, 
            startScreen: this.startScreen,
            startText: this.startText,
            startText2: this.startText,
            endText: this.endText,
            endText2: this.endText2,
            treefall:this.treefall, 
            treefall2:this.treefall2,             
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
            evilCollide: this.evilCollide,
            specMushCollide: this.specMushCollide,
            collisionHandler: this.collisionHandler,
            mushMaker: this.mushMaker,
            score: this.score,
            scoreBoard: this.scoreBoard,                                  
            render: this.render});

            
  } 

  WebFontConfig = {
      google: {
      families: ['VT323']
    }
  }

    preload() {
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
        this.game.load.audio("slugtheme", ["/sounds/slugtheme.mp3", "/sounds/slugtheme.ogg"]);                                                   
                                                                                                                                                         
    }

    render() {
        // This renders debug information about physics bodies
        // this.game.debug.bodyInfo(this.doug, 200, 32);
        // this.game.debug.body(this.doug);
    }


    startScreen() {
             this.game.world.remove(this.startText); 
             this.game.world.remove(this.startText2);                                    
    }


    treefall() {

                this.lefttree = this.trees.create (-10, -800,"planet26");
                this.lefttree.body.collideWorldBounds = false;
                // lefttree.body.gravity.y = 350;    
                this.lefttree.lifespan = 5000;
                this.lefttree.scale.setTo(0.25, 0.25);
             
    }  

    treefall2() {

                this.righttree = this.trees2.create (950, -800,"planet19");
                this.righttree.body.collideWorldBounds = false;
                // lefttree.body.gravity.y = 350;    
                this.righttree.lifespan = 5000;
                this.righttree.scale.setTo(0.25, 0.25);
             
    }  

    snowMaker() {
        //CREATE SNOWMEN

            for (let i = 0; i < 4; i++) {

                    this.snowman = this.snowmen.create(this.game.world.randomX, -75,"saltshaker");
                    this.snowman.body.collideWorldBounds = false;
                    // this.snowman.body.gravity.y = 200; 
                    this.snowman.body.immovable = false;
                    this.snowman.lifespan = 3000;
            } 

    }
       


    mushMaker() {
        for (let i = 0; i < 2; i++) {
                    this.mushroom = this.mushrooms.create(this.game.world.randomX, -75,"mushroom");
                    this.mushroom.body.collideWorldBounds = false;
                    // this.mushroom.body.gravity.y = 200; 
                    this.mushroom.body.immovable = true;
                    this.mushroom.lifespan = 3000;
 
            }
    }

    specMush() {
        for (let i = 0; i < 1; i++) {
                    this.specialMushroom = this.specialMushrooms.create(this.game.world.randomX, -75,"greenmush");
                    this.specialMushroom.body.collideWorldBounds = false;
                    this.specialMushroom.body.immovable = true;
                    this.specialMushroom.lifespan = 5000;
                    // this.specialMushroom.body.gravity.y = 200; 
        }
    }

    evilMaker() {
        for (let i = 0; i < 1; i++) {
                    this.evilMushroom = this.evilMushrooms.create(this.game.world.randomX, -75,"evilmush");
                    this.evilMushroom.body.collideWorldBounds = false;
                    this.evilMushroom.body.immovable = true;
                    this.evilMushroom.lifespan = 5000;
                    // this.evilMushroom.body.gravity.y = 200; 
        }
    }

    specMushCollide (doug, specialMushroom) {
        this.upgrade.play();
        this.specialMushrooms.remove(specialMushroom);
        this.score *= 2;
        this.doug.scale.y += 0.4;
        this.doug.scale.x -= 0.1;
        this.scoreText.text = ("" + this.score);

    }

    evilCollide (doug, evilMushroom){
        this.evilMushrooms.remove(evilMushroom);
    }

    collisionHandler(doug, snowman) {
        this.emitter.x = this.doug.x+50;
        this.emitter.y = this.doug.y;     
        this.emitter.start(true, 10000, null, 60);   
        this.doug.kill();
        this.gameover.play();
        this.snowmen.remove(snowman);
        this.endText = this.game.add.text(0, this.game.height / 2 - 150, "DOUG DIED", {fontSize: '240px', fill: "#00FF00", font: "VT323", align: "center" })            
        this.endText2 = this.game.add.text(0, this.game.height - 100 , "spacebar to live again", {fontSize: '80px', fill: "#00FF00", font: "VT323", align: "center" })            
    }

    scoreBoard(doug, mushroom) {
        this.mushrooms.remove(mushroom);
        //add to score
        this.coin.play();
        this.score += 1;
        this.scoreText.text = ("" + this.score);
    }


    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 

        this.snowField = this.game.add.tileSprite(0,0,1088, 640, "space");
        
        
        this.music = this.game.sound.play("slugtheme", 1, true);

        this.coin = this.game.add.audio("coin");
        this.gameover = this.game.add.audio("gameover");
        this.upgrade = this.game.add.audio("upgrade");
        

//CREATE DOUG
        this.doug = this.game.add.sprite(this.game.width / 2, 0, "doug");
        this.doug.scale.setTo(2.5,2.5);
        this.game.physics.enable(this.doug, Phaser.Physics.ARCADE);
        this.doug.body.collideWorldBounds = true;
        this.doug.body.gravity.y = 4000; 
        this.doug.body.bounce.y = 0.2;
        this.doug.body.setSize(15, 25, 9, 8);

//tree group
        this.trees = this.game.add.group();
        this.trees.enableBody = true;
        this.trees.physicsBodyType = Phaser.Physics.ARCADE;

//tree2 group
        this.trees2 = this.game.add.group();
        this.trees2.enableBody = true;
        this.trees2.physicsBodyType = Phaser.Physics.ARCADE;
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

//create score
        this.scoreText = this.game.add.text(0,0,"0", {fontSize: '100px', fill: "#00FF00", font: "VT323" });

//emitter
        this.emitter = this.game.add.emitter(0,0,100);
        this.emitter.makeParticles("gem");
        this.emitter.gravity = 50;

//cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        

//starttext
        this.startText = this.game.add.text(0, this.game.height / 2 - 100, "DOUG THE SLUG", {fontSize: '120px', fill: "#00FF00", font: "VT323", align: "center" })            
        this.startText2 = this.game.add.text(0, this.game.height / 2 , "go left / go right / eat mushrooms", {fontSize: '60px', fill: "#00FF00", font: "VT323", align: "center" })            


        
    }   

    update() {
        this.game.input.update();

        
         if (this.game.time.now > this.startTimer){
             this.startScreen();
             this.startTimer = this.game.time.now + 500;
         } 

        this.snowField.tilePosition.y +=12;

        if (this.game.time.now > this.nextTree) {
            this.treefall();
            this.nextTree = this.game.time.now + 1500;
        }

         if (this.game.time.now > this.nextTree2) {
            this.treefall2();
            this.nextTree2 = this.game.time.now + 1500;
        }

        if (this.game.time.now > this.nextSnowman) {
            this.snowMaker();
            this.nextSnowman = this.game.time.now + 400;
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
            this.mushrooms.forEach((mushroom) => {
                mushroom.y += 5;
            }, this, false);

            this.specialMushrooms.forEach((specialMushroom) => {
                specialMushroom.y += 4;
            }, this, false);
        
            this.evilMushrooms.forEach((evilMushroom) => {
                evilMushroom.y += 4;
            }, this, false);

            this.snowmen.forEach((snowman) => {
                snowman.y += 5;
            }, this, false);

            this.trees.forEach((lefttree) => {
                lefttree.y += 5;            
            }, this, false);

            this.trees2.forEach((righttree) => {
                righttree.y += 5;            
            }, this, false);

//look for collision
        this.game.physics.arcade.overlap(this.doug, this.snowmen, this.collisionHandler, null, this);

        this.game.physics.arcade.overlap(this.doug, this.mushrooms, this.scoreBoard, null, this); 
 
        this.game.physics.arcade.overlap(this.doug, this.specialMushrooms, this.specMushCollide, null, this); 

        this.game.physics.arcade.overlap(this.doug, this.evilMushrooms, this.evilCollide, null, this); 


        if (this.cursors.right.isDown)
            (this.doug.position.x += 15);          
       
        if (this.cursors.left.isDown)
            (this.doug.position.x -= 15);  

        if (this.space.isDown)
            (location.reload()); 
        
    }

}


window.onload = () => {

    let game = new DougTheSlug();

};