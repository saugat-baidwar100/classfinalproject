/* eslint-disable @typescript-eslint/no-explicit-any */
import { createExpressEndpoints } from '@ts-rest/express';



import { courseRouter } from './course-router';

import { chapterRouter } from './chapter-router';
import { logger } from '@skillprompt-lms/libs/api-contract/utils/logger';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { reviewContract } from '@skillprompt-lms/libs/api-contract/modules/review';
import { reviewRouter } from './review-router';
const routers = [
  {
    contract: courseContract,
    router: courseRouter,
  },
{
  contract:chapterContract,
  router:chapterRouter
},
{
  contract:reviewContract,
  router:reviewRouter
}
];
export function generateEndPoints(app: any) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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