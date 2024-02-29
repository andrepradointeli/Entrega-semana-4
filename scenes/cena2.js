class cena2 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({ key: 'cena2' });
        this.score = 0; // Mover score para uma propriedade da classe para fácil acesso
        this.ultimoScoreParaCriacaoDeMoedas = 0; // Armazena o último score em que as moedas foram criadas
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

        this.platforms = this.physics.add.staticGroup(); // Torna platforms uma propriedade da cena


        this.platforms.create(400,575, 'plataformas').setScale(4).refreshBody();
        this.platforms.create(800, 400, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(47, 250, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(750, 220, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(400, 320, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(230, 360, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(300, 130, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(240, 260, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(400, 420, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(580, 460, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(600, 360, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(47, 400, 'plataformas').setScale(0.3).refreshBody();
        this.platforms.create(500, 200, 'plataformas').setScale(0.3).refreshBody();

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
 
         this.physics.add.collider(this.platforms, this.player);

         this.cursors = this.input.keyboard.createCursorKeys();

         this.moedas = this.physics.add.group();

         this.criarMoedas();

        this.scoreText = this.add.text(16, 16, 'score:0', {fontSize: '32px', fill: '#000'});

        this.tempoRestante = 30; // 30 segundos para o temporizador
        this.temporizadorTexto = this.add.text(16, 50, 'Tempo: 30', { fontSize: '32px', fill: '#000' }); // Adiciona texto do temporizador na tela
        
// Temporizador que conta de forma decrescente
        this.time.addEvent({
            delay: 1000, // 1000ms = 1 segundo
            callback: () => {
                this.tempoRestante -= 1;
                this.temporizadorTexto.setText('Tempo: ' + this.tempoRestante);

                if (this.tempoRestante <= 0) {
                    // O tempo acabou, faça o que precisa ser feito para terminar o jogo
                    this.terminarJogo();
                    this.tempoRestante = 1
                }
            },
            callbackScope: this,
            loop: true
        });

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

        if (Math.floor(this.score / 50) > Math.floor(this.ultimoScoreParaCriacaoDeMoedas / 50)) {
            this.criarMoedas();
            this.ultimoScoreParaCriacaoDeMoedas = this.score;
        }
    }
    criarMoedas() {
        // Limpa as moedas existentes antes de criar novas
        this.moedas.clear(true, true);

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

        for (let i = 0; i < posicoesSelecionadas.length; i++) {
            let moeda = this.moedas.create(posicoesSelecionadas[i].x, posicoesSelecionadas[i].y, 'moeda');
            moeda.setBounce(0.7);
        }

        this.physics.add.collider(this.moedas, this.platforms);

        this.physics.add.overlap(this.player, this.moedas, (player, moeda) => {
            moeda.disableBody(true, true); // Desativa a moeda que foi tocada
            this.score += 10; // Aumenta o score em 10
            this.scoreText.setText('Score: ' + this.score); // Atualiza o texto do score
        }, null, this);
    }

    terminarJogo() {
        this.physics.pause(); // Pausa a física, efetivamente pausando o jogo
        this.player.setTint(0xff0000); // Opcional: muda a cor do jogador para vermelho
        this.player.anims.play('turn'); // Opcional: muda a animação do jogador
    
        // Você pode adicionar aqui qualquer lógica adicional para quando o jogo terminar,
        // como mostrar uma mensagem de fim de jogo ou carregar uma nova cena.
        this.add.text(200, 200, 'Fim de Jogo', { fontSize: '64px', fill: '#000' }); // Mensagem de fim de jogo
    }
    
}
