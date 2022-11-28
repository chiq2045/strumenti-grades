import Router from '@koa/router';
import { devDb as db } from '../database';
import koaBody from 'koa-body';
import { ObjectId } from 'mongodb';

const students = new Router({
  prefix: '/students',
});

students
  .get('/', async (ctx) => {
    try {
      const data = await db().then((v) =>
        v.collection('students').find().toArray()
      );
      ctx.body = { data };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .post('/', koaBody({ multipart: true }), async (ctx) => {
    const { body: student } = ctx.request;

    try {
      await db().then((v) => v.collection('students').insertOne(student));
      ctx.body = { data: [] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  })
  .put('/:id', koaBody({ multipart: true }), async (ctx) => {
    const { body: student } = ctx.request;
    const { id } = ctx.params;
    const _id = new ObjectId(id);

    try {
      const newStudent = await db().then((v) =>
        v.collection('students').findOneAndUpdate(
          { _id },
          {
            $set: student,
          },
          {
            returnDocument: 'after',
          }
        )
      );
      ctx.body = { data: [newStudent] };
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
      const deletedStudent = await db().then((v) =>
        v.collection('students').findOneAndDelete({ _id })
      );
      ctx.body = { data: [deletedStudent] };
    } catch (e) {
      console.log(e);
      ctx.body = { error: e };
      ctx.status = 400;
    }
  });

export { students };
