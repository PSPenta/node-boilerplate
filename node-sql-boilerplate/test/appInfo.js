/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const {
  expect
} = chai;
chai.use(chaiHttp);

// Test Suite
// eslint-disable-next-line no-undef
describe('Testing Appinfo', () => {
  // Test Case
  it('/GET Fetching AppInfo', (done) => {
    chai.request(server).get('/api').end((err, res) => {
      if (err) {
        console.log('err', err);
        done();
      }
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
