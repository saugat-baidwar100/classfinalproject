import { initContract } from '@ts-rest/core';
import { chapterContract } from '@skillprompt-lms/libs/api-contract/modules/chapter';
import { contentContract } from '@skillprompt-lms/libs/api-contract/modules/content';
import { courseContract } from '@skillprompt-lms/libs/api-contract/modules/courses';
import { questionContract } from '@skillprompt-lms/libs/api-contract/modules/question';
import { quizContract } from '@skillprompt-lms/libs/api-contract/modules/quiz';
import { reviewContract } from '@skillprompt-lms/libs/api-contract/modules/review';
import { taskProgressContract } from '@skillprompt-lms/libs/api-contract/modules/track-progress';

const c = initContract();

export const contract = c.router({
  Chapter: chapterContract ,
  Course: courseContract,
  Content: contentContract,
  Question: questionContract,    
  Quiz: quizContract,
  Review: reviewContract,
  Task_Progress: taskProgressContract,
});
