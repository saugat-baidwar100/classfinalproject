import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { questionContract } from '@skillprompt-lms/libs/api-contract/modules/question';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { reviewContract } from '@skillprompt-lms/libs/api-contract/modules/review';
import { taskProgressContract } from '@skillprompt-lms/libs/api-contract/modules/track-progress';
import { generateOpenApi } from '@ts-rest/open-api';

// we need to use the  contract to generate the OpenAPI spec for all routes
const Contract = {
  ...chapterContract,
  ...contentContract,
  ...courseContract,
  ...questionContract,
  ...quizContract,
  ...reviewContract,
  ...taskProgressContract,
};

export const openApiDocument = generateOpenApi(Contract, {
  info: {
    title: 'Courses API',
    version: '1.0.0',
  },
});
