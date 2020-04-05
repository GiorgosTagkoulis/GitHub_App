const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const notFound = 404;

// An api endpoint that returns a short list of items
app.post('/search', (req, res) => {
  console.debug('### req.body is: ', req.body);
  const { user } = req.body;
  let resources = {};
  fetch(`https://api.github.com/users/${user}`)
    .then((result) => {
      console.debug('### resultCode is: ', result.status);
      if (result.status === notFound) {
        res.sendStatus(notFound);
      }
      return result.json();
    })
    .then((result) => {
      console.debug('### result is: \n', result);
      if (result.type === 'User') {
        resources = {
          name: result.name,
          username: result.login,
          html_url: result.html_url,
          avatar_url: result.avatar_url,
          followers: result.followers,
          following: result.following,
          public_repos: result.public_repos,
          followers_url: result.followers_url,
          following_url: result.following_url,
          repos_url: result.repos_url,
          starred_url: result.starred_url,
        };
        console.debug('### resources is: \n', resources);
        res.json(resources);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

const port = process.env.PORT || 8080;
app.listen(port);

console.debug(`App is listening on port ${port}`);
