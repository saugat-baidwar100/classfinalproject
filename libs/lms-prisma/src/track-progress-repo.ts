import { db } from './client';
export const taskProgressRepo = {
  // Create Task Progress
  createTaskProgress: async ({
    username,
    course_id,
    progress,
    chapter_id,
    quiz_id,
    last_updated,
  }: any) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) throw new Error('User not found');

    return db.taskProgress.create({
      data: {
        user_id: user.id,
        course_id,
        progress,
        chapter_id,
        quiz_id,
        last_updated,
      },
    });
  },

  updateTaskProgress: async (
    username: string,
    course_id: string,
    progress: number,
    chapter_id?: string,
    quiz_id?: string
  ) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) throw new Error('User not found');

    return db.taskProgress.updateMany({
      where: { user_id: user.id, course_id },
      data: {
        progress,
        chapter_id,
        quiz_id,
      },
    });
  },

  deleteTaskProgress: async (username: string, course_id: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) throw new Error('User not found');

    return db.taskProgress.deleteMany({
      where: { user_id: user.id, course_id },
    });
  },

  findTaskProgressById: async (username: string, chapter_id: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return null;

    return db.taskProgress.findUnique({
      where: { user_id_chapter_id: { user_id: user.id, chapter_id } },
    });
  },

  findAllTaskProgress: async (course_id: string) => {
    return db.taskProgress.findMany({
      where: { course_id },
    });
  },
  //calculate total progress
  calculateTotalProgress: async (course_id: string, username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return 0;

    // Total and completed contents
    const totalContents = await db.content.count({
      where: { chapter: { course_id } },
    });
    const completedContents = await taskProgressRepo.calculateCompletedContents(
      course_id,
      username
    );

    // Total and completed quizzes
    const totalQuizzes = await db.quiz.count({
      where: { chapter: { course_id } },
    });
    const completedQuizzes = await taskProgressRepo.calculateCompletedQuizzes(
      course_id,
      username
    );

    // Total and completed chapters
    const totalChapters = await db.chapter.count({
      where: { course_id },
    });
    const completedChapters = await taskProgressRepo.calculateCompletedChapters(
      username
    );

    // Total and completed courses
    const totalCourses = 1; // Assuming 1 course at a time for simplicity
    const completedCourses = completedChapters === totalChapters ? 1 : 0;

    // Weighted progress calculation
    const contentProgress = totalContents
      ? (completedContents / totalContents) * 0.4
      : 0;
    const quizProgress = totalQuizzes
      ? (completedQuizzes / totalQuizzes) * 0.2
      : 0;
    const chapterProgress = totalChapters
      ? (completedChapters / totalChapters) * 0.3
      : 0;
    const courseProgress = totalCourses
      ? (completedCourses / totalCourses) * 0.1
      : 0;

    const totalProgress = Math.round(
      (contentProgress + quizProgress + chapterProgress + courseProgress) * 100
    );

    return totalProgress;
  },

  // Calculate User Progress for a specific course
  calculateUserProgress: async (course_id: string, username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return null;

    const progress = await db.taskProgress.aggregate({
      //aggregate le aggragation jasto work garna kam grxa jastai
      //sum, avg,count,min,max
      where: { course_id, user_id: user.id },
      _avg: {
        //avg use garexam aggregaration bata
        progress: true,
      },
    });

    return progress._avg.progress || 0; //progress vaye return garxa natra return 0 garxa
  },

  calculateCompletedContents: async (course_id: string, username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return 0;

    const completedContents = await db.content.count({
      where: {
        chapter: {
          //chapter bhitra ko
          course_id, //course ko
          taskProgress: {
            some: {
              //some le check  filter garni kam garxa
              user_id: user.id, //belongs to user
              progress: 100, //user ko progress check gari raxa
            },
          },
        },
      },
    });

    return completedContents;
  },

  calculateCompletedQuizzes: async (course_id: string, username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return 0;

    const completedQuizzes = await db.quiz.count({
      where: {
        taskProgress: {
          some: {
            user_id: user.id,
            course_id,
            progress: 100,
          },
        },
      },
    });

    return completedQuizzes;
  },

  calculateCompletedChapters: async (username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return 0;

    const completedChapters = await db.taskProgress.count({
      where: {
        user_id: user.id,
        progress: 100,
      },
    });

    return completedChapters;
  },

  calculateCompletedCourses: async (username: string) => {
    const user = await db.user.findUnique({
      where: { username },
    });
    if (!user) return 0;

    const completedCourses = await db.taskProgress.count({
      where: {
        user_id: user.id,
        progress: 100,
      },
    });

    return completedCourses;
  },
};
