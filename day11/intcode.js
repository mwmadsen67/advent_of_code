
class Intcode {
  constructor(code) {
    this.code = new Array(1000).fill(0);
    this.code.unshift(...code.slice());
    this.index = 0;
    this.halt = false;
    this.output = [];
    this.relative = 0;
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
          this.code[n1] = input;
          i += 2;
          break;
        case 4:
          // console.log(this.code[n1])
          i += 2;
          // this.index = i + 2;
          this.output.push(this.code[n1]);
          // return this.output;
          break;
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
        case 9:
          this.relative += this.code[n1];
          i += 2;
          break;
        case 99:
          this.halt = true;
          return this.output;
        default:
          let [m, pos1, pos2] = [n.toString()];
          let opcode = parseInt(m.slice(-2));
          let [mode1, mode2, mode3] = [m.charAt(m.length - 3), m.charAt(m.length - 4), m.charAt(m.length - 5)];
          if (mode1 === '0' || mode2 === '') pos1 = this.code[n1];
          if (mode1 === '1') pos1 = n1;
          if (mode1 === '2') pos1 = this.code[this.relative + n1];
          if (mode2 === '0' || mode2 === '') pos2 = this.code[n2];
          if (mode2 === '1') pos2 = n2;
          if (mode2 === '2') pos2 = this.code[this.relative + n2];
          if (mode3 === '2') n3 = this.relative + n3;
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
              if (mode1 === '1') this.code[n1] = input;
              if (mode1 === '2') this.code[this.relative + n1] = input;
              i += 2;
              break;
            case 4:
              // console.log(this.code[n1])
              i += 2;
              // this.index = i + 2;
              this.output.push(pos1);
              // return this.output;
              break;
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
            case 9:
              this.relative += pos1;
              i += 2;
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

module.exports.Intcode = Intcode;