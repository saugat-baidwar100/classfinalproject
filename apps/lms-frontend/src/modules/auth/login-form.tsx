import { FaGoogle } from 'react-icons/fa';

export const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <p className="mt-1 italic text-center text-sm text-gray-600">
          please login to continue your learning journey
        </p>

        <form className="mt-6">
          <div className="mb-4">
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
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="text-right">
            <a
              href="/forgetpassword"
              className="text-sm text-[#31B991] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full mt-4 h-[40px] px-4 py-2 text-white bg-[#31B991] rounded-md shadow hover:bg-[#3E3E3E] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <div className="flex items-center justify-center gap-3">
            <p>
              <FaGoogle className="text-[#31B991]" />
            </p>
            <p>Continue with Google</p>
          </div>
        </button>
      </div>
    </div>
  );
};
