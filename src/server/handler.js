const predictClassification = require("../services/inferenceServices");
const crypto = require("crypto");

const predictionHistories = []; // Temporary storage for prediction data

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;

  const { model } = request.server.app;

  const { result, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const newPrediction = {
    id,
    result,
    suggestion,
    createdAt,
  };

  predictionHistories.push(newPrediction);

  return h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data: newPrediction,
    })
    .code(201);
};

const getPredictHistoriesHandler = async (request, h) => {
  return h
    .response({
      status: "success",
      data: predictionHistories.map((prediction) => ({
        id: prediction.id,
        history: {
          result: prediction.result,
          createdAt: prediction.createdAt,
          suggestion: prediction.suggestion,
          id: prediction.id,
        },
      })),
    })
    .code(200);
};


module.exports = { postPredictHandler, getPredictHistoriesHandler };
