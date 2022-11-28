import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import json from 'koa-json';
import { grades, homerooms, outcomes, students } from './routes';

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(json());
app.use(grades.allowedMethods());
app.use(outcomes.allowedMethods());
app.use(students.allowedMethods());
app.use(homerooms.allowedMethods());
app.use(grades.routes());
app.use(outcomes.routes());
app.use(students.routes());
app.use(homerooms.routes());

export { app };
