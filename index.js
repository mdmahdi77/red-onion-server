const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h25va.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const foodsCollection = client.db("OnionShop").collection("foods");
  

  app.post('/addFoods', (req, res) => {
      const foods = req.body
      foodsCollection.insertOne(foods)
      .then( result => {
          res.send(result.insertedCount)
      })
  })

  app.get('/foods', (req,res) => {
    foodsCollection.find({})
    .toArray((err, documents) => {
        res.send(documents)
    })
  })

});


app.listen(process.env.PORT || port)