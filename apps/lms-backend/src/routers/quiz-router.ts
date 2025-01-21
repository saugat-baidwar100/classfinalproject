import { initServer } from '@ts-rest/express';
import { quizRepo } from '../../../../libs/lms-prisma/src/quiz-repo';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { checkRole, storeUserDataFromToken } from '../auth/middlware';
import { validateAccessToken } from '@baijanstack/express-auth';
import { Role } from '@prisma/client';
const s = initServer();

export const quizRouter = s.router(quizContract, {
  createQuiz: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ body, params }) => {
      const quiz = await quizRepo.create({
        title: body.title,
        max_score: body.max_score,
        passing_score: body.passing_score,
        chapter: { connect: { id: body.chapter_id } },
      });

      return {
        status: 201,
        body: {
          data: {
            id: quiz.id,
            title: quiz.title,
            max_score: quiz.max_score,
            passing_score: quiz.passing_score,
            chapter_id: quiz.chapter_id,
          },
          isSuccess: true,
          message: 'The quiz has been successfully created',
        },
      };
    },
  },

  updateQuiz: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params, body }) => {
      const quiz = await quizRepo.findById({
        quizId: params.quiz_id,
        chapter_id: params.chapter_id,
      });

      if (!quiz) {
        return {
          status: 404,
          body: {
            message: 'Quiz not found',
            isSuccess: false,
          },
        };
      }

      // Update the quiz
      const updatedQuiz = await quizRepo.updateById({
        quizId: params.quiz_id,
        chapter_id: params.chapter_id,
        input: {
          id: params.quiz_id,
          title: body.title,
          max_score: body.max_score,
          passing_score: body.passing_score,
          chapter: { connect: { id: body.chapter_id } },
        },
      });

      return {
        status: 200,
        body: {
          data: {
            id: updatedQuiz.id,
            title: updatedQuiz.title,
            max_score: updatedQuiz.max_score,
            passing_score: updatedQuiz.passing_score,
            chapter_id: updatedQuiz.chapter_id,
          },
          isSuccess: true,
          message: 'The quiz has been successfully updated',
        },
      };
    },
  },

  deleteQuiz: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole([Role.admin, Role.instructor]),
    ],
    handler: async ({ params }) => {
      //  quiz to be deleted
      const quiz = await quizRepo.findById({
        quizId: params.quiz_id,
        chapter_id: params.chapter_id,
      });

      if (!quiz) {
        return {
          status: 404,
          body: {
            message: 'Quiz not found',
            isSuccess: false,
          },
        };
      }

      // Delete the quiz
      await quizRepo.deleteById({
        quizId: params.quiz_id,
        chapter_id: params.chapter_id,
        input: {},
      });
      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'The quiz has been successfully deleted',
        },
      };
    },
  },
});
