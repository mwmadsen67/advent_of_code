const fs = require('fs');
const Intcode = require('./intcode_class.js').Intcode

let codeInput = fs.readFileSync('puzzle_input.txt', 'utf8').split(',').map((n) => parseInt(n))
let codeInput = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
  27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5]

const feedbackCoder = (arr) => {
  let inputSignal = 0
  let codes = []
  for (let i = 0; i < arr.length; i++) {
    codes.push(new Intcode(codeInput))
  }
  for (let i = 0; i <= arr.length; i++) {
    console.log(inputSignal)
    if (i === arr.length) i = 0;
    if (codes[i].halt === true) return inputSignal;
    inputSignal = codes[i].runCode([arr[i], inputSignal])
  }
}

// function chainCoder(coder, codeInput, arr, startPos) {
//   let inputSignal = [0, false];
//   let nextPos = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (inputSignal[1] === true) return inputSignal[0];
//     inputSignal = coder(codeInput.slice(), [arr[i], inputSignal[0]], startPos[i]);
//     nextPos.push(inputSignal.pop())
//   }
//   // console.log(inputSignal)
//   return [inputSignal, nextPos];
// }

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

const arrOptions = permutator([5,6,7,8,9])
let ansOptions = [];

for (let i = 0; i < arrOptions.length; ++i) {
  let thing = feedbackCoder(arrOptions[i]);
  console.log(thing);
  ansOptions.push(thing);
}

let ans = Math.max(...ansOptions);

console.log(ans)