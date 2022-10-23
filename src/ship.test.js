import Ship from './ship.js';

describe('ship tests', () => {
  test('creates ship object', () => {
    const length = 4;
    const ship = new Ship(length);
    expect(ship).toBeDefined();
    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(length);
  });

  test('ship accepts hits', () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('ship can be sunk', () => {
    const ship = new Ship(4);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
