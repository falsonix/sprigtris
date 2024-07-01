/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprigtris
@author: falsonix
@tags: no idea what to put here lol
@addedOn: 2024-07-01
*/


const wall = "s" // add wall variable and set it to type s

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

function canMoveDown(block) {
  let canMove = true;
  getAll(block).forEach(b => {
    let x = b.x;
    let y = b.y;
    if (y + 1 >= height || getTile(x, y + 1).length > 0) {
      canMove = false;
    }
  });
  return canMove;
}

function moveDown(block) {
  getAll(block).forEach(b => {
    b.y += 1;
  });
}

function applyGravity() {
  [Iblock, Jblock, Lblock, Oblock, Sblock, Tblock, Zblock].forEach(block => {
    if (canMoveDown(block)) {
      moveDown(block);
    }
  });
}

// Apply gravity every 500ms
setInterval(applyGravity, 500);
