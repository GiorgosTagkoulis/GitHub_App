const express = require('express');

const app = express();

// An api endpoint that returns a short list of items
app.get('/test', (_req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.debug('Sent list of items');
});

const port = process.env.PORT || 8080;
app.listen(port);

console.debug(`App is listening on port ${port}`);
