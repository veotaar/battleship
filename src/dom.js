const grids = document.querySelectorAll('[data-ship-grid]');

export const placementScreen = document.querySelector('[data-ship-placement]');
export const placementGrid = document.querySelector('[data-placement-grid]');
export const placementMessage = document.querySelector('[data-placement-message]');
export const btnRotate = document.querySelector('[data-btn-rotate]');

export const battlefieldScreen = document.querySelector('[data-battlefield]');
export const playerCells = document.querySelectorAll('[data-field="player"] [data-position]');
export const enemyCells = document.querySelectorAll('[data-field="computer"] [data-position]');
export const enemyGrid = document.querySelector('[data-field="computer"] [data-ship-grid]');
export const gameOverScreen = document.querySelector('[data-game-over]');
export const gameOverMessage = document.querySelector('[data-game-result]');
export const btnPlayAgain = document.querySelector('[data-btn-again]');

// build grids
const gridCell = function (row, column) {
  return `
    <div class="cell" data-position="${row}-${column}">
      <div data-bullet="${row}-${column}"></div>
    </div>
  `;
};

// build ship placement grid
for (let i = 0; i < 10; i += 1) {
  for (let j = 0; j < 10; j += 1) {
    placementGrid.insertAdjacentHTML('beforeend', gridCell(i, j));
  }
}
export const placementCells = document.querySelectorAll('[data-placement-grid] [data-position]');

grids.forEach((grid) => {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      grid.insertAdjacentHTML('beforeend', gridCell(i, j));
    }
  }
});

export const drawShips = function (DOMCells, board, player) {
  DOMCells.forEach((cell) => cell.classList.remove('ship'));
  board.occupiedCells.forEach((cell) => {
    document.querySelector(`[data-field="${player}"] [data-position="${cell}"]`).classList.add('ship');
  });
};

export const highlightShip = function (DOMCells, board, length, coords, orientation) {
  DOMCells.forEach((cell) => cell.classList.remove('ship-highlight'));
  const { cellsToCover, valid } = board.shipCanBeAdded(length, coords, orientation);
  if (!valid) return;

  cellsToCover.forEach((cell) => {
    document.querySelector(`[data-placement-grid] [data-position="${cell}"]`).classList.add('ship-highlight');
  });
};

export const drawShipsOnPlacementGrid = function (DOMCells, board) {
  DOMCells.forEach((cell) => cell.classList.remove('ship'));
  board.occupiedCells.forEach((cell) => {
    document.querySelector(`[data-placement-grid] [data-position="${cell}"]`).classList.add('ship');
  });
};

export const drawMissed = function (board, player) {
  if (board.missedShots.length === 0) return;
  board.missedShots.forEach((coord) => {
    document.querySelector(`[data-field=${player}] [data-bullet="${coord}"]`).classList.add('bullet');
  });
};

export const drawHits = function (board, player) {
  if (board.receivedHits.length === 0) return;
  board.receivedHits.forEach((coord) => {
    document.querySelector(`[data-field=${player}] [data-bullet="${coord}"]`).classList.add('bullet', 'hit');
  });
};

export const cleanBoards = function () {
  document.querySelectorAll(`[data-field="player"] [data-bullet]`).forEach((node) => node.classList.remove('bullet'));
  document.querySelectorAll(`[data-field="computer"] [data-bullet]`).forEach((node) => node.classList.remove('bullet'));
  placementCells.forEach((cell) => cell.classList.remove('ship'));
  document.querySelectorAll('[data-ship-grid] [data-position]').forEach((cell) => cell.classList.remove('ship'));

  document
    .querySelectorAll(`[data-field="player"] [data-bullet]`)
    .forEach((node) => node.classList.remove('bullet', 'hit'));

  document
    .querySelectorAll(`[data-field="computer"] [data-bullet]`)
    .forEach((node) => node.classList.remove('bullet', 'hit'));

  playerCells.forEach((cell) => cell.classList.remove('ship'));
};
