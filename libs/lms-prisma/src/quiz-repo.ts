import { Prisma } from '@prisma/client';
import { db } from './client';

export const quizRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.QuizCreateInput) {
  return db.quiz.create({
    data: input,
  });
}

async function updateById({id,input}:{id: string, input: Prisma.QuizUpdateInput}) {
  return db.quiz.update({
    where: {
      id,
    },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.quiz.delete({
    where: {
      id,
    },
  });
}

async function findById(id: string) {
  return db.quiz.findUnique({
    where: {
      id,
    },
  });
}
async function findAll(input: Prisma.QuizWhereInput) {
  return db.quiz.findMany({
    where: input,
  });
}