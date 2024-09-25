// import { server } from '../../app';
// import {describe, expect, test, beforeAll} from '@jest/globals';
// import supertest from 'supertest';
// import { Request, NextFunction} from 'express';
// import { RequestHandler } from 'express';

// // const request = supertest(server)


// describe('GET /api/explore',  () => {

//   describe("calling multiple events that user might be interested in", () => {
//     //should get a list of selected interests from the account table with the help of an inner join from userInterest table 
//     //should respond with a json object containing the list of events

//     const mockUser = {
//       userId: '3ad8c0c4-3171-4a02-8a62-2011c5d4c083',
//       userName: 'caro1',
//       userEmail: 'caro1',
//       // Add other user properties if necessary
//     };
    
//     const mockAuthMiddleware = (req, res, next) => {
//       req.user = mockUser; // Mock user data
//       next(); // Proceed to the next middleware
//     };


//      // Apply middleware for this test case
//      beforeAll(async () => {
//       // Attach the middleware to your server
//       server.use(mockAuthMiddleware);
//     });

//      test("Should respond with a 200 status code", async() => {
//         const response = await request
//         .get("/api/explore")                 
//         .send();

//          // Middleware to mock authentication
  

       
//         expect(response.status).toBe(200)
        
//      })

//   })

//   describe("Events that might interest the user could not be found",  () => {
//     // Should respond with an message
//   })


// })
