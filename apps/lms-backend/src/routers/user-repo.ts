// import { userContract } from '@skillprompt-lms/libs/api-contract/modules/user';
// import { userRepo } from '@skillprompt-lms/libs/lms-prisma/user-repo';
// import { initServer } from '@ts-rest/express';

// const s = initServer();

// export const userRouter = s.router(userContract, {
//   getUser: async () => {
//     const user = await userRepo.findAll({ id: undefined });
//     return {
//       status: 200,
//       body: {
//         data: user.map((t) => {
//           return {
//             id: t.id,
//             username: t.username,
//             fullname: t.fullname,
//             email: t.email,
//             password: t.password,
//             role: t.role,
//           };
//         }),
//         isSuccess: true,
//         message: 'All user are retreived',
//       },
//     };
//   },
//   getUserById: async ({ params }) => {
//     const user = await userRepo.findById(params.id);

//     if (!user) {
//       return {
//         status: 404,
//         body: {
//           message: 'user not found',
//           isSuccess: false,
//         },
//       };
//     }

//     return {
//       status: 200,
//       body: {
//         data: {
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           password: user.password,
//           fullname: user.fullname,
//           role: user.role,
//         },
//         isSuccess: true,
//         message: 'user retrieved by id',
//       },
//     };
//   },
//   createUsers: async ({ body }) => {
//     const user = await userRepo.create({
//       username: body.username,
//       email: body.email,
//       password: body.password,
//       fullname: body.fullname,
//       role: body.role,
//     });
//     return {
//       status: 201,
//       body: {
//         data: {
//           id: user.id,
//           username: user.email,
//           password: user.password,
//           fullname: user.fullname,
//           role: user.role,
//         },
//         isSuccess: true,
//         message: 'The role has been successfully created',
//       },
//     };
//   },

//   updateUser: async ({ params, body }) => {
//     const user = await userRepo.findById(params.id);
//     if (!user) {
//       return {
//         status: 404,
//         body: {
//           message: 'user not found',
//           isSuccess: false,
//         },
//       };
//     }

//     await userRepo.updateById(
//       params.id,
//       {
//         username: body.username,
//         email: body.email,
//         password: body.password,
//         fullname: body.fullname,
//       },
//       body.role
//     );

//     return {
//       status: 200,
//       body: {
//         data: {
//           id: user.id,
//           username: user.email,
//           password: user.password,
//           fullname: user.fullname,
//           role: user.role,
//         },
//         isSuccess: true,
//         message: 'the user has been updated successfully',
//       },
//     };
//   },

//   deleteUser: async ({ params }) => {
//     const user = await userRepo.findById(params.id);

//     if (!user) {
//       return {
//         status: 404,
//         body: {
//           message: 'User not found',
//           isSuccess: false,
//         },
//       };
//     }

//     await userRepo.deleteUserById(params.id, user.role);
//     return {
//       status: 200,
//       body: {
//         isSuccess: true,
//         message: 'The user is successfully deleted',
//       },
//     };
//   },
// });
