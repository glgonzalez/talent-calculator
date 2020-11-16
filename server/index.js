const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/talent-paths', (req, res) => {
  fs.readFile('talent-data.json', 'utf8', (err, response) => {
    if(err) {
      throw new Error(err)
    };

    res.send(JSON.parse(response))
  });
});

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);