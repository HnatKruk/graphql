const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(cors())
app.use('/graphql', graphqlHTTP({ schema }));

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()