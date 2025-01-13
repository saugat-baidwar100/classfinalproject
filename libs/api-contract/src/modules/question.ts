import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const errorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const successSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const questionSchema = z.object({
  id: z.string(),
  quiz_id: z.string(),
  question_text: z.string(),
  options: z.array(
    z.object({
      text: z.string(),
      is_correct: z.boolean(),
    })
  ),
  correct_option: z.number(),
  explanation: z.string().optional(),
});

export type TQuestionSchema = z.infer<typeof questionSchema>;

export const questionContract = c.router({
  createQuestion: {
    method: 'POST',
    path: '/api/quizzes/:quiz_id/add-question',
    body: questionSchema.omit({ id: true }),
    responses: {
      201: successSchema.extend({
        data: questionSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create a question for a quiz',
  },

  getQuestions: {
    method: 'GET',
    path: '/api/quizzes/:quiz_id/questions',
    responses: {
      200: successSchema.extend({
        data: z.array(questionSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all questions for a quiz',
  },

  getQuestionById: {
    method: 'GET',
    path: '/api/quizzes/:quiz_id/questions/:id',
    responses: {
      200: successSchema.extend({
        data: questionSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get a question by its ID for a specific quiz',
  },

  updateQuestion: {
    method: 'PUT',
    path: '/api/quizzes/:quiz_id/questions/:id/update',
    body: questionSchema.omit({ id: true }),
    responses: {
      200: successSchema.extend({
        data: questionSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Update a question by ID for a specific quiz',
  },

  deleteQuestion: {
    method: 'DELETE',
    path: '/api/quizzes/:quiz_id/questions/:id/delete',
    body: z.object({}), // No body required for deletion
    responses: {
      200: successSchema.extend({
        data: z.object({ id: z.string() }),
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete a question by ID for a specific quiz',
  },
});
