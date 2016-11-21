const request = require('supertest');
const expect = require('chai').expect;
const nock = require('nock');
const lint = require('mocha-eslint');
const zlib = require('zlib');

const app = require('../examples/example');

const client = app.context.raven;

lint(['index.js', 'test', 'examples'], { timeout: 10000 });

describe('koa2-swagger-ui', function() {
  it('should respond 200', function(done) {
    request(app.listen())
      .get('/')
      .expect(200, 'ok')
      .end((err) => {
        if (err) throw new Error(err);
        done();
      });
  });
  it('should capture exception', function(done) {
    const scope = nock('https://app.getsentry.com:443')
      .filteringRequestBody(/.*/, '*')
      .post('/api/269/store/', '*')
      .reply(200, 'OK');
    client.once('logged', () => {
      scope.done();
      done();
    });
    request(app.listen())
      .get('/throw')
      .expect(500, 'Internal Server Error')
      .end((err) => {
        if (err) throw new Error(err);
      });
  });
  it('should capture body on exception', function(done) {
    const scope = nock('https://app.getsentry.com:443')
      .filteringRequestBody(/.*/, '*')
      .post('/api/269/store/', '*')
      .reply(200, 'OK');
    client.once('logged', () => {
      scope.done();
      done();
    });
    request(app.listen())
      .post('/throwPost')
      .send({ value: 1 })
      .expect(500, 'Internal Server Error')
      .end((err) => {
        if (err) throw new Error(err);
      });
  });
  it('should send an Error to Sentry server', function(done) {
    const scope = nock('https://public:private@app.getsentry.com')
        .filteringRequestBody(/.*/, '*')
        .post('/api/269/store/', '*')
        .reply(200, 'OK');

    client.once('logged', function() {
      scope.done();
      done();
    });
    client.captureException('wtf?');
  });
  it('should capture user', function (done) {
    const scope = nock('https://app.getsentry.com')
      .filteringRequestBody(/.*/, '*')
      .post('/api/269/store/', '*')
      .reply(200, function (uri, body) {
        zlib.inflate(new Buffer(body, 'base64'), (err, dec) => {
          if (err) return done(err);
          const msg = JSON.parse(dec.toString());
          expect(msg.user).to.have.property('email').and.eq('matt@example.com');
          expect(msg.user).to.have.property('id').and.eq('123');

          return done();
        });
        return 'OK';
      });

    client.setContext({
      user: {
        email: 'matt@example.com',
        id: '123',
      },
    });

    client.once('logged', function () {
      scope.done();
    });
    request(app.listen())
      .get('/throwUser')
      .expect(500, 'Internal Server Error')
      .end((err) => {
        if (err) throw new Error(err);
      });
  });
});
