import { initContract } from '@ts-rest/core';
import { z } from 'zod';
// import  {quizSchema} from './quiz';
const c = initContract();

// Error and Success schemas for consistent response handling
const errorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const successSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

// Question schema: The structure of a question
export const questionSchema = z.object({
  id: z.string(),
  quiz_id: z.string(),
  question_text: z.string(),
  options: z.array(z.object({
    text: z.string(),
    is_correct: z.boolean(),
  })),
  correct_option: z.number(),
  explanation: z.string().optional(),
});

export type TQuestionSchema = z.infer<typeof questionSchema>;

export const questionContract = c.router({
  // Create a question for a specific quiz
  createQuestion: {
    method: 'POST',
    path: '/api/quizzes/:quiz_id/add-question',
    body: questionSchema.omit({ id: true }), // Omit ID when creating a new question
    responses: {
      201: successSchema.extend({
        data: questionSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create a question for a quiz',
  },

  // Get all questions for a specific quiz
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

  // Get a specific question by ID
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

  // Update a question
  updateQuestion: {
    method: 'PUT',
    path: '/api/quizzes/:quiz_id/questions/:id/update',
    body: questionSchema.omit({ id: true }), // Omit ID in the request body
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

  // Delete a question
  deleteQuestion: {
    method: 'DELETE',
    path: '/api/quizzes/:quiz_id/questions/:id/delete',
    body: z.object({}), // No body required for deletion
    responses: {
      200: successSchema.extend({
        data: z.object({ id: z.string() }), // Simplified response with deleted question ID
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete a question by ID for a specific quiz',
  },
});

