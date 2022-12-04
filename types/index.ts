import { MongoError, ObjectId } from 'mongodb';

export enum Classes {
  None,
  Choir,
  Band,
  Guitar,
  Praise,
}

export type Homeroom = {
  _id: ObjectId;
  id: string;
  title: string;
  teacher: string;
  grade: number;
};

export type Student = {
  _id: ObjectId;
  id: string;
  lastName: string;
  givenNames: string;
  homeroom: ObjectId;
};

export type Grade = {
  _id: ObjectId;
  id: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  proficiency: string;
  class: Classes;
  grade: number;
  student: ObjectId;
};

export type GrowthOutcome = Omit<Grade, 'proficiency'> & {
  outcome: string;
};

export type GetAxiosResponse<T> = {
  data: T[];
  error?: MongoError | Error;
  message?: string;
};
