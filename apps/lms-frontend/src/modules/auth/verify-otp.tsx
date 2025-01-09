import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import person1 from '../../assets/images/person1.png';
import person2 from '../../assets/images/person2.png';
import person3 from '../../assets/images/person3.png';
import person4 from '../../assets/images/person4.png';
import {
  useSendOtpMutation,
  useVerifyEmailMutation,
} from '../../api/auth/query';
import { toastError, toastSuccess } from '../../toaster';

const otpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .length(6, { message: 'OTP must be exactly 6 characters' })
    .regex(/^[0-9]+$/, { message: 'OTP must contain only numbers' }),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const sendOtpMutation = useSendOtpMutation();
  const verifyEmailMutation = useVerifyEmailMutation();
  const [params] = useSearchParams();
  const email = params.get('email') ?? '';

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    mode: 'all',
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email,
      otp: '',
    },
  });

  const onSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    try {
      await verifyEmailMutation.mutateAsync(
        { email: data.email, otp: data.otp },
        {
          onSuccess: (res) => {
            if (res.code !== 'VERIFY_EMAIL_SUCCESS') {
              toastError(res.message ?? 'Verification failed');
              return;
            }
            toastSuccess('Email verified successfully!');
            navigate('/auth/login');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Verification failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'Verification failed');
    }
  };

  const inputEmail = watch('email');

  const resendOtp = async () => {
    try {
      await sendOtpMutation.mutateAsync(
        { email: inputEmail },
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
          <h2 className="text-3xl font-bold text-center mb-6">Verify OTP</h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Enter your email and the OTP sent to verify your account.
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

            <button
              type="button"
              className="text-sm text-custom-teal hover:underline mb-4"
              onClick={resendOtp}
            >
              Resend OTP
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-custom-teal hover:bg-custom-dark-teal rounded-md font-semibold shadow-md"
            >
              Verify OTP
            </button>
            <div className="mt-4 text-center">
              <a
                href="/auth/login"
                className="text-sm text-[#31B991] hover:underline"
              >
                {' '}
                Back to Login
              </a>
            </div>
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
