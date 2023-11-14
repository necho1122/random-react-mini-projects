/* eslint-disable no-undef */
const express = require('express');

const app = express();

const admin = require("firebase-admin");

var serviceAccount = require("./firebase-admin-sdk.json"); // Your own service account

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server working on port: ${port}`);
  });

  const db = admin.firestore();

// Get information
app.get("/data", async (req, res) => {
    try {
      const data = [];
      const snapshot = await db.collection("todo-list").get();
      
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
  
      res.json(data);
    } catch (error) {
      console.error("Error obtaining data:", error);
      res.status(500).send("Internal Server Error");
    }
  });

// Add data
app.post("/AddData", async (req, res) => {
  const newData = req.body;
  await db.collection("todo-list").add(newData);
  res.send("Data added successfully");
});
