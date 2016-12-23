class DrumCell {
  constructor(parentContainer, drumType) {
    this.parentContainer = parentContainer;
    this.drumType = drumType;
    this.active = false;
  }

  // playDrum() {
  //   if (this.active) {
  //     const vel = Math.random() * 0.5 + 0.5;
  //     this.drums.start(this.drumType, "8n", 0, "8n", 0, vel);
  //   }
  // }

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
