import { initServer } from '@ts-rest/express';
import { contentRepo } from '../../../../libs/lms-prisma/src/content-repo';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';

const s = initServer();

export const contentRouter = s.router(contentContract, {
  getContent: async ({ params }) => {
    const content = await contentRepo.findById({
      
        contentId: params.contentId,
        chapter_id: params.chapterId,
    }); 
    
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
            
            created_at: content.created_at, 
            updated_at: content.updated_at, 
            content_type: content.content_type,
            content_url: content.content_url,
            duration: content.duration,
            order: content.order,
            completed: content.completed,
          },
        ],
        isSuccess: true,
        message: 'Content retrieved by ID',
      },
    };
  },

  createContent: async ({ body, params }) => {
    const content = await contentRepo.create({
content_type: body.content_type,
content_url: body.content_url,
duration: body.duration,
order: body.order,
      updated_at: new Date(),
      created_at: new Date(),
      chapter: { connect: { id: params.chapterId } }, //connect to chapter
    });

    return {
      status: 201,
      body: {
        data: {
          id: content.id,
      
          content_type: content.content_type,
          content_url: content.content_url,
          duration: content.duration,
          order: content.order,
          created_at: content.created_at, 
          updated_at: content.updated_at, 
        },
        isSuccess: true,
        message: 'The content has been successfully created',
      },
    };
  },

  updateContent: async ({ params, body }) => {
    const content = await contentRepo.findById({
      contentId: params.contentId,
      chapter_id: params.chapterId,
    })
    if (!content) {
      return {
        status: 404,
        body: {
          message: 'Content not found',
          isSuccess: false,
        },
      };
    }

    const updatedContent = await contentRepo.updateById({
      contentId: params.contentId,
      chapter_id: params.chapterId,
      input: { 

      content_type: body.content_type,
      content_url: body.content_url,
      duration: body.duration,
      order: body.order,
      created_at: new Date(),
      updated_at: new Date(),
      completed: body.completed,
      
      },
    });

    return {
      status: 200,
      body: {
        data: {
          id: updatedContent.id,
          
         
          content_type: updatedContent.content_type,
          content_url: updatedContent.content_url,
          duration: updatedContent.duration,
          order: updatedContent.order,
          created_at: updatedContent.created_at,
          updated_at: updatedContent.updated_at,
        },
        isSuccess: true,
        message: 'The content has been successfully updated',
      },
    };
  },

  deleteContent: async ({ params }) => {
    const content = await contentRepo.findById({
      contentId: params.contentId,
      chapter_id: params.chapterId,
    }); 

    if (!content) {
      return {
        status: 404,
        body: {
          message: 'Content not found',
          isSuccess: false,
        },
      };
    }

    await contentRepo.deleteById({
      contentId: params.contentId,
      chapter_id: params.chapterId,
    });
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'The content has been successfully deleted',
      },
    };
  },
});
