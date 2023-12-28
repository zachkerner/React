const server = require('../src/index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('test numbers in param', () => {

  it('GET /55 should show {"answer":"[19,23]"}', async () => {
    const res = await requestWithSupertest.get('/55')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('answer', "[19,23]")
  } )
})