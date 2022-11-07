const grids = document.querySelectorAll('[data-ship-grid]');

export const playerCells = document.querySelectorAll('[data-field="player"] [data-position]');
export const enemyCells = document.querySelectorAll('[data-field="computer"] [data-position]');
export const enemyGrid = document.querySelector('[data-field="computer"] [data-ship-grid]');

// build grids
const gridCell = function (row, column) {
  return `
    <div class="cell" data-position="${row}-${column}">
      <div data-bullet="${row}-${column}"></div>
    </div>
  `;
};

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
