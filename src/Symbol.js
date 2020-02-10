import * as PIXI from 'pixi.js';

export default class Symbol extends PIXI.Text {
    constructor(text, x, y, board, id) {
        super();
        this.text = text;
        this.x = x;
        this.y = y;
        this.board = board;
        this.id = id;
        this.style = {
            fontSize: 40,
            fill: 'red',
            strokeThickness: 1,
        };
        this.interactive = this.buttonMode = true;
        this.pointertap = () => {
            let outOfBoard = (i, j) => (i < 0 || i >= 8 || j < 0 || j >= 8);
            let symbols = this.board.children.map(e => e.children[0]).filter(e => {
                return e != null;
            });

            let allCells = symbols.map(e => e.parent);
            let selected = this.id.split('-');
            let r = parseInt(selected[0]);
            let c = parseInt(selected[1]);
            let suggestedElements = [];
            let nextMove = [];

            let selectedMoves = (r, c, moves) => {
                let nextMove = [];
                for (let move of moves) {
                    let mR = r + move[0];
                    let mC = c + move[1];
                    let element = `${mR}-${mC}`;
                    let s = true;
                    while (s && !outOfBoard(mR, mC)) {
                        for (let i = 0; i < allCells.length; i++) {
                            if (allCells[i].id === element) {
                                if(allCells[i].children[1] === undefined) {
                                    s = false;
                                } else {
                                    if (allCells[i].children[1].text === this.text) {
                                        nextMove.push([mR, mC]);
                                    } else {
                                        s = false;
                                    }
                                }
                            }
                        }
                        mR += move[0];
                        mC += move[1];
                        element = `${mR}-${mC}`;
                    }
                }

                let nextCheck = (arr) => {
                    let R = arr[0] ;
                    let L = arr[1] ;
                    for (let move of moves) {
                        let mR = R + move[0];
                        let mL = L + move[1];
                        let element = `${mR}-${mL}`;
                        let s = true;
                        while (s && !outOfBoard(mR, mL)) {
                            for (let i = 0; i < allCells.length; i++) {
                                if (allCells[i].id === element) {
                                    if(allCells[i].children[1] === undefined) {
                                        s = false;
                                    } else {
                                        if (allCells[i].children[1].text === this.text) {
                                            nextMove.push([mR, mL]);
                                        } else {
                                            s = false;
                                        }
                                    }
                                }
                            }
                            mR += move[0];
                            mL += move[1];
                            element = `${mR}-${mL}`;
                        }
                    }
                };
                nextMove.forEach(arr => nextCheck(arr));
                this.parent.removeChild(this);
                return nextMove;
            };

            nextMove = selectedMoves(r, c, [[0, 1], [0, -1], [1, 0], [-1, 0]]);

            let suggestNextMoves = function (nextMoves) {
                let move = nextMoves.map(elem => (elem.join('-')));
                for (let i = 0; i < allCells.length; i++) {
                    if (move.indexOf(allCells[i].id) > -1) suggestedElements.push(allCells[i]);
                }
            };

            suggestNextMoves(nextMove);
            for (let i = 0; i < suggestedElements.length; i++) {
                let s = suggestedElements[i].children[1];
                suggestedElements[i].removeChild(s);
            }
        }
    };
}