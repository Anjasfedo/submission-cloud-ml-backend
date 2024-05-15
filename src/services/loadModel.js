const tf = require("@tensorflow/tfjs-node");
// const model = require("../../model/")
async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;
