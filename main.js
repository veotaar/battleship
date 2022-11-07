/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "battlefieldScreen": () => (/* binding */ battlefieldScreen),
/* harmony export */   "btnPlayAgain": () => (/* binding */ btnPlayAgain),
/* harmony export */   "btnRotate": () => (/* binding */ btnRotate),
/* harmony export */   "drawHits": () => (/* binding */ drawHits),
/* harmony export */   "drawMissed": () => (/* binding */ drawMissed),
/* harmony export */   "drawShips": () => (/* binding */ drawShips),
/* harmony export */   "drawShipsOnPlacementGrid": () => (/* binding */ drawShipsOnPlacementGrid),
/* harmony export */   "enemyCells": () => (/* binding */ enemyCells),
/* harmony export */   "enemyGrid": () => (/* binding */ enemyGrid),
/* harmony export */   "gameOverMessage": () => (/* binding */ gameOverMessage),
/* harmony export */   "gameOverScreen": () => (/* binding */ gameOverScreen),
/* harmony export */   "highlightShip": () => (/* binding */ highlightShip),
/* harmony export */   "placementCells": () => (/* binding */ placementCells),
/* harmony export */   "placementGrid": () => (/* binding */ placementGrid),
/* harmony export */   "placementMessage": () => (/* binding */ placementMessage),
/* harmony export */   "placementScreen": () => (/* binding */ placementScreen),
/* harmony export */   "playerCells": () => (/* binding */ playerCells)
/* harmony export */ });
const grids = document.querySelectorAll('[data-ship-grid]');
const placementScreen = document.querySelector('[data-ship-placement]');
const placementGrid = document.querySelector('[data-placement-grid]');
const placementMessage = document.querySelector('[data-placement-message]');
const btnRotate = document.querySelector('[data-btn-rotate]');
const battlefieldScreen = document.querySelector('[data-battlefield]');
const playerCells = document.querySelectorAll('[data-field="player"] [data-position]');
const enemyCells = document.querySelectorAll('[data-field="computer"] [data-position]');
const enemyGrid = document.querySelector('[data-field="computer"] [data-ship-grid]');
const gameOverScreen = document.querySelector('[data-game-over]');
const gameOverMessage = document.querySelector('[data-game-result]');
const btnPlayAgain = document.querySelector('[data-btn-again]');

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
const placementCells = document.querySelectorAll('[data-placement-grid] [data-position]');
grids.forEach(grid => {
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      grid.insertAdjacentHTML('beforeend', gridCell(i, j));
    }
  }
});
const drawShips = function (DOMCells, board, player) {
  DOMCells.forEach(cell => cell.classList.remove('ship'));
  board.occupiedCells.forEach(cell => {
    document.querySelector(`[data-field="${player}"] [data-position="${cell}"]`).classList.add('ship');
  });
};
const highlightShip = function (DOMCells, board, length, coords, orientation) {
  DOMCells.forEach(cell => cell.classList.remove('ship-highlight'));
  const {
    cellsToCover,
    valid
  } = board.shipCanBeAdded(length, coords, orientation);
  if (!valid) return;
  cellsToCover.forEach(cell => {
    document.querySelector(`[data-placement-grid] [data-position="${cell}"]`).classList.add('ship-highlight');
  });
};
const drawShipsOnPlacementGrid = function (DOMCells, board) {
  DOMCells.forEach(cell => cell.classList.remove('ship-highlight'));
  board.occupiedCells.forEach(cell => {
    document.querySelector(`[data-placement-grid] [data-position="${cell}"]`).classList.add('ship');
  });
};
const drawMissed = function (board, player) {
  if (board.missedShots.length === 0) return;
  board.missedShots.forEach(coord => {
    document.querySelector(`[data-field=${player}] [data-bullet="${coord}"]`).classList.add('bullet');
  });
};
const drawHits = function (board, player) {
  if (board.receivedHits.length === 0) return;
  board.receivedHits.forEach(coord => {
    document.querySelector(`[data-field=${player}] [data-bullet="${coord}"]`).classList.add('bullet', 'hit');
  });
};

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");


const player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const enemy = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
player.setOpponent(enemy);
enemy.setOpponent(player);
const ships = [{
  shipName: 'Carrier',
  length: 5
}, {
  shipName: 'Battleship',
  length: 4
}, {
  shipName: 'Destroyer',
  length: 3
}, {
  shipName: 'Submarine',
  length: 3
}, {
  shipName: 'Patrol Boat',
  length: 2
}];
let orientation = 'horizontal';
let shipIndex = 0;

// change orientation
_dom_js__WEBPACK_IMPORTED_MODULE_1__.btnRotate.addEventListener('click', () => {
  if (orientation === 'horizontal') orientation = 'vertical';else orientation = 'horizontal';
});

// highlight possible ship placement
_dom_js__WEBPACK_IMPORTED_MODULE_1__.placementGrid.addEventListener('mouseover', e => {
  if (shipIndex >= ships.length) return;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.highlightShip)(_dom_js__WEBPACK_IMPORTED_MODULE_1__.placementCells, player.board, ships[shipIndex].length, e.target.dataset.position, orientation);
});

// add valid ship
_dom_js__WEBPACK_IMPORTED_MODULE_1__.placementGrid.addEventListener('click', e => {
  if (shipIndex >= ships.length) return;
  const shipAdded = player.board.addShip(ships[shipIndex].length, e.target.dataset.position, orientation);
  if (!shipAdded) return;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawShipsOnPlacementGrid)(_dom_js__WEBPACK_IMPORTED_MODULE_1__.placementCells, player.board);
  shipIndex += 1;
  if (shipIndex === ships.length) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawShips)(_dom_js__WEBPACK_IMPORTED_MODULE_1__.playerCells, player.board, 'player');
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.placementScreen.classList.add('hidden');
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.battlefieldScreen.classList.remove('hidden');
  }
});
enemy.board.addShip(5, '8-4', 'horizontal');
enemy.board.addShip(4, '2-6', 'vertical');

// drawShips(enemyCells, enemy.board, 'computer');

const showGameOver = function () {
  _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverMessage.classList.remove('won', 'lost');
  if (player.board.isAllShipsSunk()) {
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverMessage.textContent = 'You lost!';
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverMessage.classList.add('lost');
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverScreen.classList.remove('hidden');
  } else if (enemy.board.isAllShipsSunk()) {
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverMessage.textContent = 'Victory!';
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverMessage.classList.add('won');
    _dom_js__WEBPACK_IMPORTED_MODULE_1__.gameOverScreen.classList.remove('hidden');
  }
};
_dom_js__WEBPACK_IMPORTED_MODULE_1__.enemyGrid.addEventListener('click', e => {
  const coord = e.target.dataset.position;
  if (!e.target.classList.contains('cell')) return;
  if (enemy.board.isHit(coord)) return;
  player.attack(coord);
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawHits)(enemy.board, 'computer');
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawMissed)(enemy.board, 'computer');
  showGameOver();
  enemy.randomAttack();
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawHits)(player.board, 'player');
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.drawMissed)(player.board, 'player');
  showGameOver();
});

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");

class Gameboard {
  constructor(length) {
    this.length = length;
    this.cells = this.buildBoard();
    this.ships = [];
    this.missedShots = [];
    this.occupiedCells = [];
    this.receivedHits = [];
  }
  buildBoard() {
    const board = new Map();
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        const coord = `${i}-${j}`;
        board.set(coord, {
          ship: null,
          isHit: false
        });
      }
    }
    return board;
  }
  getShip(coords) {
    return this.cells.get(coords).ship;
  }
  isHit(coords) {
    return this.cells.get(coords).isHit;
  }
  shipCanBeAdded(length, coords, orientation) {
    const cellsToCover = [];
    const startingCellCoords = coords.split('-');
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i += 1) {
        cellsToCover.push(`${startingCellCoords[0]}-${+startingCellCoords[1] + i}`);
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < length; i += 1) {
        cellsToCover.push(`${+startingCellCoords[0] + i}-${startingCellCoords[1]}`);
      }
    }
    return {
      cellsToCover,
      valid: cellsToCover.every(key => this.cells.has(key) && this.cells.get(key).ship === null)
    };
  }
  addShip(length, coords, orientation) {
    const {
      cellsToCover,
      valid
    } = this.shipCanBeAdded(length, coords, orientation);
    if (!valid) return false;
    const shipToAdd = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](length);
    this.ships.push(shipToAdd);
    cellsToCover.forEach(cell => {
      this.occupiedCells.push(cell);
      this.cells.get(cell).ship = shipToAdd;
    });
    return true;
  }
  receiveAttack(coords) {
    const cell = this.cells.get(coords);
    cell.isHit = true;
    if (cell.ship === null) {
      this.missedShots.push(coords);
    } else {
      cell.ship.hit();
      this.receivedHits.push(coords);
    }
  }
  isAllShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _possibleMoves = /*#__PURE__*/new WeakMap();
class Player {
  constructor() {
    _classPrivateFieldInitSpec(this, _possibleMoves, {
      writable: true,
      value: (() => {
        const arr = [];
        for (let i = 0; i < 10; i += 1) {
          for (let j = 0; j < 10; j += 1) {
            arr.push(`${i}-${j}`);
          }
        }
        return arr;
      })()
    });
    this.board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"](10);
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
    if (_classPrivateFieldGet(this, _possibleMoves).length === 0) return;
    const randIndex = Math.floor(Math.random() * _classPrivateFieldGet(this, _possibleMoves).length);
    const randAttackCoords = _classPrivateFieldGet(this, _possibleMoves).splice(randIndex, 1);
    this.attack(randAttackCoords[0]);
  }
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits >= this.length;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/normalize.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/normalize.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --indigo-7: #4263eb;\n  --grape-7: #ae3ec9;\n  --gray-9: #212529;\n  --gray-7: #495057;\n  --gray-0: #f8f9fa;\n  --gray-2: #e9ecef;\n  --gray-3: #dee2e6;\n  --gray-4: #ced4da;\n  --gray-6: #868e96;\n  --font-sans: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;\n  --font-lineheight-3: 1.5;\n  --indigo-3: #91a7ff;\n  --grape-3: #e599f7;\n  --gray-1: #f1f3f5;\n  --gray-8: #343a40;\n  --ease-2: cubic-bezier(.25, 0, .4, 1);\n  --font-weight-9: 900;\n  --font-lineheight-1: 1.25;\n  --font-size-8: 3.5rem;\n  --size-header-1: 20ch;\n  --font-size-6: 2.5rem;\n  --size-header-2: 25ch;\n  --font-size-5: 2rem;\n  --font-size-4: 1.5rem;\n  --font-size-3: 1.25rem;\n  --size-header-3: 35ch;\n  --font-size-2: 1.1rem;\n  --size-1: .25rem;\n  --indigo-2: #bac8ff;\n  --grape-2: #eebefa;\n  --size-2: .5rem;\n  --radius-2: 5px;\n  --size-3: 1rem;\n  --size-10: 5rem;\n  --font-mono: Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace;\n  --border-size-1: 1px;\n  --size-8: 3rem;\n  --size-content-2: 45ch;\n  --size-content-3: 60ch;\n  --font-weight-7: 700;\n  --size-5: 1.5rem;\n  --font-size-0: .75rem;\n  --size-content-1: 20ch;\n  --border-size-2: 2px;\n  --size-fluid-5: clamp(4rem, 5vw, 5rem);\n  --font-size-1: 1rem;\n  --border-size-3: 5px;\n  --size-4: 1.25rem;\n  --red-9: #c92a2a;\n  --red-2: #ffc9c9;\n  --green-9: #2b8a3e;\n  --green-1: #d3f9d8;\n  --blue-5: #339af0;\n  --radius-3: 1rem;\n  --shadow-6: \n    0 -1px 2px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),\n    0 3px 2px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),\n    0 7px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),\n    0 12px 10px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),\n    0 22px 18px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),\n    0 41px 33px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 6%)),\n    0 100px 80px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));\n  --shadow-color: 220 3% 15%;\n  --shadow-strength: 1%;\n}\n:where(html) {\n  --link: var(--indigo-7);\n  --link-visited: var(--grape-7);\n  --text-1: var(--gray-9);\n  --text-2: var(--gray-7);\n  --surface-1: var(--gray-0);\n  --surface-2: var(--gray-2);\n  --surface-3: var(--gray-3);\n  --surface-4: var(--gray-4);\n  --scrollthumb-color: var(--gray-6);\n  -webkit-text-size-adjust: none;\n  accent-color: var(--link);\n  background-color: var(--surface-1);\n  block-size: 100%;\n  caret-color: var(--link);\n  color: var(--text-2);\n  color-scheme: light;\n  font-family: var(--font-sans);\n  line-height: var(--font-lineheight-3);\n  scrollbar-color: var(--scrollthumb-color) transparent;\n}\n@media (dynamic-range: high) {\n  @supports (color(display-p3 0 0.5 1)) {\n    :where(html) {\n      --link: color(display-p3 0 0.5 1);\n      --link-visited: color(display-p3 0.6 0.2 1);\n    }\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :where(html) {\n    --link: var(--indigo-3);\n    --link-visited: var(--grape-3);\n    --text-1: var(--gray-1);\n    --text-2: var(--gray-4);\n    --surface-1: var(--gray-9);\n    --surface-2: var(--gray-8);\n    --surface-3: var(--gray-7);\n    --surface-4: var(--gray-6);\n    color-scheme: dark;\n  }\n}\n:where(h1, h2, h3, h4, h5, h6, dt) {\n  color: var(--text-1);\n}\n:where(a[href]) {\n  color: var(--link);\n}\n:where(a[href]):visited {\n  color: var(--link-visited);\n}\n:focus-visible {\n  outline-color: var(--link);\n}\n@media (prefers-color-scheme: light) {\n  :where(html) {\n    --scrollthumb-color: var(--gray-7);\n  }\n}\n*,\n:after,\n:before {\n  box-sizing: border-box;\n}\n:where(:not(dialog)) {\n  margin: 0;\n}\n:where(:not(fieldset, progress, meter)) {\n  background-origin: border-box;\n  background-repeat: no-repeat;\n  border-style: solid;\n  border-width: 0;\n}\n@media (prefers-reduced-motion: no-preference) {\n  :where(html) {\n    scroll-behavior: smooth;\n  }\n}\n@media (prefers-reduced-motion: no-preference) {\n  :where(:focus-visible) {\n    transition: outline-offset 145ms var(--ease-2);\n  }\n  :where(:not(:active):focus-visible) {\n    transition-duration: 0.25s;\n  }\n}\n:where(:not(:active):focus-visible) {\n  outline-offset: 5px;\n}\n:where(body) {\n  min-block-size: 100%;\n}\n:where(h1, h2, h3, h4, h5, h6) {\n  font-weight: var(--font-weight-9);\n  line-height: var(--font-lineheight-1);\n}\n:where(h1) {\n  font-size: var(--font-size-8);\n  max-inline-size: var(--size-header-1);\n}\n:where(h2) {\n  font-size: var(--font-size-6);\n  max-inline-size: var(--size-header-2);\n}\n:where(h3) {\n  font-size: var(--font-size-5);\n}\n:where(h4) {\n  font-size: var(--font-size-4);\n}\n:where(h5) {\n  font-size: var(--font-size-3);\n}\n:where(h3, h4, h5, h6, dt) {\n  max-inline-size: var(--size-header-3);\n}\n:where(p, ul, ol, dl, h6) {\n  font-size: var(--font-size-2);\n}\n:where(a, u, ins, abbr) {\n  text-underline-offset: 1px;\n}\n@supports (-moz-appearance: none) {\n  :where(a, u, ins, abbr) {\n    text-underline-offset: 2px;\n  }\n}\n:where(a[href], area, button, input, label[for], select, summary, textarea, [tabindex]:not([tabindex*=\"-\"])) {\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  touch-action: manipulation;\n}\n:where(a) {\n  margin-block: calc(var(--size-1) * -1);\n  margin-inline: calc(var(--size-1) * -1);\n  padding-block: var(--size-1);\n  padding-inline: var(--size-1);\n}\n:where(a):where([href]) {\n  text-decoration-color: var(--indigo-2);\n}\n:where(a):where([href]):where(:visited) {\n  text-decoration-color: var(--grape-2);\n}\n:where(a):where(:not(:hover)) {\n  text-decoration: inherit;\n}\n:where(img, svg, video, canvas, audio, iframe, embed, object) {\n  display: block;\n}\n:where(img, svg, video) {\n  block-size: auto;\n  max-inline-size: 100%;\n}\n:where(input, button, textarea, select),\n:where(input[type=\"file\"])::-webkit-file-upload-button {\n  color: inherit;\n  font: inherit;\n  font-size: inherit;\n  letter-spacing: inherit;\n}\n:where(input, textarea) {\n  padding-block: var(--size-1);\n  padding-inline: var(--size-2);\n}\n:where(select) {\n  padding-block: 0.75ch;\n  padding-inline: 1.25ch 0;\n}\n:where(textarea, select, input:not(button, button[type], input[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"])) {\n  background-color: var(--surface-2);\n  border-radius: var(--radius-2);\n}\n@media (prefers-color-scheme: dark) {\n  :where(textarea, select, input:not(button, button[type], input[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"])) {\n    background-color: #171a1c;\n  }\n}\n:where(textarea) {\n  resize: block;\n}\n:where(input[type=\"checkbox\"], input[type=\"radio\"]) {\n  block-size: var(--size-3);\n  inline-size: var(--size-3);\n}\n:where(svg) {\n  stroke: none;\n  fill: currentColor;\n}\n:where(svg):where(:not([fill])) {\n  stroke: currentColor;\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n:where(svg):where(:not([width])) {\n  inline-size: var(--size-10);\n}\n:where(code, kbd, samp, pre) {\n  font-family: var(--font-mono);\n}\n:where(:not(pre) > code, kbd) {\n  white-space: nowrap;\n}\n:where(pre) {\n  max-inline-size: -moz-max-content;\n  max-inline-size: max-content;\n  min-inline-size: 0;\n  white-space: pre;\n}\n:where(:not(pre) > code) {\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n  padding: var(--size-1) var(--size-2);\n}\n:where(kbd, var) {\n  border-color: var(--surface-4);\n  border-radius: var(--radius-2);\n  border-width: var(--border-size-1);\n  padding: var(--size-1) var(--size-2);\n}\n:where(mark) {\n  border-radius: var(--radius-2);\n  padding-inline: var(--size-1);\n}\n:where(ol, ul) {\n  -webkit-padding-start: var(--size-8);\n          padding-inline-start: var(--size-8);\n}\n:where(li) {\n  -webkit-padding-start: var(--size-2);\n          padding-inline-start: var(--size-2);\n}\n:where(li, dd, figcaption) {\n  max-inline-size: var(--size-content-2);\n}\n:where(p) {\n  max-inline-size: var(--size-content-3);\n}\n:where(dt, summary) {\n  font-weight: var(--font-weight-7);\n}\n:where(dt:not(:first-of-type)) {\n  -webkit-margin-before: var(--size-5);\n          margin-block-start: var(--size-5);\n}\n:where(small) {\n  font-size: max(0.5em, var(--font-size-0));\n  max-inline-size: var(--size-content-1);\n}\n:where(hr) {\n  background-color: var(--surface-3);\n  height: var(--border-size-2);\n  margin-block: var(--size-fluid-5);\n}\n:where(figure) {\n  display: grid;\n  gap: var(--size-2);\n  place-items: center;\n}\n:where(figure) > :where(figcaption) {\n  font-size: var(--font-size-1);\n}\n:where(blockquote, :not(blockquote) > cite) {\n  border-inline-start-width: var(--border-size-3);\n}\n:where(blockquote) {\n  display: grid;\n  gap: var(--size-3);\n  max-inline-size: var(--size-content-2);\n  padding-block: var(--size-3);\n  padding-inline: var(--size-4);\n}\n:where(:not(blockquote) > cite) {\n  -webkit-padding-start: var(--size-2);\n          padding-inline-start: var(--size-2);\n}\n:where(summary) {\n  background: var(--surface-3);\n  border-radius: var(--radius-2);\n  margin: calc(var(--size-2) * -1) calc(var(--size-3) * -1);\n  padding: var(--size-2) var(--size-3);\n}\n:where(details) {\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n  padding-block: var(--size-2);\n  padding-inline: var(--size-3);\n}\n:where(details[open] > summary) {\n  border-end-end-radius: 0;\n  border-end-start-radius: 0;\n  margin-bottom: var(--size-2);\n}\n:where(fieldset) {\n  border: var(--border-size-1) solid var(--surface-4);\n  border-radius: var(--radius-2);\n}\n:where(del) {\n  background: var(--red-9);\n  color: var(--red-2);\n}\n:where(ins) {\n  background: var(--green-9);\n  color: var(--green-1);\n}\n:where(abbr) {\n  text-decoration-color: var(--blue-5);\n}\n:where(dialog) {\n  background-color: var(--surface-1);\n  border-radius: var(--radius-3);\n  box-shadow: var(--shadow-6);\n  color: inherit;\n}\n@media (prefers-color-scheme: dark) {\n  :where(dialog) {\n    background-color: var(--surface-2);\n  }\n}\n:where(dialog)::backdrop {\n  -webkit-backdrop-filter: blur(25px);\n          backdrop-filter: blur(25px);\n}\n:where(html[\\:has\\(dialog\\[open\\]\\)]) {\n  overflow: hidden;\n}\n:where(html:has(dialog[open])) {\n  overflow: hidden;\n}\n:where(menu) {\n  display: flex;\n  gap: var(--size-3);\n  -webkit-padding-start: 0;\n          padding-inline-start: 0;\n}\n:where(sup) {\n  font-size: 0.5em;\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --shadow-color: 220 40% 2%;\n    --shadow-strength: 25%;\n  }\n}\n", "",{"version":3,"sources":["<no source>","webpack://./src/normalize.css"],"names":[],"mappings":"AAAA;EAAA,oBAAA;EAAA,mBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,2FAAA;EAAA,yBAAA;EAAA,oBAAA;EAAA,mBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,sCAAA;EAAA,qBAAA;EAAA,0BAAA;EAAA,sBAAA;EAAA,sBAAA;EAAA,sBAAA;EAAA,sBAAA;EAAA,oBAAA;EAAA,sBAAA;EAAA,uBAAA;EAAA,sBAAA;EAAA,sBAAA;EAAA,iBAAA;EAAA,oBAAA;EAAA,mBAAA;EAAA,gBAAA;EAAA,gBAAA;EAAA,eAAA;EAAA,gBAAA;EAAA,iIAAA;EAAA,qBAAA;EAAA,eAAA;EAAA,uBAAA;EAAA,uBAAA;EAAA,qBAAA;EAAA,iBAAA;EAAA,sBAAA;EAAA,uBAAA;EAAA,qBAAA;EAAA,uCAAA;EAAA,oBAAA;EAAA,qBAAA;EAAA,kBAAA;EAAA,iBAAA;EAAA,iBAAA;EAAA,mBAAA;EAAA,mBAAA;EAAA,kBAAA;EAAA,iBAAA;EAAA;;;;;;;mFAAA;EAAA,2BAAA;EAAA;CAAA;ACAA;EACE,uBAAuB;EACvB,8BAA8B;EAC9B,uBAAuB;EACvB,uBAAuB;EACvB,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,kCAAkC;EAClC,8BAA8B;EAC9B,yBAAyB;EACzB,kCAAkC;EAClC,gBAAgB;EAChB,wBAAwB;EACxB,oBAAoB;EACpB,mBAAmB;EACnB,6BAA6B;EAC7B,qCAAqC;EACrC,qDAAqD;AACvD;AACA;EACE;IACE;MACE,iCAAiC;MACjC,2CAA2C;IAC7C;EACF;AACF;AACA;EACE;IACE,uBAAuB;IACvB,8BAA8B;IAC9B,uBAAuB;IACvB,uBAAuB;IACvB,0BAA0B;IAC1B,0BAA0B;IAC1B,0BAA0B;IAC1B,0BAA0B;IAC1B,kBAAkB;EACpB;AACF;AACA;EACE,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE;IACE,kCAAkC;EACpC;AACF;AACA;;;EAGE,sBAAsB;AACxB;AACA;EACE,SAAS;AACX;AACA;EACE,6BAA6B;EAC7B,4BAA4B;EAC5B,mBAAmB;EACnB,eAAe;AACjB;AACA;EACE;IACE,uBAAuB;EACzB;AACF;AACA;EACE;IACE,8CAA8C;EAChD;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;EACE,mBAAmB;AACrB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,iCAAiC;EACjC,qCAAqC;AACvC;AACA;EACE,6BAA6B;EAC7B,qCAAqC;AACvC;AACA;EACE,6BAA6B;EAC7B,qCAAqC;AACvC;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,0BAA0B;AAC5B;AACA;EACE;IACE,0BAA0B;EAC5B;AACF;AACA;EACE,wCAAwC;EACxC,eAAe;EACf,0BAA0B;AAC5B;AACA;EACE,sCAAsC;EACtC,uCAAuC;EACvC,4BAA4B;EAC5B,6BAA6B;AAC/B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,cAAc;AAChB;AACA;EACE,gBAAgB;EAChB,qBAAqB;AACvB;AACA;;EAEE,cAAc;EACd,aAAa;EACb,kBAAkB;EAClB,uBAAuB;AACzB;AACA;EACE,4BAA4B;EAC5B,6BAA6B;AAC/B;AACA;EACE,qBAAqB;EACrB,wBAAwB;AAC1B;AACA;EACE,kCAAkC;EAClC,8BAA8B;AAChC;AACA;EACE;IACE,yBAAyB;EAC3B;AACF;AACA;EACE,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,0BAA0B;AAC5B;AACA;EACE,YAAY;EACZ,kBAAkB;AACpB;AACA;EACE,oBAAoB;EACpB,UAAU;EACV,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,mBAAmB;AACrB;AACA;EACE,iCAA4B;EAA5B,4BAA4B;EAC5B,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,4BAA4B;EAC5B,8BAA8B;EAC9B,oCAAoC;AACtC;AACA;EACE,8BAA8B;EAC9B,8BAA8B;EAC9B,kCAAkC;EAClC,oCAAoC;AACtC;AACA;EACE,8BAA8B;EAC9B,6BAA6B;AAC/B;AACA;EACE,oCAAmC;UAAnC,mCAAmC;AACrC;AACA;EACE,oCAAmC;UAAnC,mCAAmC;AACrC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,oCAAiC;UAAjC,iCAAiC;AACnC;AACA;EACE,yCAAyC;EACzC,sCAAsC;AACxC;AACA;EACE,kCAAkC;EAClC,4BAA4B;EAC5B,iCAAiC;AACnC;AACA;EACE,aAAa;EACb,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,+CAA+C;AACjD;AACA;EACE,aAAa;EACb,kBAAkB;EAClB,sCAAsC;EACtC,4BAA4B;EAC5B,6BAA6B;AAC/B;AACA;EACE,oCAAmC;UAAnC,mCAAmC;AACrC;AACA;EACE,4BAA4B;EAC5B,8BAA8B;EAC9B,yDAAyD;EACzD,oCAAoC;AACtC;AACA;EACE,4BAA4B;EAC5B,8BAA8B;EAC9B,4BAA4B;EAC5B,6BAA6B;AAC/B;AACA;EACE,wBAAwB;EACxB,0BAA0B;EAC1B,4BAA4B;AAC9B;AACA;EACE,mDAAmD;EACnD,8BAA8B;AAChC;AACA;EACE,wBAAwB;EACxB,mBAAmB;AACrB;AACA;EACE,0BAA0B;EAC1B,qBAAqB;AACvB;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;EAClC,8BAA8B;EAC9B,2BAA2B;EAC3B,cAAc;AAChB;AACA;EACE;IACE,kCAAkC;EACpC;AACF;AACA;EACE,mCAA2B;UAA3B,2BAA2B;AAC7B;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,kBAAkB;EAClB,wBAAuB;UAAvB,uBAAuB;AACzB;AACA;EACE,gBAAgB;AAClB;AD3UA;EAAA;IAAA,2BAAA;IAAA;GAAA;CAAA","sourcesContent":[null,":where(html) {\n  --link: var(--indigo-7);\n  --link-visited: var(--grape-7);\n  --text-1: var(--gray-9);\n  --text-2: var(--gray-7);\n  --surface-1: var(--gray-0);\n  --surface-2: var(--gray-2);\n  --surface-3: var(--gray-3);\n  --surface-4: var(--gray-4);\n  --scrollthumb-color: var(--gray-6);\n  -webkit-text-size-adjust: none;\n  accent-color: var(--link);\n  background-color: var(--surface-1);\n  block-size: 100%;\n  caret-color: var(--link);\n  color: var(--text-2);\n  color-scheme: light;\n  font-family: var(--font-sans);\n  line-height: var(--font-lineheight-3);\n  scrollbar-color: var(--scrollthumb-color) transparent;\n}\n@media (dynamic-range: high) {\n  @supports (color(display-p3 0 0.5 1)) {\n    :where(html) {\n      --link: color(display-p3 0 0.5 1);\n      --link-visited: color(display-p3 0.6 0.2 1);\n    }\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :where(html) {\n    --link: var(--indigo-3);\n    --link-visited: var(--grape-3);\n    --text-1: var(--gray-1);\n    --text-2: var(--gray-4);\n    --surface-1: var(--gray-9);\n    --surface-2: var(--gray-8);\n    --surface-3: var(--gray-7);\n    --surface-4: var(--gray-6);\n    color-scheme: dark;\n  }\n}\n:where(h1, h2, h3, h4, h5, h6, dt) {\n  color: var(--text-1);\n}\n:where(a[href]) {\n  color: var(--link);\n}\n:where(a[href]):visited {\n  color: var(--link-visited);\n}\n:focus-visible {\n  outline-color: var(--link);\n}\n@media (prefers-color-scheme: light) {\n  :where(html) {\n    --scrollthumb-color: var(--gray-7);\n  }\n}\n*,\n:after,\n:before {\n  box-sizing: border-box;\n}\n:where(:not(dialog)) {\n  margin: 0;\n}\n:where(:not(fieldset, progress, meter)) {\n  background-origin: border-box;\n  background-repeat: no-repeat;\n  border-style: solid;\n  border-width: 0;\n}\n@media (prefers-reduced-motion: no-preference) {\n  :where(html) {\n    scroll-behavior: smooth;\n  }\n}\n@media (prefers-reduced-motion: no-preference) {\n  :where(:focus-visible) {\n    transition: outline-offset 145ms var(--ease-2);\n  }\n  :where(:not(:active):focus-visible) {\n    transition-duration: 0.25s;\n  }\n}\n:where(:not(:active):focus-visible) {\n  outline-offset: 5px;\n}\n:where(body) {\n  min-block-size: 100%;\n}\n:where(h1, h2, h3, h4, h5, h6) {\n  font-weight: var(--font-weight-9);\n  line-height: var(--font-lineheight-1);\n}\n:where(h1) {\n  font-size: var(--font-size-8);\n  max-inline-size: var(--size-header-1);\n}\n:where(h2) {\n  font-size: var(--font-size-6);\n  max-inline-size: var(--size-header-2);\n}\n:where(h3) {\n  font-size: var(--font-size-5);\n}\n:where(h4) {\n  font-size: var(--font-size-4);\n}\n:where(h5) {\n  font-size: var(--font-size-3);\n}\n:where(h3, h4, h5, h6, dt) {\n  max-inline-size: var(--size-header-3);\n}\n:where(p, ul, ol, dl, h6) {\n  font-size: var(--font-size-2);\n}\n:where(a, u, ins, abbr) {\n  text-underline-offset: 1px;\n}\n@supports (-moz-appearance: none) {\n  :where(a, u, ins, abbr) {\n    text-underline-offset: 2px;\n  }\n}\n:where(a[href], area, button, input, label[for], select, summary, textarea, [tabindex]:not([tabindex*=\"-\"])) {\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  touch-action: manipulation;\n}\n:where(a) {\n  margin-block: calc(var(--size-1) * -1);\n  margin-inline: calc(var(--size-1) * -1);\n  padding-block: var(--size-1);\n  padding-inline: var(--size-1);\n}\n:where(a):where([href]) {\n  text-decoration-color: var(--indigo-2);\n}\n:where(a):where([href]):where(:visited) {\n  text-decoration-color: var(--grape-2);\n}\n:where(a):where(:not(:hover)) {\n  text-decoration: inherit;\n}\n:where(img, svg, video, canvas, audio, iframe, embed, object) {\n  display: block;\n}\n:where(img, svg, video) {\n  block-size: auto;\n  max-inline-size: 100%;\n}\n:where(input, button, textarea, select),\n:where(input[type=\"file\"])::-webkit-file-upload-button {\n  color: inherit;\n  font: inherit;\n  font-size: inherit;\n  letter-spacing: inherit;\n}\n:where(input, textarea) {\n  padding-block: var(--size-1);\n  padding-inline: var(--size-2);\n}\n:where(select) {\n  padding-block: 0.75ch;\n  padding-inline: 1.25ch 0;\n}\n:where(textarea, select, input:not(button, button[type], input[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"])) {\n  background-color: var(--surface-2);\n  border-radius: var(--radius-2);\n}\n@media (prefers-color-scheme: dark) {\n  :where(textarea, select, input:not(button, button[type], input[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"])) {\n    background-color: #171a1c;\n  }\n}\n:where(textarea) {\n  resize: block;\n}\n:where(input[type=\"checkbox\"], input[type=\"radio\"]) {\n  block-size: var(--size-3);\n  inline-size: var(--size-3);\n}\n:where(svg) {\n  stroke: none;\n  fill: currentColor;\n}\n:where(svg):where(:not([fill])) {\n  stroke: currentColor;\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n:where(svg):where(:not([width])) {\n  inline-size: var(--size-10);\n}\n:where(code, kbd, samp, pre) {\n  font-family: var(--font-mono);\n}\n:where(:not(pre) > code, kbd) {\n  white-space: nowrap;\n}\n:where(pre) {\n  max-inline-size: max-content;\n  min-inline-size: 0;\n  white-space: pre;\n}\n:where(:not(pre) > code) {\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n  padding: var(--size-1) var(--size-2);\n}\n:where(kbd, var) {\n  border-color: var(--surface-4);\n  border-radius: var(--radius-2);\n  border-width: var(--border-size-1);\n  padding: var(--size-1) var(--size-2);\n}\n:where(mark) {\n  border-radius: var(--radius-2);\n  padding-inline: var(--size-1);\n}\n:where(ol, ul) {\n  padding-inline-start: var(--size-8);\n}\n:where(li) {\n  padding-inline-start: var(--size-2);\n}\n:where(li, dd, figcaption) {\n  max-inline-size: var(--size-content-2);\n}\n:where(p) {\n  max-inline-size: var(--size-content-3);\n}\n:where(dt, summary) {\n  font-weight: var(--font-weight-7);\n}\n:where(dt:not(:first-of-type)) {\n  margin-block-start: var(--size-5);\n}\n:where(small) {\n  font-size: max(0.5em, var(--font-size-0));\n  max-inline-size: var(--size-content-1);\n}\n:where(hr) {\n  background-color: var(--surface-3);\n  height: var(--border-size-2);\n  margin-block: var(--size-fluid-5);\n}\n:where(figure) {\n  display: grid;\n  gap: var(--size-2);\n  place-items: center;\n}\n:where(figure) > :where(figcaption) {\n  font-size: var(--font-size-1);\n}\n:where(blockquote, :not(blockquote) > cite) {\n  border-inline-start-width: var(--border-size-3);\n}\n:where(blockquote) {\n  display: grid;\n  gap: var(--size-3);\n  max-inline-size: var(--size-content-2);\n  padding-block: var(--size-3);\n  padding-inline: var(--size-4);\n}\n:where(:not(blockquote) > cite) {\n  padding-inline-start: var(--size-2);\n}\n:where(summary) {\n  background: var(--surface-3);\n  border-radius: var(--radius-2);\n  margin: calc(var(--size-2) * -1) calc(var(--size-3) * -1);\n  padding: var(--size-2) var(--size-3);\n}\n:where(details) {\n  background: var(--surface-2);\n  border-radius: var(--radius-2);\n  padding-block: var(--size-2);\n  padding-inline: var(--size-3);\n}\n:where(details[open] > summary) {\n  border-end-end-radius: 0;\n  border-end-start-radius: 0;\n  margin-bottom: var(--size-2);\n}\n:where(fieldset) {\n  border: var(--border-size-1) solid var(--surface-4);\n  border-radius: var(--radius-2);\n}\n:where(del) {\n  background: var(--red-9);\n  color: var(--red-2);\n}\n:where(ins) {\n  background: var(--green-9);\n  color: var(--green-1);\n}\n:where(abbr) {\n  text-decoration-color: var(--blue-5);\n}\n:where(dialog) {\n  background-color: var(--surface-1);\n  border-radius: var(--radius-3);\n  box-shadow: var(--shadow-6);\n  color: inherit;\n}\n@media (prefers-color-scheme: dark) {\n  :where(dialog) {\n    background-color: var(--surface-2);\n  }\n}\n:where(dialog)::backdrop {\n  backdrop-filter: blur(25px);\n}\n:where(html[\\:has\\(dialog\\[open\\]\\)]) {\n  overflow: hidden;\n}\n:where(html:has(dialog[open])) {\n  overflow: hidden;\n}\n:where(menu) {\n  display: flex;\n  gap: var(--size-3);\n  padding-inline-start: 0;\n}\n:where(sup) {\n  font-size: 0.5em;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --size-3: 1rem;\n  --gray-7: #495057;\n  --ratio-square: 1;\n  --gray-8: #343a40;\n  --gray-5: #adb5bd;\n  --green-5: #51cf66;\n  --red-5: #ff6b6b;\n  --radius-3: 1rem;\n  --red-9: #c92a2a;\n  --gray-9: #212529;\n  --font-size-fluid-3: clamp(2rem, 9vw, 3.5rem);\n  --yellow-4: #ffd43b;\n  --red-6: #fa5252;\n  --size-2: .5rem;\n  --teal-9: #087f5b;\n  --teal-0: #e6fcf5;\n  --teal-8: #099268;\n}\n\nbody {\n  position: relative;\n}\n\n.title {\n  text-align: center;\n  max-width: 100%;\n}\n\n.ship-placement {\n  text-align: center;\n  max-width: 50%;\n  margin-inline: auto;\n}\n\n.battlefield {\n  display: flex;\n  flex-direction: column;\n  max-width: 80%;\n  margin-inline: auto;\n  gap: var(--size-3);\n  padding: var(--size-3);\n}\n\n@media only screen and (min-width: 980px) {\n  .battlefield {\n    flex-direction: row;\n  }\n}\n\n.field {\n  flex: 1;\n}\n\n.ship-grid,\n.placement-grid {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  -webkit-margin-before: var(--size-3);\n          margin-block-start: var(--size-3);\n}\n\n.cell {\n  border: 1px solid var(--gray-7);\n  aspect-ratio: var(--ratio-square);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n[data-field=\"computer\"] .cell:hover {\n  background-color: var(--gray-8);\n  cursor: crosshair;\n}\n\n.ship {\n  background-color: var(--gray-5);\n  border-color: var(--gray-5);\n}\n\n.ship-highlight {\n  background-color: var(--green-5);\n  border-color: var(--green-5);\n}\n\n.ship:has(.bullet) {\n  background-color: var(--red-5);\n  border-color: var(--red-5);\n}\n\n.bullet {\n  width: 35%;\n  height: 35%;\n  background-color: var(--gray-5);\n  border-radius: var(--radius-3);\n}\n\n.ship .bullet {\n  background-color: var(--red-9);\n}\n\n.bullet.hit {\n  background-color: var(--red-9);\n}\n\n/* Game Over Page */\n.game-over {\n  background-color: var(--gray-9);\n\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: 100vw;\n  height: 100vh;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.game-over-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: var(--size-3);\n}\n\n.game-result {\n  font-size: var(--font-size-fluid-3);\n}\n\n.game-result.won {\n  color: var(--yellow-4);\n}\n\n.game-result.lost {\n  color: var(--red-6);\n}\n\n.btn-again {\n  padding: var(--size-2) var(--size-3);\n  background-color: var(--teal-9);\n  color: var(--teal-0);\n}\n\n.btn-again:hover {\n  background-color: var(--teal-8);\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["<no source>","webpack://./src/style.css"],"names":[],"mappings":"AAAA;EAAA,eAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA,mBAAA;EAAA,iBAAA;EAAA,iBAAA;EAAA,iBAAA;EAAA,kBAAA;EAAA,8CAAA;EAAA,oBAAA;EAAA,iBAAA;EAAA,gBAAA;EAAA,kBAAA;EAAA,kBAAA;EAAA;CAAA;;ACAA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE;IACE,mBAAmB;EACrB;AACF;;AAEA;EACE,OAAO;AACT;;AAEA;;EAEE,aAAa;EACb,sCAAsC;EACtC,oCAAiC;UAAjC,iCAAiC;AACnC;;AAEA;EACE,+BAA+B;EAC/B,iCAAiC;EACjC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,+BAA+B;EAC/B,iBAAiB;AACnB;;AAEA;EACE,+BAA+B;EAC/B,2BAA2B;AAC7B;;AAEA;EACE,gCAAgC;EAChC,4BAA4B;AAC9B;;AAEA;EACE,8BAA8B;EAC9B,0BAA0B;AAC5B;;AAEA;EACE,UAAU;EACV,WAAW;EACX,+BAA+B;EAC/B,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA,mBAAmB;AACnB;EACE,+BAA+B;;EAE/B,kBAAkB;EAClB,MAAM;EACN,OAAO;;EAEP,YAAY;EACZ,aAAa;;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,oCAAoC;EACpC,+BAA+B;EAC/B,oBAAoB;AACtB;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,aAAa;AACf","sourcesContent":[null,"body {\n  position: relative;\n}\n\n.title {\n  text-align: center;\n  max-width: 100%;\n}\n\n.ship-placement {\n  text-align: center;\n  max-width: 50%;\n  margin-inline: auto;\n}\n\n.battlefield {\n  display: flex;\n  flex-direction: column;\n  max-width: 80%;\n  margin-inline: auto;\n  gap: var(--size-3);\n  padding: var(--size-3);\n}\n\n@media only screen and (min-width: 980px) {\n  .battlefield {\n    flex-direction: row;\n  }\n}\n\n.field {\n  flex: 1;\n}\n\n.ship-grid,\n.placement-grid {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  margin-block-start: var(--size-3);\n}\n\n.cell {\n  border: 1px solid var(--gray-7);\n  aspect-ratio: var(--ratio-square);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n[data-field=\"computer\"] .cell:hover {\n  background-color: var(--gray-8);\n  cursor: crosshair;\n}\n\n.ship {\n  background-color: var(--gray-5);\n  border-color: var(--gray-5);\n}\n\n.ship-highlight {\n  background-color: var(--green-5);\n  border-color: var(--green-5);\n}\n\n.ship:has(.bullet) {\n  background-color: var(--red-5);\n  border-color: var(--red-5);\n}\n\n.bullet {\n  width: 35%;\n  height: 35%;\n  background-color: var(--gray-5);\n  border-radius: var(--radius-3);\n}\n\n.ship .bullet {\n  background-color: var(--red-9);\n}\n\n.bullet.hit {\n  background-color: var(--red-9);\n}\n\n/* Game Over Page */\n.game-over {\n  background-color: var(--gray-9);\n\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: 100vw;\n  height: 100vh;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.game-over-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: var(--size-3);\n}\n\n.game-result {\n  font-size: var(--font-size-fluid-3);\n}\n\n.game-result.won {\n  color: var(--yellow-4);\n}\n\n.game-result.lost {\n  color: var(--red-6);\n}\n\n.btn-again {\n  padding: var(--size-2) var(--size-3);\n  background-color: var(--teal-9);\n  color: var(--teal-0);\n}\n\n.btn-again:hover {\n  background-color: var(--teal-8);\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/normalize.css":
/*!***************************!*\
  !*** ./src/normalize.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize.css */ "./src/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.js */ "./src/game.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sV0FBVyxLQUFLLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxLQUFLLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLE9BQU8sWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1B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QyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0F5QjtBQUNKO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ub3JtYWxpemUuY3NzP2ViNTIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/OTAxMSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaGlwLWdyaWRdJyk7XG5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zaGlwLXBsYWNlbWVudF0nKTtcbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxhY2VtZW50LWdyaWRdJyk7XG5leHBvcnQgY29uc3QgcGxhY2VtZW50TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsYWNlbWVudC1tZXNzYWdlXScpO1xuZXhwb3J0IGNvbnN0IGJ0blJvdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJ0bi1yb3RhdGVdJyk7XG5cbmV4cG9ydCBjb25zdCBiYXR0bGVmaWVsZFNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJhdHRsZWZpZWxkXScpO1xuZXhwb3J0IGNvbnN0IHBsYXllckNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmllbGQ9XCJwbGF5ZXJcIl0gW2RhdGEtcG9zaXRpb25dJyk7XG5leHBvcnQgY29uc3QgZW5lbXlDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZpZWxkPVwiY29tcHV0ZXJcIl0gW2RhdGEtcG9zaXRpb25dJyk7XG5leHBvcnQgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZmllbGQ9XCJjb21wdXRlclwiXSBbZGF0YS1zaGlwLWdyaWRdJyk7XG5leHBvcnQgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1nYW1lLW92ZXJdJyk7XG5leHBvcnQgY29uc3QgZ2FtZU92ZXJNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZ2FtZS1yZXN1bHRdJyk7XG5leHBvcnQgY29uc3QgYnRuUGxheUFnYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYnRuLWFnYWluXScpO1xuXG4vLyBidWlsZCBncmlkc1xuY29uc3QgZ3JpZENlbGwgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGRhdGEtcG9zaXRpb249XCIke3Jvd30tJHtjb2x1bW59XCI+XG4gICAgICA8ZGl2IGRhdGEtYnVsbGV0PVwiJHtyb3d9LSR7Y29sdW1ufVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgO1xufTtcblxuLy8gYnVpbGQgc2hpcCBwbGFjZW1lbnQgZ3JpZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgIHBsYWNlbWVudEdyaWQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBncmlkQ2VsbChpLCBqKSk7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYWNlbWVudC1ncmlkXSBbZGF0YS1wb3NpdGlvbl0nKTtcblxuZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgIGdyaWQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBncmlkQ2VsbChpLCBqKSk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGRyYXdTaGlwcyA9IGZ1bmN0aW9uIChET01DZWxscywgYm9hcmQsIHBsYXllcikge1xuICBET01DZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKSk7XG4gIGJvYXJkLm9jY3VwaWVkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZpZWxkPVwiJHtwbGF5ZXJ9XCJdIFtkYXRhLXBvc2l0aW9uPVwiJHtjZWxsfVwiXWApLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IGZ1bmN0aW9uIChET01DZWxscywgYm9hcmQsIGxlbmd0aCwgY29vcmRzLCBvcmllbnRhdGlvbikge1xuICBET01DZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtaGlnaGxpZ2h0JykpO1xuICBjb25zdCB7IGNlbGxzVG9Db3ZlciwgdmFsaWQgfSA9IGJvYXJkLnNoaXBDYW5CZUFkZGVkKGxlbmd0aCwgY29vcmRzLCBvcmllbnRhdGlvbik7XG4gIGlmICghdmFsaWQpIHJldHVybjtcblxuICBjZWxsc1RvQ292ZXIuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYWNlbWVudC1ncmlkXSBbZGF0YS1wb3NpdGlvbj1cIiR7Y2VsbH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzaGlwLWhpZ2hsaWdodCcpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkcmF3U2hpcHNPblBsYWNlbWVudEdyaWQgPSBmdW5jdGlvbiAoRE9NQ2VsbHMsIGJvYXJkKSB7XG4gIERPTUNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1oaWdobGlnaHQnKSk7XG4gIGJvYXJkLm9jY3VwaWVkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYWNlbWVudC1ncmlkXSBbZGF0YS1wb3NpdGlvbj1cIiR7Y2VsbH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRyYXdNaXNzZWQgPSBmdW5jdGlvbiAoYm9hcmQsIHBsYXllcikge1xuICBpZiAoYm9hcmQubWlzc2VkU2hvdHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGJvYXJkLm1pc3NlZFNob3RzLmZvckVhY2goKGNvb3JkKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZmllbGQ9JHtwbGF5ZXJ9XSBbZGF0YS1idWxsZXQ9XCIke2Nvb3JkfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2J1bGxldCcpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkcmF3SGl0cyA9IGZ1bmN0aW9uIChib2FyZCwgcGxheWVyKSB7XG4gIGlmIChib2FyZC5yZWNlaXZlZEhpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGJvYXJkLnJlY2VpdmVkSGl0cy5mb3JFYWNoKChjb29yZCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZpZWxkPSR7cGxheWVyfV0gW2RhdGEtYnVsbGV0PVwiJHtjb29yZH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdidWxsZXQnLCAnaGl0Jyk7XG4gIH0pO1xufTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXIuanMnO1xuaW1wb3J0IHtcbiAgcGxhY2VtZW50R3JpZCxcbiAgYnRuUm90YXRlLFxuICBwbGFjZW1lbnRDZWxscyxcbiAgaGlnaGxpZ2h0U2hpcCxcbiAgcGxheWVyQ2VsbHMsXG4gIGVuZW15Q2VsbHMsXG4gIGVuZW15R3JpZCxcbiAgZHJhd1NoaXBzLFxuICBkcmF3U2hpcHNPblBsYWNlbWVudEdyaWQsXG4gIGRyYXdNaXNzZWQsXG4gIGRyYXdIaXRzLFxuICBnYW1lT3ZlclNjcmVlbixcbiAgcGxhY2VtZW50U2NyZWVuLFxuICBiYXR0bGVmaWVsZFNjcmVlbixcbiAgZ2FtZU92ZXJNZXNzYWdlLFxuICBidG5QbGF5QWdhaW4sXG59IGZyb20gJy4vZG9tLmpzJztcblxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuY29uc3QgZW5lbXkgPSBuZXcgUGxheWVyKCk7XG5cbnBsYXllci5zZXRPcHBvbmVudChlbmVteSk7XG5lbmVteS5zZXRPcHBvbmVudChwbGF5ZXIpO1xuXG5jb25zdCBzaGlwcyA9IFtcbiAge1xuICAgIHNoaXBOYW1lOiAnQ2FycmllcicsXG4gICAgbGVuZ3RoOiA1LFxuICB9LFxuICB7XG4gICAgc2hpcE5hbWU6ICdCYXR0bGVzaGlwJyxcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIHtcbiAgICBzaGlwTmFtZTogJ0Rlc3Ryb3llcicsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICB7XG4gICAgc2hpcE5hbWU6ICdTdWJtYXJpbmUnLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAge1xuICAgIHNoaXBOYW1lOiAnUGF0cm9sIEJvYXQnLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbl07XG5sZXQgb3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5sZXQgc2hpcEluZGV4ID0gMDtcblxuLy8gY2hhbmdlIG9yaWVudGF0aW9uXG5idG5Sb3RhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIGVsc2Ugb3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG59KTtcblxuLy8gaGlnaGxpZ2h0IHBvc3NpYmxlIHNoaXAgcGxhY2VtZW50XG5wbGFjZW1lbnRHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gIGlmIChzaGlwSW5kZXggPj0gc2hpcHMubGVuZ3RoKSByZXR1cm47XG4gIGhpZ2hsaWdodFNoaXAocGxhY2VtZW50Q2VsbHMsIHBsYXllci5ib2FyZCwgc2hpcHNbc2hpcEluZGV4XS5sZW5ndGgsIGUudGFyZ2V0LmRhdGFzZXQucG9zaXRpb24sIG9yaWVudGF0aW9uKTtcbn0pO1xuXG4vLyBhZGQgdmFsaWQgc2hpcFxucGxhY2VtZW50R3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChzaGlwSW5kZXggPj0gc2hpcHMubGVuZ3RoKSByZXR1cm47XG4gIGNvbnN0IHNoaXBBZGRlZCA9IHBsYXllci5ib2FyZC5hZGRTaGlwKHNoaXBzW3NoaXBJbmRleF0ubGVuZ3RoLCBlLnRhcmdldC5kYXRhc2V0LnBvc2l0aW9uLCBvcmllbnRhdGlvbik7XG4gIGlmICghc2hpcEFkZGVkKSByZXR1cm47XG4gIGRyYXdTaGlwc09uUGxhY2VtZW50R3JpZChwbGFjZW1lbnRDZWxscywgcGxheWVyLmJvYXJkKTtcbiAgc2hpcEluZGV4ICs9IDE7XG4gIGlmIChzaGlwSW5kZXggPT09IHNoaXBzLmxlbmd0aCkge1xuICAgIGRyYXdTaGlwcyhwbGF5ZXJDZWxscywgcGxheWVyLmJvYXJkLCAncGxheWVyJyk7XG4gICAgcGxhY2VtZW50U2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGJhdHRsZWZpZWxkU2NyZWVuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9XG59KTtcblxuZW5lbXkuYm9hcmQuYWRkU2hpcCg1LCAnOC00JywgJ2hvcml6b250YWwnKTtcbmVuZW15LmJvYXJkLmFkZFNoaXAoNCwgJzItNicsICd2ZXJ0aWNhbCcpO1xuXG4vLyBkcmF3U2hpcHMoZW5lbXlDZWxscywgZW5lbXkuYm9hcmQsICdjb21wdXRlcicpO1xuXG5jb25zdCBzaG93R2FtZU92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGdhbWVPdmVyTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCd3b24nLCAnbG9zdCcpO1xuICBpZiAocGxheWVyLmJvYXJkLmlzQWxsU2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UudGV4dENvbnRlbnQgPSAnWW91IGxvc3QhJztcbiAgICBnYW1lT3Zlck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbG9zdCcpO1xuICAgIGdhbWVPdmVyU2NyZWVuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9IGVsc2UgaWYgKGVuZW15LmJvYXJkLmlzQWxsU2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lT3Zlck1lc3NhZ2UudGV4dENvbnRlbnQgPSAnVmljdG9yeSEnO1xuICAgIGdhbWVPdmVyTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCd3b24nKTtcbiAgICBnYW1lT3ZlclNjcmVlbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfVxufTtcblxuZW5lbXlHcmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc3QgY29vcmQgPSBlLnRhcmdldC5kYXRhc2V0LnBvc2l0aW9uO1xuICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSByZXR1cm47XG4gIGlmIChlbmVteS5ib2FyZC5pc0hpdChjb29yZCkpIHJldHVybjtcblxuICBwbGF5ZXIuYXR0YWNrKGNvb3JkKTtcbiAgZHJhd0hpdHMoZW5lbXkuYm9hcmQsICdjb21wdXRlcicpO1xuICBkcmF3TWlzc2VkKGVuZW15LmJvYXJkLCAnY29tcHV0ZXInKTtcbiAgc2hvd0dhbWVPdmVyKCk7XG5cbiAgZW5lbXkucmFuZG9tQXR0YWNrKCk7XG4gIGRyYXdIaXRzKHBsYXllci5ib2FyZCwgJ3BsYXllcicpO1xuICBkcmF3TWlzc2VkKHBsYXllci5ib2FyZCwgJ3BsYXllcicpO1xuICBzaG93R2FtZU92ZXIoKTtcbn0pO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMuYnVpbGRCb2FyZCgpO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgdGhpcy5vY2N1cGllZENlbGxzID0gW107XG4gICAgdGhpcy5yZWNlaXZlZEhpdHMgPSBbXTtcbiAgfVxuXG4gIGJ1aWxkQm9hcmQoKSB7XG4gICAgY29uc3QgYm9hcmQgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBgJHtpfS0ke2p9YDtcbiAgICAgICAgYm9hcmQuc2V0KGNvb3JkLCB7XG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgICBpc0hpdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib2FyZDtcbiAgfVxuXG4gIGdldFNoaXAoY29vcmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2VsbHMuZ2V0KGNvb3Jkcykuc2hpcDtcbiAgfVxuXG4gIGlzSGl0KGNvb3Jkcykge1xuICAgIHJldHVybiB0aGlzLmNlbGxzLmdldChjb29yZHMpLmlzSGl0O1xuICB9XG5cbiAgc2hpcENhbkJlQWRkZWQobGVuZ3RoLCBjb29yZHMsIG9yaWVudGF0aW9uKSB7XG4gICAgY29uc3QgY2VsbHNUb0NvdmVyID0gW107XG4gICAgY29uc3Qgc3RhcnRpbmdDZWxsQ29vcmRzID0gY29vcmRzLnNwbGl0KCctJyk7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2VsbHNUb0NvdmVyLnB1c2goYCR7c3RhcnRpbmdDZWxsQ29vcmRzWzBdfS0keytzdGFydGluZ0NlbGxDb29yZHNbMV0gKyBpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2VsbHNUb0NvdmVyLnB1c2goYCR7K3N0YXJ0aW5nQ2VsbENvb3Jkc1swXSArIGl9LSR7c3RhcnRpbmdDZWxsQ29vcmRzWzFdfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjZWxsc1RvQ292ZXIsXG4gICAgICB2YWxpZDogY2VsbHNUb0NvdmVyLmV2ZXJ5KChrZXkpID0+IHRoaXMuY2VsbHMuaGFzKGtleSkgJiYgdGhpcy5jZWxscy5nZXQoa2V5KS5zaGlwID09PSBudWxsKSxcbiAgICB9O1xuICB9XG5cbiAgYWRkU2hpcChsZW5ndGgsIGNvb3Jkcywgb3JpZW50YXRpb24pIHtcbiAgICBjb25zdCB7IGNlbGxzVG9Db3ZlciwgdmFsaWQgfSA9IHRoaXMuc2hpcENhbkJlQWRkZWQobGVuZ3RoLCBjb29yZHMsIG9yaWVudGF0aW9uKTtcbiAgICBpZiAoIXZhbGlkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBzaGlwVG9BZGQgPSBuZXcgU2hpcChsZW5ndGgpO1xuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwVG9BZGQpO1xuICAgIGNlbGxzVG9Db3Zlci5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICB0aGlzLm9jY3VwaWVkQ2VsbHMucHVzaChjZWxsKTtcbiAgICAgIHRoaXMuY2VsbHMuZ2V0KGNlbGwpLnNoaXAgPSBzaGlwVG9BZGQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNlbGxzLmdldChjb29yZHMpO1xuICAgIGNlbGwuaXNIaXQgPSB0cnVlO1xuICAgIGlmIChjZWxsLnNoaXAgPT09IG51bGwpIHtcbiAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsLnNoaXAuaGl0KCk7XG4gICAgICB0aGlzLnJlY2VpdmVkSGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgfVxuICB9XG5cbiAgaXNBbGxTaGlwc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuICB9XG59XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgI3Bvc3NpYmxlTW92ZXMgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGFyci5wdXNoKGAke2l9LSR7an1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfSkoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgxMCk7XG4gICAgdGhpcy5vcHBvbmVudCA9IG51bGw7XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gIH1cblxuICBzZXRPcHBvbmVudChvcHBvbmVudCkge1xuICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudDtcbiAgfVxuXG4gIGF0dGFjayhjb29yZHMpIHtcbiAgICB0aGlzLm9wcG9uZW50LmJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICB0aGlzLmVuZFR1cm4oKTtcbiAgfVxuXG4gIGVuZFR1cm4oKSB7XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgdGhpcy5vcHBvbmVudC50dXJuID0gdHJ1ZTtcbiAgfVxuXG4gIHJhbmRvbUF0dGFjaygpIHtcbiAgICBpZiAodGhpcy4jcG9zc2libGVNb3Zlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBjb25zdCByYW5kSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLiNwb3NzaWJsZU1vdmVzLmxlbmd0aCk7XG4gICAgY29uc3QgcmFuZEF0dGFja0Nvb3JkcyA9IHRoaXMuI3Bvc3NpYmxlTW92ZXMuc3BsaWNlKHJhbmRJbmRleCwgMSk7XG4gICAgdGhpcy5hdHRhY2socmFuZEF0dGFja0Nvb3Jkc1swXSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1pbmRpZ28tNzogIzQyNjNlYjtcXG4gIC0tZ3JhcGUtNzogI2FlM2VjOTtcXG4gIC0tZ3JheS05OiAjMjEyNTI5O1xcbiAgLS1ncmF5LTc6ICM0OTUwNTc7XFxuICAtLWdyYXktMDogI2Y4ZjlmYTtcXG4gIC0tZ3JheS0yOiAjZTllY2VmO1xcbiAgLS1ncmF5LTM6ICNkZWUyZTY7XFxuICAtLWdyYXktNDogI2NlZDRkYTtcXG4gIC0tZ3JheS02OiAjODY4ZTk2O1xcbiAgLS1mb250LXNhbnM6IHN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLFNlZ29lIFVJLFJvYm90byxVYnVudHUsQ2FudGFyZWxsLE5vdG8gU2FucyxzYW5zLXNlcmlmO1xcbiAgLS1mb250LWxpbmVoZWlnaHQtMzogMS41O1xcbiAgLS1pbmRpZ28tMzogIzkxYTdmZjtcXG4gIC0tZ3JhcGUtMzogI2U1OTlmNztcXG4gIC0tZ3JheS0xOiAjZjFmM2Y1O1xcbiAgLS1ncmF5LTg6ICMzNDNhNDA7XFxuICAtLWVhc2UtMjogY3ViaWMtYmV6aWVyKC4yNSwgMCwgLjQsIDEpO1xcbiAgLS1mb250LXdlaWdodC05OiA5MDA7XFxuICAtLWZvbnQtbGluZWhlaWdodC0xOiAxLjI1O1xcbiAgLS1mb250LXNpemUtODogMy41cmVtO1xcbiAgLS1zaXplLWhlYWRlci0xOiAyMGNoO1xcbiAgLS1mb250LXNpemUtNjogMi41cmVtO1xcbiAgLS1zaXplLWhlYWRlci0yOiAyNWNoO1xcbiAgLS1mb250LXNpemUtNTogMnJlbTtcXG4gIC0tZm9udC1zaXplLTQ6IDEuNXJlbTtcXG4gIC0tZm9udC1zaXplLTM6IDEuMjVyZW07XFxuICAtLXNpemUtaGVhZGVyLTM6IDM1Y2g7XFxuICAtLWZvbnQtc2l6ZS0yOiAxLjFyZW07XFxuICAtLXNpemUtMTogLjI1cmVtO1xcbiAgLS1pbmRpZ28tMjogI2JhYzhmZjtcXG4gIC0tZ3JhcGUtMjogI2VlYmVmYTtcXG4gIC0tc2l6ZS0yOiAuNXJlbTtcXG4gIC0tcmFkaXVzLTI6IDVweDtcXG4gIC0tc2l6ZS0zOiAxcmVtO1xcbiAgLS1zaXplLTEwOiA1cmVtO1xcbiAgLS1mb250LW1vbm86IERhbmsgTW9ubyxPcGVyYXRvciBNb25vLEluY29uc29sYXRhLEZpcmEgTW9ubyx1aS1tb25vc3BhY2UsU0YgTW9ubyxNb25hY28sRHJvaWQgU2FucyBNb25vLFNvdXJjZSBDb2RlIFBybyxtb25vc3BhY2U7XFxuICAtLWJvcmRlci1zaXplLTE6IDFweDtcXG4gIC0tc2l6ZS04OiAzcmVtO1xcbiAgLS1zaXplLWNvbnRlbnQtMjogNDVjaDtcXG4gIC0tc2l6ZS1jb250ZW50LTM6IDYwY2g7XFxuICAtLWZvbnQtd2VpZ2h0LTc6IDcwMDtcXG4gIC0tc2l6ZS01OiAxLjVyZW07XFxuICAtLWZvbnQtc2l6ZS0wOiAuNzVyZW07XFxuICAtLXNpemUtY29udGVudC0xOiAyMGNoO1xcbiAgLS1ib3JkZXItc2l6ZS0yOiAycHg7XFxuICAtLXNpemUtZmx1aWQtNTogY2xhbXAoNHJlbSwgNXZ3LCA1cmVtKTtcXG4gIC0tZm9udC1zaXplLTE6IDFyZW07XFxuICAtLWJvcmRlci1zaXplLTM6IDVweDtcXG4gIC0tc2l6ZS00OiAxLjI1cmVtO1xcbiAgLS1yZWQtOTogI2M5MmEyYTtcXG4gIC0tcmVkLTI6ICNmZmM5Yzk7XFxuICAtLWdyZWVuLTk6ICMyYjhhM2U7XFxuICAtLWdyZWVuLTE6ICNkM2Y5ZDg7XFxuICAtLWJsdWUtNTogIzMzOWFmMDtcXG4gIC0tcmFkaXVzLTM6IDFyZW07XFxuICAtLXNoYWRvdy02OiBcXG4gICAgMCAtMXB4IDJweCAwIGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgMiUpKSxcXG4gICAgMCAzcHggMnB4IC0ycHggaHNsKHZhcigtLXNoYWRvdy1jb2xvcikgLyBjYWxjKHZhcigtLXNoYWRvdy1zdHJlbmd0aCkgKyAzJSkpLFxcbiAgICAwIDdweCA1cHggLTJweCBoc2wodmFyKC0tc2hhZG93LWNvbG9yKSAvIGNhbGModmFyKC0tc2hhZG93LXN0cmVuZ3RoKSArIDMlKSksXFxuICAgIDAgMTJweCAxMHB4IC0ycHggaHNsKHZhcigtLXNoYWRvdy1jb2xvcikgLyBjYWxjKHZhcigtLXNoYWRvdy1zdHJlbmd0aCkgKyA0JSkpLFxcbiAgICAwIDIycHggMThweCAtMnB4IGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgNSUpKSxcXG4gICAgMCA0MXB4IDMzcHggLTJweCBoc2wodmFyKC0tc2hhZG93LWNvbG9yKSAvIGNhbGModmFyKC0tc2hhZG93LXN0cmVuZ3RoKSArIDYlKSksXFxuICAgIDAgMTAwcHggODBweCAtMnB4IGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgNyUpKTtcXG4gIC0tc2hhZG93LWNvbG9yOiAyMjAgMyUgMTUlO1xcbiAgLS1zaGFkb3ctc3RyZW5ndGg6IDElO1xcbn1cXG46d2hlcmUoaHRtbCkge1xcbiAgLS1saW5rOiB2YXIoLS1pbmRpZ28tNyk7XFxuICAtLWxpbmstdmlzaXRlZDogdmFyKC0tZ3JhcGUtNyk7XFxuICAtLXRleHQtMTogdmFyKC0tZ3JheS05KTtcXG4gIC0tdGV4dC0yOiB2YXIoLS1ncmF5LTcpO1xcbiAgLS1zdXJmYWNlLTE6IHZhcigtLWdyYXktMCk7XFxuICAtLXN1cmZhY2UtMjogdmFyKC0tZ3JheS0yKTtcXG4gIC0tc3VyZmFjZS0zOiB2YXIoLS1ncmF5LTMpO1xcbiAgLS1zdXJmYWNlLTQ6IHZhcigtLWdyYXktNCk7XFxuICAtLXNjcm9sbHRodW1iLWNvbG9yOiB2YXIoLS1ncmF5LTYpO1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgYWNjZW50LWNvbG9yOiB2YXIoLS1saW5rKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMSk7XFxuICBibG9jay1zaXplOiAxMDAlO1xcbiAgY2FyZXQtY29sb3I6IHZhcigtLWxpbmspO1xcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtc2Fucyk7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tZm9udC1saW5laGVpZ2h0LTMpO1xcbiAgc2Nyb2xsYmFyLWNvbG9yOiB2YXIoLS1zY3JvbGx0aHVtYi1jb2xvcikgdHJhbnNwYXJlbnQ7XFxufVxcbkBtZWRpYSAoZHluYW1pYy1yYW5nZTogaGlnaCkge1xcbiAgQHN1cHBvcnRzIChjb2xvcihkaXNwbGF5LXAzIDAgMC41IDEpKSB7XFxuICAgIDp3aGVyZShodG1sKSB7XFxuICAgICAgLS1saW5rOiBjb2xvcihkaXNwbGF5LXAzIDAgMC41IDEpO1xcbiAgICAgIC0tbGluay12aXNpdGVkOiBjb2xvcihkaXNwbGF5LXAzIDAuNiAwLjIgMSk7XFxuICAgIH1cXG4gIH1cXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgOndoZXJlKGh0bWwpIHtcXG4gICAgLS1saW5rOiB2YXIoLS1pbmRpZ28tMyk7XFxuICAgIC0tbGluay12aXNpdGVkOiB2YXIoLS1ncmFwZS0zKTtcXG4gICAgLS10ZXh0LTE6IHZhcigtLWdyYXktMSk7XFxuICAgIC0tdGV4dC0yOiB2YXIoLS1ncmF5LTQpO1xcbiAgICAtLXN1cmZhY2UtMTogdmFyKC0tZ3JheS05KTtcXG4gICAgLS1zdXJmYWNlLTI6IHZhcigtLWdyYXktOCk7XFxuICAgIC0tc3VyZmFjZS0zOiB2YXIoLS1ncmF5LTcpO1xcbiAgICAtLXN1cmZhY2UtNDogdmFyKC0tZ3JheS02KTtcXG4gICAgY29sb3Itc2NoZW1lOiBkYXJrO1xcbiAgfVxcbn1cXG46d2hlcmUoaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgZHQpIHtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xcbn1cXG46d2hlcmUoYVtocmVmXSkge1xcbiAgY29sb3I6IHZhcigtLWxpbmspO1xcbn1cXG46d2hlcmUoYVtocmVmXSk6dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tbGluay12aXNpdGVkKTtcXG59XFxuOmZvY3VzLXZpc2libGUge1xcbiAgb3V0bGluZS1jb2xvcjogdmFyKC0tbGluayk7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICAtLXNjcm9sbHRodW1iLWNvbG9yOiB2YXIoLS1ncmF5LTcpO1xcbiAgfVxcbn1cXG4qLFxcbjphZnRlcixcXG46YmVmb3JlIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbjp3aGVyZSg6bm90KGRpYWxvZykpIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuOndoZXJlKDpub3QoZmllbGRzZXQsIHByb2dyZXNzLCBtZXRlcikpIHtcXG4gIGJhY2tncm91bmQtb3JpZ2luOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDA7XFxufVxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogbm8tcHJlZmVyZW5jZSkge1xcbiAgOndoZXJlKGh0bWwpIHtcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxuICB9XFxufVxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogbm8tcHJlZmVyZW5jZSkge1xcbiAgOndoZXJlKDpmb2N1cy12aXNpYmxlKSB7XFxuICAgIHRyYW5zaXRpb246IG91dGxpbmUtb2Zmc2V0IDE0NW1zIHZhcigtLWVhc2UtMik7XFxuICB9XFxuICA6d2hlcmUoOm5vdCg6YWN0aXZlKTpmb2N1cy12aXNpYmxlKSB7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMjVzO1xcbiAgfVxcbn1cXG46d2hlcmUoOm5vdCg6YWN0aXZlKTpmb2N1cy12aXNpYmxlKSB7XFxuICBvdXRsaW5lLW9mZnNldDogNXB4O1xcbn1cXG46d2hlcmUoYm9keSkge1xcbiAgbWluLWJsb2NrLXNpemU6IDEwMCU7XFxufVxcbjp3aGVyZShoMSwgaDIsIGgzLCBoNCwgaDUsIGg2KSB7XFxuICBmb250LXdlaWdodDogdmFyKC0tZm9udC13ZWlnaHQtOSk7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tZm9udC1saW5laGVpZ2h0LTEpO1xcbn1cXG46d2hlcmUoaDEpIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTgpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0xKTtcXG59XFxuOndoZXJlKGgyKSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS02KTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1oZWFkZXItMik7XFxufVxcbjp3aGVyZShoMykge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtNSk7XFxufVxcbjp3aGVyZShoNCkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtNCk7XFxufVxcbjp3aGVyZShoNSkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMyk7XFxufVxcbjp3aGVyZShoMywgaDQsIGg1LCBoNiwgZHQpIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1oZWFkZXItMyk7XFxufVxcbjp3aGVyZShwLCB1bCwgb2wsIGRsLCBoNikge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMik7XFxufVxcbjp3aGVyZShhLCB1LCBpbnMsIGFiYnIpIHtcXG4gIHRleHQtdW5kZXJsaW5lLW9mZnNldDogMXB4O1xcbn1cXG5Ac3VwcG9ydHMgKC1tb3otYXBwZWFyYW5jZTogbm9uZSkge1xcbiAgOndoZXJlKGEsIHUsIGlucywgYWJicikge1xcbiAgICB0ZXh0LXVuZGVybGluZS1vZmZzZXQ6IDJweDtcXG4gIH1cXG59XFxuOndoZXJlKGFbaHJlZl0sIGFyZWEsIGJ1dHRvbiwgaW5wdXQsIGxhYmVsW2Zvcl0sIHNlbGVjdCwgc3VtbWFyeSwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleCo9XFxcIi1cXFwiXSkpIHtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcXG59XFxuOndoZXJlKGEpIHtcXG4gIG1hcmdpbi1ibG9jazogY2FsYyh2YXIoLS1zaXplLTEpICogLTEpO1xcbiAgbWFyZ2luLWlubGluZTogY2FsYyh2YXIoLS1zaXplLTEpICogLTEpO1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0xKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTEpO1xcbn1cXG46d2hlcmUoYSk6d2hlcmUoW2hyZWZdKSB7XFxuICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLWluZGlnby0yKTtcXG59XFxuOndoZXJlKGEpOndoZXJlKFtocmVmXSk6d2hlcmUoOnZpc2l0ZWQpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tZ3JhcGUtMik7XFxufVxcbjp3aGVyZShhKTp3aGVyZSg6bm90KDpob3ZlcikpIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG59XFxuOndoZXJlKGltZywgc3ZnLCB2aWRlbywgY2FudmFzLCBhdWRpbywgaWZyYW1lLCBlbWJlZCwgb2JqZWN0KSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuOndoZXJlKGltZywgc3ZnLCB2aWRlbykge1xcbiAgYmxvY2stc2l6ZTogYXV0bztcXG4gIG1heC1pbmxpbmUtc2l6ZTogMTAwJTtcXG59XFxuOndoZXJlKGlucHV0LCBidXR0b24sIHRleHRhcmVhLCBzZWxlY3QpLFxcbjp3aGVyZShpbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl0pOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBsZXR0ZXItc3BhY2luZzogaW5oZXJpdDtcXG59XFxuOndoZXJlKGlucHV0LCB0ZXh0YXJlYSkge1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0xKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUoc2VsZWN0KSB7XFxuICBwYWRkaW5nLWJsb2NrOiAwLjc1Y2g7XFxuICBwYWRkaW5nLWlubGluZTogMS4yNWNoIDA7XFxufVxcbjp3aGVyZSh0ZXh0YXJlYSwgc2VsZWN0LCBpbnB1dDpub3QoYnV0dG9uLCBidXR0b25bdHlwZV0sIGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCBpbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSkpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gIDp3aGVyZSh0ZXh0YXJlYSwgc2VsZWN0LCBpbnB1dDpub3QoYnV0dG9uLCBidXR0b25bdHlwZV0sIGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCBpbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSkpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE3MWExYztcXG4gIH1cXG59XFxuOndoZXJlKHRleHRhcmVhKSB7XFxuICByZXNpemU6IGJsb2NrO1xcbn1cXG46d2hlcmUoaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSkge1xcbiAgYmxvY2stc2l6ZTogdmFyKC0tc2l6ZS0zKTtcXG4gIGlubGluZS1zaXplOiB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoc3ZnKSB7XFxuICBzdHJva2U6IG5vbmU7XFxuICBmaWxsOiBjdXJyZW50Q29sb3I7XFxufVxcbjp3aGVyZShzdmcpOndoZXJlKDpub3QoW2ZpbGxdKSkge1xcbiAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XFxuICBmaWxsOiBub25lO1xcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXG59XFxuOndoZXJlKHN2Zyk6d2hlcmUoOm5vdChbd2lkdGhdKSkge1xcbiAgaW5saW5lLXNpemU6IHZhcigtLXNpemUtMTApO1xcbn1cXG46d2hlcmUoY29kZSwga2JkLCBzYW1wLCBwcmUpIHtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LW1vbm8pO1xcbn1cXG46d2hlcmUoOm5vdChwcmUpID4gY29kZSwga2JkKSB7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG46d2hlcmUocHJlKSB7XFxuICBtYXgtaW5saW5lLXNpemU6IC1tb3otbWF4LWNvbnRlbnQ7XFxuICBtYXgtaW5saW5lLXNpemU6IG1heC1jb250ZW50O1xcbiAgbWluLWlubGluZS1zaXplOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG59XFxuOndoZXJlKDpub3QocHJlKSA+IGNvZGUpIHtcXG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UtMik7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxuICBwYWRkaW5nOiB2YXIoLS1zaXplLTEpIHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShrYmQsIHZhcikge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgYm9yZGVyLXdpZHRoOiB2YXIoLS1ib3JkZXItc2l6ZS0xKTtcXG4gIHBhZGRpbmc6IHZhcigtLXNpemUtMSkgdmFyKC0tc2l6ZS0yKTtcXG59XFxuOndoZXJlKG1hcmspIHtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTEpO1xcbn1cXG46d2hlcmUob2wsIHVsKSB7XFxuICAtd2Via2l0LXBhZGRpbmctc3RhcnQ6IHZhcigtLXNpemUtOCk7XFxuICAgICAgICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTgpO1xcbn1cXG46d2hlcmUobGkpIHtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogdmFyKC0tc2l6ZS0yKTtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShsaSwgZGQsIGZpZ2NhcHRpb24pIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTIpO1xcbn1cXG46d2hlcmUocCkge1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWNvbnRlbnQtMyk7XFxufVxcbjp3aGVyZShkdCwgc3VtbWFyeSkge1xcbiAgZm9udC13ZWlnaHQ6IHZhcigtLWZvbnQtd2VpZ2h0LTcpO1xcbn1cXG46d2hlcmUoZHQ6bm90KDpmaXJzdC1vZi10eXBlKSkge1xcbiAgLXdlYmtpdC1tYXJnaW4tYmVmb3JlOiB2YXIoLS1zaXplLTUpO1xcbiAgICAgICAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IHZhcigtLXNpemUtNSk7XFxufVxcbjp3aGVyZShzbWFsbCkge1xcbiAgZm9udC1zaXplOiBtYXgoMC41ZW0sIHZhcigtLWZvbnQtc2l6ZS0wKSk7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtY29udGVudC0xKTtcXG59XFxuOndoZXJlKGhyKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ib3JkZXItc2l6ZS0yKTtcXG4gIG1hcmdpbi1ibG9jazogdmFyKC0tc2l6ZS1mbHVpZC01KTtcXG59XFxuOndoZXJlKGZpZ3VyZSkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0yKTtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcbjp3aGVyZShmaWd1cmUpID4gOndoZXJlKGZpZ2NhcHRpb24pIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTEpO1xcbn1cXG46d2hlcmUoYmxvY2txdW90ZSwgOm5vdChibG9ja3F1b3RlKSA+IGNpdGUpIHtcXG4gIGJvcmRlci1pbmxpbmUtc3RhcnQtd2lkdGg6IHZhcigtLWJvcmRlci1zaXplLTMpO1xcbn1cXG46d2hlcmUoYmxvY2txdW90ZSkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0zKTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTIpO1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0zKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTQpO1xcbn1cXG46d2hlcmUoOm5vdChibG9ja3F1b3RlKSA+IGNpdGUpIHtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogdmFyKC0tc2l6ZS0yKTtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzdW1tYXJ5KSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgbWFyZ2luOiBjYWxjKHZhcigtLXNpemUtMikgKiAtMSkgY2FsYyh2YXIoLS1zaXplLTMpICogLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0yKSB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoZGV0YWlscykge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctYmxvY2s6IHZhcigtLXNpemUtMik7XFxuICBwYWRkaW5nLWlubGluZTogdmFyKC0tc2l6ZS0zKTtcXG59XFxuOndoZXJlKGRldGFpbHNbb3Blbl0gPiBzdW1tYXJ5KSB7XFxuICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IDA7XFxuICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogMDtcXG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShmaWVsZHNldCkge1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXItc2l6ZS0xKSBzb2xpZCB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbn1cXG46d2hlcmUoZGVsKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1yZWQtOSk7XFxuICBjb2xvcjogdmFyKC0tcmVkLTIpO1xcbn1cXG46d2hlcmUoaW5zKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi05KTtcXG4gIGNvbG9yOiB2YXIoLS1ncmVlbi0xKTtcXG59XFxuOndoZXJlKGFiYnIpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tYmx1ZS01KTtcXG59XFxuOndoZXJlKGRpYWxvZykge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy02KTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoZGlhbG9nKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICB9XFxufVxcbjp3aGVyZShkaWFsb2cpOjpiYWNrZHJvcCB7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigyNXB4KTtcXG4gICAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDI1cHgpO1xcbn1cXG46d2hlcmUoaHRtbFtcXFxcOmhhc1xcXFwoZGlhbG9nXFxcXFtvcGVuXFxcXF1cXFxcKV0pIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbjp3aGVyZShodG1sOmhhcyhkaWFsb2dbb3Blbl0pKSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG46d2hlcmUobWVudSkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0zKTtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogMDtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XFxufVxcbjp3aGVyZShzdXApIHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gIDpyb290IHtcXG4gICAgLS1zaGFkb3ctY29sb3I6IDIyMCA0MCUgMiU7XFxuICAgIC0tc2hhZG93LXN0cmVuZ3RoOiAyNSU7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIjxubyBzb3VyY2U+XCIsXCJ3ZWJwYWNrOi8vLi9zcmMvbm9ybWFs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d0JBQXVCO1VBQXZCLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FEM1VBO0VBQUE7SUFBQSwyQkFBQTtJQUFBO0dBQUE7Q0FBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbCxcIjp3aGVyZShodG1sKSB7XFxuICAtLWxpbms6IHZhcigtLWluZGlnby03KTtcXG4gIC0tbGluay12aXNpdGVkOiB2YXIoLS1ncmFwZS03KTtcXG4gIC0tdGV4dC0xOiB2YXIoLS1ncmF5LTkpO1xcbiAgLS10ZXh0LTI6IHZhcigtLWdyYXktNyk7XFxuICAtLXN1cmZhY2UtMTogdmFyKC0tZ3JheS0wKTtcXG4gIC0tc3VyZmFjZS0yOiB2YXIoLS1ncmF5LTIpO1xcbiAgLS1zdXJmYWNlLTM6IHZhcigtLWdyYXktMyk7XFxuICAtLXN1cmZhY2UtNDogdmFyKC0tZ3JheS00KTtcXG4gIC0tc2Nyb2xsdGh1bWItY29sb3I6IHZhcigtLWdyYXktNik7XFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICBhY2NlbnQtY29sb3I6IHZhcigtLWxpbmspO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJsb2NrLXNpemU6IDEwMCU7XFxuICBjYXJldC1jb2xvcjogdmFyKC0tbGluayk7XFxuICBjb2xvcjogdmFyKC0tdGV4dC0yKTtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxuICBmb250LWZhbWlseTogdmFyKC0tZm9udC1zYW5zKTtcXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1mb250LWxpbmVoZWlnaHQtMyk7XFxuICBzY3JvbGxiYXItY29sb3I6IHZhcigtLXNjcm9sbHRodW1iLWNvbG9yKSB0cmFuc3BhcmVudDtcXG59XFxuQG1lZGlhIChkeW5hbWljLXJhbmdlOiBoaWdoKSB7XFxuICBAc3VwcG9ydHMgKGNvbG9yKGRpc3BsYXktcDMgMCAwLjUgMSkpIHtcXG4gICAgOndoZXJlKGh0bWwpIHtcXG4gICAgICAtLWxpbms6IGNvbG9yKGRpc3BsYXktcDMgMCAwLjUgMSk7XFxuICAgICAgLS1saW5rLXZpc2l0ZWQ6IGNvbG9yKGRpc3BsYXktcDMgMC42IDAuMiAxKTtcXG4gICAgfVxcbiAgfVxcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICAtLWxpbms6IHZhcigtLWluZGlnby0zKTtcXG4gICAgLS1saW5rLXZpc2l0ZWQ6IHZhcigtLWdyYXBlLTMpO1xcbiAgICAtLXRleHQtMTogdmFyKC0tZ3JheS0xKTtcXG4gICAgLS10ZXh0LTI6IHZhcigtLWdyYXktNCk7XFxuICAgIC0tc3VyZmFjZS0xOiB2YXIoLS1ncmF5LTkpO1xcbiAgICAtLXN1cmZhY2UtMjogdmFyKC0tZ3JheS04KTtcXG4gICAgLS1zdXJmYWNlLTM6IHZhcigtLWdyYXktNyk7XFxuICAgIC0tc3VyZmFjZS00OiB2YXIoLS1ncmF5LTYpO1xcbiAgICBjb2xvci1zY2hlbWU6IGRhcms7XFxuICB9XFxufVxcbjp3aGVyZShoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBkdCkge1xcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XFxufVxcbjp3aGVyZShhW2hyZWZdKSB7XFxuICBjb2xvcjogdmFyKC0tbGluayk7XFxufVxcbjp3aGVyZShhW2hyZWZdKTp2aXNpdGVkIHtcXG4gIGNvbG9yOiB2YXIoLS1saW5rLXZpc2l0ZWQpO1xcbn1cXG46Zm9jdXMtdmlzaWJsZSB7XFxuICBvdXRsaW5lLWNvbG9yOiB2YXIoLS1saW5rKTtcXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcXG4gIDp3aGVyZShodG1sKSB7XFxuICAgIC0tc2Nyb2xsdGh1bWItY29sb3I6IHZhcigtLWdyYXktNyk7XFxuICB9XFxufVxcbiosXFxuOmFmdGVyLFxcbjpiZWZvcmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuOndoZXJlKDpub3QoZGlhbG9nKSkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG46d2hlcmUoOm5vdChmaWVsZHNldCwgcHJvZ3Jlc3MsIG1ldGVyKSkge1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogMDtcXG59XFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiBuby1wcmVmZXJlbmNlKSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcXG4gIH1cXG59XFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiBuby1wcmVmZXJlbmNlKSB7XFxuICA6d2hlcmUoOmZvY3VzLXZpc2libGUpIHtcXG4gICAgdHJhbnNpdGlvbjogb3V0bGluZS1vZmZzZXQgMTQ1bXMgdmFyKC0tZWFzZS0yKTtcXG4gIH1cXG4gIDp3aGVyZSg6bm90KDphY3RpdmUpOmZvY3VzLXZpc2libGUpIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XFxuICB9XFxufVxcbjp3aGVyZSg6bm90KDphY3RpdmUpOmZvY3VzLXZpc2libGUpIHtcXG4gIG91dGxpbmUtb2Zmc2V0OiA1cHg7XFxufVxcbjp3aGVyZShib2R5KSB7XFxuICBtaW4tYmxvY2stc2l6ZTogMTAwJTtcXG59XFxuOndoZXJlKGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYpIHtcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1mb250LXdlaWdodC05KTtcXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1mb250LWxpbmVoZWlnaHQtMSk7XFxufVxcbjp3aGVyZShoMSkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtOCk7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtaGVhZGVyLTEpO1xcbn1cXG46d2hlcmUoaDIpIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTYpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0yKTtcXG59XFxuOndoZXJlKGgzKSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS01KTtcXG59XFxuOndoZXJlKGg0KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS00KTtcXG59XFxuOndoZXJlKGg1KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS0zKTtcXG59XFxuOndoZXJlKGgzLCBoNCwgaDUsIGg2LCBkdCkge1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0zKTtcXG59XFxuOndoZXJlKHAsIHVsLCBvbCwgZGwsIGg2KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS0yKTtcXG59XFxuOndoZXJlKGEsIHUsIGlucywgYWJicikge1xcbiAgdGV4dC11bmRlcmxpbmUtb2Zmc2V0OiAxcHg7XFxufVxcbkBzdXBwb3J0cyAoLW1vei1hcHBlYXJhbmNlOiBub25lKSB7XFxuICA6d2hlcmUoYSwgdSwgaW5zLCBhYmJyKSB7XFxuICAgIHRleHQtdW5kZXJsaW5lLW9mZnNldDogMnB4O1xcbiAgfVxcbn1cXG46d2hlcmUoYVtocmVmXSwgYXJlYSwgYnV0dG9uLCBpbnB1dCwgbGFiZWxbZm9yXSwgc2VsZWN0LCBzdW1tYXJ5LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Kj1cXFwiLVxcXCJdKSkge1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbn1cXG46d2hlcmUoYSkge1xcbiAgbWFyZ2luLWJsb2NrOiBjYWxjKHZhcigtLXNpemUtMSkgKiAtMSk7XFxuICBtYXJnaW4taW5saW5lOiBjYWxjKHZhcigtLXNpemUtMSkgKiAtMSk7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTEpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMSk7XFxufVxcbjp3aGVyZShhKTp3aGVyZShbaHJlZl0pIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0taW5kaWdvLTIpO1xcbn1cXG46d2hlcmUoYSk6d2hlcmUoW2hyZWZdKTp3aGVyZSg6dmlzaXRlZCkge1xcbiAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiB2YXIoLS1ncmFwZS0yKTtcXG59XFxuOndoZXJlKGEpOndoZXJlKDpub3QoOmhvdmVyKSkge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcbn1cXG46d2hlcmUoaW1nLCBzdmcsIHZpZGVvLCBjYW52YXMsIGF1ZGlvLCBpZnJhbWUsIGVtYmVkLCBvYmplY3QpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG46d2hlcmUoaW1nLCBzdmcsIHZpZGVvKSB7XFxuICBibG9jay1zaXplOiBhdXRvO1xcbiAgbWF4LWlubGluZS1zaXplOiAxMDAlO1xcbn1cXG46d2hlcmUoaW5wdXQsIGJ1dHRvbiwgdGV4dGFyZWEsIHNlbGVjdCksXFxuOndoZXJlKGlucHV0W3R5cGU9XFxcImZpbGVcXFwiXSk6Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gIGxldHRlci1zcGFjaW5nOiBpbmhlcml0O1xcbn1cXG46d2hlcmUoaW5wdXQsIHRleHRhcmVhKSB7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTEpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzZWxlY3QpIHtcXG4gIHBhZGRpbmctYmxvY2s6IDAuNzVjaDtcXG4gIHBhZGRpbmctaW5saW5lOiAxLjI1Y2ggMDtcXG59XFxuOndoZXJlKHRleHRhcmVhLCBzZWxlY3QsIGlucHV0Om5vdChidXR0b24sIGJ1dHRvblt0eXBlXSwgaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdKSkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgOndoZXJlKHRleHRhcmVhLCBzZWxlY3QsIGlucHV0Om5vdChidXR0b24sIGJ1dHRvblt0eXBlXSwgaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdKSkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTcxYTFjO1xcbiAgfVxcbn1cXG46d2hlcmUodGV4dGFyZWEpIHtcXG4gIHJlc2l6ZTogYmxvY2s7XFxufVxcbjp3aGVyZShpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdKSB7XFxuICBibG9jay1zaXplOiB2YXIoLS1zaXplLTMpO1xcbiAgaW5saW5lLXNpemU6IHZhcigtLXNpemUtMyk7XFxufVxcbjp3aGVyZShzdmcpIHtcXG4gIHN0cm9rZTogbm9uZTtcXG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG59XFxuOndoZXJlKHN2Zyk6d2hlcmUoOm5vdChbZmlsbF0pKSB7XFxuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcXG4gIGZpbGw6IG5vbmU7XFxuICBzdHJva2UtbGluZWNhcDogcm91bmQ7XFxuICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xcbn1cXG46d2hlcmUoc3ZnKTp3aGVyZSg6bm90KFt3aWR0aF0pKSB7XFxuICBpbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS0xMCk7XFxufVxcbjp3aGVyZShjb2RlLCBrYmQsIHNhbXAsIHByZSkge1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtbW9ubyk7XFxufVxcbjp3aGVyZSg6bm90KHByZSkgPiBjb2RlLCBrYmQpIHtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbjp3aGVyZShwcmUpIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogbWF4LWNvbnRlbnQ7XFxuICBtaW4taW5saW5lLXNpemU6IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlO1xcbn1cXG46d2hlcmUoOm5vdChwcmUpID4gY29kZSkge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmc6IHZhcigtLXNpemUtMSkgdmFyKC0tc2l6ZS0yKTtcXG59XFxuOndoZXJlKGtiZCwgdmFyKSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLXN1cmZhY2UtNCk7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxuICBib3JkZXItd2lkdGg6IHZhcigtLWJvcmRlci1zaXplLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0xKSB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUobWFyaykge1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMSk7XFxufVxcbjp3aGVyZShvbCwgdWwpIHtcXG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTgpO1xcbn1cXG46d2hlcmUobGkpIHtcXG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUobGksIGRkLCBmaWdjYXB0aW9uKSB7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtY29udGVudC0yKTtcXG59XFxuOndoZXJlKHApIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTMpO1xcbn1cXG46d2hlcmUoZHQsIHN1bW1hcnkpIHtcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1mb250LXdlaWdodC03KTtcXG59XFxuOndoZXJlKGR0Om5vdCg6Zmlyc3Qtb2YtdHlwZSkpIHtcXG4gIG1hcmdpbi1ibG9jay1zdGFydDogdmFyKC0tc2l6ZS01KTtcXG59XFxuOndoZXJlKHNtYWxsKSB7XFxuICBmb250LXNpemU6IG1heCgwLjVlbSwgdmFyKC0tZm9udC1zaXplLTApKTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTEpO1xcbn1cXG46d2hlcmUoaHIpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMyk7XFxuICBoZWlnaHQ6IHZhcigtLWJvcmRlci1zaXplLTIpO1xcbiAgbWFyZ2luLWJsb2NrOiB2YXIoLS1zaXplLWZsdWlkLTUpO1xcbn1cXG46d2hlcmUoZmlndXJlKSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTIpO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG59XFxuOndoZXJlKGZpZ3VyZSkgPiA6d2hlcmUoZmlnY2FwdGlvbikge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMSk7XFxufVxcbjp3aGVyZShibG9ja3F1b3RlLCA6bm90KGJsb2NrcXVvdGUpID4gY2l0ZSkge1xcbiAgYm9yZGVyLWlubGluZS1zdGFydC13aWR0aDogdmFyKC0tYm9yZGVyLXNpemUtMyk7XFxufVxcbjp3aGVyZShibG9ja3F1b3RlKSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWNvbnRlbnQtMik7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTMpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtNCk7XFxufVxcbjp3aGVyZSg6bm90KGJsb2NrcXVvdGUpID4gY2l0ZSkge1xcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzdW1tYXJ5KSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgbWFyZ2luOiBjYWxjKHZhcigtLXNpemUtMikgKiAtMSkgY2FsYyh2YXIoLS1zaXplLTMpICogLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0yKSB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoZGV0YWlscykge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctYmxvY2s6IHZhcigtLXNpemUtMik7XFxuICBwYWRkaW5nLWlubGluZTogdmFyKC0tc2l6ZS0zKTtcXG59XFxuOndoZXJlKGRldGFpbHNbb3Blbl0gPiBzdW1tYXJ5KSB7XFxuICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IDA7XFxuICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogMDtcXG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShmaWVsZHNldCkge1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXItc2l6ZS0xKSBzb2xpZCB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbn1cXG46d2hlcmUoZGVsKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1yZWQtOSk7XFxuICBjb2xvcjogdmFyKC0tcmVkLTIpO1xcbn1cXG46d2hlcmUoaW5zKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi05KTtcXG4gIGNvbG9yOiB2YXIoLS1ncmVlbi0xKTtcXG59XFxuOndoZXJlKGFiYnIpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tYmx1ZS01KTtcXG59XFxuOndoZXJlKGRpYWxvZykge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy02KTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoZGlhbG9nKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICB9XFxufVxcbjp3aGVyZShkaWFsb2cpOjpiYWNrZHJvcCB7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMjVweCk7XFxufVxcbjp3aGVyZShodG1sW1xcXFw6aGFzXFxcXChkaWFsb2dcXFxcW29wZW5cXFxcXVxcXFwpXSkge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuOndoZXJlKGh0bWw6aGFzKGRpYWxvZ1tvcGVuXSkpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbjp3aGVyZShtZW51KSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XFxufVxcbjp3aGVyZShzdXApIHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tc2l6ZS0zOiAxcmVtO1xcbiAgLS1ncmF5LTc6ICM0OTUwNTc7XFxuICAtLXJhdGlvLXNxdWFyZTogMTtcXG4gIC0tZ3JheS04OiAjMzQzYTQwO1xcbiAgLS1ncmF5LTU6ICNhZGI1YmQ7XFxuICAtLWdyZWVuLTU6ICM1MWNmNjY7XFxuICAtLXJlZC01OiAjZmY2YjZiO1xcbiAgLS1yYWRpdXMtMzogMXJlbTtcXG4gIC0tcmVkLTk6ICNjOTJhMmE7XFxuICAtLWdyYXktOTogIzIxMjUyOTtcXG4gIC0tZm9udC1zaXplLWZsdWlkLTM6IGNsYW1wKDJyZW0sIDl2dywgMy41cmVtKTtcXG4gIC0teWVsbG93LTQ6ICNmZmQ0M2I7XFxuICAtLXJlZC02OiAjZmE1MjUyO1xcbiAgLS1zaXplLTI6IC41cmVtO1xcbiAgLS10ZWFsLTk6ICMwODdmNWI7XFxuICAtLXRlYWwtMDogI2U2ZmNmNTtcXG4gIC0tdGVhbC04OiAjMDk5MjY4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogMTAwJTtcXG59XFxuXFxuLnNoaXAtcGxhY2VtZW50IHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIG1heC13aWR0aDogNTAlO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuLmJhdHRsZWZpZWxkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0zKTtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5ODBweCkge1xcbiAgLmJhdHRsZWZpZWxkIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIH1cXG59XFxuXFxuLmZpZWxkIHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi5zaGlwLWdyaWQsXFxuLnBsYWNlbWVudC1ncmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIC13ZWJraXQtbWFyZ2luLWJlZm9yZTogdmFyKC0tc2l6ZS0zKTtcXG4gICAgICAgICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiB2YXIoLS1zaXplLTMpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ncmF5LTcpO1xcbiAgYXNwZWN0LXJhdGlvOiB2YXIoLS1yYXRpby1zcXVhcmUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuW2RhdGEtZmllbGQ9XFxcImNvbXB1dGVyXFxcIl0gLmNlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheS04KTtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmF5LTUpO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ncmF5LTUpO1xcbn1cXG5cXG4uc2hpcC1oaWdobGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4tNSk7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWdyZWVuLTUpO1xcbn1cXG5cXG4uc2hpcDpoYXMoLmJ1bGxldCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLTUpO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1yZWQtNSk7XFxufVxcblxcbi5idWxsZXQge1xcbiAgd2lkdGg6IDM1JTtcXG4gIGhlaWdodDogMzUlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheS01KTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG59XFxuXFxuLnNoaXAgLmJ1bGxldCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1yZWQtOSk7XFxufVxcblxcbi5idWxsZXQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJlZC05KTtcXG59XFxuXFxuLyogR2FtZSBPdmVyIFBhZ2UgKi9cXG4uZ2FtZS1vdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyYXktOSk7XFxuXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcblxcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLW92ZXItY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbn1cXG5cXG4uZ2FtZS1yZXN1bHQge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtZmx1aWQtMyk7XFxufVxcblxcbi5nYW1lLXJlc3VsdC53b24ge1xcbiAgY29sb3I6IHZhcigtLXllbGxvdy00KTtcXG59XFxuXFxuLmdhbWUtcmVzdWx0Lmxvc3Qge1xcbiAgY29sb3I6IHZhcigtLXJlZC02KTtcXG59XFxuXFxuLmJ0bi1hZ2FpbiB7XFxuICBwYWRkaW5nOiB2YXIoLS1zaXplLTIpIHZhcigtLXNpemUtMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10ZWFsLTkpO1xcbiAgY29sb3I6IHZhcigtLXRlYWwtMCk7XFxufVxcblxcbi5idG4tYWdhaW46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGVhbC04KTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCI8bm8gc291cmNlPlwiLFwid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUFBLGVBQUE7RUFBQSxrQkFBQTtFQUFBLGtCQUFBO0VBQUEsa0JBQUE7RUFBQSxrQkFBQTtFQUFBLG1CQUFBO0VBQUEsaUJBQUE7RUFBQSxpQkFBQTtFQUFBLGlCQUFBO0VBQUEsa0JBQUE7RUFBQSw4Q0FBQTtFQUFBLG9CQUFBO0VBQUEsaUJBQUE7RUFBQSxnQkFBQTtFQUFBLGtCQUFBO0VBQUEsa0JBQUE7RUFBQTtDQUFBOztBQ0FBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0U7SUFDRSxtQkFBbUI7RUFDckI7QUFDRjs7QUFFQTtFQUNFLE9BQU87QUFDVDs7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG9DQUFpQztVQUFqQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0IsaUNBQWlDO0VBQ2pDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsK0JBQStCO0VBQy9CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLCtCQUErQjtFQUMvQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxnQ0FBZ0M7RUFDaEMsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLFVBQVU7RUFDVixXQUFXO0VBQ1gsK0JBQStCO0VBQy9CLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQSxtQkFBbUI7QUFDbkI7RUFDRSwrQkFBK0I7O0VBRS9CLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTzs7RUFFUCxZQUFZO0VBQ1osYUFBYTs7RUFFYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsK0JBQStCO0VBQy9CLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbCxcImJvZHkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4udGl0bGUge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uc2hpcC1wbGFjZW1lbnQge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbWF4LXdpZHRoOiA1MCU7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG4uYmF0dGxlZmllbGQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBtYXgtd2lkdGg6IDgwJTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxuICBnYXA6IHZhcigtLXNpemUtMyk7XFxuICBwYWRkaW5nOiB2YXIoLS1zaXplLTMpO1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDk4MHB4KSB7XFxuICAuYmF0dGxlZmllbGQge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgfVxcbn1cXG5cXG4uZmllbGQge1xcbiAgZmxleDogMTtcXG59XFxuXFxuLnNoaXAtZ3JpZCxcXG4ucGxhY2VtZW50LWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgbWFyZ2luLWJsb2NrLXN0YXJ0OiB2YXIoLS1zaXplLTMpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ncmF5LTcpO1xcbiAgYXNwZWN0LXJhdGlvOiB2YXIoLS1yYXRpby1zcXVhcmUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuW2RhdGEtZmllbGQ9XFxcImNvbXB1dGVyXFxcIl0gLmNlbGw6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheS04KTtcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmF5LTUpO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ncmF5LTUpO1xcbn1cXG5cXG4uc2hpcC1oaWdobGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JlZW4tNSk7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWdyZWVuLTUpO1xcbn1cXG5cXG4uc2hpcDpoYXMoLmJ1bGxldCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLTUpO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1yZWQtNSk7XFxufVxcblxcbi5idWxsZXQge1xcbiAgd2lkdGg6IDM1JTtcXG4gIGhlaWdodDogMzUlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JheS01KTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG59XFxuXFxuLnNoaXAgLmJ1bGxldCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1yZWQtOSk7XFxufVxcblxcbi5idWxsZXQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJlZC05KTtcXG59XFxuXFxuLyogR2FtZSBPdmVyIFBhZ2UgKi9cXG4uZ2FtZS1vdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyYXktOSk7XFxuXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcblxcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lLW92ZXItY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbn1cXG5cXG4uZ2FtZS1yZXN1bHQge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtZmx1aWQtMyk7XFxufVxcblxcbi5nYW1lLXJlc3VsdC53b24ge1xcbiAgY29sb3I6IHZhcigtLXllbGxvdy00KTtcXG59XFxuXFxuLmdhbWUtcmVzdWx0Lmxvc3Qge1xcbiAgY29sb3I6IHZhcigtLXJlZC02KTtcXG59XFxuXFxuLmJ0bi1hZ2FpbiB7XFxuICBwYWRkaW5nOiB2YXIoLS1zaXplLTIpIHZhcigtLXNpemUtMyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS10ZWFsLTkpO1xcbiAgY29sb3I6IHZhcigtLXRlYWwtMCk7XFxufVxcblxcbi5idG4tYWdhaW46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGVhbC04KTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9ub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0ICcuL2RvbS5qcyc7XG5pbXBvcnQgJy4vZ2FtZS5qcyc7XG4iXSwibmFtZXMiOlsiZ3JpZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGFjZW1lbnRTY3JlZW4iLCJxdWVyeVNlbGVjdG9yIiwicGxhY2VtZW50R3JpZCIsInBsYWNlbWVudE1lc3NhZ2UiLCJidG5Sb3RhdGUiLCJiYXR0bGVmaWVsZFNjcmVlbiIsInBsYXllckNlbGxzIiwiZW5lbXlDZWxscyIsImVuZW15R3JpZCIsImdhbWVPdmVyU2NyZWVuIiwiZ2FtZU92ZXJNZXNzYWdlIiwiYnRuUGxheUFnYWluIiwiZ3JpZENlbGwiLCJyb3ciLCJjb2x1bW4iLCJpIiwiaiIsImluc2VydEFkamFjZW50SFRNTCIsInBsYWNlbWVudENlbGxzIiwiZm9yRWFjaCIsImdyaWQiLCJkcmF3U2hpcHMiLCJET01DZWxscyIsImJvYXJkIiwicGxheWVyIiwiY2VsbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsIm9jY3VwaWVkQ2VsbHMiLCJhZGQiLCJoaWdobGlnaHRTaGlwIiwibGVuZ3RoIiwiY29vcmRzIiwib3JpZW50YXRpb24iLCJjZWxsc1RvQ292ZXIiLCJ2YWxpZCIsInNoaXBDYW5CZUFkZGVkIiwiZHJhd1NoaXBzT25QbGFjZW1lbnRHcmlkIiwiZHJhd01pc3NlZCIsIm1pc3NlZFNob3RzIiwiY29vcmQiLCJkcmF3SGl0cyIsInJlY2VpdmVkSGl0cyIsIlBsYXllciIsImVuZW15Iiwic2V0T3Bwb25lbnQiLCJzaGlwcyIsInNoaXBOYW1lIiwic2hpcEluZGV4IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwicG9zaXRpb24iLCJzaGlwQWRkZWQiLCJhZGRTaGlwIiwic2hvd0dhbWVPdmVyIiwiaXNBbGxTaGlwc1N1bmsiLCJ0ZXh0Q29udGVudCIsImNvbnRhaW5zIiwiaXNIaXQiLCJhdHRhY2siLCJyYW5kb21BdHRhY2siLCJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJjZWxscyIsImJ1aWxkQm9hcmQiLCJNYXAiLCJzZXQiLCJzaGlwIiwiZ2V0U2hpcCIsImdldCIsInN0YXJ0aW5nQ2VsbENvb3JkcyIsInNwbGl0IiwicHVzaCIsImV2ZXJ5Iiwia2V5IiwiaGFzIiwic2hpcFRvQWRkIiwicmVjZWl2ZUF0dGFjayIsImhpdCIsImlzU3VuayIsImFyciIsIm9wcG9uZW50IiwidHVybiIsImVuZFR1cm4iLCJyYW5kSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kQXR0YWNrQ29vcmRzIiwic3BsaWNlIiwiaGl0cyJdLCJzb3VyY2VSb290IjoiIn0=