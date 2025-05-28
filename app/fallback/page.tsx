"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RoomPage({ params }) {
  const router = useRouter()
  
  useEffect(() => {
    // URL에서 직접 접근했을 때 새로운 세션 시작
    router.push('/')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
        <p>잠시만 기다려 주세요...</p>
      </div>
    </div>
  )
}
