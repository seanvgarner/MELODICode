import DrumCell from './drum_cell';

class DrumGrid {
  constructor(parentContainer) {
    this.isMouseDown = false;
    this.parentContainer = parentContainer;
    this.rows = new Array(4);
    this.drumGridElement = $(document.createElement("div"));
    this.drumTypes = ["KICK", "SNARE", "CLAP", "HAT"];
    this.createGrid();
  }

  createGrid() {
    for (let i = 0; i < 4; i++) {
      this.rows[i] = [];
      for (let j = 0; j < 16; j++) {
        const drumCellContainer = document.createElement("div");
        const $drumCellContainer = $(drumCellContainer);
        const drumCell = new DrumCell($drumCellContainer, this.drumTypes[i]);
        $drumCellContainer.addClass("drum-cell");
        drumCellContainer.drumCell = drumCell;
        this.rows[i].push(drumCell);
        this.addActivationHandlers($drumCellContainer);
        this.drumGridElement.append($drumCellContainer);
      }
    }

    this.drumGridElement.addClass("filled-drum-grid group");
    this.parentContainer.append(this.drumGridElement);
  }

  addActivationHandlers($drumCellContainer) {
    $drumCellContainer.on("click", (e) => {
      e.currentTarget.drumCell.toggleActive();
    });

    $drumCellContainer.mouseenter((e) => {

      if( this.isMouseDown ) {
        e.currentTarget.drumCell.toggleActive();
      }
    });
  }

}

export default DrumGrid;
