import { Scene } from "phaser";

export class GameOverScene extends Scene {
    private winner: string;

    constructor() {
        super('GameOverScene');
    }

    init(data: { winner: string }) {
        this.winner = data.winner;
    }

    create() {
        const { width, height } = this.scale;

        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

        this.add.text(width / 2, height / 2 - 50, 'GAME OVER', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 50, `Winner: ${this.winner}`, {
            fontSize: '48px',
            color: '#ffd700'
        }).setOrigin(0.5);

        const restartButton = this.add.text(width / 2, height / 2 + 150, 'Restart', {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        restartButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });

        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ff0' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#fff' });
        });
    }
}
