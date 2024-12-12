import { initServer } from '@ts-rest/express';
import { courseContract} from '../../../../libs/api-contract/src/index';
import { courseRepo } from '../../../../libs/lms-prisma/src/course-repo';

const s = initServer();

export const courseRouter = s.router(courseContract, {
  getCourse: async () => {
    const course= await courseRepo.findAll({});

    return {
      status: 200,
      body: {
        data: course.map((t) => {
          return {
            id: t.id,
            title: t.title,
            description:t.description,
            category:t.category,
            level:t.level,
            price:t.price,
            completed: t.is_completed,
          };
        }),
        isSuccess: true,
        message: 'success',
      },
    };
  },
  getCourseById: async ({ params }) => {
    const course = await courseRepo.findById(params.id);

    if (!course) {
      return {
        status: 404,
        body: {
          message: 'course not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: course.id,
          title: course.title,
          description:course.description,
          category:course.category,
          level:course.level,
          price:course.price,
          completed: course.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
  createCourse: async ({ body }) => {
    const course = await courseRepo.create({
      title: body.title,
      description:body.description,
      category:body.category,
      level:body.level,
      price:body.price,
      is_completed: body.completed,
    });
    return {
      status: 201,
      body: {
        data: {
          id: course.id,
          title: course.title,
          description:course.description,
          category:course.category,
          level:course.level,
          price:course.price,
          completed: course.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  updateCourse: async ({ params, body }) => {
    const course = await courseRepo.findById(params.id);

    if (!course) {
      return {
        status: 404,
        body: {
          message: 'course not found',
          isSuccess: false,
        },
      };
    }

    await courseRepo.updateById(params.id, {
      title: body.title,
      description:body.description,
      category:body.category,
      level:body.level,
      price:body.price,
      is_completed: body.completed,
    });

    return {
      status: 200,
      body: {
        data: {
          id: course.id,
          title: course.title,
          description:course.description,
          category:course.category,
          level:course.level,
          price:course.price,
          completed: course.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },

  deleteCourse: async ({ params }) => {
    const course = await courseRepo.findById(params.id);

    if (!course) {
      return {
        status: 404,
        body: {
          message: 'todo not found',
          isSuccess: false,
        },
      };
    }

    await courseRepo.deleteById(params.id);

    return {
      status: 200,
      body: {
        data: {
          id: course.id,
          title: course.title,
          description:course.description,
          category:course.category,
          level:course.level,
          price:course.price,
          completed: course.is_completed,
        },
        isSuccess: true,
        message: 'success',
      },
    };
  },
});