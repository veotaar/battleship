import Player from './player.js';
import Ship from './ship.js';

test('can attack opponent', () => {
  const player = new Player();
  const opponent = new Player();

  player.setOpponent(opponent);
  opponent.setOpponent(player);

  opponent.board.addShip(4, '2-2', 'horizontal');

  player.attack('2-2');
  player.attack('2-3');
  player.attack('2-4');

  expect(opponent.board.getShip('2-2')).toBeInstanceOf(Ship);
  expect(opponent.board.getShip('2-2').hits).toBe(3);
  expect(opponent.board.getShip('2-2').isSunk()).toBe(false);

  player.attack('2-5');

  expect(opponent.board.getShip('2-2').hits).toBe(4);
  expect(opponent.board.getShip('2-2').isSunk()).toBe(true);
});
