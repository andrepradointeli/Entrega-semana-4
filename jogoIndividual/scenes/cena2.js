class cena2 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'cena2',
            
        });
    }

    preload() {

        this.load.image('fundo', 'assets/fundoJogoInd.png')

    }

    create () {
        this.add.image(400, 300, 'fundo')
      
    }

update () {


    }
}