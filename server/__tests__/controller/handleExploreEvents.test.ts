import {server} from '../../app'
import {describe, expect, test} from '@jest/globals';
import supertest from "supertest";


const request = supertest(server)

describe('GET /api/explore', async () => {

  describe("calling multiple events that user might be interested in", async () => {
    //should get a list of selected interests from the account table with the help of an inner join from userInterest table 
    //should respond with a json object containing the list of events
     test("Should respond with a 200 status code", async() => {
        const response = await request
        .post("/api/explore")                 
        .send({
            userId: '3ad8c0c4-3171-4a02-8a62-2011c5d4c083',
            userName: 'caro1',
            userEmail: 'caro1',
            userPassword1: '$2b$10$Lv7Irp4fYAewEgwKgsL.Zub7edkyZIc/r7yuVaRpvobNE7wb6T.te',
        
        });
        expect(response.statusCode).toBe(200)
        
     })

  })

  describe("Events that might interest the user could not be found",  () => {
    // Should respond with an message
  })


})
