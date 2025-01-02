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

// Schema for TaskProgress
export const taskProgressSchema = z.object({
  username: z.string().optional(),    // User's username
  chapter_id: z.string().optional(),  // Make chapter_id optional
  quiz_id: z.string().optional(),     // Make quiz_id optional
  course_id: z.string(),    
  
  progress: z.number().min(0).max(100), // Progress in percentage (0–100)
  last_updated: z.string().optional(), // ISO string for the last update timestamp
});

// Schema for creating TaskProgress
export const createTaskProgressSchema = taskProgressSchema.omit({ last_updated: true });

// Schema for updating TaskProgress
export const updateTaskProgressSchema = z.object({
  progress: z.number().min(0).max(100),
  chapter_id: z.string().optional(),  // Make chapter_id optional for updating
  quiz_id: z.string().optional(),     // Make quiz_id optional for updating
  username: z.string(),
});

export type TtaskProgressSchema = z.infer<typeof taskProgressSchema>;

// TaskProgress Contract
export const taskProgressContract = c.router({
  createTaskProgress: {
    method: 'POST',
    path: '/api/courses/:course_id/progress',
    body: createTaskProgressSchema,
    responses: {
      201: successSchema.extend({
        data: taskProgressSchema,
      }),
      400: errorSchema,
      500: errorSchema,
    },
    summary: 'Create Task Progress for a Course',
  },

  updateTaskProgress: {
    method: 'PUT',
    path: '/api/courses/:course_id/progress',
    body: updateTaskProgressSchema,
    responses: {
      200: successSchema.extend({
        data: taskProgressSchema,
      }),
      400: errorSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Update Task Progress for a Specific Task in a Course',
  },

  deleteTaskProgress: {
    method: 'DELETE',
    path: '/api/courses/:course_id/progress/user/:username/delete',
    body: z.object({}), // No body required for deletion
    responses: {
      200: successSchema,
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Delete Task Progress for a Specific Task in a Course',
  },

  getTaskProgress: {
    method: 'GET',
    path: 'api/courses/:course_id/progress/user/:username',
    responses: {
      200: successSchema.extend({
        data: taskProgressSchema,
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get Task Progress for a Specific Task in a Course',
  },

  getAllTaskProgress: {
    method: 'GET',
    path: '/api/courses/:course_id/progress',
    responses: {
      200: successSchema.extend({
        data: z.array(taskProgressSchema),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get All Task Progress for a Course',
  },

  // Updated endpoint to include completed contents, quizzes, and courses
  getUserProgress: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username',
    responses: {
      200: successSchema.extend({
        data: z.object({
          username: z.string(),
          course_id: z.string(),
          progress: z.number().min(0).max(100), // Overall progress in percentage
          completedContents: z.number(),        // Number of completed contents
          completedQuizzes: z.number(),         // Number of completed quizzes
          completedCourses: z.number(),         // Number of completed courses (assuming the user has multiple courses)
          totalProgress: z.number(),            // Total progress percentage (0-100)
        }),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get Overall User Progress with Completed Contents, Quizzes, and Courses',
  },

  //New route for total progress

  calculateTotalProgress: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username/total',
    responses: {
      200: successSchema.extend({
        data: z.object({
          totalProgress: z.number(), // Total progress percentage (0-100)
        }),
      }),
      404: errorSchema, // For cases where user or course is not found
      500: errorSchema, // For server-side errors
    },
    summary: 'Get the Total Progress for a User in a Course',
    description: 'Calculates the total progress of a user in a specific course, taking into account completed contents, quizzes, chapters, and other progress-related metrics.',
  },
  

  // New route for calculating completed contents, quizzes, and courses for a user
  calculateCompletedContents: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username/contents',
    responses: {
      200: successSchema.extend({
        data: z.object({
          completedContents: z.number(),  // Number of completed contents
        }),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the Number of Completed Contents for a User in a Course',
  },

  calculateCompletedQuizzes: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username/quizzes',
    responses: {
      200: successSchema.extend({
        data: z.object({
          completedQuizzes: z.number(),  // Number of completed quizzes
        }),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the Number of Completed Quizzes for a User in a Course',
  },
  calculateCompletedChapters: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username/chapters',
    responses: {
      200: successSchema.extend({
        data: z.object({
          completedChapters: z.number(),  // Number of completed courses
        }),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the Number of Completed Chapters for a User',
  },


  calculateCompletedCourses: {
    method: 'GET',
    path: '/api/courses/:course_id/progress/user/:username/courses',
    responses: {
      200: successSchema.extend({
        data: z.object({
          completedCourses: z.number(),  // Number of completed courses
        }),
      }),
      404: errorSchema,
      500: errorSchema,
    },
    summary: 'Get the Number of Completed Courses for a User',
  },

  
});
