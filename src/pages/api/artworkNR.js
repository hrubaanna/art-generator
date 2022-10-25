const { connectToDatabase } = require("../../../utils/connectMongo");
const { ObjectId } = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getArt(req, res);
    }

    case "POST": {
      return addArt(req, res);
    }
  }
}

// create a new art in the database
async function addArt(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the art
    await db.collection("art").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Art added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getArt(req, res) {
  // get a random number of art docs from the database
  let numDocs = parseInt(req.query.q);
  try {
    let { db } = await connectToDatabase();
    const art = await db
      .collection("art")
      .find({}, { sort: { created_at: -1 } })
      .limit(numDocs)
      .toArray();

    // const art = await db
    //   .collection("art")
    //   .aggregate([{ $sample: { size: numDocs } }])
    //   .sort({ createdAt: -1 })
    //   .toArray();

    //art = { lastArt, randomArt };

    res.json(art);
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
