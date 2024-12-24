import { createExpressEndpoints } from '@ts-rest/express';



import { courseRouter } from './course-router';

import { chapterRouter } from './chapter-router';
import { logger } from '@skillprompt-lms/libs/api-contract/utils/logger';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';

const routers = [
  {
    contract: courseContract,
    router: courseRouter,
  },
{
  contract:chapterContract,
  router:chapterRouter
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