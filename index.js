const express=require('express');
const app = express();



app.use(express.json());


app.post('/api/players', async (req, res) => {
    
    let player = await client.db('players').collection('player').insertOne({
    
        playerId:req.body.playerId,
        item    :req.body.item
    })
    console.log(player);
    
});
 module.exports(app);

/*app.post('/api/players/inventory', async (req, res) => {
    const { playerId, itemId } = req.body;
    const player = await client.db("players").collection("player").findOne({_id:playerId})
    {
    if (!player) {
      return res.status(404).send('Player not found');
    }
    const item = await Inventory.findById(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    player.inventory.push(item);
    await player.save();
    res.send('Item added to inventory');
    }
  });*/



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

