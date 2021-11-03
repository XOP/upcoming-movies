const { MongoClient } = require("mongodb");

let _id = process.env.COMING_UP_MONGODB_ID;
let _coll = process.env.COMING_UP_MONGODB_COLLECTION;
let path = process.env.COMING_UP_MONGODB_PATH;
let user = process.env.COMING_UP_MONGODB_USER;
let pass = process.env.COMING_UP_MONGODB_PWD;

const uri = `mongodb+srv://${user}:${pass}@${path}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handler = async function handler(req, res) {
  const data = req.body;

  if (!data.id) {
    return res.status(400).send({ error: 'Bad Request' });
  }

  await client.connect();

  const db = client.db(_id);
  const coll = db.collection(_coll);
  const report = await coll.insertOne(data);

  res.send(report);
};

module.exports = handler;