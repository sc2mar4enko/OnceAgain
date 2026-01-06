import { Scene } from 'phaser';

export class MainMenuScene extends Scene {
    private colors: string[] = ['GREEN', 'BLUE', 'RED', 'YELLOW', 'PURPLE'];

    constructor() {
        super('MainMenuScene');
    }

    create() {
        const { width } = this.scale;

        this.add.text(width / 2, 100, 'Choose Your Side', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        let y = 300;
        this.colors.forEach((color) => {
            const btn = this.add.text(width / 2, y, color, {
                fontSize: '32px',
                color: color.toLowerCase(),
                backgroundColor: '#ffffff',
                padding: { x: 20, y: 10 }
            })
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    this.scene.start('MapScene', { selectedOwner: color });
                })
                .on('pointerover', () => btn.setScale(1.1))
                .on('pointerout', () => btn.setScale(1));

            y += 100;
        });
    }
}
