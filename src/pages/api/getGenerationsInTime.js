const { connectToDatabase } = require("../../../utils/connectMongo");
const { ObjectId } = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getArt(req, res);
    }
  }
}

async function getArt(req, res) {
  // get a random number of art docs from the database
  let numDocs = parseInt(req.query.q);
  try {
    let { db } = await connectToDatabase();
    const art = await db
      .collection("art")
      .find()
      .sort({ created_at: -1 })
      .toArray();

    res.json(art);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
