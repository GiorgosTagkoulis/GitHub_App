## GigHub App

An app that make api calls to the GitHib API. It searches for users by username and presents various informations regarding followers, following and repos.

### Install Dependencies

Clone the repo:

`git clone git@github.com:GiorgosTagkoulis/GitHub_App.git`

and change directory to the repo:

`cd GitHub_App`

Install server dependencies:

`npm install`

Install client dependencies:

`cd client && yarn install`

### Run the server and the client

Once back to the root directory of the project (`cd ../` if one following the commands presented here), run the server in production:

`npm start`

Run the server in development:

`npm start:dev`

Run the client:

`npm run start:client`

### Run tests

To run the tests, in the root directory type:

`npm run test`

Keep in mind that in the a slow network, the second test might fail because it might exceed the 2000ms.

### Commence the application

Go to your favourite browser and type the address:

`localhost:3000`

Search GitHub users by username. Since at the moment the requests are unauthenticated, GitHub allows only 60 requests per hour and that included also the requests performed by the tests.
