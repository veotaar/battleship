import Ship from './ship.js';

export default class Gameboard {
  constructor(length) {
    this.length = length;
    this.cells = this.buildBoard();
    this.ships = [];
    this.missedShots = [];
    this.occupiedCells = [];
    this.receivedHits = [];
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
      valid: cellsToCover.every((key) => this.cells.has(key) && this.cells.get(key).ship === null),
    };
  }

  addShip(length, coords, orientation) {
    const { cellsToCover, valid } = this.shipCanBeAdded(length, coords, orientation);
    if (!valid) return;

    const shipToAdd = new Ship(length);
    this.ships.push(shipToAdd);
    cellsToCover.forEach((cell) => {
      this.occupiedCells.push(cell);
      this.cells.get(cell).ship = shipToAdd;
    });
  }

  receiveAttack(coords) {
    const cell = this.cells.get(coords);
    cell.isHit = true;
    if (cell.ship === null) {
      this.missedShots.push(coords);
    } else {
      cell.ship.hit();
      this.receivedHits.push(coords);
    }
  }

  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
