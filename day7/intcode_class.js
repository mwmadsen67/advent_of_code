
class Intcode {
  constructor(code) {
    this.code = code;
    this.index = 0;
    this.halt = false;
  }

  runCode(input){
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
          this.index = i + 2;
          return this.code[n1];
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
          return this.code[0];
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
              this.index = i + 2;
              return this.code[n1];
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
              return this.code[0];
          }
          break;
      }
    }
    this.halt = true;
    return this.code[0];
  }
  
}

module.exports.Intcode = Intcode;


// console.log(codeInput)
// function coder(code, input, startPos) {
//   let i = startPos
//   while (i < code.length) {
//     let [n, n1, n2, n3] = [code[i], code[i + 1], code[i + 2], code[i + 3]]

//     switch (n) {
//       case 1:
//         code[n3] = code[n1] + code[n2];
//         i += 4;
//         break;
//       case 2:
//         code[n3] = code[n1] * code[n2];
//         i += 4;
//         break;
//       case 3:
//         code[n1] = input.shift();
//         i += 2;
//         break;
//       case 4:
//         // console.log(code[n1])
//         i += 2;
//         return [code[n1], false, i];
//       case 5:
//         if (code[n1] !== 0) {
//           i = code[n2];
//           break;
//         } else {
//           i += 3;
//           break;
//         }
//       case 6:
//         if (code[n1] === 0) {
//           i = code[n2];
//           break;
//         } else {
//           i += 3;
//           break;
//         }
//       case 7:
//         code[n3] = code[n1] < code[n2] ? 1 : 0;
//         i += 4;
//         break;
//       case 8:
//         code[n3] = code[n1] === code[n2] ? 1 : 0;
//         i += 4;
//         break;
//       case 99:
//         return [code[0], true];
//       default:
//         let [m, pos1, pos2] = [n.toString()];
//         let opcode = parseInt(m.slice(-2));
//         m.charAt(m.length - 3) === '1' ? pos1 = n1 : pos1 = code[n1];
//         m.charAt(m.length - 4) === '1' ? pos2 = n2 : pos2 = code[n2];
//         switch (opcode) {
//           case 1:
//             code[n3] = pos1 + pos2;
//             i += 4;
//             break;
//           case 2:
//             code[n3] = pos1 * pos2;
//             i += 4;
//             break;
//           case 3:
//             code[n1] = input.shift();
//             i += 2;
//             break;
//           case 4:
//             // console.log(code[n1])
//             i += 2;
//             return [code[n1], false, i];
//           case 5:
//             if (pos1 !== 0) {
//               i = pos2;
//               break;
//             } else {
//               i += 3;
//               break;
//             }
//           case 6:
//             if (pos1 === 0) {
//               i = pos2;
//               break;
//             } else {
//               i += 3;
//               break;
//             }
//           case 7:
//             code[n3] = pos1 < pos2 ? 1 : 0;
//             i += 4;
//             break;
//           case 8:
//             code[n3] = pos1 === pos2 ? 1 : 0;
//             i += 4;
//             break;
//           case 99:
//             return [code[0], true];
//         }
//         break;
//     }
//   }
//   return code[0];
// }