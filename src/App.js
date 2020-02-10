import * as PIXI from 'pixi.js'
import Game from "./Board";

let app = new PIXI.Application({width: 600, height: 600});
document.body.appendChild(app.view);
app.stage.addChild(new Game(app));