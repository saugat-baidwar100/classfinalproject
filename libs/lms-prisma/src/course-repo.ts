import { Prisma } from '@prisma/client';
import { db } from './client';

export const courseRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.CourseCreateInput) {
  return db.course.create({
    data: input,
  });
}

async function updateById(id: string, input: Prisma.CourseUpdateInput) {
  return db.course.update({
    where: {
      id,
    },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.course.delete({
    where: {
      id,
    },
  });
}

async function findById(id: string) {
  return db.course.findUnique({
    where: {
      id,
    },
  });
}
async function findAll(input: Prisma.CourseWhereInput) {
  return db.course.findMany({
    where: input,
  });
}