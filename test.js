const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index');

const { expect } = chai;

chai.use(chaiHttp);

const user = {
  username: 'GiorgosTagkoulis',
};

describe('Endpoints for server', () => {
  describe('POST request /search', () => {
    it('fetch the correct user, and return status 200', (done) => {
      chai
        .request(app)
        .post('/search')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.not.have.deep.keys('error');
          expect(res.body).to.have.deep.keys(
            'name',
            'username',
            'html_url',
            'avatar_url',
            'followers',
            'following',
            'public_repos'
          );
          done();
        });
    });
  });
  describe('GET /:username', () => {
    it('should return status 200 for valid request', (done) => {
      chai
        .request(app)
        .get('/GiorgosTagkoulis')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.not.have.deep.keys('error');
          expect(res.body).to.have.deep.keys('followers', 'following', 'repos');
          done();
        });
    });
  });
});
