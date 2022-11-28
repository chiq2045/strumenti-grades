import { Db, MongoClient, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { faker } from '@faker-js/faker';

let database: Db | null = null;

const proficiencies = Array.from({ length: 5 }, () => faker.lorem.sentence());
const outcomes = Array.from({ length: 5 }, () => faker.lorem.sentence());
const classes = ['', 'Choir', 'Band', 'Guitar', 'Praise'];

const createHomeroom = () => ({
  _id: new ObjectId(10),
  title: faker.word.adjective(),
  teacher: `${faker.helpers.arrayElement([
    'Mr',
    'Ms',
    'Mrs',
  ])} ${faker.name.lastName()}`,
});
const homerooms = Array.from({ length: 10 }, () => createHomeroom());

const createStudent = () => ({
  _id: new ObjectId(20),
  lastName: faker.name.lastName(),
  givenNames: faker.name.firstName(),
  homeroom: faker.helpers.arrayElement(homerooms.map((v) => v._id)),
});
const students = Array.from({ length: 30 }, () => createStudent());

const createGrade = () => ({
  _id: new ObjectId(30),
  quarter: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
  proficiency: faker.helpers.arrayElement(proficiencies),
  class: faker.helpers.arrayElement(classes),
  grade: Math.floor(Math.random() * 9) / 2,
  student: faker.helpers.arrayElement(students.map((v) => v._id)),
});
const grades = Array.from({ length: 1000 }, () => createGrade());

const createGrouthOutcomes = () => ({
  _id: new ObjectId(40),
  quarter: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
  outcome: faker.helpers.arrayElement(outcomes),
  class: faker.helpers.arrayElement(classes),
  grade: Math.floor(Math.random() * 9) / 2,
  student: faker.helpers.arrayElement(students.map((v) => v._id)),
});
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
