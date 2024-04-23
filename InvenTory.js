const express=require('express');
const app = express();
//const player=require('./routes/players');
const port=process.env.PORT||3000;

//app.use('/api/players', player);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


// Assuming you have a Player model with a related Inventory model
// const { Player, Inventory } = require('./routes/players');
// Promise.all
// {
//   await import('./routes/players');
// }

// 

app.get('/api/players/:playerId/inventory', async (req, res) => {
  const player = await client.db('players').collection('player').findById(req.params.playerId);
  if (!player) {
    return res.status(404).send('Player not found');
  }
  res.send(player.inventory);
});

// DELETE an item from a player's inventory
app.delete('/api/players/:playerId/inventory/:itemId', async (req, res) => {
  const { playerId, itemId } = req.params;
  const player = await client.db('players').collection('player').findById(req.params.playerId);
  if (!player) {
    return res.status(404).send('Player not found');
  }
  const item = await Inventory.findById(itemId);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  player.inventory.remove(item);
  await player.save();
  res.send('Item removed from inventory');
});



app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://nogi_brian:20010808@cluster0.lvjmeee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch((err)=>console.error(err.stack));


