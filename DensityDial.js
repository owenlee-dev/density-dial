// Density 2000= 10 trees/plot = 2.4m spacing
// Density 1800= 9 trees/plot = 2.5m spacing
// Density 1600= 8 trees/plot = 2.7m spacing
// Density 1400= 7 trees/plot = 2.9m spacing
// Density 1200= 6 trees/plot = 3.1m spacing
// Density 1000= 5 trees/plot = 3.4m spacing
// Density 800= 4 trees/plot = 3.8m spacing

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SELECT HTML ELEMENTS
const meter = 26;

const plotValue = document.querySelector(".plot-value");
const sph = document.querySelector(".sph");
const switchBox = document.querySelector(".switch-box");
const plotChord = document.querySelector(".plot-chord");

const stepSlider = document.querySelector(".step-slider");
const stepLength = document.querySelector(".step-length");
const numSteps = document.querySelector(".step-value");

const triangularSpacing = document.querySelector(".triangle-spacing");
const triangularSlider = document.querySelector(".triangle-range-slider");

const treeSpacing = document.querySelector(".tree-spacing");
const treeSlider = document.querySelector(".tree-range-slider");

const lineSpacing = document.querySelector(".line-spacing");
const lineSlider = document.querySelector(".line-range-slider");

const gridSlider = document.querySelector(".grid-range-slider");
const gridSpacing = document.querySelector(".grid-spacing");

const treeGrid = document.querySelector(".grid-container");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//initialize spcaing
treeGrid.style.columnGap = (2.9 * meter) / 2 + "px";
treeGrid.style.rowGap = (2.9 * meter) / 2 + "px";

// step spacing
stepSlider.addEventListener("input", (event) => {
  stepLength.innerHTML = (event.target.value * 1).toFixed(1);
  numSteps.innerHTML = (
    triangularSpacing.innerHTML / stepLength.innerHTML
  ).toFixed(1);
});

// show trees switch
switchBox.addEventListener("input", (event) => {
  if (plotChord.style.overflow == "visible") {
    plotChord.style.overflow = "hidden";
  } else {
    plotChord.style.overflow = "visible";
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Helper function to loop through all the coordinates
const throwPlot = (grid, POx, POy) => {
  let numTrees = 0;
  let Ty, Tx;
  let k = true;
  let spacing = triangularSpacing.innerHTML;
  // loop vertical
  for (let i = 0; i < grid.length; i++) {
    if (k) {
      k = false;
    } else {
      k = true;
    }
    // loop horizontal
    for (let j = 0; j < grid[0].length; j++) {
      Tx = grid[i][j][0] * spacing;
      if (k) {
        Ty = grid[i][j][1] * spacing + spacing / 2;
      } else {
        Ty = grid[i][j][1] * spacing;
      }
      if ((POy - Ty) ** 2 + (POx - Tx) ** 2 <= 3.99 ** 2) {
        numTrees++;
      }
    }
  }
  return numTrees;
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const doTheThing = () => {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // DENSITY DISTRIBUTION CALCULATION
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // grid 20x20 grid of coordinates
  let grid = new Array(20);
  let spacing = triangularSpacing.innerHTML;

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(20);
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = [i, j];
    }
  }

  let plotList = {};

  let PO = grid[9][9];
  let POx = Math.round(PO[0] * spacing * 10) / 10;
  let POy = Math.round(PO[1] * spacing * 10) / 10;
  // loop through every square cm of the chosen area and throw a plot
  for (let i = POx; i < POx + Number(spacing); i += 0.1) {
    for (let j = POy; j < POy + Number(spacing); j += 0.1) {
      let plot = throwPlot(grid, i, j);

      // if plot already exists in plot list -> increment
      // if not, add to plot list and increment
      if (plot in plotList) {
        plotList[plot] += 1;
      } else {
        plotList[plot] = 1;
      }
    }
  }

  // results
  const values = Object.values(plotList);
  const totalNumPlots = values.reduce(function (a, b) {
    return +a + +b;
  });
  let plotPercents = {};
  for (plot in plotList) {
    plotPercents[plot] = (plotList[plot] / totalNumPlots) * 100;
  }
  return plotPercents;
};
let plotPercents = doTheThing();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PLOT RESULTS
let chartElement = document.getElementById("plot-chart");
let config = {
  type: "bar",
  data: {
    labels: Object.keys(plotPercents),
    datasets: [
      {
        label: "Frequency of plot (%)",
        data: Object.values(plotPercents),
      },
    ],
  },
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "% Frequency of plot",
        },
      },
      x: {
        title: {
          display: true,
          text: "Number of trees in plot",
        },
      },
    },
  },
};
let plotChart = new Chart(chartElement, config);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// EVENT LISTENERS
// When changing the tree spacing
// treeSlider.addEventListener("input", (event) => {
//   treeGrid.style.rowGap = event.target.value * meter + "px";
//   triangularSpacing.innerHTML = event.target.value;
//   sph.innerHTML = Math.round(
//     (100 / triangularSpacing.innerHTML) * (100 / triangularSpacing.innerHTML)
//   );
//   plotValue.innerHTML = Math.round((sph.innerHTML / 200) * 100) / 100;
//   numSteps.innerHTML =
//     Math.round((triangularSpacing.innerHTML / stepLength.innerHTML) * 10) / 10;
//   let plotPercents = doTheThing();
//   plotChart.config.data = {
//     labels: Object.keys(plotPercents),
//     datasets: [
//       {
//         label: "Frequency of plot (%)",
//         data: Object.values(plotPercents),
//       },
//     ],
//   };
//   plotChart.update();
// });

// When changing the line spacing
triangularSlider.addEventListener("input", (event) => {
  // expand grid of trees
  treeGrid.style.columnGap = (event.target.value / 2) * meter + "px";
  treeGrid.style.rowGap = (event.target.value / 2) * meter + "px";

  // update the slider label
  triangularSpacing.innerHTML = event.target.value;

  //update the slider container
  sph.innerHTML = Math.round(
    2 / triangularSpacing.innerHTML ** 2 / Math.sqrt(3) / 0.0001
  );
  plotValue.innerHTML = Math.round((sph.innerHTML / 200) * 100) / 100;
  numSteps.innerHTML =
    Math.round((triangularSpacing.innerHTML / stepLength.innerHTML) * 10) / 10;

  let plotPercents = doTheThing();
  plotChart.config.data = {
    labels: Object.keys(plotPercents),
    datasets: [
      {
        label: "Frequency of plot (%)",
        data: Object.values(plotPercents),
      },
    ],
  };
  plotChart.update();
});
