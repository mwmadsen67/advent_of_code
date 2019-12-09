const fs = require('fs');
let bios = fs.readFileSync('puzzle_input.txt', 'utf8').split('');
const params = [25, 6];
// let sample = [1,2,3,4,5,6,7,8,9,0,1,2];
// const params = [3,2];
const layerLength = params[0] * params[1];



const makeImages = (input) => {
  let layer = [];
  let layers = [];
  let layerHash = { '0': 0, '1': 0, '2': 0 };
  // let hashes = {};
  let hashArr = [];
  let zeroArr = [];
  for (let i = 0; i < input.length; i++) {
    layer.push(input[i])
    layerHash[input[i]] += 1
    if ((i + 1) % params[0] === 0 && i !== 0) layer.push('\n');
    if ((i + 1) % (layerLength) === 0 && i !== 0) {
      layers.push(layer.slice());
      layer = [];
      // hashes[i] = Object.assign({}, layerHash);
      zeroArr.push(layerHash[0]);
      hashArr.push(Object.assign({}, layerHash));
      layerHash = { '0': 0, '1': 0, '2': 0 };
    }
  }
  // console.log(layers);
  // console.log(hashes)
  let image = layers[0]
  for (let i = 1; i < layers.length; i++){
    for (let j = 0; j < layers[0].length; j++) {
      let pixel = layers[i][j]
      if (image[j] === '2' && pixel !== '2') image[j] = pixel;
    }
  }

  console.log(image.join(' '))
  return image;
}

const arr = makeImages(bios)

