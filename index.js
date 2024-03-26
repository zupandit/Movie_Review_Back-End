import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient

const MONGO_USERNAME = process.env['MONGO_USERNAME']
const MONGO_PASSWORD = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.xgi0qeb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }).catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
.then(async client =>{
  await ReviewsDAO.injectDB(client)
  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })
} )