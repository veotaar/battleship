/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        cellsToCover.push(`${startingCellCoords[0]}-${startingCellCoords[1] + i}`);
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < length; i += 1) {
        cellsToCover.push(`${startingCellCoords[0] + i}-${startingCellCoords[1]}`);
      }
    }
    return {
      cellsToCover,
      valid: cellsToCover.every(key => this.cells.has(key) && this.getShip(key) === null)
    };
  }
  addShip(length, coords, orientation) {
    const {
      cellsToCover,
      valid
    } = this.shipCanBeAdded(length, coords, orientation);
    if (!valid) return;
    const shipToAdd = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](length);
    cellsToCover.forEach(cell => {
      this.cells.set(cell, {
        ship: shipToAdd,
        isHit: false
      });
    });
  }
}
const gameboard = new Gameboard(10);
gameboard.addShip(2, '0-0', 'horizontal');
console.log(gameboard.cells);

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
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
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
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");




// const testMap = new Map();

// testMap.set(1, true);
// testMap.set(2, true);
// testMap.set(3, false);

// console.log(testMap);

// console.log(testMap.get(2));
// console.log(testMap.get(4));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxLQUFLLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLE9BQU8sWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxLQUFLLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FB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QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQXlCO0FBQ0o7QUFDRzs7QUFFeEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL25vcm1hbGl6ZS5jc3M/ZWI1MiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz85MDExIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5idWlsZEJvYXJkKCk7XG4gIH1cblxuICBidWlsZEJvYXJkKCkge1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IE1hcCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gYCR7aX0tJHtqfWA7XG4gICAgICAgIGJvYXJkLnNldChjb29yZCwge1xuICAgICAgICAgIHNoaXA6IG51bGwsXG4gICAgICAgICAgaXNIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICBnZXRTaGlwKGNvb3Jkcykge1xuICAgIHJldHVybiB0aGlzLmNlbGxzLmdldChjb29yZHMpLnNoaXA7XG4gIH1cblxuICBpc0hpdChjb29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5jZWxscy5nZXQoY29vcmRzKS5pc0hpdDtcbiAgfVxuXG4gIHNoaXBDYW5CZUFkZGVkKGxlbmd0aCwgY29vcmRzLCBvcmllbnRhdGlvbikge1xuICAgIGNvbnN0IGNlbGxzVG9Db3ZlciA9IFtdO1xuICAgIGNvbnN0IHN0YXJ0aW5nQ2VsbENvb3JkcyA9IGNvb3Jkcy5zcGxpdCgnLScpO1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNlbGxzVG9Db3Zlci5wdXNoKGAke3N0YXJ0aW5nQ2VsbENvb3Jkc1swXX0tJHtzdGFydGluZ0NlbGxDb29yZHNbMV0gKyBpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2VsbHNUb0NvdmVyLnB1c2goYCR7c3RhcnRpbmdDZWxsQ29vcmRzWzBdICsgaX0tJHtzdGFydGluZ0NlbGxDb29yZHNbMV19YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzVG9Db3ZlcixcbiAgICAgIHZhbGlkOiBjZWxsc1RvQ292ZXIuZXZlcnkoKGtleSkgPT4gdGhpcy5jZWxscy5oYXMoa2V5KSAmJiB0aGlzLmdldFNoaXAoa2V5KSA9PT0gbnVsbCksXG4gICAgfTtcbiAgfVxuXG4gIGFkZFNoaXAobGVuZ3RoLCBjb29yZHMsIG9yaWVudGF0aW9uKSB7XG4gICAgY29uc3QgeyBjZWxsc1RvQ292ZXIsIHZhbGlkIH0gPSB0aGlzLnNoaXBDYW5CZUFkZGVkKGxlbmd0aCwgY29vcmRzLCBvcmllbnRhdGlvbik7XG4gICAgaWYgKCF2YWxpZCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2hpcFRvQWRkID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICBjZWxsc1RvQ292ZXIuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgdGhpcy5jZWxscy5zZXQoY2VsbCwge1xuICAgICAgICBzaGlwOiBzaGlwVG9BZGQsXG4gICAgICAgIGlzSGl0OiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoMTApO1xuXG5nYW1lYm9hcmQuYWRkU2hpcCgyLCAnMC0wJywgJ2hvcml6b250YWwnKTtcblxuY29uc29sZS5sb2coZ2FtZWJvYXJkLmNlbGxzKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1pbmRpZ28tNzogIzQyNjNlYjtcXG4gIC0tZ3JhcGUtNzogI2FlM2VjOTtcXG4gIC0tZ3JheS05OiAjMjEyNTI5O1xcbiAgLS1ncmF5LTc6ICM0OTUwNTc7XFxuICAtLWdyYXktMDogI2Y4ZjlmYTtcXG4gIC0tZ3JheS0yOiAjZTllY2VmO1xcbiAgLS1ncmF5LTM6ICNkZWUyZTY7XFxuICAtLWdyYXktNDogI2NlZDRkYTtcXG4gIC0tZ3JheS02OiAjODY4ZTk2O1xcbiAgLS1mb250LXNhbnM6IHN5c3RlbS11aSwtYXBwbGUtc3lzdGVtLFNlZ29lIFVJLFJvYm90byxVYnVudHUsQ2FudGFyZWxsLE5vdG8gU2FucyxzYW5zLXNlcmlmO1xcbiAgLS1mb250LWxpbmVoZWlnaHQtMzogMS41O1xcbiAgLS1pbmRpZ28tMzogIzkxYTdmZjtcXG4gIC0tZ3JhcGUtMzogI2U1OTlmNztcXG4gIC0tZ3JheS0xOiAjZjFmM2Y1O1xcbiAgLS1ncmF5LTg6ICMzNDNhNDA7XFxuICAtLWVhc2UtMjogY3ViaWMtYmV6aWVyKC4yNSwgMCwgLjQsIDEpO1xcbiAgLS1mb250LXdlaWdodC05OiA5MDA7XFxuICAtLWZvbnQtbGluZWhlaWdodC0xOiAxLjI1O1xcbiAgLS1mb250LXNpemUtODogMy41cmVtO1xcbiAgLS1zaXplLWhlYWRlci0xOiAyMGNoO1xcbiAgLS1mb250LXNpemUtNjogMi41cmVtO1xcbiAgLS1zaXplLWhlYWRlci0yOiAyNWNoO1xcbiAgLS1mb250LXNpemUtNTogMnJlbTtcXG4gIC0tZm9udC1zaXplLTQ6IDEuNXJlbTtcXG4gIC0tZm9udC1zaXplLTM6IDEuMjVyZW07XFxuICAtLXNpemUtaGVhZGVyLTM6IDM1Y2g7XFxuICAtLWZvbnQtc2l6ZS0yOiAxLjFyZW07XFxuICAtLXNpemUtMTogLjI1cmVtO1xcbiAgLS1pbmRpZ28tMjogI2JhYzhmZjtcXG4gIC0tZ3JhcGUtMjogI2VlYmVmYTtcXG4gIC0tc2l6ZS0yOiAuNXJlbTtcXG4gIC0tcmFkaXVzLTI6IDVweDtcXG4gIC0tc2l6ZS0zOiAxcmVtO1xcbiAgLS1zaXplLTEwOiA1cmVtO1xcbiAgLS1mb250LW1vbm86IERhbmsgTW9ubyxPcGVyYXRvciBNb25vLEluY29uc29sYXRhLEZpcmEgTW9ubyx1aS1tb25vc3BhY2UsU0YgTW9ubyxNb25hY28sRHJvaWQgU2FucyBNb25vLFNvdXJjZSBDb2RlIFBybyxtb25vc3BhY2U7XFxuICAtLWJvcmRlci1zaXplLTE6IDFweDtcXG4gIC0tc2l6ZS04OiAzcmVtO1xcbiAgLS1zaXplLWNvbnRlbnQtMjogNDVjaDtcXG4gIC0tc2l6ZS1jb250ZW50LTM6IDYwY2g7XFxuICAtLWZvbnQtd2VpZ2h0LTc6IDcwMDtcXG4gIC0tc2l6ZS01OiAxLjVyZW07XFxuICAtLWZvbnQtc2l6ZS0wOiAuNzVyZW07XFxuICAtLXNpemUtY29udGVudC0xOiAyMGNoO1xcbiAgLS1ib3JkZXItc2l6ZS0yOiAycHg7XFxuICAtLXNpemUtZmx1aWQtNTogY2xhbXAoNHJlbSwgNXZ3LCA1cmVtKTtcXG4gIC0tZm9udC1zaXplLTE6IDFyZW07XFxuICAtLWJvcmRlci1zaXplLTM6IDVweDtcXG4gIC0tc2l6ZS00OiAxLjI1cmVtO1xcbiAgLS1yZWQtOTogI2M5MmEyYTtcXG4gIC0tcmVkLTI6ICNmZmM5Yzk7XFxuICAtLWdyZWVuLTk6ICMyYjhhM2U7XFxuICAtLWdyZWVuLTE6ICNkM2Y5ZDg7XFxuICAtLWJsdWUtNTogIzMzOWFmMDtcXG4gIC0tcmFkaXVzLTM6IDFyZW07XFxuICAtLXNoYWRvdy02OiBcXG4gICAgMCAtMXB4IDJweCAwIGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgMiUpKSxcXG4gICAgMCAzcHggMnB4IC0ycHggaHNsKHZhcigtLXNoYWRvdy1jb2xvcikgLyBjYWxjKHZhcigtLXNoYWRvdy1zdHJlbmd0aCkgKyAzJSkpLFxcbiAgICAwIDdweCA1cHggLTJweCBoc2wodmFyKC0tc2hhZG93LWNvbG9yKSAvIGNhbGModmFyKC0tc2hhZG93LXN0cmVuZ3RoKSArIDMlKSksXFxuICAgIDAgMTJweCAxMHB4IC0ycHggaHNsKHZhcigtLXNoYWRvdy1jb2xvcikgLyBjYWxjKHZhcigtLXNoYWRvdy1zdHJlbmd0aCkgKyA0JSkpLFxcbiAgICAwIDIycHggMThweCAtMnB4IGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgNSUpKSxcXG4gICAgMCA0MXB4IDMzcHggLTJweCBoc2wodmFyKC0tc2hhZG93LWNvbG9yKSAvIGNhbGModmFyKC0tc2hhZG93LXN0cmVuZ3RoKSArIDYlKSksXFxuICAgIDAgMTAwcHggODBweCAtMnB4IGhzbCh2YXIoLS1zaGFkb3ctY29sb3IpIC8gY2FsYyh2YXIoLS1zaGFkb3ctc3RyZW5ndGgpICsgNyUpKTtcXG4gIC0tc2hhZG93LWNvbG9yOiAyMjAgMyUgMTUlO1xcbiAgLS1zaGFkb3ctc3RyZW5ndGg6IDElO1xcbn1cXG46d2hlcmUoaHRtbCkge1xcbiAgLS1saW5rOiB2YXIoLS1pbmRpZ28tNyk7XFxuICAtLWxpbmstdmlzaXRlZDogdmFyKC0tZ3JhcGUtNyk7XFxuICAtLXRleHQtMTogdmFyKC0tZ3JheS05KTtcXG4gIC0tdGV4dC0yOiB2YXIoLS1ncmF5LTcpO1xcbiAgLS1zdXJmYWNlLTE6IHZhcigtLWdyYXktMCk7XFxuICAtLXN1cmZhY2UtMjogdmFyKC0tZ3JheS0yKTtcXG4gIC0tc3VyZmFjZS0zOiB2YXIoLS1ncmF5LTMpO1xcbiAgLS1zdXJmYWNlLTQ6IHZhcigtLWdyYXktNCk7XFxuICAtLXNjcm9sbHRodW1iLWNvbG9yOiB2YXIoLS1ncmF5LTYpO1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiBub25lO1xcbiAgYWNjZW50LWNvbG9yOiB2YXIoLS1saW5rKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMSk7XFxuICBibG9jay1zaXplOiAxMDAlO1xcbiAgY2FyZXQtY29sb3I6IHZhcigtLWxpbmspO1xcbiAgY29sb3I6IHZhcigtLXRleHQtMik7XFxuICBjb2xvci1zY2hlbWU6IGxpZ2h0O1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtc2Fucyk7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tZm9udC1saW5laGVpZ2h0LTMpO1xcbiAgc2Nyb2xsYmFyLWNvbG9yOiB2YXIoLS1zY3JvbGx0aHVtYi1jb2xvcikgdHJhbnNwYXJlbnQ7XFxufVxcbkBtZWRpYSAoZHluYW1pYy1yYW5nZTogaGlnaCkge1xcbiAgQHN1cHBvcnRzIChjb2xvcihkaXNwbGF5LXAzIDAgMC41IDEpKSB7XFxuICAgIDp3aGVyZShodG1sKSB7XFxuICAgICAgLS1saW5rOiBjb2xvcihkaXNwbGF5LXAzIDAgMC41IDEpO1xcbiAgICAgIC0tbGluay12aXNpdGVkOiBjb2xvcihkaXNwbGF5LXAzIDAuNiAwLjIgMSk7XFxuICAgIH1cXG4gIH1cXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgOndoZXJlKGh0bWwpIHtcXG4gICAgLS1saW5rOiB2YXIoLS1pbmRpZ28tMyk7XFxuICAgIC0tbGluay12aXNpdGVkOiB2YXIoLS1ncmFwZS0zKTtcXG4gICAgLS10ZXh0LTE6IHZhcigtLWdyYXktMSk7XFxuICAgIC0tdGV4dC0yOiB2YXIoLS1ncmF5LTQpO1xcbiAgICAtLXN1cmZhY2UtMTogdmFyKC0tZ3JheS05KTtcXG4gICAgLS1zdXJmYWNlLTI6IHZhcigtLWdyYXktOCk7XFxuICAgIC0tc3VyZmFjZS0zOiB2YXIoLS1ncmF5LTcpO1xcbiAgICAtLXN1cmZhY2UtNDogdmFyKC0tZ3JheS02KTtcXG4gICAgY29sb3Itc2NoZW1lOiBkYXJrO1xcbiAgfVxcbn1cXG46d2hlcmUoaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgZHQpIHtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LTEpO1xcbn1cXG46d2hlcmUoYVtocmVmXSkge1xcbiAgY29sb3I6IHZhcigtLWxpbmspO1xcbn1cXG46d2hlcmUoYVtocmVmXSk6dmlzaXRlZCB7XFxuICBjb2xvcjogdmFyKC0tbGluay12aXNpdGVkKTtcXG59XFxuOmZvY3VzLXZpc2libGUge1xcbiAgb3V0bGluZS1jb2xvcjogdmFyKC0tbGluayk7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICAtLXNjcm9sbHRodW1iLWNvbG9yOiB2YXIoLS1ncmF5LTcpO1xcbiAgfVxcbn1cXG4qLFxcbjphZnRlcixcXG46YmVmb3JlIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbjp3aGVyZSg6bm90KGRpYWxvZykpIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuOndoZXJlKDpub3QoZmllbGRzZXQsIHByb2dyZXNzLCBtZXRlcikpIHtcXG4gIGJhY2tncm91bmQtb3JpZ2luOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICBib3JkZXItd2lkdGg6IDA7XFxufVxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogbm8tcHJlZmVyZW5jZSkge1xcbiAgOndoZXJlKGh0bWwpIHtcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxuICB9XFxufVxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogbm8tcHJlZmVyZW5jZSkge1xcbiAgOndoZXJlKDpmb2N1cy12aXNpYmxlKSB7XFxuICAgIHRyYW5zaXRpb246IG91dGxpbmUtb2Zmc2V0IDE0NW1zIHZhcigtLWVhc2UtMik7XFxuICB9XFxuICA6d2hlcmUoOm5vdCg6YWN0aXZlKTpmb2N1cy12aXNpYmxlKSB7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMjVzO1xcbiAgfVxcbn1cXG46d2hlcmUoOm5vdCg6YWN0aXZlKTpmb2N1cy12aXNpYmxlKSB7XFxuICBvdXRsaW5lLW9mZnNldDogNXB4O1xcbn1cXG46d2hlcmUoYm9keSkge1xcbiAgbWluLWJsb2NrLXNpemU6IDEwMCU7XFxufVxcbjp3aGVyZShoMSwgaDIsIGgzLCBoNCwgaDUsIGg2KSB7XFxuICBmb250LXdlaWdodDogdmFyKC0tZm9udC13ZWlnaHQtOSk7XFxuICBsaW5lLWhlaWdodDogdmFyKC0tZm9udC1saW5laGVpZ2h0LTEpO1xcbn1cXG46d2hlcmUoaDEpIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTgpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0xKTtcXG59XFxuOndoZXJlKGgyKSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS02KTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1oZWFkZXItMik7XFxufVxcbjp3aGVyZShoMykge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtNSk7XFxufVxcbjp3aGVyZShoNCkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtNCk7XFxufVxcbjp3aGVyZShoNSkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMyk7XFxufVxcbjp3aGVyZShoMywgaDQsIGg1LCBoNiwgZHQpIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1oZWFkZXItMyk7XFxufVxcbjp3aGVyZShwLCB1bCwgb2wsIGRsLCBoNikge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMik7XFxufVxcbjp3aGVyZShhLCB1LCBpbnMsIGFiYnIpIHtcXG4gIHRleHQtdW5kZXJsaW5lLW9mZnNldDogMXB4O1xcbn1cXG5Ac3VwcG9ydHMgKC1tb3otYXBwZWFyYW5jZTogbm9uZSkge1xcbiAgOndoZXJlKGEsIHUsIGlucywgYWJicikge1xcbiAgICB0ZXh0LXVuZGVybGluZS1vZmZzZXQ6IDJweDtcXG4gIH1cXG59XFxuOndoZXJlKGFbaHJlZl0sIGFyZWEsIGJ1dHRvbiwgaW5wdXQsIGxhYmVsW2Zvcl0sIHNlbGVjdCwgc3VtbWFyeSwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleCo9XFxcIi1cXFwiXSkpIHtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcXG59XFxuOndoZXJlKGEpIHtcXG4gIG1hcmdpbi1ibG9jazogY2FsYyh2YXIoLS1zaXplLTEpICogLTEpO1xcbiAgbWFyZ2luLWlubGluZTogY2FsYyh2YXIoLS1zaXplLTEpICogLTEpO1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0xKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTEpO1xcbn1cXG46d2hlcmUoYSk6d2hlcmUoW2hyZWZdKSB7XFxuICB0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLWluZGlnby0yKTtcXG59XFxuOndoZXJlKGEpOndoZXJlKFtocmVmXSk6d2hlcmUoOnZpc2l0ZWQpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tZ3JhcGUtMik7XFxufVxcbjp3aGVyZShhKTp3aGVyZSg6bm90KDpob3ZlcikpIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG59XFxuOndoZXJlKGltZywgc3ZnLCB2aWRlbywgY2FudmFzLCBhdWRpbywgaWZyYW1lLCBlbWJlZCwgb2JqZWN0KSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuOndoZXJlKGltZywgc3ZnLCB2aWRlbykge1xcbiAgYmxvY2stc2l6ZTogYXV0bztcXG4gIG1heC1pbmxpbmUtc2l6ZTogMTAwJTtcXG59XFxuOndoZXJlKGlucHV0LCBidXR0b24sIHRleHRhcmVhLCBzZWxlY3QpLFxcbjp3aGVyZShpbnB1dFt0eXBlPVxcXCJmaWxlXFxcIl0pOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICBmb250LXNpemU6IGluaGVyaXQ7XFxuICBsZXR0ZXItc3BhY2luZzogaW5oZXJpdDtcXG59XFxuOndoZXJlKGlucHV0LCB0ZXh0YXJlYSkge1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0xKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUoc2VsZWN0KSB7XFxuICBwYWRkaW5nLWJsb2NrOiAwLjc1Y2g7XFxuICBwYWRkaW5nLWlubGluZTogMS4yNWNoIDA7XFxufVxcbjp3aGVyZSh0ZXh0YXJlYSwgc2VsZWN0LCBpbnB1dDpub3QoYnV0dG9uLCBidXR0b25bdHlwZV0sIGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCBpbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSkpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gIDp3aGVyZSh0ZXh0YXJlYSwgc2VsZWN0LCBpbnB1dDpub3QoYnV0dG9uLCBidXR0b25bdHlwZV0sIGlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCBpbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSkpIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE3MWExYztcXG4gIH1cXG59XFxuOndoZXJlKHRleHRhcmVhKSB7XFxuICByZXNpemU6IGJsb2NrO1xcbn1cXG46d2hlcmUoaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSkge1xcbiAgYmxvY2stc2l6ZTogdmFyKC0tc2l6ZS0zKTtcXG4gIGlubGluZS1zaXplOiB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoc3ZnKSB7XFxuICBzdHJva2U6IG5vbmU7XFxuICBmaWxsOiBjdXJyZW50Q29sb3I7XFxufVxcbjp3aGVyZShzdmcpOndoZXJlKDpub3QoW2ZpbGxdKSkge1xcbiAgc3Ryb2tlOiBjdXJyZW50Q29sb3I7XFxuICBmaWxsOiBub25lO1xcbiAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcXG59XFxuOndoZXJlKHN2Zyk6d2hlcmUoOm5vdChbd2lkdGhdKSkge1xcbiAgaW5saW5lLXNpemU6IHZhcigtLXNpemUtMTApO1xcbn1cXG46d2hlcmUoY29kZSwga2JkLCBzYW1wLCBwcmUpIHtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LW1vbm8pO1xcbn1cXG46d2hlcmUoOm5vdChwcmUpID4gY29kZSwga2JkKSB7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG46d2hlcmUocHJlKSB7XFxuICBtYXgtaW5saW5lLXNpemU6IC1tb3otbWF4LWNvbnRlbnQ7XFxuICBtYXgtaW5saW5lLXNpemU6IG1heC1jb250ZW50O1xcbiAgbWluLWlubGluZS1zaXplOiAwO1xcbiAgd2hpdGUtc3BhY2U6IHByZTtcXG59XFxuOndoZXJlKDpub3QocHJlKSA+IGNvZGUpIHtcXG4gIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UtMik7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxuICBwYWRkaW5nOiB2YXIoLS1zaXplLTEpIHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShrYmQsIHZhcikge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgYm9yZGVyLXdpZHRoOiB2YXIoLS1ib3JkZXItc2l6ZS0xKTtcXG4gIHBhZGRpbmc6IHZhcigtLXNpemUtMSkgdmFyKC0tc2l6ZS0yKTtcXG59XFxuOndoZXJlKG1hcmspIHtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTEpO1xcbn1cXG46d2hlcmUob2wsIHVsKSB7XFxuICAtd2Via2l0LXBhZGRpbmctc3RhcnQ6IHZhcigtLXNpemUtOCk7XFxuICAgICAgICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTgpO1xcbn1cXG46d2hlcmUobGkpIHtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogdmFyKC0tc2l6ZS0yKTtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShsaSwgZGQsIGZpZ2NhcHRpb24pIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTIpO1xcbn1cXG46d2hlcmUocCkge1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWNvbnRlbnQtMyk7XFxufVxcbjp3aGVyZShkdCwgc3VtbWFyeSkge1xcbiAgZm9udC13ZWlnaHQ6IHZhcigtLWZvbnQtd2VpZ2h0LTcpO1xcbn1cXG46d2hlcmUoZHQ6bm90KDpmaXJzdC1vZi10eXBlKSkge1xcbiAgLXdlYmtpdC1tYXJnaW4tYmVmb3JlOiB2YXIoLS1zaXplLTUpO1xcbiAgICAgICAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IHZhcigtLXNpemUtNSk7XFxufVxcbjp3aGVyZShzbWFsbCkge1xcbiAgZm9udC1zaXplOiBtYXgoMC41ZW0sIHZhcigtLWZvbnQtc2l6ZS0wKSk7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtY29udGVudC0xKTtcXG59XFxuOndoZXJlKGhyKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ib3JkZXItc2l6ZS0yKTtcXG4gIG1hcmdpbi1ibG9jazogdmFyKC0tc2l6ZS1mbHVpZC01KTtcXG59XFxuOndoZXJlKGZpZ3VyZSkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0yKTtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XFxufVxcbjp3aGVyZShmaWd1cmUpID4gOndoZXJlKGZpZ2NhcHRpb24pIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTEpO1xcbn1cXG46d2hlcmUoYmxvY2txdW90ZSwgOm5vdChibG9ja3F1b3RlKSA+IGNpdGUpIHtcXG4gIGJvcmRlci1pbmxpbmUtc3RhcnQtd2lkdGg6IHZhcigtLWJvcmRlci1zaXplLTMpO1xcbn1cXG46d2hlcmUoYmxvY2txdW90ZSkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0zKTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTIpO1xcbiAgcGFkZGluZy1ibG9jazogdmFyKC0tc2l6ZS0zKTtcXG4gIHBhZGRpbmctaW5saW5lOiB2YXIoLS1zaXplLTQpO1xcbn1cXG46d2hlcmUoOm5vdChibG9ja3F1b3RlKSA+IGNpdGUpIHtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogdmFyKC0tc2l6ZS0yKTtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzdW1tYXJ5KSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgbWFyZ2luOiBjYWxjKHZhcigtLXNpemUtMikgKiAtMSkgY2FsYyh2YXIoLS1zaXplLTMpICogLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0yKSB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoZGV0YWlscykge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctYmxvY2s6IHZhcigtLXNpemUtMik7XFxuICBwYWRkaW5nLWlubGluZTogdmFyKC0tc2l6ZS0zKTtcXG59XFxuOndoZXJlKGRldGFpbHNbb3Blbl0gPiBzdW1tYXJ5KSB7XFxuICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IDA7XFxuICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogMDtcXG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShmaWVsZHNldCkge1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXItc2l6ZS0xKSBzb2xpZCB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbn1cXG46d2hlcmUoZGVsKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1yZWQtOSk7XFxuICBjb2xvcjogdmFyKC0tcmVkLTIpO1xcbn1cXG46d2hlcmUoaW5zKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi05KTtcXG4gIGNvbG9yOiB2YXIoLS1ncmVlbi0xKTtcXG59XFxuOndoZXJlKGFiYnIpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tYmx1ZS01KTtcXG59XFxuOndoZXJlKGRpYWxvZykge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy02KTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoZGlhbG9nKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICB9XFxufVxcbjp3aGVyZShkaWFsb2cpOjpiYWNrZHJvcCB7XFxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigyNXB4KTtcXG4gICAgICAgICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDI1cHgpO1xcbn1cXG46d2hlcmUoaHRtbFtcXFxcOmhhc1xcXFwoZGlhbG9nXFxcXFtvcGVuXFxcXF1cXFxcKV0pIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbjp3aGVyZShodG1sOmhhcyhkaWFsb2dbb3Blbl0pKSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG46d2hlcmUobWVudSkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogdmFyKC0tc2l6ZS0zKTtcXG4gIC13ZWJraXQtcGFkZGluZy1zdGFydDogMDtcXG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XFxufVxcbjp3aGVyZShzdXApIHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxufVxcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gIDpyb290IHtcXG4gICAgLS1zaGFkb3ctY29sb3I6IDIyMCA0MCUgMiU7XFxuICAgIC0tc2hhZG93LXN0cmVuZ3RoOiAyNSU7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIjxubyBzb3VyY2U+XCIsXCJ3ZWJwYWNrOi8vLi9zcmMvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUFBLG9CQUFBO0VBQUEsbUJBQUE7RUFBQSxrQkFBQTtFQUFBLGtCQUFBO0VBQUEsa0JBQUE7RUFBQSxrQkFBQTtFQUFBLGtCQUFBO0VBQUEsa0JBQUE7RUFBQSxrQkFBQTtFQUFBLDJGQUFBO0VBQUEseUJBQUE7RUFBQSxvQkFBQTtFQUFBLG1CQUFBO0VBQUEsa0JBQUE7RUFBQSxrQkFBQTtFQUFBLHNDQUFBO0VBQUEscUJBQUE7RUFBQSwwQkFBQTtFQUFBLHNCQUFBO0VBQUEsc0JBQUE7RUFBQSxzQkFBQTtFQUFBLHNCQUFBO0VBQUEsb0JBQUE7RUFBQSxzQkFBQTtFQUFBLHVCQUFBO0VBQUEsc0JBQUE7RUFBQSxzQkFBQTtFQUFBLGlCQUFBO0VBQUEsb0JBQUE7RUFBQSxtQkFBQTtFQUFBLGdCQUFBO0VBQUEsZ0JBQUE7RUFBQSxlQUFBO0VBQUEsZ0JBQUE7RUFBQSxpSUFBQTtFQUFBLHFCQUFBO0VBQUEsZUFBQTtFQUFBLHVCQUFBO0VBQUEsdUJBQUE7RUFBQSxxQkFBQTtFQUFBLGlCQUFBO0VBQUEsc0JBQUE7RUFBQSx1QkFBQTtFQUFBLHFCQUFBO0VBQUEsdUNBQUE7RUFBQSxvQkFBQTtFQUFBLHFCQUFBO0VBQUEsa0JBQUE7RUFBQSxpQkFBQTtFQUFBLGlCQUFBO0VBQUEsbUJBQUE7RUFBQSxtQkFBQTtFQUFBLGtCQUFBO0VBQUEsaUJBQUE7RUFBQTs7Ozs7OzttRkFBQTtFQUFBLDJCQUFBO0VBQUE7Q0FBQTtBQ0FB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LG9DQUFvQztBQUN0QztBQUNBO0VBQ0Usa0NBQWtDO0VBQ2xDLDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IsY0FBYztBQUNoQjtBQUNBO0VBQ0U7SUFDRSxrQ0FBa0M7RUFDcEM7QUFDRjtBQUNBO0VBQ0UsbUNBQTJCO1VBQTNCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsd0JBQXVCO1VBQXZCLHVCQUF1QjtBQUN6QjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FEM1VBO0VBQUE7SUFBQSwyQkFBQTtJQUFBO0dBQUE7Q0FBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbCxcIjp3aGVyZShodG1sKSB7XFxuICAtLWxpbms6IHZhcigtLWluZGlnby03KTtcXG4gIC0tbGluay12aXNpdGVkOiB2YXIoLS1ncmFwZS03KTtcXG4gIC0tdGV4dC0xOiB2YXIoLS1ncmF5LTkpO1xcbiAgLS10ZXh0LTI6IHZhcigtLWdyYXktNyk7XFxuICAtLXN1cmZhY2UtMTogdmFyKC0tZ3JheS0wKTtcXG4gIC0tc3VyZmFjZS0yOiB2YXIoLS1ncmF5LTIpO1xcbiAgLS1zdXJmYWNlLTM6IHZhcigtLWdyYXktMyk7XFxuICAtLXN1cmZhY2UtNDogdmFyKC0tZ3JheS00KTtcXG4gIC0tc2Nyb2xsdGh1bWItY29sb3I6IHZhcigtLWdyYXktNik7XFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7XFxuICBhY2NlbnQtY29sb3I6IHZhcigtLWxpbmspO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJsb2NrLXNpemU6IDEwMCU7XFxuICBjYXJldC1jb2xvcjogdmFyKC0tbGluayk7XFxuICBjb2xvcjogdmFyKC0tdGV4dC0yKTtcXG4gIGNvbG9yLXNjaGVtZTogbGlnaHQ7XFxuICBmb250LWZhbWlseTogdmFyKC0tZm9udC1zYW5zKTtcXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1mb250LWxpbmVoZWlnaHQtMyk7XFxuICBzY3JvbGxiYXItY29sb3I6IHZhcigtLXNjcm9sbHRodW1iLWNvbG9yKSB0cmFuc3BhcmVudDtcXG59XFxuQG1lZGlhIChkeW5hbWljLXJhbmdlOiBoaWdoKSB7XFxuICBAc3VwcG9ydHMgKGNvbG9yKGRpc3BsYXktcDMgMCAwLjUgMSkpIHtcXG4gICAgOndoZXJlKGh0bWwpIHtcXG4gICAgICAtLWxpbms6IGNvbG9yKGRpc3BsYXktcDMgMCAwLjUgMSk7XFxuICAgICAgLS1saW5rLXZpc2l0ZWQ6IGNvbG9yKGRpc3BsYXktcDMgMC42IDAuMiAxKTtcXG4gICAgfVxcbiAgfVxcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICAtLWxpbms6IHZhcigtLWluZGlnby0zKTtcXG4gICAgLS1saW5rLXZpc2l0ZWQ6IHZhcigtLWdyYXBlLTMpO1xcbiAgICAtLXRleHQtMTogdmFyKC0tZ3JheS0xKTtcXG4gICAgLS10ZXh0LTI6IHZhcigtLWdyYXktNCk7XFxuICAgIC0tc3VyZmFjZS0xOiB2YXIoLS1ncmF5LTkpO1xcbiAgICAtLXN1cmZhY2UtMjogdmFyKC0tZ3JheS04KTtcXG4gICAgLS1zdXJmYWNlLTM6IHZhcigtLWdyYXktNyk7XFxuICAgIC0tc3VyZmFjZS00OiB2YXIoLS1ncmF5LTYpO1xcbiAgICBjb2xvci1zY2hlbWU6IGRhcms7XFxuICB9XFxufVxcbjp3aGVyZShoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBkdCkge1xcbiAgY29sb3I6IHZhcigtLXRleHQtMSk7XFxufVxcbjp3aGVyZShhW2hyZWZdKSB7XFxuICBjb2xvcjogdmFyKC0tbGluayk7XFxufVxcbjp3aGVyZShhW2hyZWZdKTp2aXNpdGVkIHtcXG4gIGNvbG9yOiB2YXIoLS1saW5rLXZpc2l0ZWQpO1xcbn1cXG46Zm9jdXMtdmlzaWJsZSB7XFxuICBvdXRsaW5lLWNvbG9yOiB2YXIoLS1saW5rKTtcXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcXG4gIDp3aGVyZShodG1sKSB7XFxuICAgIC0tc2Nyb2xsdGh1bWItY29sb3I6IHZhcigtLWdyYXktNyk7XFxuICB9XFxufVxcbiosXFxuOmFmdGVyLFxcbjpiZWZvcmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuOndoZXJlKDpub3QoZGlhbG9nKSkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG46d2hlcmUoOm5vdChmaWVsZHNldCwgcHJvZ3Jlc3MsIG1ldGVyKSkge1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGJvcmRlci1ib3g7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci13aWR0aDogMDtcXG59XFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiBuby1wcmVmZXJlbmNlKSB7XFxuICA6d2hlcmUoaHRtbCkge1xcbiAgICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcXG4gIH1cXG59XFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiBuby1wcmVmZXJlbmNlKSB7XFxuICA6d2hlcmUoOmZvY3VzLXZpc2libGUpIHtcXG4gICAgdHJhbnNpdGlvbjogb3V0bGluZS1vZmZzZXQgMTQ1bXMgdmFyKC0tZWFzZS0yKTtcXG4gIH1cXG4gIDp3aGVyZSg6bm90KDphY3RpdmUpOmZvY3VzLXZpc2libGUpIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4yNXM7XFxuICB9XFxufVxcbjp3aGVyZSg6bm90KDphY3RpdmUpOmZvY3VzLXZpc2libGUpIHtcXG4gIG91dGxpbmUtb2Zmc2V0OiA1cHg7XFxufVxcbjp3aGVyZShib2R5KSB7XFxuICBtaW4tYmxvY2stc2l6ZTogMTAwJTtcXG59XFxuOndoZXJlKGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYpIHtcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1mb250LXdlaWdodC05KTtcXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1mb250LWxpbmVoZWlnaHQtMSk7XFxufVxcbjp3aGVyZShoMSkge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtOCk7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtaGVhZGVyLTEpO1xcbn1cXG46d2hlcmUoaDIpIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplLTYpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0yKTtcXG59XFxuOndoZXJlKGgzKSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS01KTtcXG59XFxuOndoZXJlKGg0KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS00KTtcXG59XFxuOndoZXJlKGg1KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS0zKTtcXG59XFxuOndoZXJlKGgzLCBoNCwgaDUsIGg2LCBkdCkge1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWhlYWRlci0zKTtcXG59XFxuOndoZXJlKHAsIHVsLCBvbCwgZGwsIGg2KSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS0yKTtcXG59XFxuOndoZXJlKGEsIHUsIGlucywgYWJicikge1xcbiAgdGV4dC11bmRlcmxpbmUtb2Zmc2V0OiAxcHg7XFxufVxcbkBzdXBwb3J0cyAoLW1vei1hcHBlYXJhbmNlOiBub25lKSB7XFxuICA6d2hlcmUoYSwgdSwgaW5zLCBhYmJyKSB7XFxuICAgIHRleHQtdW5kZXJsaW5lLW9mZnNldDogMnB4O1xcbiAgfVxcbn1cXG46d2hlcmUoYVtocmVmXSwgYXJlYSwgYnV0dG9uLCBpbnB1dCwgbGFiZWxbZm9yXSwgc2VsZWN0LCBzdW1tYXJ5LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Kj1cXFwiLVxcXCJdKSkge1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO1xcbn1cXG46d2hlcmUoYSkge1xcbiAgbWFyZ2luLWJsb2NrOiBjYWxjKHZhcigtLXNpemUtMSkgKiAtMSk7XFxuICBtYXJnaW4taW5saW5lOiBjYWxjKHZhcigtLXNpemUtMSkgKiAtMSk7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTEpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMSk7XFxufVxcbjp3aGVyZShhKTp3aGVyZShbaHJlZl0pIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0taW5kaWdvLTIpO1xcbn1cXG46d2hlcmUoYSk6d2hlcmUoW2hyZWZdKTp3aGVyZSg6dmlzaXRlZCkge1xcbiAgdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiB2YXIoLS1ncmFwZS0yKTtcXG59XFxuOndoZXJlKGEpOndoZXJlKDpub3QoOmhvdmVyKSkge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcbn1cXG46d2hlcmUoaW1nLCBzdmcsIHZpZGVvLCBjYW52YXMsIGF1ZGlvLCBpZnJhbWUsIGVtYmVkLCBvYmplY3QpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG46d2hlcmUoaW1nLCBzdmcsIHZpZGVvKSB7XFxuICBibG9jay1zaXplOiBhdXRvO1xcbiAgbWF4LWlubGluZS1zaXplOiAxMDAlO1xcbn1cXG46d2hlcmUoaW5wdXQsIGJ1dHRvbiwgdGV4dGFyZWEsIHNlbGVjdCksXFxuOndoZXJlKGlucHV0W3R5cGU9XFxcImZpbGVcXFwiXSk6Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgZm9udDogaW5oZXJpdDtcXG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcXG4gIGxldHRlci1zcGFjaW5nOiBpbmhlcml0O1xcbn1cXG46d2hlcmUoaW5wdXQsIHRleHRhcmVhKSB7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTEpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzZWxlY3QpIHtcXG4gIHBhZGRpbmctYmxvY2s6IDAuNzVjaDtcXG4gIHBhZGRpbmctaW5saW5lOiAxLjI1Y2ggMDtcXG59XFxuOndoZXJlKHRleHRhcmVhLCBzZWxlY3QsIGlucHV0Om5vdChidXR0b24sIGJ1dHRvblt0eXBlXSwgaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdKSkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG59XFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgOndoZXJlKHRleHRhcmVhLCBzZWxlY3QsIGlucHV0Om5vdChidXR0b24sIGJ1dHRvblt0eXBlXSwgaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdKSkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTcxYTFjO1xcbiAgfVxcbn1cXG46d2hlcmUodGV4dGFyZWEpIHtcXG4gIHJlc2l6ZTogYmxvY2s7XFxufVxcbjp3aGVyZShpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdKSB7XFxuICBibG9jay1zaXplOiB2YXIoLS1zaXplLTMpO1xcbiAgaW5saW5lLXNpemU6IHZhcigtLXNpemUtMyk7XFxufVxcbjp3aGVyZShzdmcpIHtcXG4gIHN0cm9rZTogbm9uZTtcXG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG59XFxuOndoZXJlKHN2Zyk6d2hlcmUoOm5vdChbZmlsbF0pKSB7XFxuICBzdHJva2U6IGN1cnJlbnRDb2xvcjtcXG4gIGZpbGw6IG5vbmU7XFxuICBzdHJva2UtbGluZWNhcDogcm91bmQ7XFxuICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xcbn1cXG46d2hlcmUoc3ZnKTp3aGVyZSg6bm90KFt3aWR0aF0pKSB7XFxuICBpbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS0xMCk7XFxufVxcbjp3aGVyZShjb2RlLCBrYmQsIHNhbXAsIHByZSkge1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtbW9ubyk7XFxufVxcbjp3aGVyZSg6bm90KHByZSkgPiBjb2RlLCBrYmQpIHtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcbjp3aGVyZShwcmUpIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogbWF4LWNvbnRlbnQ7XFxuICBtaW4taW5saW5lLXNpemU6IDA7XFxuICB3aGl0ZS1zcGFjZTogcHJlO1xcbn1cXG46d2hlcmUoOm5vdChwcmUpID4gY29kZSkge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmc6IHZhcigtLXNpemUtMSkgdmFyKC0tc2l6ZS0yKTtcXG59XFxuOndoZXJlKGtiZCwgdmFyKSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLXN1cmZhY2UtNCk7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtMik7XFxuICBib3JkZXItd2lkdGg6IHZhcigtLWJvcmRlci1zaXplLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0xKSB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUobWFyaykge1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtMSk7XFxufVxcbjp3aGVyZShvbCwgdWwpIHtcXG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTgpO1xcbn1cXG46d2hlcmUobGkpIHtcXG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiB2YXIoLS1zaXplLTIpO1xcbn1cXG46d2hlcmUobGksIGRkLCBmaWdjYXB0aW9uKSB7XFxuICBtYXgtaW5saW5lLXNpemU6IHZhcigtLXNpemUtY29udGVudC0yKTtcXG59XFxuOndoZXJlKHApIHtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTMpO1xcbn1cXG46d2hlcmUoZHQsIHN1bW1hcnkpIHtcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1mb250LXdlaWdodC03KTtcXG59XFxuOndoZXJlKGR0Om5vdCg6Zmlyc3Qtb2YtdHlwZSkpIHtcXG4gIG1hcmdpbi1ibG9jay1zdGFydDogdmFyKC0tc2l6ZS01KTtcXG59XFxuOndoZXJlKHNtYWxsKSB7XFxuICBmb250LXNpemU6IG1heCgwLjVlbSwgdmFyKC0tZm9udC1zaXplLTApKTtcXG4gIG1heC1pbmxpbmUtc2l6ZTogdmFyKC0tc2l6ZS1jb250ZW50LTEpO1xcbn1cXG46d2hlcmUoaHIpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMyk7XFxuICBoZWlnaHQ6IHZhcigtLWJvcmRlci1zaXplLTIpO1xcbiAgbWFyZ2luLWJsb2NrOiB2YXIoLS1zaXplLWZsdWlkLTUpO1xcbn1cXG46d2hlcmUoZmlndXJlKSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTIpO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG59XFxuOndoZXJlKGZpZ3VyZSkgPiA6d2hlcmUoZmlnY2FwdGlvbikge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNpemUtMSk7XFxufVxcbjp3aGVyZShibG9ja3F1b3RlLCA6bm90KGJsb2NrcXVvdGUpID4gY2l0ZSkge1xcbiAgYm9yZGVyLWlubGluZS1zdGFydC13aWR0aDogdmFyKC0tYm9yZGVyLXNpemUtMyk7XFxufVxcbjp3aGVyZShibG9ja3F1b3RlKSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbiAgbWF4LWlubGluZS1zaXplOiB2YXIoLS1zaXplLWNvbnRlbnQtMik7XFxuICBwYWRkaW5nLWJsb2NrOiB2YXIoLS1zaXplLTMpO1xcbiAgcGFkZGluZy1pbmxpbmU6IHZhcigtLXNpemUtNCk7XFxufVxcbjp3aGVyZSg6bm90KGJsb2NrcXVvdGUpID4gY2l0ZSkge1xcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShzdW1tYXJ5KSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLTMpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbiAgbWFyZ2luOiBjYWxjKHZhcigtLXNpemUtMikgKiAtMSkgY2FsYyh2YXIoLS1zaXplLTMpICogLTEpO1xcbiAgcGFkZGluZzogdmFyKC0tc2l6ZS0yKSB2YXIoLS1zaXplLTMpO1xcbn1cXG46d2hlcmUoZGV0YWlscykge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZS0yKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0yKTtcXG4gIHBhZGRpbmctYmxvY2s6IHZhcigtLXNpemUtMik7XFxuICBwYWRkaW5nLWlubGluZTogdmFyKC0tc2l6ZS0zKTtcXG59XFxuOndoZXJlKGRldGFpbHNbb3Blbl0gPiBzdW1tYXJ5KSB7XFxuICBib3JkZXItZW5kLWVuZC1yYWRpdXM6IDA7XFxuICBib3JkZXItZW5kLXN0YXJ0LXJhZGl1czogMDtcXG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXNpemUtMik7XFxufVxcbjp3aGVyZShmaWVsZHNldCkge1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXItc2l6ZS0xKSBzb2xpZCB2YXIoLS1zdXJmYWNlLTQpO1xcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzLTIpO1xcbn1cXG46d2hlcmUoZGVsKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1yZWQtOSk7XFxuICBjb2xvcjogdmFyKC0tcmVkLTIpO1xcbn1cXG46d2hlcmUoaW5zKSB7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1ncmVlbi05KTtcXG4gIGNvbG9yOiB2YXIoLS1ncmVlbi0xKTtcXG59XFxuOndoZXJlKGFiYnIpIHtcXG4gIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tYmx1ZS01KTtcXG59XFxuOndoZXJlKGRpYWxvZykge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc3VyZmFjZS0xKTtcXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cy0zKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLXNoYWRvdy02KTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICA6d2hlcmUoZGlhbG9nKSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1cmZhY2UtMik7XFxuICB9XFxufVxcbjp3aGVyZShkaWFsb2cpOjpiYWNrZHJvcCB7XFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMjVweCk7XFxufVxcbjp3aGVyZShodG1sW1xcXFw6aGFzXFxcXChkaWFsb2dcXFxcW29wZW5cXFxcXVxcXFwpXSkge1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuOndoZXJlKGh0bWw6aGFzKGRpYWxvZ1tvcGVuXSkpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbjp3aGVyZShtZW51KSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiB2YXIoLS1zaXplLTMpO1xcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDA7XFxufVxcbjp3aGVyZShzdXApIHtcXG4gIGZvbnQtc2l6ZTogMC41ZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIlwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgJy4vZ2FtZWJvYXJkLmpzJztcblxuLy8gY29uc3QgdGVzdE1hcCA9IG5ldyBNYXAoKTtcblxuLy8gdGVzdE1hcC5zZXQoMSwgdHJ1ZSk7XG4vLyB0ZXN0TWFwLnNldCgyLCB0cnVlKTtcbi8vIHRlc3RNYXAuc2V0KDMsIGZhbHNlKTtcblxuLy8gY29uc29sZS5sb2codGVzdE1hcCk7XG5cbi8vIGNvbnNvbGUubG9nKHRlc3RNYXAuZ2V0KDIpKTtcbi8vIGNvbnNvbGUubG9nKHRlc3RNYXAuZ2V0KDQpKTtcbiJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZWJvYXJkIiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJjZWxscyIsImJ1aWxkQm9hcmQiLCJib2FyZCIsIk1hcCIsImkiLCJqIiwiY29vcmQiLCJzZXQiLCJzaGlwIiwiaXNIaXQiLCJnZXRTaGlwIiwiY29vcmRzIiwiZ2V0Iiwic2hpcENhbkJlQWRkZWQiLCJvcmllbnRhdGlvbiIsImNlbGxzVG9Db3ZlciIsInN0YXJ0aW5nQ2VsbENvb3JkcyIsInNwbGl0IiwicHVzaCIsInZhbGlkIiwiZXZlcnkiLCJrZXkiLCJoYXMiLCJhZGRTaGlwIiwic2hpcFRvQWRkIiwiZm9yRWFjaCIsImNlbGwiLCJnYW1lYm9hcmQiLCJjb25zb2xlIiwibG9nIiwiaGl0cyIsImhpdCIsImlzU3VuayJdLCJzb3VyY2VSb290IjoiIn0=