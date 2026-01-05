import { Region } from "./Region";

export class WorldMap {
    private regions: Map<string, Region> = new Map();

    constructor(regionIds: string[]) {
        regionIds.forEach(id => {
            this.regions.set(id, new Region(id));
        });
    }

    public getRegion(id: string): Region | undefined {
        return this.regions.get(id);
    }

    public setRegionOwner(id: string, owner: string): void {
        const region = this.regions.get(id);
        if (region) {
            region.owner = owner;
        } else {
            console.warn(`Region with id ${id} not found.`);
        }
    }

    public getAllRegions(): Region[] {
        return Array.from(this.regions.values());
    }
}
