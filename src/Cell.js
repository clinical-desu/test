import * as PIXI from 'pixi.js';
import Symbol from "./Symbol";

export default class Cell extends PIXI.Container {
    constructor(x, y, board, id) {
        super();
        this.x = x;
        this.y = y;
        this.board = board;
        this.id = id;
        this.width = 50;
        this.height = 50;
        this.drawCell();
        this.figureInside();
    }

    drawCell = () => {
        let cellStyle = new PIXI.Graphics();
        cellStyle.beginFill(0xCCCCCC);
        cellStyle.lineStyle(2, 0x000000);
        cellStyle.drawRect(2, 2, 50, 50);
        cellStyle.endFill();
        this.addChild(cellStyle);
    };

    figureInside = () => {
      let symbols = ['♠', '♡', '♢', '♣'];
      let rand = Math.floor(Math.random() * symbols.length);
      this.addChild(new Symbol(symbols[rand], 13, 5, this.board, this.id));
    };
};