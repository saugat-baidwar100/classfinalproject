import { Prisma } from '@prisma/client';
import { db } from './client';

export const userRepo = {
  create,
  updateById,
  updateByEmail,
  findById,
  findByEmail,
  findByUsername,
  updateByUsername
};

async function create(input: Prisma.UserCreateInput) {
  return db.user.create({
    data: input,
  });
}
async function updateById(id: string, input: Prisma.UserUpdateInput) {
  return db.user.update({
    where: {
      id,
    },
    data: input,
  });
}
async function updateByEmail(email: string, input: Prisma.UserUpdateInput) {
  return db.user.update({
    where: {
      email,
    },
    data: input,
  });
}

async function findById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

async function findByUsername(username:string){
    return db.user.findUnique({
        where:{
            username,
        },
    });
}

async function updateByUsername(username: string, input: Prisma.UserUpdateInput) {
    return db.user.update({
      where: {
        username,
      },
      data: input,
    });
  }