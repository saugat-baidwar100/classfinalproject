import { Prisma } from '@prisma/client';
import { db } from './client';

export const fileRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.FileCreateInput) {
  return db.file.create({
    data: input,
  });
}

export async function findById(id: number) {
  return db.file.findUnique({
    where: { id },
  });
}

export async function findAll(input: Prisma.FileWhereInput) {
  return db.file.findMany({
    where: input,
  });
}

// Update file by ID
export async function updateById(id: number, data: Prisma.FileUpdateInput) {
  return db.file.update({
    where: { id },
    data,
  });
}

// Delete file by ID
export async function deleteById(id: number) {
  return db.file.delete({
    where: { id },
  });
}
