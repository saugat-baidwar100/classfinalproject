export const OTP = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Enter OTP
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          A 6-digit OTP has been sent to your email or phone.
        </p>

        {/* OTP Input */}
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn’t receive the OTP?{' '}
            <a href="forgetpassword" className="text-blue-600 hover:underline">
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
