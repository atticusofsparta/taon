import { Assets } from "pixi.js";
import { applyDefaultProps, PixiComponent } from "@pixi/react";
import { CompositeTilemap } from "@pixi/tilemap";

type Props = {
	// path: string;
	// xOffset: number;
	// yOffset: number;
};

export const tileSize = 32;
export const roomTilesX = 19;
export const roomTilesY = 13;

export const blockSpacingX = 2;
export const blockSpacingY = 4;

export const Tilemap3 = PixiComponent("TileMap3", {
	create: () => {
		return new CompositeTilemap();
	},
	didMount: async (instance) => {
		Assets.add({ alias: "atlas", src: "assets/tiles/atlas.json" });
		await Assets.load(["atlas"]);

		instance.clear();
		instance.scale.set(2);

		// if you are too lazy, just specify filename and pixi will find it in cache
		for (let x = 0; x < roomTilesX; x++) {
			for (let y = 0; y < roomTilesY; y++) {
				instance.tile("grass.png", x * tileSize, y * tileSize);

				if (x % blockSpacingX === 0 && y % blockSpacingY === 0) {
					instance.tile("tough.png", x * tileSize, y * tileSize);
				}

				if (y === roomTilesY - 1) {
					instance.tile("brick_wall.png", x * tileSize, y * tileSize);
				} else if (x === 0 || x === roomTilesX - 1) {
					instance.tile("brick.png", x * tileSize, y * tileSize);
				} else if (y === 0) {
					instance.tile("brick_wall.png", x * tileSize, y * tileSize);
				}
			}
		}
	},

	applyProps: (instance, oldProps: Props, newProps: Props) => {
		const { ...oldP } = oldProps;
		const { ...newP } = newProps;

		// apply rest props to instance
		applyDefaultProps(instance, oldP, newP);
	},
});