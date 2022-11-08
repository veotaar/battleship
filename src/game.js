import Player from './player.js';
import {
  placementGrid,
  btnRotate,
  placementCells,
  highlightShip,
  playerCells,
  enemyCells,
  enemyGrid,
  drawShips,
  drawShipsOnPlacementGrid,
  drawMissed,
  drawHits,
  gameOverScreen,
  placementScreen,
  battlefieldScreen,
  gameOverMessage,
  btnPlayAgain,
} from './dom.js';

const player = new Player();
const enemy = new Player();

player.setOpponent(enemy);
enemy.setOpponent(player);

const ships = [
  {
    shipName: 'Carrier',
    length: 5,
  },
  {
    shipName: 'Battleship',
    length: 4,
  },
  {
    shipName: 'Destroyer',
    length: 3,
  },
  {
    shipName: 'Submarine',
    length: 3,
  },
  {
    shipName: 'Patrol Boat',
    length: 2,
  },
];
let orientation = 'horizontal';
let shipIndex = 0;

// change orientation
btnRotate.addEventListener('click', () => {
  if (orientation === 'horizontal') orientation = 'vertical';
  else orientation = 'horizontal';
});

// highlight possible ship placement
placementGrid.addEventListener('mouseover', (e) => {
  if (shipIndex >= ships.length) return;
  highlightShip(placementCells, player.board, ships[shipIndex].length, e.target.dataset.position, orientation);
});

// add valid ship
placementGrid.addEventListener('click', (e) => {
  if (shipIndex >= ships.length) return;
  const shipAdded = player.board.addShip(ships[shipIndex].length, e.target.dataset.position, orientation);
  if (!shipAdded) return;
  drawShipsOnPlacementGrid(placementCells, player.board);
  shipIndex += 1;
  if (shipIndex === ships.length) {
    drawShips(playerCells, player.board, 'player');
    placementScreen.classList.add('hidden');
    battlefieldScreen.classList.remove('hidden');
  }
});

enemy.board.addRandomShips([5, 4, 3, 3, 2]);

const showGameOver = function () {
  gameOverMessage.classList.remove('won', 'lost');
  if (player.board.isAllShipsSunk()) {
    gameOverMessage.textContent = 'You lost!';
    gameOverMessage.classList.add('lost');
    gameOverScreen.classList.remove('hidden');
  } else if (enemy.board.isAllShipsSunk()) {
    gameOverMessage.textContent = 'Victory!';
    gameOverMessage.classList.add('won');
    gameOverScreen.classList.remove('hidden');
  }
};

enemyGrid.addEventListener('click', (e) => {
  const coord = e.target.dataset.position;
  if (!e.target.classList.contains('cell')) return;
  if (enemy.board.isHit(coord)) return;

  player.attack(coord);
  drawHits(enemy.board, 'computer');
  drawMissed(enemy.board, 'computer');
  showGameOver();

  enemy.randomAttack();
  drawHits(player.board, 'player');
  drawMissed(player.board, 'player');
  showGameOver();
});
