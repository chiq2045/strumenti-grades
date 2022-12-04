import { Db, MongoClient, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { faker } from '@faker-js/faker';
import { Classes, Grade, GrowthOutcome, Homeroom, Student } from 'types';

let database: Db | null = null;

const proficiencies = Array.from({ length: 5 }, () => faker.lorem.sentence());
const outcomes = Array.from({ length: 5 }, () => faker.lorem.sentence());
const classes = [
  Classes.None,
  Classes.Choir,
  Classes.Band,
  Classes.Guitar,
  Classes.Praise,
];

const createHomeroom = (): Homeroom => {
  const _id = new ObjectId(10);
  return {
    _id,
    id: new ObjectId(_id).toString(),
    title: faker.word.adjective(),
    teacher: `${faker.helpers.arrayElement([
      'Mr',
      'Ms',
      'Mrs',
    ])} ${faker.name.lastName()}`,
    grade: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8]),
  };
};
const homerooms = Array.from({ length: 10 }, () => createHomeroom());

const createStudent = (): Student => {
  const _id = new ObjectId(20);
  return {
    _id,
    id: new ObjectId(_id).toString(),
    lastName: faker.name.lastName(),
    givenNames: faker.name.firstName(),
    homeroom: faker.helpers.arrayElement(homerooms.map((v) => v._id)),
  };
};
const students = Array.from({ length: 30 }, () => createStudent());

const createGrade = (): Grade => {
  const _id = new ObjectId(30);
  return {
    _id,
    id: new ObjectId(_id).toString(),
    quarter: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
    proficiency: faker.helpers.arrayElement(proficiencies),
    class: faker.helpers.arrayElement(classes),
    grade: Math.floor(Math.random() * 9) / 2,
    student: faker.helpers.arrayElement(students.map((v) => v._id)),
  };
};
const grades = Array.from({ length: 1000 }, () => createGrade());

const createGrouthOutcomes = (): GrowthOutcome => {
  const _id = new ObjectId(40);
  return {
    _id,
    id: new ObjectId(_id).toString(),
    quarter: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
    outcome: faker.helpers.arrayElement(outcomes),
    class: faker.helpers.arrayElement(classes),
    grade: Math.floor(Math.random() * 9) / 2,
    student: faker.helpers.arrayElement(students.map((v) => v._id)),
  };
};
const growthOutcomes = Array.from({ length: 200 }, () =>
  createGrouthOutcomes()
);

export const devDb = async () => {
  const mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  const client = new MongoClient(url);

  if (!database) {
    await client.connect();
    database = client.db();

    await database.collection('homerooms').insertMany(homerooms);

    await database.collection('students').insertMany(students);

    await database.collection('grades').insertMany(grades);

    await database.collection('outcomes').insertMany(growthOutcomes);
  }

  return database;
};
