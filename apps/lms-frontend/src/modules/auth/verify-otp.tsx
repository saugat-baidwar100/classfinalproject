
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useSendOtpMutation,
  useVerifyEmailMutation,
} from '../../api/auth/query';
import { toastError, toastSuccess } from '../../toaster';

// Define the Zod schema for validation
const otpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' }),
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
        {
          email: data.email,
          otp: data.otp,
        },
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="mt-2 italic text-sm text-center text-gray-600">
          Enter your email and the OTP sent to reset your password.
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

            {/* Resend OTP Button */}
            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-sm text-[#31B991] hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={resendOtp}
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
            Submit
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
