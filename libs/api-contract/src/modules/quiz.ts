import { initContract } from '@ts-rest/core';

import { z } from 'zod';

const c = initContract();

// Reusable schemas
const errorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const successSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const quizSchema = z.object({
  id: z.string(),
  chapter_id: z.string(),
  title: z.string(),
content: z.string(),
max_score: z.number(),
passing_score: z.number(),
quiz: z.string(),
});
export const createquizSchema = z.object({
  chapter_id: z.string(),
  id: z.string(),
  title: z.string(),
chapter: z.string(),
max_score: z.number(),
passing_score: z.number(),
  quiz: z.string(),
});

export type TquizSchema = z.infer<typeof quizSchema>;

export const quizContract = c.router({

  createQuiz: {
    method: 'POST',
    path: '/api/chapter/:id/add-quiz',
    body: quizSchema.omit({ id: true }),
    responses: {
      201: successSchema.extend({
        data: createquizSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Quiz',
  },
  updateQuiz: {
    method: 'PUT',
    path: '/api/update-quiz/:quiz_id',
    body: quizSchema.omit({ id: true }),
    responses: {
      200: successSchema.extend({
        data: quizSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Quiz by ID',
  },
  deleteQuiz: {
    method: 'DELETE',
    path: '/api/delete-quiz/:quiz_id',
    body: z.object({}),
    responses: {
      200: successSchema.extend({
        data: quizSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete Quiz by ID',
  },
});
