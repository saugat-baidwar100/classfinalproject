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
    data: {
      ...input,
      user: {
        connect: { username: input.username},  // Make sure user_id is part of the input
      },
    },
  });
}



export async function updateById({
  reviewId,
  course_id,
  input,
}: {
  reviewId: string;
  course_id: string;
  input: Prisma.ReviewUpdateInput;
}) {
  return db.review.update({
    where: {
      id_course_id: {
        id: reviewId,         // Corrected key
        course_id: course_id, // Corrected key
      },
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
      id_course_id: {
        id: reviewId,         // Corrected key
        course_id: course_id, // Corrected key
      },
    },
  });
}
export async function findById({
  reviewId,
  course_id,
  username,
}: {
  reviewId: string;
  course_id: string;
  username: string;
}) {
  return db.review.findUnique({
    where: {
      id_course_id: {
        id: reviewId,         // Corrected key
        course_id: course_id, // Corrected key
      },
      username: username,    // Keep the username as is for filtering
    },
  });
}

export async function findAll(input: Prisma.ReviewWhereInput) {
  return db.review.findMany({
    where: input,
  });
}
