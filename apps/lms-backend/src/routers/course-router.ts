import { initServer } from '@ts-rest/express';
import { courseRepo } from '../../../../libs/lms-prisma/src/course-repo';
import { chapterRepo } from '../../../../libs/lms-prisma/src/chapter-repo';
import { categoriesRepo } from '../../../../libs/lms-prisma/src/categories-repo';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { checkRole, storeUserDataFromToken } from '../auth/middlware';
import { validateAccessToken } from '@baijanstack/express-auth';

const s = initServer();

export const courseRouter = s.router(courseContract, {
  getCourse: {
    middleware: [validateAccessToken, storeUserDataFromToken],
    handler: async ({ req }) => {
      const courses = await courseRepo.findAll({});
      return {
        status: 200,
        body: {
          data: courses.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            category: course.category,
            thumbnail: course.thumbnail,
            type: course.type,
            instructor: course.instructor,
            price: course.price.toString(),
            completed: course.is_completed,
          })),
          isSuccess: true,
          message: 'All courses retrieved successfully',
        },
      };
    },
  },

  getCourseById: {
    middleware: [validateAccessToken, storeUserDataFromToken],
    handler: async ({ req, params }) => {
      const course = await courseRepo.findById({
        categories_id: params.id,
        courseId: params.id,
      });

      if (!course) {
        return {
          status: 404,
          body: {
            message: 'Course not found',
            isSuccess: false,
          },
        };
      }

      const chapters = await chapterRepo.findAll({ course_id: course.id });

      return {
        status: 200,
        body: {
          data: {
            id: course.id,
            title: course.title,
            description: course.description,
            category: course.category,
            thumbnail: course.thumbnail,
            type: course.type,
            instructor: course.instructor,
            price: course.price.toString(),
            completed: course.is_completed,
            chapters: chapters,
          },
          isSuccess: true,
          message: 'Course retrieved successfully by ID',
        },
      };
    },
  },

  createCourse: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ req, body }) => {
      const category = await categoriesRepo.findById(body.categories_id);

      if (!category) {
        return {
          status: 404,
          body: {
            message: 'Category not found',
            isSuccess: false,
          },
        };
      }

      const course = await courseRepo.create({
        title: body.title,
        description: body.description,
        category: body.category,
        type: body.type,
        instructor: body.instructor,
        thumbnail: body.thumbnail,
        price: parseFloat(body.price),
        is_completed: body.completed,
        level: body.level,
        categories: { connect: { id: body.categories_id } },
      });

      return {
        status: 201,
        body: {
          data: {
            id: course.id,
            title: course.title,
            description: course.description,
            category: course.category,
            thumbnail: course.thumbnail,
            type: course.type,
            instructor: course.instructor,
            price: course.price.toString(),
            completed: course.is_completed,
            chapters: [],
          },
          isSuccess: true,
          message: 'Course created successfully',
        },
      };
    },
  },

  updateCourse: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ req, params, body }) => {
      const course = await courseRepo.findById({
        categories_id: params.id,
        courseId: params.id,
      });

      if (!course) {
        return {
          status: 404,
          body: {
            message: 'Course not found',
            isSuccess: false,
          },
        };
      }

      const updatedCourse = await courseRepo.updateById({
        categories_id: params.id,
        courseId: params.id,
        input: {
          title: body.title,
          description: body.description,
          category: body.category,
          price: parseFloat(body.price),
          is_completed: body.completed,
        },
      });

      return {
        status: 200,
        body: {
          data: {
            id: updatedCourse.id,
            title: updatedCourse.title,
            description: updatedCourse.description,
            category: updatedCourse.category,
            price: updatedCourse.price.toString(),
            completed: updatedCourse.is_completed,
            chapters: [],
          },
          isSuccess: true,
          message: 'Course updated successfully',
        },
      };
    },
  },

  deleteCourse: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ req, params }) => {
      const course = await courseRepo.findById({
        categories_id: params.id,
        courseId: params.id,
      });

      if (!course) {
        return {
          status: 404,
          body: {
            message: 'Course not found',
            isSuccess: false,
          },
        };
      }

      await courseRepo.deleteById({
        categories_id: params.id,
        courseId: params.id,
      });

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Course deleted successfully',
        },
      };
    },
  },
});
