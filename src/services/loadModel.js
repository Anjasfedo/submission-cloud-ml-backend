const tf = require("@tensorflow/tfjs-node");

const loadModel = async () => {
  return tf.loadLayersModel("file://InceptionV3/model.json");
}

module.exports = loadModel;
