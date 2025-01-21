import { Prisma } from '@prisma/client';
import { db } from './client';

export const categoriesRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.CategoriesCreateInput) {
  return db.categories.create({
    data: input,
  });
}


async function updateById(id: string, input: Prisma.CategoriesUpdateInput) {
  return db.categories.update({
    where: {
      id,
    },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.categories.delete({
    where: {
      id,
    },
  });
}

export async function findById(id: string) {
  return db.categories.findUnique({
    where: {
      id,
    },
  });
}
async function findAll(input: Prisma.CategoriesWhereInput) {
  return db.categories.findMany({
    where: input,
  });
}
