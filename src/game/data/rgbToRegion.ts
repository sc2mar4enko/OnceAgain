import {REGION_TO_HEX} from "./regionToHex.ts";

const RGB_TO_REGION: Record<string, string> = Object.fromEntries(
	Object.entries(REGION_TO_HEX).map(([region, hex]) => [hexToRgbKey(hex), region])
);

function hexToRgbKey(hex: string): string {
	const h = hex.replace("#", "");
	const r = parseInt(h.slice(0, 2), 16);
	const g = parseInt(h.slice(2, 4), 16);
	const b = parseInt(h.slice(4, 6), 16);
	return `${r},${g},${b}`;
}

export default RGB_TO_REGION;
