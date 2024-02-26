class cena2 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({ key: 'cena2' });
            this.tijolos;
            this.base;
            this.bola
        };

    preload() {

        this.load.image('fundo', 'assets/fundoJogoInd.png')

    }

    create () {
        this.add.image(400, 300, 'fundo')

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.bricks = this.physics.add.staticGroup({
            
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });
      
    }

update () {


    }
}
