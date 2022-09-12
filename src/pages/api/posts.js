const { connectToDatabase } = require("../../../utils/connectMongo");
const { ObjectId } = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addUser(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
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

async function addPost(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("posts").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// export default async function getPosts(req, res) {
//     try {
//         let { db } = await connectToDatabase();
//         const movies = await db
//         .collection("movies")
//         .find({})
//         .sort({ metacritic: -1 })
//         .limit(20)
//         .toArray();

//         res.json(movies);
//     } catch (error) {
//         return res.json({
//             message: new Error(error).message,
//             success: false,
//         });
//     }
// }
