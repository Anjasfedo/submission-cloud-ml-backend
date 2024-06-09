const tf = require("@tensorflow/tfjs-node");

class L2 {
  static className = "L2";

  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

const loadModel = async () => {
  return tf.loadLayersModel("file://model/model.json");
}

module.exports = loadModel;
