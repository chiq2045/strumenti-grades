import Router from '@koa/router';
import { devDb as db } from '../database';
import koaBody from 'koa-body';
import { ObjectId } from 'mongodb';

const outcomes = new Router({
  prefix: '/outcomes',
});

outcomes
  .get('/', async (ctx) => {
    try {
      const data = await db().then((v) =>
        v.collection('outcomes').find().toArray()
      );
      ctx.body = { data };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .post('/', koaBody({ multipart: true }), async (ctx) => {
    const { body: outcome } = ctx.request;

    try {
      await db().then((v) => v.collection('outcomes').insertOne(outcome));
      ctx.body = { data: [] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .put('/:id', koaBody({ multipart: true }), async (ctx) => {
    const { body: outcome } = ctx.request;
    const { id } = ctx.params;
    const _id = new ObjectId(id);

    try {
      const newOutcome = await db().then((v) =>
        v.collection('outcomes').findOneAndUpdate(
          { _id },
          {
            $set: outcome,
          },
          {
            returnDocument: 'after',
          }
        )
      );
      ctx.body = { data: [newOutcome] };
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
      const deletedOutcome = await db().then((v) =>
        v.collection('outcomes').findOneAndDelete({ _id })
      );
      ctx.body = { data: [deletedOutcome] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  });

export { outcomes };
