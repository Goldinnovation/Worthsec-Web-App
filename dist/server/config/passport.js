import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
}
export default function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'loginEmail', passwordField: 'loginPassword' }, async (username, password, done) => {
        console.log('Local strategy is triggered');
        try {
            const user = await prisma.account.findFirst({
                where: {
                    userEmail: username
                }
            });
            if (!user) {
                return done(null, false); //user not found
            }
            const checkPasswordMatch = await bcrypt.compare(password, user.userPassword1);
            if (checkPasswordMatch) {
                console.log('Authentication successful');
                return done(null, user); // Authentication was successful
            }
            else {
                console.log('password does not match ');
                return done(null, false); //Password does not match
            }
        }
        catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return done(error);
            }
            else {
                return done(new Error('An unknown error occurred'));
            }
        }
    }));
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY,
    }, async (jwtPayload, done) => {
        try {
            const user = await prisma.account.findUnique({
                where: {
                    userId: jwtPayload.userId,
                },
            });
            if (user) {
                console.log('user in jwt founded');
                return done(null, user);
            }
            else {
                console.log('user in jwt not founded');
                return done(null, false);
            }
        }
        catch (error) {
            console.log('JWT user error; Token Invalid');
            return done(error, false);
        }
    }));
    passport.serializeUser((user, done) => {
        console.log('stores the user ID in the session');
        done(null, user.userId);
    });
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await prisma.account.findUnique({
                where: {
                    userId: userId
                }
            });
            // console.log(user)
            if (!user) {
                console.error('User not found');
                return done(new Error('User not found'));
            }
            done(null, user);
        }
        catch (error) {
            console.error('Deserialize user error:', error);
            done(error);
        }
    });
}
;
// Generate a JWT token when the your successfully logged In 
export function generateToken(user) {
    return jwt.sign({ userId: user.userId, email: user.userEmail }, SECRET_KEY, { expiresIn: '1h' });
}
