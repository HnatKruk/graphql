const { Schema, model } = require('mongoose')

const directorSchema = new Schema({
  name: String,
  age: String,
})

module.exports = model('Director', directorSchema)