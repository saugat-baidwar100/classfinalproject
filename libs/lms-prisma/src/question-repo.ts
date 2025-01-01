import { Prisma } from '@prisma/client';
import { db } from './client';

export const questionRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.QuestionCreateInput) {
  return db.question.create({
    data: input,
  });
}

async function updateById({
  questionId,
  quiz_id,
  input,
}:
{
  questionId: string;
  quiz_id: string;
  input: Prisma.ContentUpdateInput;
}) {
  return db.question.update({
    where: {
    id_quiz_id: {
      // Use the generated name for the compound unique constraint
      id: questionId,
      quiz_id: quiz_id,
    },
  },
    data: input,
  });
}

async function deleteById({
  questionId,
  quiz_id,
}: {
  questionId: string;
  quiz_id: string;
}) {
  return db.question.delete({
    where: {
      id_quiz_id: {
        // Correct compound unique constraint field name
        id: questionId,
      quiz_id: quiz_id,
      },
    },
  });
}

 export async function findById({
  questionId,
  quiz_id,
  }: {
    questionId: string;
    quiz_id: string;
  }) {
  return db.question.findUnique({
    where: {
      id_quiz_id: {
        // Correct compound unique constraint field name
        id: questionId,
      quiz_id: quiz_id,
      },
    },
  });
  }
async function findAll(input: Prisma.QuestionWhereInput) {
  return db.question.findMany({
    where: input,
  });
}