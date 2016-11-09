/// <reference path="/Users/michaelolson/workspace/Final_Project/pixi.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/phaser.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/p2.d.ts" />


class DougTheSlug {

game: Phaser.Game;

snowmen: Phaser.Group;

// snowman: Phaser.Sprite;

map: Phaser.Tilemap;

doug: Phaser.Sprite;

trees: Phaser.Group;

tree: Phaser.Sprite;

cursors: Phaser.CursorKeys;

score: number = 0;

nextTree: number = 0;

nextSnowman: number = 0;




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
            render: this.render});
  }

    preload() {
        this.game.load.image("doug", "/images/doug.png");
        this.game.load.image("snowman", "/images/snowman.png");
        this.game.load.image("tree", "/images/tree.png");
        this.game.load.image("dougsnowtmx", "/images/dougsnow.png");
        this.game.load.image("tree1", "/images/nature-tree1.png");
        this.game.load.image("tree2", "/images/nature-tree2.png");
        this.game.load.image("tree3", "/images/nature-tree3.png");
        this.game.load.image("tree4", "/images/nature-tree4.png");
        this.game.load.image("tree5", "/images/nature-tree5.png");
        this.game.load.image("tree6", "/images/nature-tree6.png");        
        
        this.game.load.tilemap("snowlevel","/dougsnow.json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("tiles", "/images/dougsnow.png");


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
        this.snowmen = this.game.add.group();
        this.snowmen.enableBody = true;

        for (var i = 0; i < 5; i++){
                let snowman = this.snowmen.create(this.game.world.randomX, -75,"snowman");
                // this.game.physics.enable(snowman, Phaser.Physics.ARCADE);
                snowman.body.collideWorldBounds = false;
                snowman.body.gravity.y = 200; 

        this.game.physics.arcade.collide(this.doug, this.snowmen, (doug, snowmen) => { doug.kill() });

        }
}

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 

        this.map = this.game.add.tilemap("snowlevel", 64, 64, 12, 12);
        this.map.addTilesetImage("snowtile", "tiles");

        this.map.createLayer("Tile Layer 1").resizeWorld();

//CREATE DOUG
        this.doug = this.game.add.sprite(this.game.width / 2, 0, "doug");
        this.doug.scale.setTo(2.5,2.5);
        this.game.physics.enable(this.doug, Phaser.Physics.ARCADE);
        this.doug.body.collideWorldBounds = true;
        this.doug.body.gravity.y = 4000; 
        this.doug.body.bounce.y = 0.2;
        this.doug.body.setSize(15, 25, 9, 8);

        
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
    }   

    update() {
        this.game.input.update();

        if (this.game.time.now > this.nextTree) {
            this.treefall();
            this.nextTree = this.game.time.now + 500;
        }

        if (this.game.time.now > this.nextSnowman) {
            this.snowMaker();
            this.nextSnowman = this.game.time.now + 400;
        }

        this.game.physics.arcade.collide(this.doug, this.snowmen, (doug: any, snowmen: any) => { doug.kill() });


        if (this.cursors.right.isDown)
            (this.doug.position.x += 15);          
       
        if (this.cursors.left.isDown)
            (this.doug.position.x -= 15);  

         if (this.D.isDown)
            (this.doug.position.x += 15);          
       
        if (this.A.isDown)
            (this.doug.position.x -= 15); 
       
    }
}


window.onload = () => {

    let game = new DougTheSlug();

};