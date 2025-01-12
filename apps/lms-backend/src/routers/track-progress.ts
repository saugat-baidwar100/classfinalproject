import { initServer } from '@ts-rest/express';
import { taskProgressRepo } from '../../../../libs/lms-prisma/src/track-progress-repo';
import { taskProgressContract } from '@skillprompt-lms/libs/api-contract/modules/track-progress';

const s = initServer();

export const taskProgressRouter = s.router(taskProgressContract, {
  // Create Task Progress
  createTaskProgress: async ({ body }) => {
    try {
      const progress = await taskProgressRepo.createTaskProgress({
        username: body.username,
        course_id: body.course_id,
        progress: body.progress,
        chapter_id: body.chapter_id,
        quiz_id: body.quiz_id,
        last_updated: new Date().toISOString(),
      });

      return {
        status: 201,
        body: {
          isSuccess: true,
          message: 'Task progress created successfully',
          data: {
            ...progress,
            last_updated: progress.last_updated.toISOString(),
          },
        },
      };
    } catch (error) {
      console.error('Error creating task progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Update Task Progress
  updateTaskProgress: async ({ params, body }) => {
    try {
      const updated = await taskProgressRepo.updateTaskProgress(
        body.username, // Ensure the username is in the body
        params.course_id,
        body.progress,
        body.chapter_id,
        body.quiz_id
      );

      if (!updated) {
        return {
          status: 404,
          body: {
            isSuccess: false,
            message: 'Task progress not found',
          },
        };
      }

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Task progress updated successfully',
        },
      };
    } catch (error) {
      console.error('Error updating task progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Delete Task Progress
  deleteTaskProgress: async ({ params }) => {
    try {
      const deleted = await taskProgressRepo.deleteTaskProgress(
        params.username, // Ensure the username is passed as a param
        params.course_id
      );

      if (deleted.count === 0) {
        return {
          status: 404,
          body: {
            isSuccess: false,
            message: 'Task progress not found',
          },
        };
      }

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Task progress deleted successfully',
        },
      };
    } catch (error) {
      console.error('Error deleting task progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Get Task Progress by User and Course
  getTaskProgress: async ({
    params,
  }: {
    params: { course_id: string; username: string };
  }) => {
    try {
      const progress = await taskProgressRepo.findTaskProgressById(
        params.username, // Ensure the username is passed as a param
        params.course_id
      );

      if (!progress) {
        return {
          status: 404,
          body: {
            isSuccess: false,
            message: 'Task progress not found',
          },
        };
      }

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Task progress retrieved successfully',
          data: {
            ...progress,
            last_updated: progress.last_updated.toISOString(),
          },
        },
      };
    } catch (error) {
      console.error('Error retrieving task progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Get All Task Progress for a Course
  getAllTaskProgress: async ({ params }) => {
    try {
      const progressList = await taskProgressRepo.findAllTaskProgress(
        params.course_id
      );

      if (progressList.length === 0) {
        return {
          status: 404,
          body: {
            isSuccess: false,
            message: 'No task progress found',
          },
        };
      }

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'All task progress retrieved successfully',
          data: progressList.map((progress) => ({
            ...progress,
            last_updated: progress.last_updated.toISOString(),
          })),
        },
      };
    } catch (error) {
      console.error('Error retrieving all task progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Get Overall User Progress with Completed Contents, Quizzes, and Courses
  getUserProgress: async ({ params }) => {
    try {
      const { course_id, username } = params;

      // Get user progress, completed contents, quizzes, and courses
      const progress = await taskProgressRepo.calculateUserProgress(
        course_id,
        username
      );
      const completedContents =
        await taskProgressRepo.calculateCompletedContents(course_id, username);
      const completedQuizzes = await taskProgressRepo.calculateCompletedQuizzes(
        course_id,
        username
      );
      const completedCourses = await taskProgressRepo.calculateCompletedCourses(
        username
      );
      const totalProgress = await taskProgressRepo.calculateTotalProgress(
        course_id,
        username
      );

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'User progress retrieved successfully',
          data: {
            username,
            course_id,
            progress,
            completedContents,
            completedQuizzes,
            completedCourses,
            totalProgress,
          },
        },
      };
    } catch (error) {
      console.error('Error retrieving user progress:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  //calculated total progress of a user
  calculateTotalProgress: async ({ params }) => {
    try {
      // Call the method to calculate total progress for the given user and course
      const totalProgress = await taskProgressRepo.calculateTotalProgress(
        params.course_id,
        params.username
      );

      // Return the successful response
      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Total progress calculated successfully',
          data: { totalProgress },
        },
      };
    } catch (error) {
      console.error('Error calculating total progress:', error);

      // Handle errors and return a response
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Calculate Completed Contents for a User in a Course
  calculateCompletedContents: async ({ params }) => {
    try {
      const completedContents =
        await taskProgressRepo.calculateCompletedContents(
          params.course_id,
          params.username
        );

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Completed contents retrieved successfully',
          data: { completedContents },
        },
      };
    } catch (error) {
      console.error('Error calculating completed contents:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },

  // Calculate Completed Quizzes for a User in a Course
  calculateCompletedQuizzes: async ({ params }) => {
    try {
      const completedQuizzes = await taskProgressRepo.calculateCompletedQuizzes(
        params.course_id,
        params.username
      );

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Completed quizzes retrieved successfully',
          data: { completedQuizzes },
        },
      };
    } catch (error) {
      console.error('Error calculating completed quizzes:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },
  // Calculate Completed Chapters for a User
  calculateCompletedChapters: async ({ params }) => {
    try {
      const completedChapters =
        await taskProgressRepo.calculateCompletedChapters(params.username);

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Completed courses retrieved successfully',
          data: { completedChapters },
        },
      };
    } catch (error) {
      console.error('Error calculating completed courses:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },
  // Calculate Completed Courses for a User
  calculateCompletedCourses: async ({ params }) => {
    try {
      const completedCourses = await taskProgressRepo.calculateCompletedCourses(
        params.username
      );

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Completed courses retrieved successfully',
          data: { completedCourses },
        },
      };
    } catch (error) {
      console.error('Error calculating completed courses:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
  },
});
