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

async function updateById({
  categories_id,
  courseId,
  input,
}: {
  categories_id: string;
  courseId: string;
  input: Prisma.CourseUpdateInput;
}) {
  return db.course.update({
    where: {
      id_categories_id: {
        id: courseId, // The unique course ID
        categories_id: categories_id, // The categories ID (foreign key)
      },
    },
    data: input,
  });
}

async function deleteById({
  categories_id,
  courseId,
}: {
  categories_id: string;
  courseId: string;
}) {
  return db.course.delete({
    where: {
      id_categories_id: {
        id: courseId, // The unique course ID
        categories_id: categories_id, // The categories ID (foreign key)
      },
    },
  });
}

async function findById({
  categories_id,
  courseId,
}: {
  categories_id: string;
  courseId: string;
}) {
  return db.course.findUnique({
    where: {
      id_categories_id: {
        id: courseId, // The unique course ID
        categories_id: categories_id, // The categories ID (foreign key)
      },
    },
  });
}

async function findAll(input: Prisma.CourseWhereInput) {
  return db.course.findMany({
    where: input,
  });
}
