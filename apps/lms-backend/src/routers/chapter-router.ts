import { initServer } from '@ts-rest/express';
import { chapterRepo } from '@skillprompt-lms/libs/lms-prisma/chapter-repo';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { contentSchema } from '@skillprompt-lms/libs/api-contract/modules/content';
import { quizSchema } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { checkRole, storeUserDataFromToken } from '../auth/middlware';
import { validateAccessToken } from '@baijanstack/express-auth';
import { Role } from '@prisma/client';
const s = initServer();

export const chapterRouter = s.router(chapterContract, {
  getChapter: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student]),
    ],
    handler: async () => {
      const chapters = await chapterRepo.findAll({});
      return {
        status: 200,
        body: {
          data: chapters.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description,
          })),
          isSuccess: true,
          message: 'All chapters retrieved successfully',
        },
      };
    },
  },
  getChapterById: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student]),
    ],

    handler: async ({ params }) => {
      const chapter = await chapterRepo.findById({
        chapterId: params.chapterId,
        courseId: params.courseId,
      });

      if (!chapter) {
        return {
          status: 404,
          body: {
            message: 'Chapter not found',
            isSuccess: false,
          },
        };
      }

      return {
        status: 200,
        body: {
          data: {
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            order: chapter.order,
            content: contentSchema,
            quiz: quizSchema,
          },
          isSuccess: true,
          message: 'Chapter retrieved successfully',
        },
      };
    },
  },
  createChapter: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ body, params }) => {
      const chapter = await chapterRepo.create({
        title: body.title,
        description: body.description,
        order: body.order,
        course: { connect: { id: params.id } },
      });

      return {
        status: 201,
        body: {
          data: {
            id: chapter.id,
            title: chapter.title,
            order: chapter.order,
            description: chapter.description,
            content: contentSchema,
            quiz: quizSchema,
          },
          isSuccess: true,
          message: 'Chapter created successfully',
        },
      };
    },
  },
  updateChapter: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params, body }) => {
      const chapter = await chapterRepo.findById({
        chapterId: params.chapterId,
        courseId: params.courseId,
      });

      if (!chapter) {
        return {
          status: 404,
          body: {
            message: 'Chapter not found',
            isSuccess: false,
          },
        };
      }

      const updatedChapter = await chapterRepo.updateById({
        chapterId: params.chapterId,
        courseId: params.courseId,
        input: {
          title: body.title,
          description: body.description,
          order: body.order,
        },
      });

      return {
        status: 200,
        body: {
          data: {
            id: updatedChapter.id,
            title: updatedChapter.title,
            description: updatedChapter.description,
            order: updatedChapter.order,
            content: contentSchema,
            quiz: quizSchema,
          },
          isSuccess: true,
          message: 'Chapter updated successfully',
        },
      };
    },
  },
  deleteChapter: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params }) => {
      const chapter = await chapterRepo.findById({
        chapterId: params.chapterId,
        courseId: params.courseId,
      });

      if (!chapter) {
        return {
          status: 404,
          body: {
            message: 'Chapter not found',
            isSuccess: false,
          },
        };
      }

      await chapterRepo.deleteById({
        chapterId: params.chapterId,
        courseId: params.courseId,
      });

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Chapter deleted successfully',
        },
      };
    },
  },
});
