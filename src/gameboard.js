import Ship from './ship.js';

export default class Gameboard {
  constructor(length) {
    this.length = length;
    this.cells = this.buildBoard();
  }

  buildBoard() {
    const board = new Map();
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        const coord = `${i}-${j}`;
        board.set(coord, {
          ship: null,
          isHit: false,
        });
      }
    }

    return board;
  }

  getShip(coords) {
    return this.cells.get(coords).ship;
  }

  isHit(coords) {
    return this.cells.get(coords).isHit;
  }

  shipCanBeAdded(length, coords, orientation) {
    const cellsToCover = [];
    const startingCellCoords = coords.split('-');
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i += 1) {
        cellsToCover.push(`${startingCellCoords[0]}-${+startingCellCoords[1] + i}`);
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < length; i += 1) {
        cellsToCover.push(`${+startingCellCoords[0] + i}-${startingCellCoords[1]}`);
      }
    }

    return {
      cellsToCover,
      valid: cellsToCover.every((key) => this.cells.has(key) && this.getShip(key) === null),
    };
  }

  addShip(length, coords, orientation) {
    const { cellsToCover, valid } = this.shipCanBeAdded(length, coords, orientation);
    if (!valid) return;

    const shipToAdd = new Ship(length);
    cellsToCover.forEach((cell) => {
      this.cells.set(cell, {
        ship: shipToAdd,
        isHit: false,
      });
    });
  }
}

// const gameboard = new Gameboard(10);

// gameboard.addShip(2, '0-0', 'horizontal');

// console.log(gameboard.cells);
