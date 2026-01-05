import {Scene} from "phaser";
import RGB_TO_REGION from "../data/rgbToRegion.ts";
import {REGION_TO_HEX} from "../data/regionToHex.ts";
import {WorldMap} from "../entities/WorldMap.ts";
import {Leaderboard} from "../entities/Leaderboard.ts";

export class MapScene extends Scene {
	private maskCtx: CanvasRenderingContext2D;
	private maskW = 0;
	private maskH = 0;

	private regionPixels: Record<string, number[]> = {};

	private overlayTex: Phaser.Textures.CanvasTexture;
	private overlayCtx: CanvasRenderingContext2D;
	private overlayData: ImageData;

	private selectedOwner: string = "RED"; // Default owner

	private worldMap: WorldMap;
	private leaderboard: Leaderboard;

	private colorMap: Record<string, [number, number, number]> = {
		'GREEN': [0, 255, 0],
		'BLUE': [0, 0, 255],
		'RED': [255, 0, 0],
		'YELLOW': [255, 255, 0],
		'PURPLE': [160, 32, 240],
	};

	constructor() {
		super('MapScene');
	}

	create() {
		this.worldMap = new WorldMap(Object.keys(REGION_TO_HEX));

		const cam = this.cameras.main;
		const {width, height} = this.scale;

		const map = this.add.image(cam.centerX, cam.centerY, 'map_user')
			.setOrigin(0.5)
			.setDisplaySize(width, height);

		const maskImg = this.textures.get("map_mask").getSourceImage() as HTMLImageElement;
		const canvasTex = this.textures.createCanvas("maskCanvas", maskImg.width, maskImg.height)!;
		canvasTex.draw(0, 0, maskImg);

		this.maskCtx = canvasTex.context;
		this.maskW = maskImg.width;
		this.maskH = maskImg.height;

		this.overlayTex = this.textures.createCanvas("overlay", this.maskW, this.maskH)!;
		this.overlayCtx = this.overlayTex.context;
		this.overlayData = this.overlayCtx.getImageData(0, 0, this.maskW, this.maskH);

		this.add.image(cam.centerX, cam.centerY, "overlay")
			.setOrigin(0.5)
			.setDisplaySize(width, height);

		this.buildRegionPixelsOnce();
		this.chooseColor();

		this.leaderboard = new Leaderboard(this, this.worldMap);
		this.leaderboard.update();

		this.mapOnClick(map);
	}

	mapOnClick(map: Phaser.GameObjects.Image) {
		this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			const localX = (pointer.x - map.x) / map.scaleX + map.width * map.originX;
			const localY = (pointer.y - map.y) / map.scaleY + map.height * map.originY;

			const x = Math.floor(localX);
			const y = Math.floor(localY);

			if (x < 0 || y < 0 || x >= this.maskW || y >= this.maskH) return;

			const [r, g, b, a] = this.maskCtx.getImageData(x, y, 1, 1).data;
			if (a === 0) return;

			const key = `${r},${g},${b}`;
			const regionId = RGB_TO_REGION[key];

			if (!regionId) {
				console.log("No region for color:", key, "at", x, y);
				return;
			}
			// Update Logic
			this.worldMap.setRegionOwner(regionId, this.selectedOwner);

			// Update Visuals
			this.paintRegion(regionId);
			this.leaderboard.update();
		});
	}

	buildRegionPixelsOnce() {
		const img = this.maskCtx.getImageData(0, 0, this.maskW, this.maskH);
		const d = img.data;

		for (let i = 0; i < d.length; i += 4) {
			const a = d[i + 3];
			if (a === 0) continue;

			const key = `${d[i]},${d[i + 1]},${d[i + 2]}`;
			const regionId = RGB_TO_REGION[key];
			if (!regionId) continue;

			(this.regionPixels[regionId] ??= []).push(i);
		}
	}

	paintRegion(regionId: string) {
		const idxs = this.regionPixels[regionId];
		if (!idxs) return;

		const region = this.worldMap.getRegion(regionId);
		if (!region || !region.owner) return;

		const color = this.colorMap[region.owner];
		if (!color) return;

		const [R, G, B] = color;
		const d = this.overlayData.data;

		for (let k = 0; k < idxs.length; k++) {
			const i = idxs[k];
			d[i] = R;
			d[i + 1] = G;
			d[i + 2] = B;
			d[i + 3] = 125;
		}

		this.overlayCtx.putImageData(this.overlayData, 0, 0);
		this.overlayTex.refresh();
	}

	chooseColor() {
		let y = 25;
		Object.keys(this.colorMap).forEach((label) => {
			this.add.text(25, y, label).setColor(label.toLowerCase()).setFontSize(24).setInteractive()
				.on('pointerdown', () => {
					this.selectedOwner = label;
				});
			y += 25;
		});
	}
}