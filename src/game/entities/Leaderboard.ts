import { Scene } from "phaser";
import { WorldMap } from "./WorldMap";

export class Leaderboard {
    private scene: Scene;
    private worldMap: WorldMap;
    private text: Phaser.GameObjects.Text;

    constructor(scene: Scene, worldMap: WorldMap) {
        this.scene = scene;
        this.worldMap = worldMap;

        const { height } = this.scene.scale;
        this.text = this.scene.add.text(25, height - 150, "").setFontSize(20).setColor("#000000");
    }

    public update() {
        const scores = this.getScores();
        const textToDisplay = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([owner, score]) => `${owner}: ${score}`)
            .join("\n");

        this.text.setText("Leaderboard:\n" + textToDisplay);
    }

    private getScores(): Record<string, number> {
        const scores: Record<string, number> = {};
        this.worldMap.getAllRegions().forEach(region => {
            if (region.owner) {
                scores[region.owner] = (scores[region.owner] || 0) + region.score;
            }
        });
        return scores;
    }
}
