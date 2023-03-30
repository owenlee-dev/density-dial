// build sliders
// Figure out conversion
// grid lines

// Density 2000= 10 trees/plot = 2.23m spacing --> 2.1em
// Density 1800= 9 trees/plot = 2.36m spacing --> 2.5em
// Density 1600= 8 trees/plot = 2.5m spacing --> 2.8em
// Density 1400= 7 trees/plot = 2.7m spacing --> 3em
// Density 1200= 6 trees/plot = 2.9m spacing --> 3.8em
// Density 1000= 5 trees/plot = 3.16m spacing -->
// Density 800= 4 trees/plot = 3.8m spacing

let lineInterpolation = (emValue) => {
  return (
    -1.14608 * (emValue ^ 6) +
    32.6147 * (emValue ^ 5) -
    382.262 * (emValue ^ 4) +
    2361.3 * (emValue ^ 3) -
    8107.34 * (emValue ^ 2) +
    14672.3 * emValue -
    10936.4
  ).toFixed(2);
};

const treeSpacing = document.querySelector(".tree-spacing");
const treeSlider = document.querySelector(".tree-range-slider");

const lineSpacing = document.querySelector(".line-spacing");
const lineSlider = document.querySelector(".line-range-slider");

const gridSlider = document.querySelector(".grid-range-slider");
const gridSpacing = document.querySelector(".grid-spacing");

const treeGrid = document.querySelector(".grid-container");

treeSlider.addEventListener("input", (event) => {
  treeGrid.style.rowGap = event.target.value + "em";
});

lineSlider.addEventListener("input", (event) => {
  treeGrid.style.columnGap = event.target.value + "em";
});

gridSlider.addEventListener("input", (event) => {
  treeGrid.style.columnGap = event.target.value + "em";
  treeGrid.style.rowGap = event.target.value + "em";
});
