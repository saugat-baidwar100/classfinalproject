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

// logger.debug(env,'Environment variables');

const app = express();

//----------------Helmet Setup --------------

app.use(helmet());

//-------------- Compression ---------------

app.use(compression());

//-------ts-rest with swagger----------

const openApiDocument = generateOpenApi(courseContract, {
  info: {
    title: 'Posts API',
    version: '1.0.0',
  },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// ------------------------- CORS Setup -------------------------
app.use(
  cors({
    origin: ['${env.FRONTEND_URI}'], // replace with your actual frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Support cookies
  })
);

// ------------------------- Middleware for JSON and Cookies -------------------------
app.use(express.json());
app.use(cookieParser());

// generateEndPoints(app)

// ------------------------- Testing Routes -------------------------
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Backend',
    data: null,
    isSuccess: true,
  });
});

createAuth(app)

// ------------------------- Routes -------------------------
// Add your application routes here

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

// Start Server
app.listen(env.PORT, () => {
  console.log(
    `Server starting at port ${env.PORT} http://localhost:${env.PORT}`
  );
});
