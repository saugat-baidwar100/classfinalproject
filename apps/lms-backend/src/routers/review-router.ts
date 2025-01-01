import { initServer } from '@ts-rest/express';
import { reviewRepo } from '../../../../libs/lms-prisma/src/review-repo';
import { reviewContract } from '@skillprompt-lms/libs/api-contract/modules/review';
import { courseSchema } from '@skillprompt-lms/libs/api-contract/modules/courses';

const s = initServer();

export const reviewRouter = s.router(reviewContract, {
  getReview: async () => {
    const review = await reviewRepo.findAll();
    return {
      status: 200,
      body: {
        data: review.map((t) => {
          return {
            id: t.id,
            Comment: t.comment,
            user_id: t.user_id,
            course_id: t.course_id,
            rating: t.rating,
            created_at: t.created_at,
            updated_at: t.updated_at,
            course: courseSchema,
          };
        }),
        isSuccess: true,
        message: 'All reviews are retrieved',
      },
    };
  },

  getReviewById: async ({ params }) => {
    const review = await reviewRepo.findById(params.id);

    if (!review) {
      return {
        status: 404,
        body: {
          message: 'review not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: review.id,
          Comment: review.comment,
          user_id: review.user_id,
          course_id: review.course_id,
          rating: review.rating,
          created_at: review.created_at,
          updated_at: review.updated_at,
          course: courseSchema,
        },
        isSuccess: true,
        message: 'Review retrieved by id',
      },
    };
  },

  createReview: async ({ body }) => {
    const review = await reviewRepo.create({
      comment: body.Comment,
      user_id: body.user_id,
      course_id: body.course_id,
      rating: body.rating,
      created_at: body.created_at,
      updated_at: body.updated_at,
    });
    return {
      status: 201,
      body: {
        data: {
          id: review.id,
          Comment: review.comment,
          user_id: review.user_id,
          course_id: review.course_id,
          rating: review.rating,
          created_at: review.created_at,
          updated_at: review.updated_at,
          course: courseSchema,
        },
        isSuccess: true,
        message: 'Review created',
      },
    };
  },

  updateReview:async({params,body})=>{


    const review = await reviewRepo.findById(params.id);
    if(!review){
        return {
            status: 404,
            body: {
                message: 'review not found',
                isSuccess: false,
            },
        }
    }
    await reviewRepo.update(params.id, {
        comment: body.Comment,
        user_id: body.user_id,
        course_id: body.course_id,
        rating: body.rating,
        created_at: body.created_at,
        updated_at: body.updated_at,
    });
    return {
        status: 200,
        body: {
            data: {
                id: review.id,
                Comment: review.comment,
                user_id: review.user_id,
                course_id: review.course_id,
                rating: review.rating,
                created_at: review.created_at,
                updated_at: review.updated_at,
                course: courseSchema,
            },
            isSuccess: true,
            message: 'Review updated',
        },
    };
}
});
