const express = require('express');
const path = require('path');
const app = express()

app.use(express.static('./dist'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
})
app.listen(8080, () => console.log('Example app listening on port 8080!'))