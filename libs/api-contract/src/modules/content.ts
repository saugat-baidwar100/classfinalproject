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

export const contentSchema = z.object({
  id: z.string(),
  chapter_id: z.string(),
  content: z.string(),
  created_at: z.string().datetime(), 
  updated_at: z.string().datetime(), 
  completed: z.boolean(),
});

export type TcontentSchema = z.infer<typeof contentSchema>;

export const contentContract = c.router({
  getContent: {
    method: 'GET',
    path: '/api/chapters/:chapterId/contents',
    responses: {
      200: successSchema.extend({
        data: z.array(contentSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the content',
  },
  createContent: {
    method: 'POST',
    path: '/api/chapters/:chapterId/contents/add-content', // Fixed path
    body: contentSchema.omit({ id: true }),
    responses: {
      201: successSchema.extend({
        data: contentSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Content',
  },
  updateContent: {
    method: 'PUT',
    path: '/api/chapters/:chapterId/contents/update-content/:contentId',
    body: contentSchema.omit({ id: true }),
    responses: {
      200: successSchema.extend({
        data: contentSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Content by ID',
  },
  deleteContent: {
    method: 'DELETE',
    path: '/api/chapters/:chapterId/contents/delete-content/:contentId',
    body: z.object({}),
    responses: {
      200: successSchema.extend({
        data: contentSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete Content by ID',
  },
});
