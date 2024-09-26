import { server } from '../../app';
import {describe, expect, test, beforeAll} from '@jest/globals';
import supertest from 'supertest';
import { Request, NextFunction} from 'express';
import { RequestHandler } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import createMockJWT from './verifiedToken';

const SECRET_KEY=  process.env.SECRET_KEY as string

describe('GET /api/explore',  () => {

  describe("calling multiple events that user might be interested in", () => {
    //should get a list of selected interests from the account table with the help of an inner join from userInterest table 
    //should respond with a json object containing the list of events
    // Should respond with a 404 status code

  
    try{
      
       
        it('should access protected endpoint with mock JWT', async () => {
          const mockToken = createMockJWT();
            console.log('hallo');
          const Request = await supertest(server).post("/api/login-token")
          .expect(200)
          
          console.log(Request);
          expect(Request).toBe(true);
        });
      
     
  

    }catch(error){
      console.error("TestERROR", error)
    }
    
  })

  describe("Events that might interest the user could not be found",  () => {
    // Should respond with an message
  })


})


