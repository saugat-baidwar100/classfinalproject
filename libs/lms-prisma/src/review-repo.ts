import { db } from './client';
import { Prisma } from '@prisma/client';

export const reviewRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

export async function create(input: Prisma.ReviewCreateInput) {
  return db.review.create({
    data: input,
  });
}

export async function updateById({
  reviewId,
  courseId,
  input,
}: {
  reviewId: string;
  courseId: string;
  input: Prisma.ReviewUpdateInput;
}) {
  return db.review.update({
    where: {
      id: reviewId,
      course_id: courseId,
    },
    data: input,
  });
}

export async function deleteById({
  reviewId,
  courseId,
}: {
  reviewId: string;
  courseId: string;
}) {
  return db.review.delete({
    where: {
      id: reviewId,
      course_id: courseId,
    },
  });
}

export async function findById({
  reviewId,
  courseId,
}: {
  reviewId: string;
  courseId: string;
}) {
  return db.review.findUnique({
    where: {
      id: reviewId,
      course_id: courseId,
    },
  });
}

export async function findAll(p0?: { courseId: string; }) {
  return db.review.findMany();
}
