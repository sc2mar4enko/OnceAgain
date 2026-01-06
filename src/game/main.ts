import { Boot } from './scenes/Boot';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { SideChooseScene } from './scenes/SideChooseScene.ts';
import { MapScene } from "./scenes/MapScene.ts";

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
        SideChooseScene,
        MapScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
