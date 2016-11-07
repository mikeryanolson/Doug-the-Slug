/// <reference path="/Users/michaelolson/workspace/Final_Project/pixi.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/phaser.d.ts" />
/// <reference path="/Users/michaelolson/workspace/Final_Project/p2.d.ts" />

class SimpleGame {

game: Phaser.Game;

map: Phaser.Tilemap;

doug: Phaser.Sprite;

snowman: Phaser.Sprite;

tree: Phaser.Sprite;

cursors: Phaser.CursorKeys;

W: Phaser.Key;
A: Phaser.Key;
S: Phaser.Key;
D: Phaser.Key;
  

    constructor() {
        this.game = new Phaser.Game(1080, 600, Phaser.AUTO, "content", { preload: this.preload, create: this.create, update:this.update });
  }

    preload() {
        this.game.load.image("doug", "images/doug.png");
        this.game.load.image("snowman", "images/SnowMan.png");
        this.game.load.image("tree", "images/tree.png");
        this.game.load.tilemap("dougsnow", "/dougsnow.tmx", null);
        this.game.load.image("snowtile", "/images/snowtile.png");

        let score = 0; 

        let snowmen;

    }

      render() {
        // This renders debug information about physics bodies
        this.game.debug.body(this.doug);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 

        // this.map = this.game.add.tilemap("dougsnow", 64, 64, 10, 10);
        // this.map.addTilesetImage("snowtile", "snowtile");          

        this.doug = this.game.add.sprite(this.game.width / 2, 0, "doug");
        this.doug.scale.setTo(2.5,2.5);
        this.game.physics.enable(this.doug, Phaser.Physics.ARCADE);
        this.doug.body.collideWorldBounds = true;
        this.doug.body.gravity.y = 4000; 
        this.doug.body.bounce.y = 0.2;

        let snowmen = this.game.add.group();
        snowmen.enableBody = true;

        for (var i = 0; i < 4; i++){
                this.snowman = snowmen.create(this.game.width * Math.random(), 0,"snowman");
                this.game.physics.enable(this.snowman, Phaser.Physics.ARCADE);
                this.snowman.body.collideWorldBounds = false;
                this.snowman.body.gravity.y = 40; 
        }

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

    }

    update() {
        this.game.input.update();
        
        this.game.physics.arcade.collide(this.doug, this.snowman);

        this.game.physics.arcade.overlap(this.doug, this.snowman, crash, null, this);

        if (this.cursors.right.isDown)
            (this.doug.position.x += 25);          
       
        if (this.cursors.left.isDown)
            (this.doug.position.x -= 25);  

        if (this.cursors.up.isDown && this.doug.position.isZero)
            (this.doug.position.y -= 15);            

         if (this.D.isDown)
            (this.doug.position.x += 25);          
       
        if (this.A.isDown)
            (this.doug.position.x -= 25); 

        if (this.W.isDown && this.doug.body.touching.down)
            (this.doug.position.y -= 15);       

        function crash  (doug: any, snowman: any) {
            this.doug.kill();
        }
        
    }
}

window.onload = () => {

    let game = new SimpleGame();

};