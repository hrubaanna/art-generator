const { connectToDatabase } = require("../../../utils/connectMongo");
const { ObjectId } = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getUser(req, res);
    }

    case "POST": {
      return addUser(req, res);
    }

    case "PUT": {
      return updateUser(req, res);
    }
    case "DELETE": {
      return deleteUser(req, res);
    }
  }
}

//create a new user in the database
async function addUser(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the user
    await db.collection("users").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "User added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
