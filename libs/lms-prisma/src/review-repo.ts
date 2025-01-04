import { db } from './client';
import { Prisma } from '@prisma/client';

export const reviewRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

export async function create( input: Prisma.ReviewCreateInput) {
  return db.review.create({
    data: input,
  });
}

export async function updateById({
  reviewId,
  course_id,
  
  input,
}: {
  reviewId: string;
  course_id: string;
  // user_id: string;
  input: Prisma.ReviewUpdateInput;
}) {
  return db.review.update({
    where: {
      id: reviewId,
      course_id: course_id,
    },
    data: input,
  });
}

export async function deleteById({
  reviewId,
  course_id,
}: {
  reviewId: string;
  course_id: string;
}) {
  return db.review.delete({
    where: {
      id: reviewId,
      course_id: course_id,
    },
  });
}

export async function findById({
  reviewId,
  course_id,
  user_id
}: {
  reviewId: string;
  course_id: string;
  user_id: string;
}) {
  return db.review.findUnique({
    where: {
      id: reviewId,
      course_id: course_id,
      user_id: user_id,
    },
  });
}

export async function findAll(input: Prisma.ReviewWhereInput) {
  return db.review.findMany({
    where: input,
  });
}
