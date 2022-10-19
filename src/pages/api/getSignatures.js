const { connectToDatabase } = require("../../../utils/connectMongo");
const { ObjectId } = require("mongodb").ObjectId;

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getSignature(req, res);
    }
    case "PUT": {
      return deleteSignature(req, res);
    }
  }
}

//get the last 20 signatures created
async function getSignature(req, res) {
  try {
    let { db } = await connectToDatabase();
    const signatures = await db
      .collection("art")
      .find({}, { sort: { created_at: -1 }, limit: 10 })
      .toArray();
    res.json(signatures);
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}

//delete a signature from a record by updating it
async function deleteSignature(req, res) {
  let id = req.query.q;
  try {
    let { db } = await connectToDatabase();

    const updated = await db.collection("art").updateOne(
      { task_id: id },
      {
        $set: {
          signature: "",
        },
      }
    );
    res.json(updated);
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}
