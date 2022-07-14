require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isUrl = require ('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;
let counter = 0;
const shortendUrls = {};

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/shorturl', function(req, res) {
  const original_url = req.body.url;
  console.log(original_url, isUrl(original_url));
  if (!isUrl(original_url)){
    res.send({error: 'invalid url'});
    return;
  }else{  
  counter += 1;
  shortendUrls[counter] = original_url;
  res.json({ original_url: original_url, short_url: counter });
  };
  console.log(original_url);
  console.log(shortendUrls);
});

app.get('/api/shorturl/:id', function(req, res) {
  const id = req.params.id;
  const url = shortendUrls[id];
  console.log(url);
  res.redirect(url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
