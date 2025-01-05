import { initContract } from '@ts-rest/core';
import { z } from 'zod';


const c = initContract();

const errorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const chapterSchema: z.ZodSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number(),
  thumbnail: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const createChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),

  order: z.number(),
});

export type TchapterSchema = z.infer<typeof chapterSchema>;

export const chapterContract = c.router({
  getChapter: {
    method: 'GET',
    path: '/api/courses/:id/chapters',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(chapterSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the Chapter from the given course',
  },
  getChapterById: {
    method: 'GET',
    path: '/api/courses/:courseId/chapters/:chapterId',
    responses: {
      201: SuccessSchema.extend({
        data: chapterSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the chapter by id',
  },
  createChapter: {
    method: 'POST',
    path: '/api/courses/:id/chapters/add-chapter',
    body: createChapterSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: chapterSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Chapter',
  },
  updateChapter: {
    method: 'PUT',
    path: '/api/courses/:courseId/chapters/update-chapter/:chapterId',
    body: createChapterSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: chapterSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Chapter by id',
  },
  deleteChapter: {
    method: 'DELETE',
    path: '/api/courses/:courseId/chapters/delete-chapter/:chapterId',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete Chapter by ID',
  },
});
