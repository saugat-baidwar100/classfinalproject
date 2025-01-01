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

async function updateById({
quizId,
chapter_id,
input,

  }:{quizId: string;
    chapter_id: string;
    input: Prisma.QuizUpdateInput}) {
  return db.quiz.update({
    where: {
      id_chapter_id: {
        // Use the generated name for the compound unique constraint
        id: quizId,
        chapter_id: chapter_id,
      },
    },
    data: input,
  });
}

async function deleteById({
  quizId,
chapter_id,
}:{quizId: string;
  chapter_id: string;
  input: Prisma.QuizUpdateInput
}) {
  return db.quiz.delete({
    where: {
      id_chapter_id: {
        // Use the generated name for the compound unique constraint
        id: quizId,
        chapter_id: chapter_id
    },
    
  },
});
}

async function findById({
  quizId,
  chapter_id,
}: {
  quizId: string;
  chapter_id: string;
}) {
  return db.quiz.findUnique({
    where: {
      id_chapter_id: {
        // Use the generated name for the compound unique constraint
        id: quizId,
        chapter_id: chapter_id,
      },
    },
  });
}
async function findAll(course_id: string,input: Prisma.QuizWhereInput) {
  return db.quiz.findMany({
    where: input,
  });
}