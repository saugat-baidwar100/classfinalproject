import { Prisma } from '@prisma/client';
import { db } from './client';

export const contentRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.ContentCreateInput) {
  return db.content.create({
    data: input,
  });
}

async function updateById(id: string, input: Prisma.ContentUpdateInput) {
  return db.content.update({
    where: {
      id,
    },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.content.delete({
    where: {
      id,
    },
  });
}

async function findById(id: string) {
  return db.content.findUnique({
    where: {
      id,
    },
  });
}
async function findAll(input: Prisma.ContentWhereInput) {
  return db.content.findMany({
    where: input,
  });
}