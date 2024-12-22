export const ForgotPassword = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="mt-2 italic text-sm text-center text-gray-600">
          Enter your email and OTP to reset your password.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#31B991] rounded-md shadow  hover:bg-[#27a37f]  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <a href="/resetpassword"> Send Email</a>
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-[#31B991] hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

