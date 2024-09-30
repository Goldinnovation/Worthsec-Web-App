// import server from '../../app';
import server from '../../app'
// import {server} from '../../app'
import { describe, expect, test, beforeAll, it} from 'vitest';
import supertest from 'supertest';
import createMockJWT from './verifiedToken';

// const SECRET_KEY=  process.env.SECRET_KEY as string

// calling multiple events that user might be interested in
//should get a list of selected interests from the account table with the help of an inner join from userInterest table 
//should respond with a json object containing the list of events
// Should respond with a 404 status code


describe('POST /api/userInterest', () => {
  it('should access endpoint', async () => {
    const response = await supertest(server)
      .post("/api/userInterest")
      .set('Content-Type', 'application/json');

    console.log('Status Code:', response.status);
    console.log('Response Body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ message: "connected" });
  });
});
