const fs = require('fs');
let orbitInput = fs.readFileSync('puzzle_input.txt', 'utf8').split('\n').map((el) => el.split(')'))
// console.dir(orbitInput)

class OrbitNode {
  constructor(name, orbit) {
    this.name = name;
    this.orbit = orbit;
    this.numOrbits = 0;
    this.child;
    this.parent;
  }

  findCOM() {
    let node = this.parent;
    if (this.name === 'COM') {
      return;
    }
    while (node.name !== 'COM') {
      this.numOrbits++;
      node = node.parent;
      if ( node === null) {
        break;
      }
    }
    this.numOrbits++;
  }

}

let nodes = orbitInput.map((el) => {
  let node = new OrbitNode(el[1], el[0])
  return node
});
nodes = nodes.concat(new OrbitNode('COM', null))

// console.log(nodes)

nodes.forEach(node1 => nodes.forEach(node2 => {
  if (node1.name === node2.orbit) {
    node1.child = node2;
    node2.parent = node1;
  }
}));

nodes.forEach(node => node.findCOM())
let totalOrbits = 0;
nodes.forEach(node => totalOrbits += node.numOrbits)

// console.dir(nodes)
console.log(totalOrbits)
