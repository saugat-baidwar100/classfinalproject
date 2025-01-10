import { Prisma } from '@prisma/client';
import { db } from './client';

export const contentRepo = {
  create,
  updateById,
  deleteById,
  findById,
  findAll,
};

async function create(input: Prisma.ContentCreateInput) {
  return db.content.create({
    data: input,
  });
}

async function updateById({
  contentId,
  chapter_id,
  input,
}: {
  contentId: string;
  chapter_id: string;
  input: Prisma.ContentUpdateInput;
}) {
  return db.content.update({
    where: {
      id_chapter_id: {
        id: contentId,
        chapter_id: chapter_id,
      },
    },
    data: input,
  });
}

async function deleteById({
  chapter_id,
  contentId,
}: {
  chapter_id: string;
  contentId: string;
}) {
  return db.content.delete({
    where: {
      id_chapter_id: {
        id: contentId,
        chapter_id: chapter_id,
      },
    },
  });
}

async function findById({
  contentId,
  chapter_id,
}: {
  contentId: string;
  chapter_id: string;
}) {
  return db.content.findUnique({
    where: {
      id_chapter_id: {
        id: contentId,
        chapter_id: chapter_id,
      },
    },
  });
}

async function findAll(input: Prisma.ContentWhereInput) {
  return db.content.findMany({
    where: input,
  });
}
