import Gameboard from './gameboard.js';

export default class Player {
  #possibleMoves = (() => {
    const arr = [];
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        arr.push(`${i}-${j}`);
      }
    }
    return arr;
  })();

  constructor() {
    this.board = new Gameboard(10);
    this.opponent = null;
    this.turn = false;
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  attack(coords) {
    this.opponent.board.receiveAttack(coords);
    this.endTurn();
  }

  endTurn() {
    this.turn = false;
    this.opponent.turn = true;
  }

  randomAttack() {
    if (this.#possibleMoves.length === 0) return;
    const randIndex = Math.floor(Math.random() * this.#possibleMoves.length);
    const randAttackCoords = this.#possibleMoves.splice(randIndex, 1);
    this.attack(randAttackCoords[0]);
  }
}
