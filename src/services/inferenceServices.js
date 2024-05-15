const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classification = confidenceScore > 50 ? "Cancer" : "Non-cancer";

    return {
      classification,
      confidence: confidenceScore,
    };
  } catch (error) {
    console.error("Error occurred during prediction:", error);
    throw new Error("Error in prediction"); // Membuang error yang ditangkap agar dapat ditangani di tempat lain
  }
}

module.exports = predictClassification;
