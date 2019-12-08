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
    this.diffOrbits = 0;
  }

  findCOM() {
    let node = this.parent;
    if (this.name === 'COM') {
      return;
    }
    while (node.name !== 'COM') {
      this.numOrbits++;
      node = node.parent;
      if (node === null) {
        break;
      }
    }
    this.numOrbits++;
  }

  findOrbs(nodeName) {
    let node = this.parent;
    let numOrbs = 0;
    if (this.name === nodeName) {
      return;
    }
    while (node.name !== nodeName) {
      numOrbs++;
      node = node.parent;
      if (node === null) {
        break;
      }
    }
    return numOrbs;
  }

  findCommonOrbit(node2) {
    let currParents = [];
    let otherParents = [];
    let node = this.parent;
    let other = node2.parent
    for (let i = 0; i < this.numOrbits; i++) {
      currParents.push(node.name);
      node = node.parent;
    }
    for (let j = 0; j < node2.numOrbits; j++) {
      otherParents.push(other.name);
      other = other.parent;
    }
    let commonParents = currParents.filter(value => otherParents.includes(value));
    return commonParents[0];
  }

}

let nodes = orbitInput.map((el) => {
  let node = new OrbitNode(el[1], el[0])
  return node
});
nodes = nodes.concat(new OrbitNode('COM', null))

let meNode;
let sanNode;

nodes.forEach(node1 => nodes.forEach(node2 => {
  if (node1.name === 'YOU') {
    meNode = node1;
  }
  if (node1.name === "SAN") {
    sanNode = node1;
  }
  if (node1.name === node2.orbit) {
    node1.child = node2;
    node2.parent = node1;
  }
}));

nodes.forEach(node => {
  if (node.name === "YOU" || node.name === "SAN") {
    node.findCOM();
  }
})

// console.dir(meNode);
// console.dir(sanNode);

let comOrb = meNode.findCommonOrbit(sanNode);
// console.dir(comOrb)
let youOrbs = meNode.findOrbs(comOrb);
let sanOrbs = sanNode.findOrbs(comOrb);

console.log(youOrbs + sanOrbs)
