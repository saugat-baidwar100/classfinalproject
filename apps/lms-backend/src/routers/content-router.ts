import { initServer } from '@ts-rest/express';
import { contentRepo } from '../../../../libs/lms-prisma/src/content-repo';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';

const s = initServer();

export const contentRouter = s.router(contentContract, {
  getContent: async ({ params }) => {
    const content = await contentRepo.findById(params.chapterId); 
    if (!content) {
      return {
        status: 404,
        body: {
          message: 'Content not found',
          isSuccess: false,
        },
      };
    }

    return {
      status: 200,
      body: {
        data: [ 
          {
            id: content.id,
            chapter_id: content.chapter_id,
            content: content.content,
            created_at: content.created_at.toISOString(), // Ensure date serialization
            updated_at: content.updated_at.toISOString(), // Ensure date serialization
            completed: content.completed,
          },
        ],
        isSuccess: true,
        message: 'Content retrieved by ID',
      },
    };
  },

  createContent: async ({ body }) => {
    const content = await contentRepo.create({
      id: body.chapter_id,
      chapter_id: body.chapter_id,
      content: body.content,
      created_at: body.created_at,
      updated_at: body.updated_at,
      completed: body.completed,
    });

    return {
      status: 201,
      body: {
        data: {
          id: content.id,
          chapter_id: content.chapter_id,
          content: content.content,
          created_at: content.created_at.toISOString(),
          updated_at: content.updated_at.toISOString(),
          completed: content.completed,
        },
        isSuccess: true,
        message: 'The content has been successfully created',
      },
    };
  },

  updateContent: async ({ params, body }) => {
    const content = await contentRepo.findById(params.contentId); 

    if (!content) {
      return {
        status: 404,
        body: {
          message: 'Content not found',
          isSuccess: false,
        },
      };
    }

    const updatedContent = await contentRepo.updateById(params.contentId, {
      chapter_id: body.chapter_id,
      content: body.content,
      created_at: body.created_at,
      updated_at: body.updated_at,
      completed: body.completed,
    });

    return {
      status: 200,
      body: {
        data: {
          id: updatedContent.id,
          chapter_id: updatedContent.chapter_id,
          content: updatedContent.content,
          created_at: updatedContent.created_at.toISOString(),
          updated_at: updatedContent.updated_at.toISOString(),
          completed: updatedContent.completed,
        },
        isSuccess: true,
        message: 'The content has been successfully updated',
      },
    };
  },

  deleteContent: async ({ params }) => {
    const content = await contentRepo.findById(params.contentId); // Match contract parameter names

    if (!content) {
      return {
        status: 404,
        body: {
          message: 'Content not found',
          isSuccess: false,
        },
      };
    }

    await contentRepo.deleteById(params.contentId);
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'The content has been successfully deleted',
      },
    };
  },
});
