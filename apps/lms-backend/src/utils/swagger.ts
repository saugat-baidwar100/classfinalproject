import { courseContract } from '@skillprompt-lms/libs/api-contract/index';
import { generateOpenApi } from '@ts-rest/open-api';

// we need to use the main contract to generate the OpenAPI spec for all routes
export const openApiDocument = generateOpenApi(courseContract, {
  info: {
    title: 'Courses API',
    version: '1.0.0',
  },
});