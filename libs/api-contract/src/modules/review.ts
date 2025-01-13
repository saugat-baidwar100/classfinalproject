import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

const errorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const reviewSchema = z.object({
  id: z.string(),
  Comment: z.string(),
  course_id: z.string(),
  username: z.string(),
  rating: z.number(),

  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type TreviewSchema = z.infer<typeof reviewSchema>;

export const reviewContract = c.router({
  getReview: {
    method: 'GET',
    path: '/api/courses/:course_id/users/:username/reviews',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(reviewSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the reviews from the given course for a specific user',
  },

  getReviewById: {
    method: 'GET',
    path: '/api/courses/:course_id/users/:username/reviews/:reviewId',
    responses: {
      200: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the review by id for a specific user',
  },

  createReview: {
    method: 'POST',
    path: '/api/courses/:course_id/users/:username/reviews/add',
    body: reviewSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create a review for a specific user',
  },

  updateReview: {
    method: 'PUT',
    path: '/api/courses/:course_id/users/:username/reviews/update/:reviewId',
    body: reviewSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update a review for a specific user',
  },

  deleteReview: {
    method: 'DELETE',
    path: '/api/courses/:course_id/users/:username/reviews/delete/:reviewId',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete a review for a specific user',
  },
});
