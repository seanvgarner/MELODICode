import noteConstants from './note_constants';
import Cell from './cell';

class Grid {
  constructor(parentContainer, synth) {
    this.isMouseDown = false;
    this.parentContainer = parentContainer;
    this.synth = synth;
    this.rows = new Array(16);
    this.gridElement = $(document.createElement("div"));
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < 16; i++) {
      this.rows[i] = [];
      for (let j = 0; j < 16; j++) {
        const cellContainer = document.createElement("div");
        const $cellContainer = $(cellContainer);
        const cell = new Cell($cellContainer, noteConstants[i], this.synth);
        $cellContainer.addClass("cell");
        cellContainer.cell = cell;
        this.rows[i].push(cell);

        this.addActivationHandlers($cellContainer);
        this.gridElement.append($cellContainer);
      }
    }

    this.gridElement.addClass("filled-grid group");
    this.parentContainer.append(this.gridElement);
  }

  addActivationHandlers($cellContainer) {
    $cellContainer.on("click", (e) => {
      e.currentTarget.cell.toggleActive();
    });

    $cellContainer.mouseenter((e) => {

      if( this.isMouseDown ) {
        e.currentTarget.cell.toggleActive();
      }
    });

  }

}

export default Grid;
