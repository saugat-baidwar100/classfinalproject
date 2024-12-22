// import { createExpressEndpoints } from '@ts-rest/express';

// import { logger } from '../../../../libs/api-contract/src/utils/logger';

// import { contentRouter } from './content-router';
// import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';

// const routers = [
//   {
//     contract: contentContract,
//     router: contentRouter,
//   },
//   // add more
// ];

// export function generateEndPoints(app: any) {
//   return routers.map(({ contract, router }) => {
//     createExpressEndpoints(contract, router, app, {
//       logInitialization: true,
//       requestValidationErrorHandler(err, req, res, next) {
//         logger.error(err, 'Request validation error');
//         res.status(400).json({
//           error: 'Request validation error',
//           isSuccess: false,
//           fieldErrors: err.body?.flatten().fieldErrors,
//         });
//       },
//     });
//   });
// }