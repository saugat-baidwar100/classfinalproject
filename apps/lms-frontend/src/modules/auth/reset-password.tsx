export const  ResetPassword = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Create a new password to secure your account.
          </p>
  
          {/* Form */}
          <form className="mt-6 space-y-4">
            {/* New Password Input */}
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                placeholder="Enter your new password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
  
            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
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
  
 
  