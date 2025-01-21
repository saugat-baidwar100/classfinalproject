import multer from 'multer';
import { initServer } from '@ts-rest/express';
import { fileContract } from '@skillprompt-lms/libs/api-contract/modules/file';
import { fileRepo } from '@skillprompt-lms/libs/lms-prisma/file-repo';

const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads/' directory
const s = initServer();

export const fileRouter = s.router(fileContract, {
  // Get All Files
  getAllFiles: async () => {
    const files = await fileRepo.findAll({});
    return {
      status: 200,
      body: {
        data: files.map((file) => ({
          id: file.id,
          fileName: file.fileName,
          filePath: file.filePath,
          fileSize: file.fileSize,
          createdAt: file.createdAt.toISOString(),
        })),
        isSuccess: true,
        message: 'All files are retrieved successfully',
      },
    };
  },

  // Get File by ID
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
        data: {
          id: file.id,
          fileName: file.fileName,
          filePath: file.filePath,
          fileSize: file.fileSize,
          createdAt: file.createdAt.toISOString(),
        },
        isSuccess: true,
        message: 'File retrieved successfully by ID',
      },
    };
  },

  uploadFile: {
    handler: async ({ req }) => {
      const { file } = req;
      if (!file) {
        return {
          status: 400,
          body: {
            message: 'No file uploaded',
            isSuccess: false,
          },
        };
      }

      const createdFile = await fileRepo.create({
        fileName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
      });

      return {
        status: 201,
        body: {
          data: {
            id: createdFile.id,
            fileName: createdFile.fileName,
            filePath: createdFile.filePath,
            fileSize: createdFile.fileSize,
            createdAt: createdFile.createdAt.toISOString(),
          },
          isSuccess: true,
          message: 'File uploaded successfully',
        },
      };
    },
    middleware: [upload.single('file')],
  },

  // Update File by ID
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

    await fileRepo.updateById(Number(params.id), {
      fileName: body.fileName,
      filePath: body.filePath,
      fileSize: body.fileSize,
    });

    return {
      status: 200,
      body: {
        data: {
          id: file.id,
          fileName: body.fileName,
          filePath: body.filePath,
          fileSize: body.fileSize,
        },
        isSuccess: true,
        message: 'File updated successfully',
      },
    };
  },

  // Delete File by ID
  deleteFile: async ({ params }: { params: { id: string } }) => {
    const file = await fileRepo.findById(Number(params.id));

    if (!file) {
      return {
        status: 404,
        body: {
          message: 'File not found',
          isSuccess: false,
          data: null,
        },
      };
    }

    await fileRepo.deleteById(Number(params.id));

    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'File deleted successfully',
        data: null,
      },
    };
  },
});
