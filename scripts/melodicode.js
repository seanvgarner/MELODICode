import Tone from 'Tone';
import Grid from './grid';
import DrumGrid from './drum_grid';
import { breakdownGrid, breakdownDrums,
        grooveGrid, grooveDrums,
        convergeGrid, convergeDrums,
        strollingGrid, strollingDrums } from './preset_constants';

$(() => {
  const freeverb = new Tone.Freeverb().toMaster();
  const synth = new Tone.PolySynth(16, Tone.MonoSynth, {
    "oscillator": { "type": "triangle"},
    "envelope": {
        "attack": 0.06,
        "decay": 0.3,
        "sustain":0.3,
        "release": 0.9,
    },
    "volume": -5
  }).connect(freeverb);
  const kick = new Audio("./scripts/sounds/kick.wav");
  const snare = new Audio("./scripts/sounds/snare.wav");
  const clap = new Audio("./scripts/sounds/clap.wav");
  const hat = new Audio("./scripts/sounds/hat.wav");

  const $gridContainer = $("#grid-container");
  const $drumContainer = $("#drum-container");
  const $timeBar = $("#time-bar");
  const timeCellArr = [];
  for (let i = 0; i < 16; i++) {
    const timeBarCell = document.createElement("div");
    const $timeBarCell = $(timeBarCell);
    $timeBarCell.addClass("time-bar-cell");
    timeCellArr.push($timeBarCell);
    $timeBar.append($timeBarCell);
  }

  const grid = new Grid($gridContainer, synth);
  const drumGrid = new DrumGrid($drumContainer);

  $(document).mousedown(() => {
    grid.isMouseDown = true;
  }).mouseup(() => {
    grid.isMouseDown = false;
  });

  const mappedColumns = grid.rows[0].map(function(col, i) {
    return grid.rows.map(function(row) {
      return row[i];
    });
  });

  const mappedDrums = drumGrid.rows[0].map(function(col, i) {
    return drumGrid.rows.map(function(row) {
      return row[i];
    });
  });


  const loop = new Tone.Sequence((time, col) => {

    for (let i = 0; i < 16; i++) {
      const column = mappedColumns[col];
      const currentTimeCell = timeCellArr[col];

      let previousColumn = mappedColumns[col - 1];
      let previousTimeCell = timeCellArr[col - 1];

      if (col === 0) {
        previousColumn = mappedColumns[15];
        previousTimeCell = timeCellArr[15];
      }
      previousTimeCell.removeClass("light");
      currentTimeCell.addClass("light");
      if (column[i].active) {
        column[i].parentContainer.addClass("hit");
        column[i].playNote();
      }
      previousColumn[i].parentContainer.removeClass("hit");
    }

    for (let i = 0; i < 4; i++) {
      const currentDrum = mappedDrums[col];
      let previousDrum = mappedDrums[col - 1];

      if(col === 0) {
        previousDrum = mappedDrums[15];
      }

      if (currentDrum[i].active) {
        currentDrum[i].parentContainer.addClass("drum-hit");
        switch (currentDrum[i].drumType) {
          case "KICK":
            kick.play();
            break;
          case "SNARE":
            snare.play();
            break;
          case "CLAP":
            clap.play();
            break;
          case "HAT":
            hat.play();
        }
      }
      previousDrum[i].parentContainer.removeClass("drum-hit");
    }

  },[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");


  Tone.Transport.start();
  Tone.Transport.bpm.value = 140;

  // Control buttons:
  const $playBtn = $(".play-btn");
  const $pauseBtn = $(".pause-btn");
  const $clearBtn = $(".clear-btn");
  const $demoBtn = $(".demo-btn");
  const $infoBtn = $(".info-btn");
  const $closeInfoBtn = $(".panel-close");

  $playBtn.on("click", () => {

      loop.start();
  });

  $pauseBtn.on("click", () => {
    loop.stop();

    timeCellArr.forEach((timeCell) => {
      timeCell.removeClass("light");
    });
    grid.rows.forEach((row) => {
      row.forEach((noteCell) => {
        noteCell.parentContainer.removeClass("hit");
      });
    });

    drumGrid.rows.forEach((row) => {
      row.forEach((drumCell) => {
        drumCell.parentContainer.removeClass("drum-hit");
      });
    });
  });

  $clearBtn.on("click", () => {
    grid.clear();
    drumGrid.clear();
  });

  $demoBtn.on("click", (e) => {
    const clickedButton = e.currentTarget.innerHTML;
    let demoGrid;
    let demoDrums;
    switch(clickedButton) {
      case "Breakdown":
        demoGrid = breakdownGrid;
        demoDrums = breakdownDrums;
        break;
      case "Groove":
        demoGrid = grooveGrid;
        demoDrums = grooveDrums;
        break;
      case "Converge":
        demoGrid = convergeGrid;
        demoDrums = convergeDrums;
        break;
      case "Strolling":
        demoGrid = strollingGrid;
        demoDrums = strollingDrums;
        break;
    }
    grid.clear();
    drumGrid.clear();

    demoGrid.forEach((coords) => {
      grid.rows[coords[0]][coords[1]].toggleActive();
    });
    demoDrums.forEach((coords) => {
      drumGrid.rows[coords[0]][coords[1]].toggleActive();
    });
  });

  $("#tempo-slider").change((e) => {
    const newTempo = parseInt(e.currentTarget.value);
    Tone.Transport.bpm.value = newTempo;
  });

  $infoBtn.on("click", () => {
    $(".panel").addClass("is-visible");
    $("body").addClass("no-scroll");
  });

  $closeInfoBtn.on("click", () => {
    $(".panel").removeClass("is-visible");
    $("body").removeClass("no-scroll");
  });

  $(".logo-title").on("mouseenter", function() {
    const el = $(".logo-container"),
    newone = el.clone(true);

    el.before(newone);

    $(".logo-container:last").remove();
  });

});
