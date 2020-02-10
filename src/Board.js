import * as PIXI from 'pixi.js';
import Cell from "./Cell";
import Reset from "./Reset";

export default class Board extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.x = this.app.view.width / 4;
        this.y = this.app.view.height / 4.5;
        this.width = 500;
        this.height = 500;
        this.boardArray = [];
        this.drawBoard();
        this.resetBoard();
        this.addCells();
    }

    drawBoard = () => {
        let boardStyle = new PIXI.Graphics();
        boardStyle.beginFill(0xFFFFFF);
        boardStyle.lineStyle(2, 0xFF0000);
        boardStyle.drawRect(0, 0, 304, 354);
        boardStyle.endFill();
        this.addChild(boardStyle);
    };

    resetBoard = () => {
        let reset = new Reset(this.app, this);
        reset.x = 75;
        reset.y = -70;
        this.addChild(reset);
    };

    addCells = () => {
        for (let i = 0; i < 6; i++) {
            let row = [];
            this.boardArray.push(row);
            for (let j = 0; j < 7; j++) {
                row.push(this.addChild(new Cell(i * 50, j * 50, this, `${i}-${j}`)));
            }
        }
    };
}