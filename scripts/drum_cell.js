class DrumCell {
  constructor(parentContainer, drumType) {
    this.parentContainer = parentContainer;
    this.drumType = drumType;
    this.active = false;
  }

  toggleActive() {
    if (this.active) {
      this.active = false;
      this.parentContainer.removeClass("drum-active");
    } else {
      this.active = true;
      this.parentContainer.addClass("drum-active");
    }
  }
}

export default DrumCell;
