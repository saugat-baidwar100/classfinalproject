import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { courseContract } from '../../../../libs/api-contract/src/modules/courses';

export const courseApi = initTsrReactQuery(courseContract, {
  baseUrl: 'http://localhost:4000',
  baseHeaders: {},
  credentials:'include'
});

export const testimonialApi = initTsrReactQuery(courseContract, {
  baseUrl: 'http://localhost:4000',
  baseHeaders: {},
});
