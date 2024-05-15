const tf = require("@tensorflow/tfjs-node");
const path = require("path");

async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;
