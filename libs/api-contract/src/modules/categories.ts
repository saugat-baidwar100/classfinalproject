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
export const categoriesSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.string(),
  instructor: z.string(),
  description: z.string(),
  role: z.string(),
});
export type TcategoriesSchema = z.infer<typeof categoriesSchema>;

export const categoriesContract = c.router({
  getCategory: {
    method: 'GET',
    path: '/api/category',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(categoriesSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the courses',
  },
  getCategoryById: {
    method: 'GET',
    path: '/api/category/:id',
    responses: {
      200: SuccessSchema.extend({
        data: categoriesSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the course by id',
  },
  createCategory: {
    method: 'POST',
    path: '/api/category/add',
    body: categoriesSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: categoriesSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Course',
  },
  updateCategory: {
    method: 'PUT',
    path: '/api/category/update-category/:id',
    body: categoriesSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: categoriesSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Courses by id',
  },
  deleteCategory: {
    method: 'DELETE',
    path: '/api/category/delete-category/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: categoriesSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete course by ID',
  },
});
