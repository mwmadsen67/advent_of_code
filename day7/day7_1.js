const fs = require('fs');

let codeInput = fs.readFileSync('puzzle_input.txt', 'utf8').split(',').map((n) => parseInt(n))
// console.log(codeInput)
function coder(code, input) {
  let i = 0
  while(i < code.length) {
    let [n, n1, n2, n3] = [code[i], code[i+1], code[i+2], code[i+3]]

    switch(n) {
      case 1:
        code[n3] = code[n1] + code[n2];
        i += 4;
        break;
      case 2:
        code[n3] = code[n1] * code[n2];
        i += 4;
        break;
      case 3:
        code[n1] = input.shift();
        i += 2;
        break;
      case 4: 
        // console.log(code[n1])
        return code[n1];
      case 5:
        if (code[n1] !== 0) {
          i = code[n2];
          break;
        } else {
          i += 3;
          break;
        }
      case 6:
        if (code[n1] === 0) {
          i = code[n2];
          break;
        } else {
          i += 3;
          break;
        }
      case 7:
        code[n3] = code[n1] < code[n2] ? 1 : 0;
        i += 4;
        break;
      case 8:
        code[n3] = code[n1] === code[n2] ? 1 : 0;
        i += 4;
        break;
      case 99:
        return code[0];
      default:
        let [m, pos1, pos2] = [n.toString()];
        let opcode = parseInt(m.slice(-2));
        m.charAt(m.length - 3) === '1' ? pos1 = n1 : pos1 = code[n1];
        m.charAt(m.length - 4) === '1' ? pos2 = n2 : pos2 = code[n2];
        switch(opcode) {
          case 1:
            code[n3] = pos1 + pos2;
            i += 4;
            break;
          case 2:
            code[n3] = pos1 * pos2;
            i += 4;
            break;
          case 3:
            code[n1] = input.shift();
            i += 2;
            break;
          case 4:
            // console.log(code[n1])
            return code[n1]
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
            code[n3] = pos1 < pos2 ? 1 : 0;
            i += 4;
            break;
          case 8:
            code[n3] = pos1 === pos2 ? 1 : 0;
            i += 4;
            break;
          case 99:
            return code[0];
        }
        break;
    }
  }
  return code[0];
}

function chainCoder(coder, codeInput, arr) {
  let inputSignal = 0;
  for(let i = 0; i < arr.length; i++) {
    inputSignal = coder(codeInput.slice(), [arr[i], inputSignal]);
  }
  // console.log(inputSignal)
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

const arrOptions = permutator([0,1,2,3,4])
let ansOptions = [];

for(let i = 0; i < arrOptions.length; ++i){
  let thing = chainCoder(coder, codeInput, arrOptions[i]);
  console.log(thing);
  ansOptions.push(thing);
}

let ans = Math.max(...ansOptions);

console.log(ans)