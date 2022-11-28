import Router from '@koa/router';
import { devDb as db } from '../database';
import koaBody from 'koa-body';
import { ObjectId } from 'mongodb';

const grades = new Router({
  prefix: '/grades',
});

grades
  .get('/', async (ctx) => {
    try {
      const data = await db().then((v) =>
        v.collection('grades').find().toArray()
      );
      ctx.body = { data };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .post('/', koaBody({ multipart: true }), async (ctx) => {
    const { body: grade } = ctx.request;

    try {
      await db().then((v) => v.collection('grades').insertOne(grade));
      ctx.body = { data: [] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .put('/:id', koaBody({ multipart: true }), async (ctx) => {
    const { body: grade } = ctx.request;
    const { id } = ctx.params;
    const _id = new ObjectId(id);

    try {
      const newGrade = await db().then((v) =>
        v.collection('grades').findOneAndUpdate(
          { _id },
          {
            $set: grade,
          },
          {
            returnDocument: 'after',
          }
        )
      );
      ctx.body = { data: [newGrade] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .del('/:id', async (ctx) => {
    const { id } = ctx.params;
    const _id = new ObjectId(id);

    try {
      const deletedGrade = await db().then((v) =>
        v.collection('grades').findOneAndDelete({ _id })
      );
      ctx.body = { data: [deletedGrade] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  });

export { grades };
