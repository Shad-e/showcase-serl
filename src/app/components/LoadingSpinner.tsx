// Handles the loading spinner display when data is being fetched.

export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="ml-2">Loading projects...</p>
      </div>
    );
  }
  