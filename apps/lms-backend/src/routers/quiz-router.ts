import { initServer } from '@ts-rest/express';
import { quizRepo } from '../../../../libs/lms-prisma/src/quiz-repo';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';

const s = initServer();

export const quizRouter = s.router(quizContract, {

  createQuiz: async ({ body, params }) => {
    
    const quiz = await quizRepo.create({
      title: body.title,
      max_score: body.max_score,
      passing_score: body.passing_score,
      chapter: { connect: { id: body.chapter_id } }, // Connect the chapter
    });

    return {
      status: 201,
      body: {
        data: {
            id: quiz.id,
          title: quiz.title,
          max_score: quiz.max_score,
          passing_score: quiz.passing_score,
          chapter_id: quiz.chapter_id, // Returning the connected chapter_id
        },
        isSuccess: true,
        message: 'The quiz has been successfully created',
      },
    };
  },

  updateQuiz: async ({ params, body }) => {
    // Find the quiz by its quiz_id
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

    // Update the quiz with the provided details
    const updatedQuiz = await quizRepo.updateById({
      quizId: params.quiz_id,
      chapter_id: params.chapter_id,
      input: {
        id: params.quiz_id,
        title: body.title,
        max_score: body.max_score,
        passing_score: body.passing_score,
        chapter: { connect: { id: body.chapter_id } }, // Connect chapter
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
          chapter_id: updatedQuiz.chapter_id, // Returning the correct chapter_id
        },
        isSuccess: true,
        message: 'The quiz has been successfully updated',
      },
    };
  },

  deleteQuiz: async ({ params }) => {
    // Find the quiz to be deleted
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
      input: {}, // Add an empty input object as required
    });
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'The quiz has been successfully deleted',
      },
    };
  },
});
