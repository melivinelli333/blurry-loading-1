// Blurry page first page
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

// Planets revolve around the sun - These 4 arrays are linked together on the basis of index: planets, p_radii, p_radians, p_velocites
// Place planets at their position using parametric equations and change the value of angle
const planets = document.querySelectorAll('.planet')
// array which contains the orbital radii 'r' of planets (assumed values)
const p_radii = [22,33,50,70,112,138,165,190]
// array that contais the values of angles. Initial values of 8 angles is set to 0 radians
let p_radians = new Array(8).fill(0)
// array that contains the orbital velocities of planets relative to earth (real world values)
const p_velocities = [1.607,1.174,1,0.802,0.434,0.323,0.228,0.182] 

// Saving the reference of #moon elem in a variable 'moon'
const moon = document.querySelector('#moon')
// stores the value of orbital radius of moon (assumed value)
const m_radius = 8
// stores the value of angle '0' in radians made by the center of the moon and the center of earth with the X axis, initial value is set to '0'
let m_radians = 0
// orbital velocity of moon relative to the earth (assumed value)
const m_velocity = 10

// Saving the references of all .p-orbit elems in a variable
const p_orbits = document.querySelectorAll('.p-orbit')
// same with m_orbit
const m_orbit = document.querySelector('#m-orbit')

// loop through the p_orbits array
p_orbits.forEach((p_orbit,index)=>{
    p_orbit.style.height = `${p_radii[index]}vmin`
    p_orbit.style.width = `${p_radii[index]}vmin`
})

setInterval(()=>{
  // Loop through the planets array
    planets.forEach((planet,index)=>{
      // Places a planet and its respective position using parametric equations
        planet.style.left = `${Math.cos(p_radians[index]) * p_radii[index]}vmin`
        planet.style.top = `${Math.sin(p_radians[index]) * p_radii[index]}vmin`
        // changes the angle made by the center of a planet and the center of the sun with X-axis
        // the plantes were rotaring too fast. Fixed by decreasing the rate of change of angle with regard to time
        p_radians[index] += p_velocities[index] * 0.02
    })

    // Placing the moon at its respective position using the parametric equations 
    moon.style.left = `${earthX() + (Math.cos(m_radians) * m_radius)}vmin`
    moon.style.top = `${earthY() + (Math.sin(m_radians) * m_radius)}vmin`
    m_radians += m_velocity * 0.02

    m_orbit.style.left = `${earthX()}vmin`
    m_orbit.style.top = `${earthY()}vmin`
  },1000/60)

  // returns the 'h' on formula 
function earthX(){
    return Number(planets[2].style.left.split('vmin')[0])
}

// return the 'k'  of formula
function earthY(){
    return Number(planets[2].style.top.split('vmin')[0])
}