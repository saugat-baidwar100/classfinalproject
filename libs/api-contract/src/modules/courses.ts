import { z } from 'zod';
// import { chapterSchema } from './chapter';
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
export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  instructor: z.string(),
  description: z.string(),
  category: z.string(),
  level: z.string(),
  thumbnail: z.string().optional(),
  price: z.string(),
  completed: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  
});
export type TcourseSchema = z.infer<typeof courseSchema>;

export const courseContract = c.router({
  getCourse: {
    method: 'GET',
    path: '/api/courses',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(courseSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the courses',
  },
  getCourseById: {
    method: 'GET',
    path: '/api/courses/:id',
    responses: {
      200: SuccessSchema.extend({
        data: courseSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the course by id',
  },
  createCourse: {
    method: 'POST',
    path: '/api/courses/add',
    body: courseSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: courseSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Course',
  },
  updateCourse: {
    method: 'PUT',
    path: '/api/courses/update-course/:id',
    body: courseSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: courseSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Courses by id',
  },
  deleteCourse: {
    method: 'DELETE',
    path: '/api/courses/delete-course/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: courseSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete course by ID',
  },
});
