/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprigtris
@author: falsonix
@tags: no idea what to put here lol
@addedOn: 2024-07-01
*/

let gravity = 1 // gravity variable, can be changed to alter game speed/difficulty

const wall = "s" // add wall variable, and list it as a solid

// add block types and colors as their individual types
const Iblock = "1"
const Jblock = "2"
const Lblock = "3"
const Oblock = "4"
const Sblock = "5"
const Tblock = "6"
const Zblock = "7"

// setup bitmap graphics
setLegend(
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
LLLLLLLLLLLLLLLL
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
LLLLLLLLLLLLLLLL
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
L1111L1111L1111L
LLLLLLLLLLLLLLLL`],
  [ Iblock, bitmap`
..777777777777..
.77777777777777.
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
.77777777777777.
..777777777777..`],
  [ Jblock, bitmap`
..555555555555..
.55555555555555.
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
.55555555555555.
..555555555555..`],
  [ Lblock, bitmap`
..999999999999..
.99999999999999.
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
.99999999999999.
..999999999999..`],
  [ Oblock, bitmap`
..666666666666..
.66666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
.66666666666666.
..666666666666..`],
  [ Sblock, bitmap`
..444444444444..
.44444444444444.
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
.44444444444444.
..444444444444..`],
  [ Tblock, bitmap`
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.
..HHHHHHHHHHHH..`],
  [ Zblock, bitmap`
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..`],
)

setSolids([])

// setup level area
let level = 0
const levels = [
  map`
ss..........ssssssss
ss.1.2......s.....ss
ss.1.222..3.s.....ss
ss.1....333.s.....ss
ss.1.44.....s.....ss
ss...44..6..s.....ss
ss......666.s.....ss
ss.55.......s.....ss
ss55..77....s.....ss
ss.....77...s.....ss
ss..........s.....ss
ss..........s.....ss
ss..........s.....ss
ss..........s.....ss
ss..........s.....ss
ss..........ssssssss`
]

setMap(levels[level])

addText("Score", options = {x: 100, y: 100, color: color`0`})

// allow the blocks to be movable
setPushables({
  [ Iblock ]: [],
  [ Jblock ]: [],
  [ Lblock ]: [],
  [ Oblock ]: [],
  [ Sblock ]: [],
  [ Tblock ]: [],
  [ Zblock ]: [],
})

onInput("s", () => {
  //getFirst(player).y += 1
})

afterInput(() => {
  // Code that runs each time after a player presses any button
});

const gravityAccumulators = {
  Iblock: 0,
  Jblock: 0,
  Lblock: 0,
  Oblock: 0,
  Sblock: 0,
  Tblock: 0,
  Zblock: 0
};

const applyGravity = () => {
  // define a scaling factor based on the gravity value
  const gravityScale = gravity; // Use the gravity value directly

  for (const block of [Iblock, Jblock, Lblock, Oblock, Sblock, Tblock, Zblock]) {
    const sprites = getAll(block);
    sprites.forEach(sprite => {
      // accumulate gravity
      gravityAccumulators[block] += gravityScale;

      // check if the accumulated gravity is enough to move the sprite
      while (gravityAccumulators[block] >= 1) {
        // check if the sprite can move down without going below the bottom of the screen
        if (sprite.y + 1 < height()) {
          sprite.y += 1; // move the sprite down by 1 unit
          gravityAccumulators[block] -= 1; // reduce the accumulator by 1
        } else {
          gravityAccumulators[block] = 0; // reset the accumulator if it can't move down
          break;
        }
      }
    });
  }
};

// define a custom game loop function using setInterval
const gameLoop = () => {
  applyGravity(); // Apply gravity effect during the game loop iteration

  // additional game logic can be added here if needded
};

// start the custom game loop with a setinterval
setInterval(gameLoop, 1000 / 60); // attempt to run the game loop at 60 frames per second
