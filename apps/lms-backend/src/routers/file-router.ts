import multer from 'multer';
import { Router, Request, Response, NextFunction } from 'express';
import { initServer } from '@ts-rest/express';
import { fileContract } from '@skillprompt-lms/libs/api-contract/modules/file';
import { fileRepo } from '@skillprompt-lms/libs/lms-prisma/file-repo';

const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads/' directory
const s = initServer();
const router = Router();

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

  // Upload File
  uploadFile: async ({ req }: { req: Request }) => {
    const file = req.file;

    if (!file) {
      return {
        status: 400,
        body: {
          isSuccess: false,
          message: 'No file uploaded',
        },
      };
    }

    try {
      const createdFile = await fileRepo.create({
        fileName: file.originalname,
        filePath: file.path,
        fileSize: file.size,
        createdAt: new Date(),
      });

      return {
        status: 201,
        body: {
          data: {
            id: createdFile.id,
            fileName: createdFile.fileName,
            filePath: createdFile.filePath,
            fileSize: createdFile.fileSize,
          },
          isSuccess: true,
          message: 'File uploaded successfully',
        },
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        status: 500,
        body: {
          isSuccess: false,
          message: 'Internal server error',
        },
      };
    }
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

// Multer middleware for handling uploads
router.post(
  '/api/files/upload',
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fileRouter.uploadFile({ req });
      res.status(response.status).json(response.body);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
