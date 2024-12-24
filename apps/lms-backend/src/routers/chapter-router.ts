import { initServer } from '@ts-rest/express';
import {chapterRepo} from '@skillprompt-lms/libs/lms-prisma/chapter-repo'
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
const s = initServer();

export const chapterRouter = s.router(chapterContract, {
  getChapter: async () => {
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
  getChapterById: async ({ params }) => {
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
        },
        isSuccess: true,
        message: 'Chapter retrieved successfully',
      },
    };
  },
  createChapter: async ({ body, params }) => {
    const chapter = await chapterRepo.create({
      title: body.title,
      description: body.description,
      course: { connect: { id: params.id } },
    });

    return {
      status: 201,
      body: {
        data: {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
        },
        isSuccess: true,
        message: 'Chapter created successfully',
      },
    };
  },
  updateChapter: async ({ params, body }) => {
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
      },
    });

    return {
      status: 200,
      body: {
        data: {
          id: updatedChapter.id,
          title: updatedChapter.title,
          description: updatedChapter.description,
        },
        isSuccess: true,
        message: 'Chapter updated successfully',
      },
    };
  },
  deleteChapter: async ({ params }) => {
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
});
