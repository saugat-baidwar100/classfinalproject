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

// File schema
export const fileSchema = z.object({
  id: z.number(),
  fileName: z.string(),
  filePath: z.string(),
  fileSize: z.number(),
  createdAt: z.string(),
});

export type TFileSchema = z.infer<typeof fileSchema>;

// File contract
export const fileContract = c.router({
  // Get All Files
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

  // Get File by ID
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

  // Upload File
  uploadFile: {
    method: 'POST',
    path: '/api/files/upload',
    body: z.object({
      fileName: z.string(),
      filePath: z.string(),
      fileSize: z.number(),
      fileBuffer: z.instanceof(Buffer).optional(), // Expect a file buffer for upload
    }),
    responses: {
      200: successSchema.extend({
        data: fileSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Upload a file',
  },

  // Update File by ID
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

  // Delete File by ID
  deleteFile: {
    method: 'DELETE',
    path: '/api/files/delete/:id',
    body: z.object({}),
    responses: {
      200: successSchema.extend({
        data: z.null(), // Expect null data for successful deletion
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete file by ID',
  },
});
