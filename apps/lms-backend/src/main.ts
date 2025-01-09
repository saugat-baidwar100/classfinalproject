import express, { NextFunction, Request, Response } from 'express';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { APIError } from './utils/error';
import { env } from './utils/env';
import { generateOpenApi } from '@ts-rest/open-api';
import * as swaggerUi from 'swagger-ui-express';
import { courseRepo } from '@skillprompt-lms/libs/lms-prisma/course-repo';
import { createAuth } from './auth';
import { courseRouter } from './routers/course-router';
import { logger } from '@skillprompt-lms/libs/api-contract/utils/logger';
import { generateEndPoints } from './routers/merge';
import { openApiDocument } from './utils/swagger';
import { errorHandler, notFoundHandler } from './utils/error-handler';
import { validateAccessToken } from '@baijanstack/express-auth';

// logger.debug(env,'Environment variables');

const app = express();

//----------------Helmet Setup --------------

app.use(helmet());

//-------------- Compression ---------------

app.use(compression());

//-------ts-rest with swagger----------

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// ------------------------- CORS Setup -------------------------
// app.use(
//   cors({
//     origin: ['${env.FRONTEND_URI}'], // replace with your actual frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Support cookies
//   })
// );
app.use(
  cors({
    origin: function (origin, callback) {
      logger.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ------------------------- Middleware for JSON and Cookies -------------------------
app.use(express.json());
app.use(cookieParser());

// ------------------------- Testing Routes -------------------------
app.get('/', validateAccessToken, (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Backend',
    data: null,
    isSuccess: true,
  });
});

// ------------------------- Routes -------------------------
// Add your application routes here
createAuth(app);

// generateEndPoints(app)
generateEndPoints(app);

app.use(notFoundHandler);

app.use(errorHandler);

// ------------------------- General Error Handler -------------------------
app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  if (error instanceof APIError) {
    res.status(error.status).json({
      message: error.message,
      data: null,
      isSuccess: false,
    });
    return;
  }

  res.status(500).json({
    message: 'Something went wrong on the server',
    data: null,
    isSuccess: false,
  });
});

// Use authentication middleware and admin check middleware

// Start Server
app.listen(env.PORT, () => {
  console.log(
    `Server starting at port ${env.PORT} http://localhost:${env.PORT}`
  );
});
