import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSendOtpMutation } from '../../api/auth/query';
import { toastError, toastSuccess } from '../../toaster';
import person1 from '../../assets/images/person1.png';
import person2 from '../../assets/images/person2.png';
import person3 from '../../assets/images/person3.png';
import person4 from '../../assets/images/person4.png';
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl  bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-betwee gap-3">
          <h2 className="text-3xl flex justify-center font-bold text-white mb-6">
            Welcome back
          </h2>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-600"></div>

            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mb-4">
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-md bg-gray-700 border ${
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
                  className="text-custom-teal form-checkbox focus:ring-0"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a
                href="/resetpassword"
                className="text-sm text-custom-teal hover:underline"
                onClick={() => sendOtp(inputEmail)}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-custom-teal hover:bg-custom-dark-teal rounded-md font-semibold shadow-md"
            >
              Sign in to your account
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a
              href="/auth/register"
              className="text-custom-teal hover:underline"
            >
              Sign up
            </a>
          </p>
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
