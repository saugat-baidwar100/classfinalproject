export const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
       
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="mt-2 italic text-sm text-center text-gray-600">
          Enter the OTP and set your new password.
        </p>

       
        <form className="mt-6 space-y-4">
          
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
              className="w-full px-4 py-2 mt-1 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

         
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

         
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Re-enter your new password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        
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


