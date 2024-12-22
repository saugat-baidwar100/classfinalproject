import { initServer } from '@ts-rest/express';
import { chapterRepo } from '@skillprompt-lms/libs/lms-prisma/chapter-repo';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';

const s = initServer();

export const chapterRouter = s.router(chapterContract, {
  getChapter: async () => {
    const chapter = await chapterRepo.findAll({});
    return {
      status: 200,
      body: {
        data: chapter.map((t) => {
          return {
            id: t.id,
            title: t.title,
            description: t.description,
          };
        }),
        isSuccess: true,
        message: 'All courses are retreived',
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
          message: 'chapter not found',
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
        message: 'Chapter retrieved by id',
      },
    };
  },
  createChapter: async ({ body }) => {
    const chapter = await chapterRepo.create({
      title: body.title,
      description: body.description,
      course: { connect: { id: body.courseId } },
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
        message: 'The chapter has been successfully created',
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
          message: 'chapter not found',
          isSuccess: false,
        },
      };
    }

    await chapterRepo.updateById(params.chapterId, {
      title: body.title,
      description: body.description,
    });

    return {
      status: 200,
      body: {
        data: {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
        },
        isSuccess: true,
        message: 'the chapter has been updated successfully',
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
    await chapterRepo.deleteById(params.chapterId);
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'The chapter is successfully deleted',
      },
    };
  },
});
