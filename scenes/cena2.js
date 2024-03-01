class cena2 extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({ key: 'cena2' });
        this.score = 0; // Mover score para uma propriedade da classe para fácil acesso
        this.ultimoScoreParaCriacaoDeMoedas = 0; // Armazena o último score em que as moedas foram criadas
    }


    preload() {
        // Carrega os assets
        this.load.image('fundoJogo', 'assets/fundoJogo.png')
        this.load.image('playButton', 'assets/playbt.png')
        this.load.image('playButtonHover', 'assets/playbtHover.png')
        this.load.image('plataformas', 'assets/plataforma.png')
        this.load.image('moeda', 'assets/moeda.png')
        this.load.image('restartButton', 'assets/restartButton.png')
        this.load.image('restartButtonHover', 'assets/restartButtonHover.png')
        this.load.spritesheet('dude', 'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
    );
    }

    create () {
        //Cria variaveis do jogo
        var platforms;
        var player;
        var cursors
        var score = 0;
        var scoreText; 
        var moedas;
        //adiciona o fundo
        this.add.image(400, 300, 'fundoJogo')
        
        //Cria o grupo das plataformas
        this.platforms = this.physics.add.staticGroup(); 
        //Criacao das plataformas
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

         //Cria o player
         this.player = this.physics.add.sprite(400, 450, 'dude').setSize(32, 38, true).setOffset(0, 10);
         this.player.setBounce(0.2); //Adiciona um quique pro personagem
         this.player.setCollideWorldBounds(true); //Colisao com os limites do jogo
 
         // Animações do player
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

         
        this.score = 0; // Garante que o score é reiniciado
        this.ultimoScoreParaCriacaoDeMoedas = 0; // Reinicia o controle para a criação de moedas
        this.tempoRestante = 30; // Reinicia o temporizador para o valor inicial
        
            
        
 
         this.physics.add.collider(this.platforms, this.player); //Colisao entre o player e as plataformas

         this.cursors = this.input.keyboard.createCursorKeys(); //Cria os controles do jogo

         this.moedas = this.physics.add.group(); //Cria as moedas

         this.criarMoedas(); //Cria a funcao "criarMoedas"

        this.scoreText = this.add.text(16, 16, 'score:0', {fontSize: '32px', fill: '#000'}); //Adiciona o texto do score

        this.tempoRestante = 30; // 30 segundos para o temporizador
        this.temporizadorTexto = this.add.text(16, 50, 'Tempo: 30', { fontSize: '32px', fill: '#000' }); // Adiciona texto do temporizador na tela
        
         //Cria o temporizador
        this.time.addEvent({
            delay: 1000, // 1000ms = 1 segundo
            callback: () => { //Chama o evento de tempo
                this.tempoRestante -= 1; //Diminui o tempo restante a cada segundo
                this.temporizadorTexto.setText('Tempo: ' + this.tempoRestante); //Muda o texto no temporizador

                if (this.tempoRestante <= 0) { //Acaba o jogo
                    this.terminarJogo(); //Cria funcao terminarJogo
                    this.tempoRestante = 1 //Para o temporizador
                }
            },
            callbackScope: this,
            loop: true
        });

        

    }

    update() {
        //Movimentacao do personagem
        if (this.cursors.left.isDown) { //Movimentacao para esquerda
            console.log('Movendo para esquerda');
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true); //Comeca animacao de movimento do personagem
        } else if (this.cursors.right.isDown) {
            console.log('Movendo para direita'); //Movimentacao para direita
            this.player.setVelocityX(160);
            this.player.anims.play('right', true); //Comeca animacao do personagem
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down) { //Pulo do personagem
            console.log('Pulando');
            this.player.setVelocityY(-200);
        }

        if (Math.floor(this.score / 50) > Math.floor(this.ultimoScoreParaCriacaoDeMoedas / 50)) { //Verifica se o score é multiplo de 50
            this.criarMoedas(); //Se o score for multilpo de 50, ativa a funcao criarMoedas
            this.ultimoScoreParaCriacaoDeMoedas = this.score;
        }
    }
    criarMoedas() {
        // Limpa as moedas existentes antes de criar novas
        this.moedas.clear(true, true);

        const posicoesMoedas = [ //Possiveis posicoes das moedas
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

        let posicoesSelecionadas = Phaser.Utils.Array.Shuffle(posicoesMoedas).slice(0, 5); //Randomiza posicao das moedas

        for (let i = 0; i < posicoesSelecionadas.length; i++) { //Cria moedas em posicoes aleatorias da lista
            let moeda = this.moedas.create(posicoesSelecionadas[i].x, posicoesSelecionadas[i].y, 'moeda');
            moeda.setBounce(0.7); //Adiciona um bounce nas moedas
        }

        this.physics.add.collider(this.moedas, this.platforms); //Colisao entre moedas e plataformas

        this.physics.add.overlap(this.player, this.moedas, (player, moeda) => { //Overlap player e plataformas da um callback
            moeda.disableBody(true, true); // Desativa a moeda que foi tocada
            this.score += 10; // Aumenta o score em 10
            this.scoreText.setText('Score: ' + this.score); // Atualiza o texto do score
        }, null, this);
    }

    terminarJogo() {
        this.physics.pause(); // Pausa a física, efetivamente pausando o jogo
        this.player.setTint(0xff0000);
        this.add.text(200, 200, 'Fim de Jogo', { fontSize: '64px', fill: '#000' }); // Mensagem de fim de jogo
        let playButton = this.add.image(350, this.game.config.height / 4 * 3, 'restartButton').setOrigin(0, 0).setInteractive().setVisible(true);
    
        playButton.on('pointerover', () => {
            playButton.setTexture('restartButtonHover');
        });
    
        playButton.on('pointerout', () => {
            playButton.setTexture('restartButton');
        });
    
        // Adiciona funcionalidade de clique ao botão
        playButton.on('pointerdown', () => {
            // Simplesmente reinicia a cena2 sem precisar passar 'this.game'
            this.scene.restart();
        });
    }
    
    
}
