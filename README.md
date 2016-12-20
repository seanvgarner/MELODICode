## MELODICode

### Background

MELODICode is inspired by a musical **loop sequencer**. A typical version of a sequencer would be something you would see in a music DAW like FL Studio or Ableton Live. Typically, there is a rectangular grid. Each row on the grid corresponds to a specific tone. Usually the higher rows represent higher pitches. Each cell on the grid acts as a trigger for that tone but by default  they are inactive. The user has the ability to selectively activate each cell. When the user presses play, a time bar scans across the grid from left to right triggering any active cells when it reaches them and repeats in a loop until the user pauses/stops.

### Functionality & MVP  

With this musical loop sequencer, users will be able to:

- [ ] Start, pause the looping time bar.
- [ ] Activate cells to create a melody line of their choosing
- [ ] Increase/ Decrease tempo with a slide bar.
- [ ] In real time be able to change the melody while the sequences is looping

In addition, this project will include:

- [ ] Instructions modal
- [ ] A production README

### Wireframes

This app will consist of a single screen with a graphical interface for the sequencer cells, a play/pause button at the bottom and a tempo slide bar. The grid by default will not display inactive cells, but when the user clicks on a cell, it will highlight a color to show it is active. The left side of the interface will show a stylized piano roll so users know what rows correspond to what pitches. A button on the bottom right will toggle the instructions modal.

![wireframes](/docs/main_wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Sound.js` or `Tone.js` for the ability to store sounds in each cell
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`grid.js`: this script will handle the logic for updating the necessary elements and rendering them to the DOM.

`sequencer.js`: this script will handle the logic of looping through the grid and triggering the sound for active cells.

`cell.js`: this script will house the structure each `Cell` and what tone they are mapped to.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Tone.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all scripts outlined above.  Learn the basics of `Tone.js` and/or `Sound.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Tone.js` to have a sound played (maybe upon clicking something)

**Day 2**: First, build out the `Cell` object to connect to the `grids` object. Build in the ability to toggle the active/inactive states on click for each cell.  Goals for the day:

- Complete the `cell.js` module (constructor, active sound functions)
- Render a square grid to the DOM
- Make each cell in the grid clickable, toggling the state of the square on click

**Day 3**: Implement tempo. Allow the slowing and speeding up of tempo. Goals for the day:

- Finish any last grid/ cell logic.
- Implement logic to increase or decrease tempo.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add option to extend the loop length (larger grid).
- [ ] Different instrument sound options.
- [ ] Allow possibility of building multiple small sequences and combining them for a longer sequence.
