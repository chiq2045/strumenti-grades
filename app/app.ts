import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';

const app = new Koa();

app.use(logger());
app.use(cors());

export { app };
