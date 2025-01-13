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

export const fileSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  filePath: z.string(),
  fileSize: z.number(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export type TFileSchema = z.infer<typeof fileSchema>;

export const fileContract = c.router({
  getAllFiles: {
    method: 'GET',
    path: '/api/files',
    responses: {
      200: successSchema.extend({
        data: z.array(fileSchema),
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Get all files',
  },

  getFileById: {
    method: 'GET',
    path: '/api/files/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: successSchema.extend({
        data: fileSchema,
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get file by ID',
  },

  // Upload File (with multer support)
  uploadFile: {
    method: 'POST',
    path: '/api/files/upload',
    contentType: 'multipart/form-data',
    body: z.object({
      file: z.any(),
    }),
    responses: {
      200: successSchema.extend({
        data: fileSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Upload a file using multipart',
  },

  updateFile: {
    method: 'PUT',
    path: '/api/files/update/:id',
    pathParams: z.object({
      id: z.string(),
    }),
    body: fileSchema.omit({ id: true }),
    responses: {
      200: successSchema.extend({
        data: fileSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Update file by ID',
  },

  deleteFile: {
    method: 'DELETE',
    path: '/api/files/delete/:id',
    body: z.object({}),
    responses: {
      200: successSchema.extend({
        data: z.null(),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete file by ID',
  },
});
