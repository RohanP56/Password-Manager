const express = require("express");
const { MongoClient } = require("mongodb");
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyparser.json());

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "passwordbank";

client.connect();

//GET all passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//Save new password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.json({ success: true, result: findResult });
});

//Delete password

app.delete("/", async (req, res) => {
  try {
    const { id } = req.body; // Expecting an object with an `id` field
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No record found with that ID" });
    }

    res.json({ success: true, result });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting record",
        error: error.message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
