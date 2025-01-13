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
export const userSchema = z.object({
  id: z.string(),
 username: z.string(),
 fullname:z.string(),
 email: z.string(),
 password: z.string(),
 role: z.string(),


});
export type TuserSchema = z.infer<typeof userSchema>;

export const userContract = c.router({
  getUser: {
    method: 'GET',
    path: '/api/users',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(userSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all the users',
  },
  getUserById: {
    method: 'GET',
    path: '/api/users/:id',
    responses: {
      200: SuccessSchema.extend({
        data: userSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the user by id',
  },
  createUsers: {
    method: 'POST',
    path: '/api/users/add',
    body: userSchema.omit({ id: true }),
    responses: {
      201: SuccessSchema.extend({
        data: userSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create user',
  },
  updateUser: {
    method: 'PUT',
    path: '/api/users/update-user/:id',
    body: userSchema.omit({ id: true }),
    responses: {
      200: SuccessSchema.extend({
        data: userSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Update user by id',
  },
  deleteUser: {
    method: 'DELETE',
    path: '/api/user/delete-user/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: userSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete user by ID',
  },
});
