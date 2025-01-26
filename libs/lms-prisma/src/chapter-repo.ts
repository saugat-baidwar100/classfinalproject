import { Prisma } from '@prisma/client';
import { db } from './client';

export const chapterRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.ChapterCreateInput) {
  return db.chapter.create({
    data: input,
  });
}
async function updateById({
  chapterId,
  courseId,
  input,
}: {
  chapterId: string;
  courseId: string;
  input: Prisma.ChapterUpdateInput;
}) {
  return db.chapter.update({
    where: {
      id_course_id: {
        id: chapterId,
        course_id: courseId,
      },
    },
    data: input,
  });
}

async function deleteById({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) {
  return db.chapter.delete({
    where: {
      id_course_id: {
        id: chapterId,
        course_id: courseId,
      },
    },
  });
}

async function findById({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) {
  return db.chapter.findUnique({
    where: {
      id_course_id: {
        id: chapterId,
        course_id: courseId,
      },
    },
  });
}
async function findAll(input: Prisma.ChapterWhereInput) {
  return db.chapter.findMany({
    where: input,
  });
}
