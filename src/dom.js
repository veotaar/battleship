const grids = document.querySelectorAll('[data-ship-grid]');

// build grids
const gridCell = function (row, column) {
  return `
    <div class="cell" data-position="${row}-${column}">
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
