const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wjboujk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("external_test");
    const ibnsina = database.collection("ibnsina");
    await ibnsina.createIndex({ invoice: 1 }, { unique: true });

    const popular = database.collection("popular");
    await popular.createIndex({ invoice: 1 }, { unique: true });

    const asgarali = database.collection("asgarali");
    await asgarali.createIndex({ invoice: 1 }, { unique: true });

    const medinova = database.collection("medinova");
    await medinova.createIndex({ invoice: 1 }, { unique: true });

    /* IBN SINA START FROM HERE */
    app.get("/get-ibnsinatest", async (req, res) => {
      const { page = 0, limit = 10, search = null } = req.query;

      let results, total;

      if (search) {
        const doc = await ibnsina.findOne({ invoice: search });
        results = doc ? [doc] : [];
        total = results.length;
      } else {
        results = await ibnsina
          .find({})
          .sort({ _id: -1 })
          .skip(parseInt(page) * parseInt(limit))
          .limit(parseInt(limit))
          .toArray();
        total = await ibnsina.countDocuments({});
      }

      try {
        res.status(200).json({ data: results, total });
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.post("/ibntest-create", async (req, res) => {
      const data = {
        ...req.body,
        createdAt: moment().toISOString(),
        date: moment().format("D"),
        month: moment().format("MMM"),
        year: moment().format("YYYY"),
      };
      try {
        const result = await ibnsina.insertOne(data);
        if (result.acknowledged) {
          res.status(201).json(result);
        } else {
          res.status(500).json({ message: "An error occurred" });
        }
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.patch("/update-inbsinatest", async (req, res) => {
      const { id, data } = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      updateData = {
        $set: {
          ...data,
        },
      };

      try {
        const result = await ibnsina.updateOne(filter, updateData, options);
        res.status(200).json(result);
      } catch (error) {
        res
          .status(500)
          .json({ message: "An error occurred while updating the user" });
      }
    });
    app.delete("/delete-ibnsinatest/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await ibnsina.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
        } else {
          res.status(404).json({ success: false, message: "Not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
    /* IBN SINA END FROM HERE */

    /* POPULAR START FROM HERE */
    app.get("/get-populartest", async (req, res) => {
      const { page = 0, limit = 10, search = null } = req.query;

      let results, total;

      if (search) {
        const doc = await popular.findOne({ invoice: search });
        results = doc ? [doc] : [];
        total = results.length;
      } else {
        results = await popular
          .find({})
          .sort({ _id: -1 })
          .skip(parseInt(page) * parseInt(limit))
          .limit(parseInt(limit))
          .toArray();
        total = await popular.countDocuments({});
      }

      try {
        res.status(200).json({ data: results, total });
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.post("/populartest-create", async (req, res) => {
      const data = {
        ...req.body,
        createdAt: moment().toISOString(),
        date: moment().format("D"),
        month: moment().format("MMM"),
        year: moment().format("YYYY"),
      };
      try {
        const result = await popular.insertOne(data);
        if (result.acknowledged) {
          res.status(201).json(result);
        } else {
          res.status(500).json({ message: "An error occurred" });
        }
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.patch("/update-populartest", async (req, res) => {
      const { id, data } = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      updateData = {
        $set: {
          ...data,
        },
      };

      try {
        const result = await popular.updateOne(filter, updateData, options);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while updating the popular test",
        });
      }
    });
    app.delete("/delete-populartest/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await popular.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
        } else {
          res.status(404).json({ success: false, message: "Not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
    /* POPULAR END FROM HERE */

    /* ASGAR-ALI START FROM HERE */
    app.get("/get-asgaralitest", async (req, res) => {
      const { page = 0, limit = 10, search = null } = req.query;

      let results, total;

      if (search) {
        const doc = await asgarali.findOne({ invoice: search });
        results = doc ? [doc] : [];
        total = results.length;
      } else {
        results = await asgarali
          .find({})
          .sort({ _id: -1 })
          .skip(parseInt(page) * parseInt(limit))
          .limit(parseInt(limit))
          .toArray();
        total = await asgarali.countDocuments({});
      }

      try {
        res.status(200).json({ data: results, total });
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.post("/asgaralitest-create", async (req, res) => {
      const data = {
        ...req.body,
        createdAt: moment().toISOString(),
        date: moment().format("D"),
        month: moment().format("MMM"),
        year: moment().format("YYYY"),
      };
      try {
        const result = await asgarali.insertOne(data);
        if (result.acknowledged) {
          res.status(201).json(result);
        } else {
          res.status(500).json({ message: "An error occurred" });
        }
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.patch("/update-asgaralitest", async (req, res) => {
      const { id, data } = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      updateData = {
        $set: {
          ...data,
        },
      };

      try {
        const result = await asgarali.updateOne(filter, updateData, options);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while updating the popular test",
        });
      }
    });
    app.delete("/delete-asgaralitest/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await asgarali.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
        } else {
          res.status(404).json({ success: false, message: "Not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
    /* ASGAR-ALI END FROM HERE */

    /* MEDINOVA START FROM HERE */
    app.get("/get-medinovatest", async (req, res) => {
      const { page = 0, limit = 10, search = null } = req.query;

      let results, total;

      if (search) {
        const doc = await medinova.findOne({ invoice: search });
        results = doc ? [doc] : [];
        total = results.length;
      } else {
        results = await medinova
          .find({})
          .sort({ _id: -1 })
          .skip(parseInt(page) * parseInt(limit))
          .limit(parseInt(limit))
          .toArray();
        total = await medinova.countDocuments({});
      }

      try {
        res.status(200).json({ data: results, total });
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.post("/medinovatest-create", async (req, res) => {
      const data = {
        ...req.body,
        createdAt: moment().toISOString(),
        date: moment().format("D"),
        month: moment().format("MMM"),
        year: moment().format("YYYY"),
      };
      try {
        const result = await medinova.insertOne(data);
        if (result.acknowledged) {
          res.status(201).json(result);
        } else {
          res.status(500).json({ message: "An error occurred" });
        }
      } catch (error) {
        res.status(500).json({ message: "An error occurred" });
      }
    });
    app.patch("/update-medinovatest", async (req, res) => {
      const { id, data } = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      updateData = {
        $set: {
          ...data,
        },
      };

      try {
        const result = await medinova.updateOne(filter, updateData, options);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while updating the popular test",
        });
      }
    });
    app.delete("/delete-medinovatest/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await medinova.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res
            .status(200)
            .json({ success: true, message: "Deleted successfully" });
        } else {
          res.status(404).json({ success: false, message: "Not found" });
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
    /* MEDINOVA END FROM HERE */
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
