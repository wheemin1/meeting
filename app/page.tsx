"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Users, Plus, Share2, Globe, Sparkles } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { StorageService } from "@/lib/storage"
import { Room } from "@/types"

export default function HomePage() {
  const { t } = useLanguage()
  const [roomName, setRoomName] = useState("")
  const [organizerName, setOrganizerName] = useState("")
  const router = useRouter()

  const createRoom = () => {
    if (!roomName.trim()) return

    // LocalStorage 사용 가능 여부 확인
    if (!StorageService.isStorageAvailable()) {
      alert("브라우저에서 로컬 저장소를 사용할 수 없습니다.")
      return
    }

    // Generate a unique room ID
    const roomId = Math.random().toString(36).substring(2, 15)

    // Create room data
    const roomData: Room = {
      id: roomId,
      name: roomName,
      organizer: organizerName || "Anonymous",
      createdAt: new Date().toISOString(),
      participants: [],
    }

    // Save room data using StorageService
    const success = StorageService.saveRoom(roomData)
    
    if (!success) {
      alert("방 생성에 실패했습니다. 다시 시도해주세요.")
      return
    }

    // Navigate to the room
    router.push(`/room/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            {t("title")}
          </h1>
          
          <p className="text-2xl text-gray-600 mb-4 font-medium">{t("subtitle")}</p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">{t("description")}</p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                {t("createRoom")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="space-y-3">
                <Label htmlFor="roomName" className="text-lg font-semibold text-gray-700">
                  {t("roomName")}
                </Label>
                <Input
                  id="roomName"
                  placeholder={t("roomNamePlaceholder")}
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="text-lg h-14 border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="organizerName" className="text-lg font-semibold text-gray-700">
                  {t("organizerName")}
                </Label>
                <Input
                  id="organizerName"
                  placeholder={t("organizerNamePlaceholder")}
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="text-lg h-14 border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-all duration-200"
                />
              </div>

              <Button
                onClick={createRoom}
                disabled={!roomName.trim()}
                className="w-full text-lg py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                {t("createRoomButton")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t("step1Title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("step1Desc")}</p>
          </Card>

          <Card className="text-center p-8 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t("step2Title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("step2Desc")}</p>
          </Card>

          <Card className="text-center p-8 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{t("step3Title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("step3Desc")}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
