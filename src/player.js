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
  }

  setOpponent(opponent) {
    this.opponent = opponent;
  }

  attack(coords) {
    this.#possibleMoves.splice(
      this.#possibleMoves.findIndex((el) => el === coords),
      1
    );
    this.opponent.board.receiveAttack(coords);
  }

  randomAttack() {
    const randIndex = Math.floor(Math.random() * this.#possibleMoves.length);
    const randAttackCoords = this.#possibleMoves.splice(randIndex, 1);
    this.attack(randAttackCoords);
  }
}
