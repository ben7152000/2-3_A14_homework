const db = require('../../config/mongoose')
const url = require('./url.json').results
const Url = require('../url')

db.once('open', () => {
  console.log('mongodb connected !!')
  Url.create(url)
    .then(() => db.close())
  console.log('url is done')
})