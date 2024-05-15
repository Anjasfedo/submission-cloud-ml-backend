const tf = require("@tensorflow/tfjs-node");
const path = require("path");

async function loadModel() {
  return tf.loadGraphModel("file://model/model.json");
}

module.exports = loadModel;
