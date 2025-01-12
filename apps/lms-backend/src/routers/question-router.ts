import { initServer } from '@ts-rest/express';
import { questionRepo } from '../../../../libs/lms-prisma/src/question-repo';
import { questionContract } from '@skillprompt-lms/libs/api-contract/modules/question';
import { db } from '@skillprompt-lms/libs/lms-prisma/client';
import { checkRole, storeUserDataFromToken } from '../auth/middlware';
import { validateAccessToken } from '@baijanstack/express-auth';
const s = initServer();

export const questionRouter = s.router(questionContract, {
  getQuestions: {
    middleware: [validateAccessToken, storeUserDataFromToken],
    handler: async ({ params }) => {
      const questions = await questionRepo.findAll({});

      if (questions.length === 0) {
        return {
          status: 404,
          body: {
            message: 'No questions found for the quiz',
            isSuccess: false,
          },
        };
      }

      return {
        status: 200,
        body: {
          data: questions.map((question) => ({
            id: question.id,
            quiz_id: question.quiz_id,
            question_text: question.question_text,
            options: JSON.parse(question.options) as {
              text: string;
              is_correct: boolean;
            }[],
            correct_option: question.correct_option,
            explanation: question.explanation,
            created_at: question.created_at,
            updated_at: question.updated_at,
          })),
          isSuccess: true,
          message: 'Questions retrieved successfully',
        },
      };
    },
  },

  getQuestionById: {
    middleware: [validateAccessToken, storeUserDataFromToken],
    handler: async ({ params }) => {
      const question = await questionRepo.findById({
        questionId: params.id,
        quiz_id: params.quiz_id,
      });

      if (!question) {
        return {
          status: 404,
          body: {
            message: 'Question not found',
            isSuccess: false,
          },
        };
      }

      return {
        status: 200,
        body: {
          data: {
            ...question,
            options: JSON.parse(question.options) as {
              text: string;
              is_correct: boolean;
            }[],
          },
          isSuccess: true,
          message: 'Question retrieved successfully',
        },
      };
    },
  },

  createQuestion: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ body, params }) => {
      // Validate quiz existence before proceeding
      const quiz = await db.quiz.findUnique({
        where: { id: params.quiz_id },
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

      const question = await questionRepo.create({
        quiz: { connect: { id: params.quiz_id } },
        question_text: body.question_text,
        options: JSON.stringify(body.options),
        correct_option: body.correct_option,
        explanation: body.explanation,
      });

      return {
        status: 201,
        body: {
          data: {
            ...question,
            options: JSON.parse(question.options) as {
              text: string;
              is_correct: boolean;
            }[],
          },
          isSuccess: true,
          message: 'Question created successfully',
        },
      };
    },
  },

  updateQuestion: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ params, body }) => {
      // Check if the question exists
      const existingQuestion = await questionRepo.findById({
        questionId: params.id,
        quiz_id: params.quiz_id,
      });

      if (!existingQuestion) {
        return {
          status: 404,
          body: {
            message: 'Question not found',
            isSuccess: false,
          },
        };
      }

      // Update the question
      const updatedQuestion = await db.question.update({
        where: { id: params.id },
        data: {
          question_text: body.question_text,
          correct_option: body.correct_option,
          explanation: body.explanation,
          options: JSON.stringify(
            body.options.map(
              (option: { text: string; is_correct: boolean }) => ({
                text: option.text,
                is_correct: option.is_correct,
              })
            )
          ),
        },
      });

      return {
        status: 200,
        body: {
          data: {
            ...updatedQuestion,
            options: JSON.parse(updatedQuestion.options) as {
              text: string;
              is_correct: boolean;
            }[],
          },
          isSuccess: true,
          message: 'Question updated successfully',
        },
      };
    },
  },

  deleteQuestion: {
    middleware: [
      validateAccessToken,
      storeUserDataFromToken,
      checkRole(['admin', 'instructor']),
    ],
    handler: async ({ params }) => {
      const existingQuestion = await questionRepo.findById({
        questionId: params.id,
        quiz_id: params.quiz_id,
      });

      if (!existingQuestion) {
        return {
          status: 404,
          body: {
            message: 'Question not found',
            isSuccess: false,
          },
        };
      }

      await questionRepo.deleteById({
        questionId: params.id,
        quiz_id: params.quiz_id,
      });

      return {
        status: 200,
        body: {
          isSuccess: true,
          message: 'Question deleted successfully',
        },
      };
    },
  },
});
