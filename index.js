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
  const { username } = req.body;
  let resources = {};
  fetch(`https://api.github.com/users/${username}`)
    .then((respond) => {
      console.debug('### resultCode is: ', respond.status);
      if (respond.status === notFound) {
        res.sendStatus(notFound);
      }
      return respond.json();
    })
    .then((respond) => {
      // console.debug('### respond is: \n', respond);
      if (respond.type === 'User') {
        resources = {
          name: respond.name,
          username: respond.login,
          html_url: respond.html_url,
          avatar_url: respond.avatar_url,
          followers: respond.followers,
          following: respond.following,
          public_repos: respond.public_repos,
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

app.get('/:username', async (req, res) => {
  console.debug(req.params.username);
  const { username } = req.params;
  const respondObj = {
    followers: [],
    following: [],
    repos: [],
  };
  await fetch(`https://api.github.com/users/${username}/followers`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.followers = respond.map((followers) => followers.login);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  await fetch(`https://api.github.com/users/${username}/following`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.following = respond.map((following) => following.login);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  await fetch(`https://api.github.com/users/${username}/repos`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.repos = respond.map((repos) => repos.name);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  res.json(respondObj);
});

const port = process.env.PORT || 8080;
app.listen(port);

console.debug(`App is listening on port ${port}`);
