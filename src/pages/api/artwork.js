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

//create a new art in the database
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
  if (req.query.q === "all-art") {
    try {
      let { db } = await connectToDatabase();
      const art = await db
        .collection("art")
        .find({})
        .sort({ createdAt: -1 })
        .limit(20)
        .toArray();

      res.json(art);
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else if (req.query.q == "random-art") {
    try {
      let { db } = await connectToDatabase();
      const art = await db
        .collection("art")
        .aggregate([{ $sample: { size: 4 } }])
        .toArray();

      res.json(art);
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}
