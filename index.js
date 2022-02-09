const { AwesomeQR } = require("awesome-qr");
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/get', async (req, res) => {
  const { text } = req.query
  const buffer = await new AwesomeQR({
    text: text,
    size: 500,
  }).draw();

  const imgString = 'data:image/jpeg;base64, ' + buffer.toString('base64');
  res.send("<html><body><div style='margin: 0 auto; text-align: center'><h1>" + text + "</h1><img width='500px' src='" + imgString + "' /></div></body></html>");
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

