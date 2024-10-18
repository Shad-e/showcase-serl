// src/app/components/RedirectComponent.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const RedirectComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/') // Redirect to the homepage
    }, 5000)

    return () => clearTimeout(timer) // Cleanup the timer
  }, [router])

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-5 text-center text-white'>
      <div className='mb-4 text-2xl'>Project not found.</div>
      <div className='text-lg'>Redirecting to homepage in 5 seconds...</div>
    </div>
  )
}

export default RedirectComponent
