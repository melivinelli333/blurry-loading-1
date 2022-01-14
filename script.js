// Get two elements together: text and background
const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0

// run every 30milesecond
let int = setInterval(blurring, 30)

function blurring() {
  // increment by 1
  load++

  if (load > 99) {
      //stop when gets to 100
    clearInterval(int)
  }

  // starts to load when is fading 0-100
  loadText.innerText = `${load}%`
// Number shows from full to nothing - fades away
  loadText.style.opacity = scale(load, 0, 100, 1, 0)
  // bg image goes from blur of 30px to 0 at the same time that the load goes from 0 to a 100. Same with opacity
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}
  // opacity use Stack Overflow map range https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}



// Links to Nasa page
function pFunction() {
  location.assign("https://solarsystem.nasa.gov/planets/overview/");
}