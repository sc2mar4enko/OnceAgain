import { Boot } from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { MainMenuScene } from './scenes/MainMenuScene.ts';
import { MapScene } from "./scenes/MapScene.ts";

import { GameOverScene } from "./scenes/GameOverScene";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
export const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1440,
    height: 900,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenuScene,
        MapScene,
        GameOverScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
