import { fileRepo } from '../../../../libs/lms-prisma/src/file-repo';
import { fileContract } from '@skillprompt-lms/libs/api-contract/modules/file';
import { initServer } from '@ts-rest/express';
import multer from 'multer';

const s = initServer();

//  Multer for file uploads
const upload = multer({ dest: 'uploads/' });

export const fileRouter = s.router(fileContract, {
  // Get all files
  getAllFiles: async () => {
    const files = await fileRepo.findAll({});
    return {
      status: 200,
      body: {
        data: files,
        isSuccess: true,
        message: 'Files retrieved successfully',
      },
    };
  },

  getFileById: async ({ params }) => {
    const file = await fileRepo.findById(Number(params.id));

    if (!file) {
      return {
        status: 404,
        body: {
          message: 'File not found',
          isSuccess: false,
        },
      };
    }

    return {
      status: 200,
      body: {
        data: file,
        isSuccess: true,
        message: 'File retrieved successfully',
      },
    };
  },

  uploadFile: async ({ body, req }) => {
    const file = req.file;

    if (!file) {
      return {
        status: 400,
        body: {
          message: 'No file uploaded',
          isSuccess: false,
        },
      };
    }

    try {
      const newFile = await fileRepo.create({
        fileName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
      });

      return {
        status: 200,
        body: {
          data: newFile,
          isSuccess: true,
          message: 'File uploaded successfully',
        },
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          message: 'Failed to upload file',
          isSuccess: false,
        },
      };
    }
  },

  updateFile: async ({ params, body }) => {
    const file = await fileRepo.findById(Number(params.id));

    if (!file) {
      return {
        status: 404,
        body: {
          message: 'File not found',
          isSuccess: false,
        },
      };
    }

    const updatedFile = await fileRepo.updateById(Number(params.id), body);

    return {
      status: 200,
      body: {
        data: updatedFile,
        isSuccess: true,
        message: 'File updated successfully',
      },
    };
  },

  deleteFile: async ({ params }) => {
    const file = await fileRepo.findById(Number(params.id));

    if (!file) {
      return {
        status: 404,
        body: {
          message: 'File not found',
          isSuccess: false,
        },
      };
    }

    await fileRepo.deleteById(Number(params.id));

    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'File deleted successfully',
      },
    };
  },
});
