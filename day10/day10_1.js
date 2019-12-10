const fs = require('fs');

let codeInput = fs.readFileSync('puzzle_input.txt', 'utf8').split('\n');
console.dir(codeInput)

// let codeInput = [
//   '......#.#.',
//   '#..#.#....',
//   '..#######.',
//   '.#.#.###..',
//   '.#..#.....',
//   '..#....#.#',
//   '#..#....#.',
//   '.##.#..###',
//   '##...#..#.',
//   '.#....####']

// let codeInput = [
//   '#.#...#.#.', '.###....#.',
//   '.#....#...', '##.#.#.#.#',
//   '....#.#.#.', '.##..###.#',
//   '..#...##..', '..##....##',
//   '......#...', '.####.###.'
// ]

// console.dir(codeInput);

class Asteroid {
  constructor(pos) {
    this.pos = pos;
    this.numRoids = 0;
    this.roidAngles = [];
    this.angles = [];
  }

  calcAngles() {
    let angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] < 0 && angle[1] < 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
    angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] < 0 && angle[1] >= 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
    angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] >= 0 && angle[1] < 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
    angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] >= 0 && angle[1] >= 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
  }
  
}

let roids = [];

function findRoids () {
  for (let y = 0; y < codeInput.length; y++) {
    let row = codeInput[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        roids.push(new Asteroid([x, y]))
      }
    }
  }

}

findRoids()


function findAngles () {
  for (let i = 0; i < roids.length; i++) {
    let roid1 = roids[i];
    for (let j = 0; j < roids.length; j++) {
      let roid2 = roids[j];
      if (roid1 === roid2) continue;
      roid1.roidAngles.push([roid2.pos[0] - roid1.pos[0], roid2.pos[1] - roid1.pos[1]]);
    }
  }

}

findAngles()

roids.forEach(roid => roid.calcAngles());
nums = {};

let max = roids[0];
roids.forEach(roid => {
  if (roid.numRoids > max.numRoids) max = roid;
})

console.log(max.numRoids);


