/// <reference path="/Users/michaelolson/workspace/Final_Project/pixi.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/phaser.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/p2.d.ts" />


class DougTheSlug {

game: Phaser.Game;

snowmen: Phaser.Group;

snowman: Phaser.Sprite;

mushrooms: Phaser.Group;

mushroom: any;

map: Phaser.Tilemap;

doug: Phaser.Sprite;

trees: Phaser.Group;

tree: Phaser.Sprite;

cursors: Phaser.CursorKeys;

score: number = 0;

nextTree: number = 0;

nextSnowman: number = 0;

nextMushroom: number = 0;

snowField: Phaser.TileSprite;

emitter: any;

scoreText: any;



W: Phaser.Key;
A: Phaser.Key;
S: Phaser.Key;
D: Phaser.Key;
  

    constructor() {
        this.game = new Phaser.Game(1088, 640, Phaser.AUTO, "content", 
        {   preload: this.preload, 
            create: this.create, 
            update:this.update, 
            treefall:this.treefall, 
            nextTree: this.nextTree,
            snowMaker: this.snowMaker, 
            nextSnowman: this.nextSnowman,
            nextMushroom: this.nextMushroom,
            collisionHandler: this.collisionHandler,
            mushMaker: this.mushMaker,
            scoreBoard: this.scoreBoard,
            render: this.render});
  }

    preload() {
        this.game.load.image("doug", "/images/doug.png");
        this.game.load.image("snowman", "/images/snowman.png");
        this.game.load.image("tree4", "/images/nature-tree4.png");        
        this.game.load.image("snow3", "/images/realsnow3.png"); 
        this.game.load.image("snow", "/images/snow3.png");              
        this.game.load.image("gem", "/images/greenGem.png");                       
        this.game.load.image("mushroom", "/images/mushroom.png");                       


    }

    render() {
        // This renders debug information about physics bodies
        // this.game.debug.bodyInfo(this.doug, 32, 32);
        // this.game.debug.body(this.doug);
    }

    treefall() {

    //  this.trees = this.game.add.group();
    //     if (this.game.time.now > this.nextTree) {
    //         var lefttree = this.trees.create(-275, -800,"tree4");
    //         this.game.physics.enable(lefttree, Phaser.Physics.ARCADE);
    //         lefttree.body.collideWorldBounds = false;
    //     }
    //     for (var i=0; i < this.trees.children.length; i++){
    //         this.trees.children[i].y += 50;
    //     }
                var lefttree = this.game.add.sprite (-275, -800,"tree4");
                this.game.physics.enable(lefttree, Phaser.Physics.ARCADE);
                lefttree.body.collideWorldBounds = false;
                lefttree.body.gravity.y = 350; 


                var righttree = this.game.add.sprite (760, -800,"tree4");
                this.game.physics.enable(righttree, Phaser.Physics.ARCADE);
                righttree.body.collideWorldBounds = false;
                righttree.body.gravity.y = 375; 
    }  

    snowMaker() {
        //CREATE SNOWMEN

            for (let i = 0; i < 4; i++) {

                    this.snowman = this.snowmen.create(this.game.world.randomX, -75,"snowman");
                    this.game.physics.enable(this.snowman, Phaser.Physics.ARCADE);
                    this.snowman.body.collideWorldBounds = false;
                    this.snowman.body.gravity.y = 200; 
                    this.snowman.body.immovable = false;
                    this.snowman.body.setSize(20, 25, 10, 8);
            }
    }

    mushMaker() {
        for (let i = 0; i < 2; i++) {
                    this.mushroom = this.mushrooms.create(this.game.world.randomX, -75,"mushroom");
                    this.game.physics.enable(this.mushroom, Phaser.Physics.ARCADE);
                    this.mushroom.body.collideWorldBounds = false;
                    this.mushroom.body.gravity.y = 200; 
                    this.mushroom.body.immovable = true;
                    this.mushroom.body.setSize(20, 25, 10, 8);
            }
    }

    collisionHandler(doug, snowman) {
        this.emitter.x = this.doug.x+50;
        this.emitter.y = this.doug.y;     
        this.emitter.start(true, 10000, null, 60);   
        this.doug.kill();
        this.snowmen.remove(snowman);

    }

    scoreBoard(doug, mushroom) {
        this.mushrooms.remove(mushroom);
        //add to score
        this.score +=1;
        console.log(this.score);
        this.scoreText = this.score;

    }


    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 

        this.snowField = this.game.add.tileSprite(0,0,1088, 640, "snow");

//CREATE DOUG
        this.doug = this.game.add.sprite(this.game.width / 2, 0, "doug");
        this.doug.scale.setTo(2.5,2.5);
        this.game.physics.enable(this.doug, Phaser.Physics.ARCADE);
        this.doug.body.collideWorldBounds = true;
        this.doug.body.gravity.y = 4000; 
        this.doug.body.bounce.y = 0.2;
        this.doug.body.setSize(15, 25, 9, 8);

//snowmen group
        this.snowmen = this.game.add.group();
        this.snowmen.enableBody = true;
        this.snowmen.physicsBodyType = Phaser.Physics.ARCADE;

//mushrooms group
        this.mushrooms = this.game.add.group();
        this.mushrooms.enableBody = true;
        this.mushrooms.physicsBodyType = Phaser.Physics.ARCADE;
//create score
        this.scoreText = this.game.add.text(0,0,"0", {fontSize: '64px', fill: "#00FF00"});

//emitter
        this.emitter = this.game.add.emitter(0,0,100);
        this.emitter.makeParticles("gem");
        this.emitter.gravity = 50;

//cursors
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);

        
    }   

    update() {
        this.game.input.update();

        this.snowField.tilePosition.y +=12;

        if (this.game.time.now > this.nextTree) {
            this.treefall();
            this.nextTree = this.game.time.now + 500;
        }

        if (this.game.time.now > this.nextSnowman) {
            this.snowMaker();
            this.nextSnowman = this.game.time.now + 400;
        }

        if (this.game.time.now > this.nextMushroom) {
            this.mushMaker();
            this.nextMushroom = this.game.time.now + 600;
        }
        
        this.game.physics.arcade.overlap(this.doug, this.snowmen, this.collisionHandler, null, this);

        this.game.physics.arcade.overlap(this.doug, this.mushrooms, this.scoreBoard, null, this);        

        if (this.cursors.right.isDown)
            (this.doug.position.x += 15);          
       
        if (this.cursors.left.isDown)
            (this.doug.position.x -= 15);  
    }

}



window.onload = () => {

    let game = new DougTheSlug();

};