import { initServer } from '@ts-rest/express';
import { courseRepo } from '../../../../libs/lms-prisma/src/course-repo';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { chapterSchema } from '@skillprompt-lms/libs/api-contract/modules/chapter';

const s = initServer();

export const courseRouter = s.router(courseContract, {
  getCourse: async () => {
    const course = await courseRepo.findAll({});
    return {
      status: 200,
      body: {
        data: course.map((t) => {
          return {
            id: t.id,
            title: t.title,
            description: t.description,
            category: t.category,
            thumbnail: t.thumbnail,
            type: t.type,
            instructor: t.instructor,
            price: t.price.toString(),
            level: t.level,
            completed: t.is_completed,
            chapters: chapterSchema,
          };
        }),
        isSuccess: true,
        message: 'All courses are retreived',
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
          description: course.description,
          category: course.category,
          thumbnail: course.thumbnail,
          type: course.type,
          instructor: course.instructor,
          price: course.price.toString(),
          level: course.level,
          completed: course.is_completed,
          chapters: chapterSchema,
        },
        isSuccess: true,
        message: 'Course retrieved by id',
      },
    };
  },
  createCourse: async ({ body }) => {
    const course = await courseRepo.create({
      title: body.title,
      description: body.description,
      category: body.category,
      type: body.type,
      instructor: body.instructor,
      thumbnail: body.thumbnail,
      price: parseFloat(body.price),
      level: body.level,
      is_completed: body.completed,
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
          level: course.level,
          completed: course.is_completed,
          chapters: chapterSchema,
        },
        isSuccess: true,
        message: 'The course has been successfully created',
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
      description: body.description,
      category: body.category,

      price: parseFloat(body.price),
      is_completed: body.completed,
    });

    return {
      status: 200,
      body: {
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          category: course.category,

          price: course.price.toString(),
          completed: course.is_completed,
          chapters: chapterSchema,
        },
        isSuccess: true,
        message: 'the course has been updated successfully',
      },
    };
  },

  deleteCourse: async ({ params }) => {
    const course = await courseRepo.findById(params.id);

    if (!course) {
      return {
        status: 404,
        body: {
          message: 'Course not found',
          isSuccess: false,
        },
      };
    }

    await courseRepo.deleteById(params.id);
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'The course is successfully deleted',
      },
    };
  },
});
