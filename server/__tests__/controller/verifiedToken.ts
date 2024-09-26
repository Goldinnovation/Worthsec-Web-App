
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY=  process.env.SECRET_KEY as string



function createMockJWT() {
  // Define the payload you want in the token
  const payload = {
    id: 1,
    username: 'testuser',
    role: 'user'
  };

  // Define your secret key and token options
  const secretKey = SECRET_KEY; // Use the same secret key as your server
  const options = {
    expiresIn: '1h' // Token expiration time
  };

  // Create the token
  const token = jwt.sign(payload, secretKey, options);

  return token;
}

export default createMockJWT;