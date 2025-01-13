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

// async function updateById({
//   categories_id,
//   courseId,
//   input,
// }: {
//   categories_id: string;
//   courseId: string;
//   input: Prisma.CourseUpdateInput;
// }) {
//   return db.course.update({
//     where: {
//       // Use the compound unique constraint with correct field names: 'id' and 'categories_id'
//       id_categories_id: {
//         id: courseId,         // The unique course ID
//         categories_id: categories_id, // The categories ID (foreign key)
//       },
//     },
//     data: input,
//   });
// }

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
