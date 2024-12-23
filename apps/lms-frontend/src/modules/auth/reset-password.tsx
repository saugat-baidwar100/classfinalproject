import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForgotPasswordMutation,
  useSendOtpMutation,
} from '../../api/auth/query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../../toaster';

// Define the schema using Zod
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

// Infer the TypeScript type from the schema
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
            toastSuccess('Password changed sucessfully !');
            navigate('/auth/login');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Password changed  failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Password changed failed');
    }
    // console.log('Form Data:', data);
    // Add logic to handle password reset (e.g., API call)
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
              toastError(res.message ?? 'sending OTP failed');
              return;
            }
            toastSuccess('OTP send sucessfully !');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'sending OTP failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Sending OTP failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="mt-2 italic text-sm text-center text-gray-600">
          Enter the OTP, your email, and set your new password.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP Field */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              maxLength={6}
              placeholder="Enter OTP"
              {...register('otp')}
              className={`w-full px-4 py-2 mt-1 text-center border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.otp ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>

          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              {...register('newPassword')}
              className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}

<div className="mt-2 text-right">
              <button
                type="button"
                className="text-sm text-[#31B991] hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#31B991] rounded-md shadow hover:bg-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
          
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-sm text-[#31B991] hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};
