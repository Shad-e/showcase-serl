// Handles the loading spinner display when data is being fetched.

export default function LoadingSpinner() {
  return (
    <div className='flex h-64 items-center justify-center'>
      <div className='loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear'></div>
      <p className='ml-2'>Loading projects...</p>
    </div>
  )
}
