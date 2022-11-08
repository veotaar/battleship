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
          isShipNearby: false,
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
      valid: cellsToCover.every(
        (key) => this.cells.has(key) && this.cells.get(key).ship === null && this.cells.get(key).isShipNearby === false
      ),
    };
  }

  getAdjacentCells(coords) {
    const offsets = [
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
    ];
    const adjacentCells = [];

    const i = +coords.split('-')[0];
    const j = +coords.split('-')[1];

    offsets.forEach((offset) => {
      const nearI = i + offset[0];
      const nearJ = j + offset[1];
      if (nearI >= 0 && nearJ >= 0 && nearI < this.length && nearJ < this.length) {
        adjacentCells.push(`${nearI}-${nearJ}`);
      }
    });
    return adjacentCells;
  }

  addShip(length, coords, orientation) {
    const { cellsToCover, valid } = this.shipCanBeAdded(length, coords, orientation);
    if (!valid) return false;

    const shipToAdd = new Ship(length);
    this.ships.push(shipToAdd);
    cellsToCover.forEach((cell) => {
      this.occupiedCells.push(cell);
      this.cells.get(cell).ship = shipToAdd;

      const nearbyCells = this.getAdjacentCells(cell);
      nearbyCells.forEach((nCell) => (this.cells.get(nCell).isShipNearby = true));
    });
    return true;
  }

  addRandomShips(lengthArr) {
    const orientations = ['horizontal', 'vertical'];
    lengthArr.forEach((shipLength) => {
      for (;;) {
        const orientation = orientations[Math.floor(Math.random() * 2)];
        const i = Math.floor(Math.random() * 10);
        const j = Math.floor(Math.random() * 10);
        const coords = `${i}-${j}`;
        const shipAdded = this.addShip(shipLength, coords, orientation);
        if (shipAdded) break;
      }
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
