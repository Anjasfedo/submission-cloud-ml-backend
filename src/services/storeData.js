const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();
const collectionName = "prediction";

async function storeData(id, data) {
  return db.collection(collectionName).doc(id).set(data);
}

async function getData() {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => doc.data());
}

module.exports = { storeData, getData };
