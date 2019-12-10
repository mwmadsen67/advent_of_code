// const fs = require('fs');

// let codeInput = fs.readFileSync('test.txt', 'utf8').split('\n');
// console.dir(codeInput)

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


// for testing in chrome

let codeInput = [
  '..#..###....#####....###........#',
  '.##.##...#.#.......#......##....#',
  '#..#..##.#..###...##....#......##',
  '..####...#..##...####.#.......#.#',
  '...#.#.....##...#.####.#.###.#..#',
  '#..#..##.#.#.####.#.###.#.##.....',
  '#.##...##.....##.#......#.....##.',
  '.#..##.##.#..#....#...#...#...##.',
  '.#..#.....###.#..##.###.##.......',
  '.##...#..#####.#.#......####.....',
  '..##.#.#.#.###..#...#.#..##.#....',
  '.....#....#....##.####....#......',
  '.#..##.#.........#..#......###..#',
  '#.##....#.#..#.#....#.###...#....',
  '.##...##..#.#.#...###..#.#.#..###',
  '.#..##..##...##...#.#.#...#..#.#.',
  '.#..#..##.##...###.##.#......#...',
  '...#.....###.....#....#..#....#..',
  '.#...###..#......#.##.#...#.####.',
  '....#.##...##.#...#........#.#...',
  '..#.##....#..#.......##.##.....#.',
  '.#.#....###.#.#.#.#.#............',
  '#....####.##....#..###.##.#.#..#.',
  '......##....#.#.#...#...#..#.....',
  '...#.#..####.##.#.........###..##',
  '.......#....#.##.......#.#.###...',
  '...#..#.#.........#...###......#.',
  '.#.##.#.#.#.#........#.#.##..#...',
  '.......#.##.#...........#..#.#...',
  '.####....##..#..##.#.##.##..##...',
  '.#.#..###.#..#...#....#.###.#..#.',
  '............#...#...#.......#.#..',
  '.........###.#.....#..##..#.##...'
]

// let codeInput = [
//   '.#..##.###...#######', '##.############..##.',
//   '.#.######.########.#', '.###.#######.####.#.',
//   '#####.##.#.##.###.##', '..#####..#.#########',
//   '####################', '#.####....###.#.#.##',
//   '##.#################', '#####.##.###..####..',
//   '..######..##.#######', '####.##.####...##..#',
//   '.#####..#.######.###', '##...#.##########...',
//   '#.##########.#######', '.####.#.###.###.#.##',
//   '....##.##.###..#####', '.#.#.###########.###',
//   '#.#.#.#####.####.###', '###.##.####.##.#..##'
// ]

class Asteroid {
  constructor(pos) {
    this.pos = pos;
    this.numRoids = 0;
    this.roidAngles = [];
    this.angles = [];
  }

  calcAngles() {
    // upper right quadrant
    let angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] >= 0 && angle[1] < 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
    this.angles.push(angle1.slice());
    // lower right quadrant
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
    this.angles.push(angle1.slice());
    // lower left quadrant
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
    this.angles.push(angle1.slice());
    // upper left quadrant
    angle1 = [];
    this.roidAngles.forEach(angle => {
      if (angle[0] < 0 && angle[1] < 0) {
        let val = angle[0] / angle[1];
        if (!angle1.includes(val)) {
          angle1.push(val)
          this.numRoids++;
        }
      }
    })
    this.angles.push(angle1.slice());
  }

}

let roids = [];

function findRoids() {
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


function findAngles() {
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

// -0, -1, Infinity, 1, 0, -1, -Infinity, 1
// first quadrant: -0, -small -> -big        >= <
// second quadrant: Infinity, big -> small   >= >=
// third quadrant: 0, -small -> -big         <  <
// fourth quadrant: -Infinity, big -> small  < >=

// this.pos = pos;
// this.numRoids = 0;
// this.roidAngles = [];
// this.angles = [];

// 1. search by quadrant
// 2. iterate over angles in order of quadrant
// 3. find all roidAngles equal to angle
// 4. calculate shortest distance
// 5. destroy roidAngle, increment asteroids destroyed
// 6. increment angle, repeat steps 3 - 5
// 7. repeat steps 2-6 over each quadrant
// 8. repeat over entire quadrant until 200 asteroids destroyed

max.angles[0] = max.angles[0].sort((a, b) => b - a);
max.angles[1] = max.angles[1].sort((a, b) => b - a);
max.angles[2] = max.angles[2].sort((a, b) => b - a);
max.angles[3] = max.angles[3].sort((a, b) => b - a);

console.dir(max)
function destroy () {
  while (max.numRoids > 0) {
    max.angles[0].forEach(angle => {
      let roidsForAngle = [];
      let min = Infinity;
      max.roidAngles.forEach(roid => {
        let [x, y] = [roid[0], roid[1]];
        if (x >= 0 && y < 0 && angle === (x / y)) {
          roidsForAngle.push(roid);
          let dist = Math.abs(x) + Math.abs(y);
          if (dist < min) min = dist;
        }
      })
      roidsForAngle.forEach(roid => {
        if ((Math.abs(roid[0]) + Math.abs(roid[1])) === min) {
          let index = max.roidAngles.indexOf(roid);
          max.roidAngles.splice(index, 1);
          if (max.numRoids === 115) {
            console.log('hi');
          }
          max.numRoids--;
        }
      })
    })
    max.angles[1].forEach(angle => {
      let roidsForAngle = [];
      let min = Infinity;
      max.roidAngles.forEach(roid => {
        let [x, y] = [roid[0], roid[1]];
        if (x >= 0 && y >= 0 && angle === (x / y)) {
          roidsForAngle.push(roid);
          let dist = Math.abs(x) + Math.abs(y);
          if (dist < min) min = dist;
        }
      })
      roidsForAngle.forEach(roid => {
        if ((Math.abs(roid[0]) + Math.abs(roid[1])) === min) {
          let index = max.roidAngles.indexOf(roid);
          max.roidAngles.splice(index, 1);
          if (max.numRoids === 115) {
            console.log('hi');
          }
          max.numRoids--;
        }
      })
    })
    max.angles[2].forEach(angle => {
      let roidsForAngle = [];
      let min = Infinity;
      max.roidAngles.forEach(roid => {
        let [x, y] = [roid[0], roid[1]];
        if (x < 0 && y >= 0 && angle === (x / y)) {
          roidsForAngle.push(roid);
          let dist = Math.abs(x) + Math.abs(y);
          if (dist < min) min = dist;
        }
      })
      roidsForAngle.forEach(roid => {
        if ((Math.abs(roid[0]) + Math.abs(roid[1])) === min) {
          let index = max.roidAngles.indexOf(roid);
          max.roidAngles.splice(index, 1);
          if (max.numRoids === 115) {
            console.log('hi');
          }
          max.numRoids--;
        }
      })
    })
    max.angles[3].forEach(angle => {
      let roidsForAngle = [];
      let min = Infinity;
      max.roidAngles.forEach(roid => {
        let [x, y] = [roid[0], roid[1]];
        if (x < 0 && y < 0 && angle === (x / y)) {
          roidsForAngle.push(roid);
          let dist = Math.abs(x) + Math.abs(y);
          if (dist < min) min = dist;
        }
      })
      roidsForAngle.forEach(roid => {
        if ((Math.abs(roid[0]) + Math.abs(roid[1])) === min) {
          let index = max.roidAngles.indexOf(roid);
          max.roidAngles.splice(index, 1);
          if (max.numRoids === 115) {
            console.log('hi');
          }
          max.numRoids--;
        }
      })
    })
  }
}
