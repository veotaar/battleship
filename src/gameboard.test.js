import Gameboard from './gameboard.js';
import Ship from './ship.js';

test('adds a ship to the gameboard', () => {
  const gameboard = new Gameboard(10);
  const length = 4;
  const coords = [2, 2];
  const orientation = 'horizontal';

  gameboard.addShip(length, `${coords[0]}-${coords[1]}`, orientation);

  for (let i = 0; i < length; i += 1) {
    if (orientation === 'horizontal') {
      expect(gameboard.cells.get(`${coords[0]}-${coords[1] + i}`).ship).toBeInstanceOf(Ship);
    } else if (orientation === 'vertical') {
      expect(gameboard.cells.get(`${coords[0] + i}-${coords[1]}`).ship).toBeInstanceOf(Ship);
    }
  }
});

test('does not add ships to invalid coordinats', () => {
  const gameboard = new Gameboard(10);

  gameboard.addShip(4, `8-8`, 'horizontal');

  expect(gameboard.cells.get('8-8').ship).toBeNull();
});
