import { Region } from "./Region";
import ADJACENT_REGIONS from "../data/adjacentRegions.json";

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
			console.log(`${id} owned by ${owner}`);
		} else {
			console.warn(`Region with id ${id} not found.`);
		}
	}

	public getAllRegions(): Region[] {
		return Array.from(this.regions.values());
	}

	public getOwnedRegions(owner: string): Region[] {
		return Array.from(this.regions.values()).filter(r => r.owner === owner);
	}

	public isRegionAccessible(regionId: string, owner: string): boolean {
		const owned = this.getOwnedRegions(owner);
		if (owned.length === 0) {
			return true;
		}

		return owned.some(r => {
			const neighbors = (ADJACENT_REGIONS as Record<string, string[]>)[r.id];
			return neighbors && neighbors.includes(regionId);
		});
	}

	public getTotalScore(): number {
		return Array.from(this.regions.values()).reduce((sum, r) => sum + r.score, 0);
	}

	public getOwnerScore(owner: string): number {
		return this.getOwnedRegions(owner).reduce((sum, r) => sum + r.score, 0);
	}
}
