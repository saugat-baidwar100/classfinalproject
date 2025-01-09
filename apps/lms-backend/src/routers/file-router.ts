import { fileContract } from '@skillprompt-lms/libs/api-contract/modules/file';
import { fileRepo } from '@skillprompt-lms/libs/lms-prisma/file-repo'; // Import the file repository
import { initServer } from '@ts-rest/express';

const s = initServer();

export const fileRouter = s.router(fileContract, {
  // Get All Files
  getAllFiles: async () => {
    const files = await fileRepo.findAll({});
    return {
      status: 200,
      body: {
        data: files.map((file) => {
          return {
            id: file.id,
            fileName: file.fileName,
            filePath: file.filePath,
            fileSize: file.fileSize,
            createdAt: file.createdAt.toISOString(),
          };
        }),
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

  // Create File Upload
  uploadFile: async ({ body }) => {
    try {
      const file = await fileRepo.create({
        fileName: body.fileName,
        filePath: body.filePath,
        fileSize: body.fileSize,
        createdAt: new Date().toISOString(),
      });

      return {
        status: 201,
        body: {
          data: {
            id: file.id,
            fileName: file.fileName,
            filePath: file.filePath,
            fileSize: file.fileSize,
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
          fileName: file.fileName,
          filePath: file.filePath,
          fileSize: file.fileSize,
        },
        isSuccess: true,
        message: 'File updated successfully',
      },
    };
  },

  // Delete File by ID (fixing type of params)
  deleteFile: async ({ params }: { params: { id: string } }) => {
    const file = await fileRepo.findById(Number(params.id));
    if (!file) {
      return {
        status: 404,
        body: {
          message: 'File not found',
          isSuccess: false,
          data: null, // Ensure this structure matches the contract
        },
      };
    }

    // Delete the file
    await fileRepo.deleteById(Number(params.id));

    // Return response according to the contract
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'File deleted successfully',
        data: null, // Ensure data is null for success, as required by the contract
      },
    };
  },
});
