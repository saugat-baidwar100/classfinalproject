import { initServer } from '@ts-rest/express';
import { categoriesRepo } from '../../../../libs/lms-prisma/src/categories-repo';
import { categoriesContract } from '@skillprompt-lms/libs/api-contract/modules/categories';
import { courseRepo } from '../../../../libs/lms-prisma/src/course-repo';
import { validateAccessToken } from '@baijanstack/express-auth';
import { checkRole, storeUserDataFromToken } from '../auth/middlware';
import { Role } from '@prisma/client';
const s = initServer();

export const categoriesRouter = s.router(categoriesContract, {
  getCategory: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ], // all can access this
    handler: async () => {
      console.log('Handler executed');
      const categories = await categoriesRepo.findAll({});

      return {
        status: 200,
        body: {
          data: categories.map((cat) => ({
            id: cat.id,
            title: cat.title,
            price: cat.price.toString(),
            instructor: cat.instructor,
            description: cat.description,
            courses: courseRepo
              .findAll({ categories_id: cat.id })
              .then((courses) =>
                courses.map((course) => ({
                  id: course.id,
                  title: course.title,
                  price: course.price.toString(),
                  instructor: course.instructor,
                  description: course.description,
                }))
              ),
          })),
          isSuccess: true,
          message: 'All categories are retrieved successfully',
        },
      };
    },
  },
  getCategoryById: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],

    handler: async ({ params }) => {
      const category = await categoriesRepo.findById(params.id);

      if (!category) {
        return {
          status: 404,
          body: {
            message: 'Category not found',
            isSuccess: false,
          },
        };
      }

      const courses = await courseRepo.findAll({ categories_id: category.id });

      return {
        status: 200,
        body: {
          data: {
            id: category.id,
            title: category.title,
            price: category.price.toString(),
            instructor: category.instructor,
            description: category.description,
            courses: courses.map((course) => ({
              id: course.id,
              title: course.title,
              price: course.price.toString(),
              instructor: course.instructor,
              description: course.description,
            })),
          },
          isSuccess: true,
          message: 'Category retrieved successfully by ID',
        },
      };
    },
  },

  createCategory: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ body }) => {
      console.log('Handler executed');

      if (!body.title || !body.price || !body.instructor || !body.description) {
        return {
          status: 400,
          body: {
            message: 'Missing required fields',
            isSuccess: false,
          },
        };
      }

      const category = await categoriesRepo.create({
        title: body.title,
        price: parseFloat(body.price),
        instructor: body.instructor,
        description: body.description,
        role: body.role,
      });

      return {
        status: 201,
        body: {
          data: {
            id: category.id,
            title: category.title,
            price: category.price.toString(),
            instructor: category.instructor,
            description: category.description,
            courses: [],
          },
          isSuccess: true,
          message: 'Category has been successfully created',
        },
      };
    },
  },

  updateCategory: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params, body }) => {
      const category = await categoriesRepo.findById(params.id);

      if (!category) {
        return {
          status: 404,
          body: {
            message: 'Category not found',
            isSuccess: false,
          },
        };
      }

      await categoriesRepo.updateById(params.id, {
        title: body.title,
        price: parseFloat(body.price),
        instructor: body.instructor,
        description: body.description,
      });

      return {
        status: 200,
        body: {
          data: {
            id: category.id,
            title: category.title,
            price: category.price.toString(),
            instructor: category.instructor,
            description: category.description,
            courses: [],
          },
          isSuccess: true,
          message: 'Category updated successfully',
        },
      };
    },
  },

  deleteCategory: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params }) => {
      const category = await categoriesRepo.findById(params.id);

      if (!category) {
        return {
          status: 404,
          body: {
            message: 'Category not found',
            isSuccess: false,
          },
        };
      }

      await categoriesRepo.deleteById(params.id);

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Category has been successfully deleted',
        },
      };
    },
  },
});
