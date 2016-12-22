import Tone from 'Tone';
import Grid from './grid';
import DrumGrid from './drum_grid';

$(() => {

  const synth = new Tone.PolySynth(16, Tone.MonoSynth, {
    "oscillator": { "type": "sine"},
    "envelope": {
        "attack": 0.093,
        "decay": 0.3,
        "sustain":0.3,
        "release": 0.8,
        }
  }).toMaster();
  const drums = new Tone.MultiPlayer({
        urls : {
          "KICK" : "./sounds/snare.wav",
          "SNARE" : "./sounds/snare.wav",
          "CLAP" : "./sounds/clap.wav",
          "HAT" : "./sounds/hat.wav",
        },
        volume : -10,
        fadeOut : 0.1,
      }).toMaster();
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
  const drumGrid = new DrumGrid($drumContainer, drums);

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

  },[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");


  Tone.Transport.start();
  Tone.Transport.bpm.value = 140;
  const $playBtn = $(".play-btn");
  const $pauseBtn = $(".pause-btn");

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
  });

  $("#tempo-slider").change((e) => {
    const newTempo = parseInt(e.currentTarget.value);
    Tone.Transport.bpm.value = newTempo;
  });

});
