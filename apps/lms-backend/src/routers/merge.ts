import { createExpressEndpoints } from '@ts-rest/express';

import { logger } from '../../../../libs/api-contract/src/utils/logger';

import { courseRouter } from './course-router';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';
import { contentRouter } from './content-router';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { chapterRouter } from './chapter-router';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { quizRouter } from './quiz-router';
const routers = [
  {
    contract: courseContract,
    router: courseRouter,
  },
{
  contract:contentContract,
  router:contentRouter
},
{
  contract:chapterContract,
  router:chapterRouter
},
{
  contract:quizContract,
  router:quizRouter
}

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