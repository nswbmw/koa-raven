const app = require('../examples/example');
const request = require('supertest');
const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);
const expect = chai.expect;

describe('koa2-swagger-ui', function() {
  it('should response 200', function(done) {
    request(app.listen())
      .get('/')
      .expect(200, 'ok')
      .end((err) => {
        if (err) throw new Error(err);
        return done();
      });
  });
  it('should capture exception', function(done) {
    const spy = chai.spy.on(app.context.client, 'captureException');
    request(app.listen())
      .get('/throw')
      .expect(500, 'Internal Server Error')
      .end((err) => {
        if (err) throw new Error(err);
        expect(spy).to.have.been.called();
        return done();
      });
  });
});
