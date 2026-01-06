import { WorldMap } from "./WorldMap";

export class Bot {
    public readonly id: string;
    public readonly ownerColor: string;
    private worldMap: WorldMap;

    constructor(id: string, ownerColor: string, worldMap: WorldMap) {
        this.id = id;
        this.ownerColor = ownerColor;
        this.worldMap = worldMap;
    }

    public makeMove(): string | null {
        const allRegions = this.worldMap.getAllRegions();
        const neutralRegions = allRegions.filter(region => region.owner !== this.ownerColor);
        const accessibleRegions = neutralRegions.filter(region => this.worldMap.isRegionAccessible(region.id, this.ownerColor));

        if (accessibleRegions.length === 0) {
            return null; // No moves possible
        }

        const randomRegion = accessibleRegions[Math.floor(Math.random() * accessibleRegions.length)];
        this.worldMap.setRegionOwner(randomRegion.id, this.ownerColor);
        return randomRegion.id;
    }
}
