const fs = require('fs');
// const Intcode = require('./intcode_class.js').Intcode

let codeInput = fs.readFileSync('puzzle_input.txt', 'utf8').split(',').map((n) => parseInt(n))


class Intcode {
  constructor(code) {
    this.code = code.slice();
    this.index = 0;
    this.halt = false;
    this.output;
  }

  runCode(input) {
    let i = this.index;
    while (i < this.code.length) {
      let [n, n1, n2, n3] = [this.code[i], this.code[i + 1], this.code[i + 2], this.code[i + 3]]

      switch (n) {
        case 1:
          this.code[n3] = this.code[n1] + this.code[n2];
          i += 4;
          break;
        case 2:
          this.code[n3] = this.code[n1] * this.code[n2];
          i += 4;
          break;
        case 3:
          this.code[n1] = input.shift();
          i += 2;
          break;
        case 4:
          // console.log(this.code[n1])
          // i += 2;
          this.index = i + 2;
          this.output = this.code[n1];
          return this.output;
        case 5:
          if (this.code[n1] !== 0) {
            i = this.code[n2];
            break;
          } else {
            i += 3;
            break;
          }
        case 6:
          if (this.code[n1] === 0) {
            i = this.code[n2];
            break;
          } else {
            i += 3;
            break;
          }
        case 7:
          this.code[n3] = this.code[n1] < this.code[n2] ? 1 : 0;
          i += 4;
          break;
        case 8:
          this.code[n3] = this.code[n1] === this.code[n2] ? 1 : 0;
          i += 4;
          break;
        case 99:
          this.halt = true;
          return this.output;
        default:
          let [m, pos1, pos2] = [n.toString()];
          let opcode = parseInt(m.slice(-2));
          m.charAt(m.length - 3) === '1' ? pos1 = n1 : pos1 = this.code[n1];
          m.charAt(m.length - 4) === '1' ? pos2 = n2 : pos2 = this.code[n2];
          switch (opcode) {
            case 1:
              this.code[n3] = pos1 + pos2;
              i += 4;
              break;
            case 2:
              this.code[n3] = pos1 * pos2;
              i += 4;
              break;
            case 3:
              this.code[n1] = input.shift();
              i += 2;
              break;
            case 4:
              // console.log(this.code[n1])
              // i += 2;
              this.index = i + 2;
              this.output = this.code[n1];
              return this.output;
            case 5:
              if (pos1 !== 0) {
                i = pos2;
                break;
              } else {
                i += 3;
                break;
              }
            case 6:
              if (pos1 === 0) {
                i = pos2;
                break;
              } else {
                i += 3;
                break;
              }
            case 7:
              this.code[n3] = pos1 < pos2 ? 1 : 0;
              i += 4;
              break;
            case 8:
              this.code[n3] = pos1 === pos2 ? 1 : 0;
              i += 4;
              break;
            case 99:
              this.halt = true;
              return this.output;
          }
          break;
      }
    }
    this.halt = true;
    return this.output;
  }

}

// let codeInput = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
//   27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5]

// let codeInput = [3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55, 26, 1001, 54,
//   -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55, 1, 55, 2, 53, 55, 53, 4,
//   53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0, 0, 0, 10]

const feedbackCoder = (arr) => {
  let inputSignal = 0
  let output;
  let codes = []
  
  for (let i = 0; i < arr.length; i++) {
    codes.push(new Intcode(codeInput))
  }
  for (let i = 0; i < arr.length; i++) {
    if (codes[i].halt === true) return inputSignal;
    inputSignal = codes[i].runCode([arr[i], inputSignal])
  }
  for (let i = 0; i <= arr.length; i++) {
    if (i === arr.length) i = 0;
    output = codes[i].runCode([inputSignal])
    if (codes[i].halt === true) return inputSignal;
    inputSignal = output;
  }
  return inputSignal;
}

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

const arrOptions = permutator([5, 6, 7, 8, 9])
let ansOptions = [];

for (let i = 0; i < arrOptions.length; ++i) {
  let thing = feedbackCoder(arrOptions[i]);
  // console.log(thing);
  ansOptions.push(thing);
}

let ans = Math.max(...ansOptions);

console.log(ans)