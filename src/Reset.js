import * as PIXI from 'pixi.js';
import Board from "./Board";

export default class Reset extends PIXI.Text {
    constructor(app, board) {
        super();
        this.app = app;
        this.board = board;
        this.text = 'RESET';
        this.style = {
            fillGradientType: 1,
            fontSize: 50,
            stroke: 'blue',
            fill: 'red',
            strokeThickness: 1,
        };
        this.interactive = this.buttonMode = true;
        this.pointertap = () => {
            this.app.stage.removeChild(this.board);
            this.app.stage.addChild(new Board(this.app));
        };
    }
}