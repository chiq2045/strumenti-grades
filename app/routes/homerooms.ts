import Router from '@koa/router';
import { devDb as db } from '../database';
import koaBody from 'koa-body';
import { ObjectId } from 'mongodb';

const homerooms = new Router({
  prefix: '/homerooms',
});

homerooms
  .get('/', async (ctx) => {
    try {
      const data = await db().then((v) =>
        v.collection('homerooms').find().toArray()
      );
      ctx.body = { data };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .post('/', koaBody({ multipart: true }), async (ctx) => {
    const { body: homeroom } = ctx.request;

    try {
      await db().then((v) => v.collection('homerooms').insertOne(homeroom));
      ctx.body = { data: [] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .put('/:id', koaBody({ multipart: true }), async (ctx) => {
    const { body: homeroom } = ctx.request;
    const { id } = ctx.params;
    const _id = new ObjectId(id);

    try {
      const newHomeroom = await db().then((v) =>
        v.collection('homerooms').findOneAndUpdate(
          { _id },
          {
            $set: homeroom,
          },
          {
            returnDocument: 'after',
          }
        )
      );
      ctx.body = { data: [newHomeroom] };
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
      const deletedHomeroom = await db().then((v) =>
        v.collection('homerooms').findOneAndDelete({ _id })
      );
      ctx.body = { data: [deletedHomeroom] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  });

export { homerooms };
