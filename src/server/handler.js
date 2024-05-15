const Boom = require("@hapi/boom");
const predictClassification = require("../services/inferenceServices");
const tf = require("@tensorflow/tfjs-node");

const postPredictHandler = async (request, h) => {
  try {
    const { image } = request.payload;

    if (!image) {
      throw Boom.badRequest("File gambar tidak ditemukan");
    }

    const { model } = request.server.app;

    // Proses prediksi
    const predictionResult = await predictClassification(model, image);

    return h
      .response({
        status: "success",
        data: predictionResult,
      })
      .code(200);
  } catch (error) {
    if (error.isBoom) {
      throw error;
    } else if (error.message === "Error in prediction") {
      const newResponse = h.response({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
      newResponse.code(400);
      return newResponse;
    } else {
      console.error("Error dalam prediksi:", error);
      throw Boom.badRequest("Terjadi kesalahan dalam melakukan prediksi");
    }
  }
};

module.exports = postPredictHandler;
