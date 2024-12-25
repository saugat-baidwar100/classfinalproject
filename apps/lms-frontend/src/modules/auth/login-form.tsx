import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSendOtpMutation } from '../../api/auth/query';
import { toastError, toastSuccess } from '../../toaster';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { input } from '@nextui-org/theme';
// Define Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginUserMutation = useLoginMutation();
  const sendOtpMutation = useSendOtpMutation();
  // Use react-hook-form with Zod resolver
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
    try {
      await loginUserMutation.mutateAsync(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (res) => {
            if (res.code !== 'LOGIN_SUCCESS') {
              toastError(res.message ?? 'login failed');
              return;
            }
            toastSuccess('login sucessful !');
            navigate('/');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'login failed !');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'login failed !');
    }
    // console.log('Form Data:', data);
  };

  const inputEmail = watch('email');
  const sendOtp = async (inputEmail: string) => {
    try {
      if (!inputEmail) {
        toastError('Email is required');
        return;
      }
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
            toastSuccess('OTP send sucessfully !');
            navigate('/');
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'Sending otp failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'sending otp failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Welcome back</h2>

          {/* Social Buttons */}
          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-3 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-md shadow-md">
              <FaGoogle className="text-red-500" />
              <span>Sign in with Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-md shadow-md">
              <FaApple className="text-gray-200" />
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
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

            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="text-blue-500 form-checkbox focus:ring-0"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a
                href="/resetpassword"
                className="text-sm text-blue-400 hover:underline"
                onClick={() => sendOtp(inputEmail)}
              >
                
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold shadow-md"
            >
              Sign in to your account
            </button>

            
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Explore the world’s leading design portfolios.
          </h2>
          <p className="text-center text-gray-200 text-sm">
            Millions of designers and agencies showcase their work on Flowbite -
            the home to the world’s best design professionals.
          </p>
          <div className="mt-6 flex -space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User 1"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="User 2"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="User 3"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <p className="mt-4 text-white text-sm">Over 15.7k Happy Customers</p>
        </div>
      </div>
    </div>
  );
};
