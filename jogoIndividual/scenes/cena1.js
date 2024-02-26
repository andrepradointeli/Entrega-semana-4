class cena1 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'cena1',
            
        });
    }

    preload() {

        this.load.image('fundo', 'assets/fundoJogoInd.png')
        this.load.image('playButton', 'assets/playbt.png')
        this.load.image('playButtonHover', 'assets/playbtHover.png')
    }

    create () {
        this.add.image(400, 300, 'fundo')
        let playButton = this.add.image(350, this.game.config.height / 4 * 3, 'playButton').setOrigin(0, 0).setInteractive().setVisible(true);

        // Quando o ponteiro passa por cima do botão, muda para a textura de hover
        playButton.on('pointerover', () => {
            playButton.setTexture('playButtonHover');
        });
    
        // Quando o ponteiro sai de cima do botão, volta para a textura original
        playButton.on('pointerout', () => {
            playButton.setTexture('playButton');
        });
    
        // Adiciona funcionalidade de clique ao botão
        playButton.on('pointerdown', () => {

            //Começa o jogo com a escolha do personagem
            this.scene.start('cena2', this.game);
        }, this);
    }

update () {


    }
}