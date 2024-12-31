import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { courseSchema } from './courses';

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
  user_id: z.string(),
  course_id: z.string(),
  rating: z.number(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  course: courseSchema,
});

export type TreviewSchema = z.infer<typeof reviewSchema>;

export const reviewContract = c.router({
  getReview: {
    method: 'GET',
    path: '/api/courses/:id/reviews',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(reviewSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the reviews from the given course',
  },

  getReviewById: {
    method: 'GET',
    path: '/api/courses/:courseId/reviews/:reviewId',
    responses: {
      201: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the review by id',
  },

  createReview: {
    method: 'POST',
    path: '/api/courses/:courseId/reviews/add',
    body: reviewSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create a review',
  },

  updateReview: {
    method: 'PUT',
    path: '/api/courses/:courseId/reviews/update/:reviewId',
    body: reviewSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: reviewSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update a review',
  },

  deleteReview: {
    method: 'DELETE',
    path: '/api/courses/:courseId/reviews/delete/:reviewId',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({}),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete a review',
  },
});

// Use reviewSchema to avoid unused variable error
