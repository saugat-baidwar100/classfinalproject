/* eslint-disable @typescript-eslint/no-unused-vars */
import { initServer } from '@ts-rest/express';
import { reviewRepo } from '../../../../libs/lms-prisma/src/review-repo';
import { db } from '../../../../libs/lms-prisma/src/client'; // Adjust the import path as necessary
import { reviewContract } from '@skillprompt-lms/libs/api-contract/modules/review';
import { courseSchema } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { storeUserDataFromToken, checkRole } from '../auth/middlware';
import { validateAccessToken } from '@baijanstack/express-auth';
import { Role } from '@prisma/client';
const s = initServer();

export const reviewRouter = s.router(reviewContract, {
  getReview: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],
    handler: async () => {
      const review = await reviewRepo.findAll({});
      return {
        status: 200,
        body: {
          data: review.map((t) => {
            return {
              id: t.id,
              Comment: t.comment,
              username: t.username,
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
  },
  getReviewById: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],
    handler: async ({ params }) => {
      const review = await reviewRepo.findById({
        reviewId: params.reviewId,
        course_id: params.course_id,
        username: params.username,
      });

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
            username: review.username,
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
  },
  createReview: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],
    handler: async ({ body, params }) => {
      const user = await db.user.findUnique({
        where: { username: params.username },
      });

      if (!user) {
        return {
          status: 404,
          body: {
            message: 'User not found',
            isSuccess: false,
          },
        };
      }
      const course = await db.course.findUnique({
        where: { id: params.course_id },
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

      const review = await reviewRepo.create({
        comment: body.Comment,
        username: params.username,
        course: { connect: { id: params.course_id } },
        rating: body.rating,
        created_at: body.created_at,
        updated_at: body.updated_at,
        user: { connect: { username: user.username } },
      });

      return {
        status: 201,
        body: {
          data: {
            id: review.id,
            username: review.username,
            Comment: review.comment,
            rating: review.rating,
            created_at: review.created_at,
            updated_at: review.updated_at,
            course_id: params.course_id,
          },
          isSuccess: true,
          message: 'Review created',
        },
      };
    },
  },

  updateReview: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],
    handler: async ({ params, body }) => {
      const review = await reviewRepo.findById({
        reviewId: params.reviewId,
        course_id: params.course_id,
        username: params.username,
      });

      if (!review) {
        return {
          status: 404,
          body: {
            message: 'review not found',
            isSuccess: false,
          },
        };
      }

      const updatedReview = await reviewRepo.updateById({
        reviewId: params.reviewId,
        course_id: params.course_id,
        input: {
          comment: body.Comment,

          rating: body.rating,
          created_at: body.created_at,
          updated_at: body.updated_at,
        },
      });

      return {
        status: 200,
        body: {
          data: {
            id: review.id,
            Comment: review.comment,
            username: review.username,
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
    },
  },
  deleteReview: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.student, Role.admin, Role.instructor]),
    ],
    handler: async ({ params }) => {
      const review = await reviewRepo.findById({
        reviewId: params.reviewId,
        course_id: params.course_id,
        username: params.username,
      });

      if (!review) {
        return {
          status: 404,
          body: {
            message: 'review not found',
            isSuccess: false,
          },
        };
      }

      await reviewRepo.deleteById({
        reviewId: params.reviewId,
        course_id: params.course_id,
      });

      return {
        status: 200,
        body: {
          message: 'Review deleted',
          isSuccess: true,
        },
      };
    },
  },
});
