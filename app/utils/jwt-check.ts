import jwt, { Options } from 'koa-jwt';
import { koaJwtSecret } from 'jwks-rsa';

const options: Options = {
  secret: koaJwtSecret({
    jwksUri: 'https://strumenti.us.auth0.com/.well-known/jwks.json',
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 36000000,
    rateLimit: true,
  }),
  audience: 'https://api.ogamba.com/strumenti/grades',
};

export const jwtCheck = jwt(options);
