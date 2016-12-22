
class Cell {
  constructor(parentContainer, note, synth) {
    this.parentContainer = parentContainer;
    this.note = note;
    this.synth = synth;
    this.active = false;
  }

  playNote() {
    if ( this.active ) {
      this.synth.triggerAttackRelease(this.note, "8n");
    }
  }

  toggleActive() {
    if (this.active) {
      this.active = false;
      this.parentContainer.removeClass("active");
    } else {
      this.active = true;
      this.parentContainer.addClass("active");
    }
  }
}

export default Cell;
