// build sliders
// Figure out conversion
// grid lines

// Density 2000= 10 trees/plot = 2.23m spacing
// Density 1800= 9 trees/plot = 2.36m spacing
// Density 1600= 8 trees/plot = 2.5m spacing
// Density 1400= 7 trees/plot = 2.7m spacing  
// Density 1200= 6 trees/plot = 2.9m spacing
// Density 1000= 5 trees/plot = 3.16m spacing
// Density 800= 4 trees/plot = 3.8m spacing

const meter = 21;

const plotValue = document.querySelector(".plot-value");
const sph = document.querySelector(".sph");

const stepSlider=document.querySelector(".step-slider");
const stepLength=document.querySelector(".step-length");
const numSteps=document.querySelector(".step-value");

const treeSpacing = document.querySelector(".tree-spacing");
const treeSlider = document.querySelector(".tree-range-slider");

const lineSpacing = document.querySelector(".line-spacing");
const lineSlider = document.querySelector(".line-range-slider");

const gridSlider = document.querySelector(".grid-range-slider");
const gridSpacing = document.querySelector(".grid-spacing");

const treeGrid = document.querySelector(".grid-container");

//initialize spcaing
treeGrid.style.columnGap = 2.7 * meter + "px";
treeGrid.style.rowGap = 2.7 * meter + "px";

// stsep spacing
stepSlider.addEventListener("input", (event) => {
  stepLength.innerHTML = (event.target.value*1).toFixed(1);
  numSteps.innerHTML=(treeSpacing.innerHTML/stepLength.innerHTML).toFixed(1);
});

// tree spacing
treeSlider.addEventListener("input", (event) => {
  treeGrid.style.rowGap = event.target.value * meter + "px";
  treeSpacing.innerHTML = event.target.value;
  sph.innerHTML=Math.round((100/treeSpacing.innerHTML)*(100/lineSpacing.innerHTML));
  plotValue.innerHTML=Math.round((sph.innerHTML/200)*100)/100;
  numSteps.innerHTML=Math.round((treeSpacing.innerHTML/stepLength.innerHTML)*10)/10;

});

// line spacing
lineSlider.addEventListener("input", (event) => {
  treeGrid.style.columnGap = event.target.value * meter + "px";
  lineSpacing.innerHTML = event.target.value;
  sph.innerHTML=Math.round((100/treeSpacing.innerHTML)*(100/lineSpacing.innerHTML));
  plotValue.innerHTML=Math.round((sph.innerHTML/200)*100)/100;
  numSteps.innerHTML=Math.round((treeSpacing.innerHTML/stepLength.innerHTML)*10)/10;

});
