const express = require('express')
const app = express()

const PORT = 3000

app.get('/' , (req, res) => {
  res.send('ok')
})

app.listen(PORT, console.log(`The server is running on localhost:${PORT}`))