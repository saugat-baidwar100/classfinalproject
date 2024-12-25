/* eslint-disable @typescript-eslint/no-explicit-any */
import { createExpressEndpoints } from '@ts-rest/express';

import { logger } from '../../../../libs/api-contract/src/utils/logger';

import { courseRouter } from './course-router';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';

const routers = [
  {
    contract: courseContract,
    router: courseRouter,
  },
  // add more
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