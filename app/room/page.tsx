"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FallbackPage() {
  const router = useRouter()
  const [message, setMessage] = useState('Redirecting to demo room...')

  useEffect(() => {
    // Any dynamic room will redirect to our demo room for static export
    router.push('/room/demo-room/')
  }, [router])

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Meeting Timezone Planner</h1>
      <p className="text-lg mb-8">{message}</p>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  )
}
