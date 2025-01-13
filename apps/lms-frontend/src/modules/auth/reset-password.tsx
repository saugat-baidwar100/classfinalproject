// import React from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   useForgotPasswordMutation,
//   useSendOtpMutation,
// } from '../../api/auth/query';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { toastError, toastSuccess } from '../../toaster';

// // Define the schema using Zod
// const resetPasswordSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   otp: z
//     .string()
//     .length(6, { message: 'OTP must be exactly 6 characters' })
//     .regex(/^[0-9]+$/, { message: 'OTP must contain only numbers' }),
//   newPassword: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' }),
// });

// // Infer the TypeScript type from the schema
// type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// export const ResetPassword = () => {
//   const sendOTPMutation = useSendOtpMutation();
//   const forgetPasswordMutation = useForgotPasswordMutation();
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const email = params.get('email') ?? '';

//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordFormValues>({
//     mode: 'all',
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: {
//       email,
//       otp: '',
//       newPassword: '',
//     },
//   });

//   const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
//     try {
//       await forgetPasswordMutation.mutateAsync(
//         {
//           email: data.email,
//           otp: data.otp,
//           newPassword: data.newPassword,
//         },
//         {
//           onSuccess: (res) => {
//             if (res.code !== 'FORGOT_PASSWORD_SUCCESS') {
//               toastError(res.message ?? 'Password change failed');
//               return;
//             }
//             toastSuccess('Password changed sucessfully !');
//             navigate('/auth/login');
//           },
//           onError: (error) => {
//             console.error(error);
//             toastError(error.message ?? 'Password changed  failed');
//           },
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       toastError((error as Error)?.message ?? 'Password changed failed');
//     }
//     // console.log('Form Data:', data);
//     // Add logic to handle password reset (e.g., API call)
//   };

//   const inputEmail = watch('email');

//   const resendOTP = async () => {
//     try {
//       await sendOTPMutation.mutateAsync(
//         {
//           email: inputEmail,
//         },
//         {
//           onSuccess: (res) => {
//             if (res.code !== 'SEND_OTP_SUCCESS') {
//               toastError(res.message ?? 'sending OTP failed');
//               return;
//             }
//             toastSuccess('OTP send sucessfully !');
//           },
//           onError: (error) => {
//             console.error(error);
//             toastError(error.message ?? 'sending OTP failed');
//           },
//         }
//       );
//     } catch (error) {
//       console.error(error);
//       toastError((error as Error)?.message ?? 'Sending OTP failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Reset Password
//         </h2>
//         <p className="mt-2 italic text-sm text-center text-gray-600">
//           Enter the OTP, your email, and set your new password.
//         </p>

//         <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           {/* Email Field */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               {...register('email')}
//               className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* OTP Field */}
//           <div>
//             <label
//               htmlFor="otp"
//               className="block text-sm font-medium text-gray-700"
//             >
//               OTP
//             </label>
//             <input
//               type="text"
//               id="otp"
//               maxLength={6}
//               placeholder="Enter OTP"
//               {...register('otp')}
//               className={`w-full px-4 py-2 mt-1 text-center border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.otp ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {errors.otp && (
//               <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>
//             )}
//           </div>

//           {/* New Password Field */}
//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               placeholder="Enter your new password"
//               {...register('newPassword')}
//               className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.newPassword ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {errors.newPassword && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.newPassword.message}
//               </p>
//             )}

// <div className="mt-2 text-right">
//               <button
//                 type="button"
//                 className="text-sm text-[#31B991] hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onClick={resendOTP}
//               >
//                 Resend OTP
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-[#31B991] rounded-md shadow hover:bg-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Reset Password
//           </button>

//         </form>

//         <div className="mt-4 text-center">
//           <a href="/login" className="text-sm text-[#31B991] hover:underline">
//             Back to Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import person1 from '../../assets/images/person1.png';
import person2 from '../../assets/images/person2.png';
import person3 from '../../assets/images/person3.png';
import person4 from '../../assets/images/person4.png';
import {
  useForgotPasswordMutation,
  useSendOtpMutation,
} from '../../api/auth/query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../toaster';

const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 characters' })
    .regex(/^[0-9]+$/, { message: 'OTP must contain only numbers' }),
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPassword = () => {
  const sendOTPMutation = useSendOtpMutation();
  const forgetPasswordMutation = useForgotPasswordMutation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get('email') ?? '';

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    mode: 'all',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp: '',
      newPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      await forgetPasswordMutation.mutateAsync(
        {
          email: data.email,
          otp: data.otp,
          newPassword: data.newPassword,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'FORGOT_PASSWORD_SUCCESS') {
              toastError(res.message ?? 'Password change failed');
              return;
            }
            toastSuccess('Password changed successfully!');
            navigate('/auth/login');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Password change failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Password change failed');
    }
  };

  const inputEmail = watch('email');

  const resendOTP = async () => {
    try {
      await sendOTPMutation.mutateAsync(
        {
          email: inputEmail,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'SEND_OTP_SUCCESS') {
              toastError(res.message ?? 'Sending OTP failed');
              return;
            }
            toastSuccess('OTP sent successfully!');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Sending OTP failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Sending OTP failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between gap-3">
          <h2 className="text-3xl font-bold text-center mb-6">
            Reset Password
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Enter the OTP, your email, and set your new password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* OTP Field */}
            <div className="mb-4">
              <label className="block text-sm mb-2">OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${
                  errors.otp ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register('otp')}
              />
              {errors.otp && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="mb-4">
              <label className="block text-sm mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register('newPassword')}
              />
              {errors.newPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <button
              type="button"
              className="text-sm text-custom-teal hover:underline mb-4"
              onClick={resendOTP}
            >
              Resend OTP
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-custom-teal hover:bg-custom-dark-teal rounded-md font-semibold shadow-md"
            >
              Reset Password
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-custom-teal flex flex-col justify-center items-center p-6 lg:p-12 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Discover SkillPrompt’s Expert Learning Community
          </h2>
          <p className="text-center text-gray-200 text-sm">
            Thousands of learners and educators share knowledge and showcase
            their expertise on SkillPrompt – your gateway to professional
            growth.
          </p>
          <div className="mt-6 flex -space-x-2">
            <img
              src={person1}
              alt="User 1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={person2}
              alt="User 2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={person3}
              alt="User 3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src={person4}
              alt="User 4"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <p className="mt-4 text-white text-sm">
            Join over 15.7k satisfied learners
          </p>
        </div>
      </div>
    </div>
  );
};
