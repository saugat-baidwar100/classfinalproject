export const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Enter your email and OTP to reset your password.
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Email Input */}
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

          {/* OTP Input */}
          {/* <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP (One-Time Password)
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the OTP sent to your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <a href="/otp">Send Email</a>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
