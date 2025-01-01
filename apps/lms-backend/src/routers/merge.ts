import { createExpressEndpoints } from '@ts-rest/express';

import { courseRouter } from './course-router';

import { chapterRouter } from './chapter-router';
import { logger } from '@skillprompt-lms/libs/api-contract/utils/logger';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';
import { contentRouter } from './content-router';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { quizRouter } from './quiz-router';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { questionContract } from '@skillprompt-lms/libs/api-contract/modules/question';
import { questionRouter } from './question-router';
import { taskProgressContract } from '@skillprompt-lms/libs/api-contract/modules/track-progress';
import { taskProgressRouter } from './track-progress';
const routers = [
  {
    contract: courseContract,
    router: courseRouter,
  },
  {
    contract: contentContract,
    router: contentRouter,
  },
  {
    contract: chapterContract,
    router: chapterRouter,
  },
  {
    contract: quizContract,
    router: quizRouter,
  },
  {
    contract: questionContract,
    router: questionRouter,
  },
  {
    contract: taskProgressContract,
    router: taskProgressRouter,
  },
];
export function generateEndPoints(app: any) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      requestValidationErrorHandler(err, req, res, next) {
        logger.error(err, 'Request validation error');
        res.status(400).json({
          error: 'Request validation error',
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}