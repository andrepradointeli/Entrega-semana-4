class cena2 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'cena2',
            
        });
    }

    preload() {

        this.load.image('fundoJogo', 'assets/fundoJogo.png')
        this.load.image('playButton', 'assets/playbt.png')
        this.load.image('playButtonHover', 'assets/playbtHover.png')
        this.load.image('plataformas', 'assets/plataforma.png')
        this.load.image('moeda', 'assets/moeda.png')
        this.load.spritesheet('dude', 'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
    );
    }

    create () {

        var platforms;
        var player;
        var cursors
        var score = 0;
        var scoreText; 
        var moedas;

        this.add.image(400, 300, 'fundoJogo')

        platforms = this.physics.add.staticGroup();

        platforms.create(400,575, 'plataformas').setScale(4).refreshBody();

        platforms.create(800, 400, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(47, 250, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(750, 220, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(400, 320, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(230, 360, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(300, 130, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(240, 260, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(400, 420, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(580, 460, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(600, 360, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(47, 400, 'plataformas').setScale(0.3).refreshBody();
        platforms.create(500, 200, 'plataformas').setScale(0.3).refreshBody();

         // Atribuindo `player` e `cursors` como propriedades da cena para acesso no método `update`
         this.player = this.physics.add.sprite(100, 450, 'dude');
         this.player.setBounce(0.2);
         this.player.setCollideWorldBounds(true);
 
         // Animações do jogador
         this.anims.create({
             key: 'left',
             frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
             frameRate: 10,
             repeat: -1
         });
         this.anims.create({
             key: 'turn',
             frames: [{ key: 'dude', frame: 4 }],
             frameRate: 20
         });
         this.anims.create({
             key: 'right',
             frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
             frameRate: 10,
             repeat: -1
         });
 
         this.physics.add.collider(platforms, this.player);

         this.cursors = this.input.keyboard.createCursorKeys();

        const posicoesMoedas = [
            { x: 800 - 20, y: 400 - 31 },
            { x: 47, y: 250 - 31  },
            { x: 750, y: 220  - 31 },
            { x: 400, y: 320 - 31  },
            { x: 230, y: 360 - 31  },
            { x: 300, y: 130 - 31  },
            { x: 240, y: 260 - 31  },
            { x: 400, y: 420 - 31  },
            { x: 580, y: 460 - 31  },
            { x: 600, y: 360 - 31  },
            { x: 47, y: 400 - 31  },
            { x: 500, y: 200 - 31  },
        ];
    
        let posicoesSelecionadas = Phaser.Utils.Array.Shuffle(posicoesMoedas).slice(0, 5);

        moedas = this.physics.add.group()
    
        for (let i = 0; i < posicoesSelecionadas.length; i++) {
            let moeda = moedas.create(posicoesSelecionadas[i].x, posicoesSelecionadas[i].y, 'moeda');
            moeda.setBounce(0.7);
        }

        this.physics.add.collider(moedas, platforms);
        this.physics.add.overlap(this.player, this.moedas, this.collectMoedas, null, this);

        scoreText = this.add.text(16, 16, 'score:0', {fontSize: '32px', fill: '#000'});

        
    }

    update() {
        if (this.cursors.left.isDown) {
            console.log('Movendo para esquerda');
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            console.log('Movendo para direita');
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            console.log('Pulando');
            this.player.setVelocityY(-200);
        }
    }
    
        collectMoedas(player, moeda) {
            moeda.disableBody(true, true); // Desativa a moeda
            this.score += 10; // Incrementa a pontuação
            this.scoreText.setText('Score: ' + this.score); // Atualiza o texto da pontuação
        // Incrementar pontuação ou qualquer outra lógica relacionada
    }
    
}