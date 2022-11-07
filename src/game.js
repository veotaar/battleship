import Player from './player.js';
import {
  playerCells,
  enemyCells,
  enemyGrid,
  drawShips,
  drawMissed,
  drawHits,
  gameOverScreen,
  gameOverMessage,
  btnPlayAgain,
} from './dom.js';

const player = new Player();
const enemy = new Player();

player.setOpponent(enemy);
enemy.setOpponent(player);

player.board.addShip(5, '1-1', 'horizontal');
player.board.addShip(4, '3-3', 'vertical');

enemy.board.addShip(5, '8-4', 'horizontal');
enemy.board.addShip(4, '2-6', 'vertical');

drawShips(playerCells, player.board, 'player');
// drawShips(enemyCells, enemy.board, 'computer');

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
