import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import person1 from '../../assets/images/person1.png';
import person2 from '../../assets/images/person2.png';
import person3 from '../../assets/images/person3.png';
import person4 from '../../assets/images/person4.png';
import { toastError, toastSuccess } from '../../toaster';
import { useNavigate } from 'react-router-dom';
import { useSendOtpMutation, useSignUpMutation } from '../../api/auth/query';

// Zod schema for validation
const registerSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z
    .boolean()
    .refine((val) => val, 'You must accept Terms and Privacy Policy'),
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const registerUserMutation = useSignUpMutation();
  const sendOtpMutation = useSendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const sendOtp = async (email: string) => {
    await sendOtpMutation.mutateAsync(
      {
        email,
      },
      {
        onSuccess: (res) => {
          if (res.code !== 'SEND_OTP_SUCCESS') {
            toastError(res.message ?? 'sending OTP failed');
            return;
          }
          toastSuccess('OTP sent successfully!');
          navigate('/verifyotp');
        },
        onError: (error) => {
          console.error(error);
          toastError(error.message ?? 'sending OTP failed');
        },
      }
    );
  };

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data
  ) => {
    try {
      await registerUserMutation.mutateAsync(
        {
          email: data.email,
          username: data.username,
          fullname: data.fullName,
          password: data.password,
        },
        {
          onSuccess: async (res) => {
            if (res.code !== 'USER_CREATED') {
              toastError(res.message ?? 'sign up failed');
              return;
            }
            toastSuccess(
              'Sign up successful and Sending OTP for email verification...'
            );
            await sendOtp(data.email);
          },
          onError: (error) => {
            console.error(error);
            toastError(error.message ?? 'sign up failed');
          },
        }
      );
    } catch (error) {
      console.error(error);
      toastError((error as Error)?.message ?? 'sign up failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl flex justify-center font-bold mb-6">
            Create Your Account
          </h2>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600"></div>

            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-600'
                } focus:ring-2 focus:ring-blue-500`}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                } focus:ring-2 focus:ring-blue-500`}
                {...register('username')}
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-md bg-gray-700 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } focus:ring-2 focus:ring-blue-500`}
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
                } focus:ring-2 focus:ring-blue-500`}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                className="mt-1 form-checkbox h-4 w-4 text-blue-500"
                {...register('terms')}
              />
              <label className="ml-2 text-sm">
                I agree to the{' '}
                <a href="#" className="text-custom-teal hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-custom-teal hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm mb-2">
                {errors.terms.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-custom-teal hover:bg-custom-dark-teal rounded-md font-semibold shadow-md"
            >
              Create an account
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <a href="/auth/login" className="text-custom-teal hover:underline">
              Login here
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-custom-teal flex flex-col justify-center items-center p-6">
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
