const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const notFound = 404;

app.post('/search', (req, res) => {
  const { username } = req.body;
  let resources = {};
  fetch(`https://api.github.com/users/${username}`)
    .then((respond) => {
      if (respond.status === notFound) {
        res.sendStatus(notFound);
      }
      return respond.json();
    })
    .then((respond) => {
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
        res.json(resources);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/:username', async (req, res) => {
  const { username } = req.params;
  const respondObj = {
    followers: [],
    following: [],
    repos: [],
  };
  const fetchFollowers = fetch(`https://api.github.com/users/${username}/followers`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.followers = respond.map((followers) => followers.login);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  const fetchFollowing = fetch(`https://api.github.com/users/${username}/following`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.following = respond.map((following) => following.login);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  const fetchRepos = fetch(`https://api.github.com/users/${username}/repos`)
    .then((respond) => respond.json())
    .then((respond) => {
      respondObj.repos = respond.map((repos) => repos.name);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  Promise.all([fetchFollowers, fetchFollowing, fetchRepos]).then(() => res.json(respondObj));
});

const port = process.env.PORT || 8080;
const server = app.listen(port);

console.debug(`App is listening on port ${port}`);

module.exports = server;
