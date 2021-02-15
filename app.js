const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

// Mongoose
require('./config/mongoose')

// Normal Setting
const app = express()
const PORT = process.env.PORT || 3000

// Express-Handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))

// Route
app.use(routes)

// Listen
app.listen(PORT, console.log(`The server is running on localhost:${PORT}`))
