"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MapPin, Copy, CheckCircle, AlertCircle, Globe, Sparkles, Star, Calendar } from 'lucide-react'
import { formatInTimeZone } from "date-fns-tz"
import { useParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import DateSelector from "@/components/date-selector"
import TimeGridSelector from "@/components/time-grid-selector"
import { Room, Participant, TimeSlot } from "@/types"
import { getCitiesByLanguage } from "@/data/cities"
import { StorageService } from "@/lib/storage"
import { TimeZoneService } from "@/lib/timezone"

export default function RoomPage() {
  const { t, language } = useLanguage()
  const params = useParams()
  const roomId = params.roomId as string

  const [room, setRoom] = useState<Room | null>(null)
  const [currentUser, setCurrentUser] = useState<Participant | null>(null)
  const [isJoined, setIsJoined] = useState(false)
  const [copied, setCopied] = useState(false)

  // Form state for joining
  const [name, setName] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])

  // Get the appropriate city list based on language
  const cityList = getCitiesByLanguage(language)

  useEffect(() => {
    loadRoom()
    const interval = setInterval(loadRoom, 3000) // Refresh every 3 seconds
    return () => clearInterval(interval)
  }, [roomId])

  const loadRoom = () => {
    const roomData = StorageService.getRoom(roomId)
    if (roomData) {
      setRoom(roomData)

      // Check if current user is already in the room
      const userId = StorageService.getUserId() || StorageService.generateUserId()
      const existingParticipant = roomData.participants.find((p: Participant) => p.id === userId)
      if (existingParticipant) {
        setCurrentUser(existingParticipant)
        setIsJoined(true)
        setName(existingParticipant.name)
        setSelectedCity(existingParticipant.city)
        setSelectedDates(existingParticipant.availableDates || [])
        setSelectedTimeSlots(existingParticipant.availableTimeSlots || [])
      }
    }
  }

  const joinRoom = () => {
    if (!name.trim() || !selectedCity || selectedDates.length === 0 || selectedTimeSlots.length === 0) return

    const userId = StorageService.getUserId() || StorageService.generateUserId()
    StorageService.setUserId(userId)
    
    const city = cityList.find((c) => c.name === selectedCity)
    if (!city) return

    const participant: Participant = {
      id: userId,
      name: name.trim(),
      city: selectedCity,
      timezone: city.timezone,
      availableDates: selectedDates,
      availableTimeSlots: selectedTimeSlots,
      joinedAt: new Date().toISOString(),
    }

    const success = StorageService.addParticipant(roomId, participant)
    if (success) {
      const updatedRoom = StorageService.getRoom(roomId)
      if (updatedRoom) {
        setRoom(updatedRoom)
        setCurrentUser(participant)
        setIsJoined(true)
      }
    }
  }

  const updateAvailability = () => {
    if (!currentUser || !room) return

    const updatedParticipant: Participant = {
      ...currentUser,
      availableDates: selectedDates,
      availableTimeSlots: selectedTimeSlots,
    }

    const success = StorageService.addParticipant(roomId, updatedParticipant)
    if (success) {
      const updatedRoom = StorageService.getRoom(roomId)
      if (updatedRoom) {
        setRoom(updatedRoom)
        setCurrentUser(updatedParticipant)
      }
    }
  }

  const copyRoomLink = () => {
    const link = window.location.href
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate overlapping time slots using TimeZoneService
  const overlappingSlots = useMemo(() => {
    if (!room || room.participants.length < 2) return []

    return TimeZoneService.findCommonTimeSlots(room.participants)
  }, [room])

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-4 flex items-center justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <Card className="max-w-md w-full text-center p-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{t("roomNotFound")}</h2>
          <p className="text-gray-600">{t("checkLink")}</p>
        </Card>
      </div>
    )
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Room Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
            {t("title")}
          </h1>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{room.name}</h2>
          
          <p className="text-gray-600 mb-6">
            {t("organizer")}: {room.organizer}
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={copyRoomLink} 
              variant="outline" 
              className="flex items-center gap-2 border-2 hover:bg-blue-50 hover:border-blue-300 rounded-xl transition-all duration-300"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? t("copied") : t("copyLink")}
            </Button>
            <Badge className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
              <Users className="w-4 h-4" />
              {room.participants.length} {t("participants")}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Join/Update Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {isJoined ? t("editInfo") : t("joinMeeting")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">{t("name")}</Label>
                  <Input
                    id="name"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isJoined}
                    className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-gray-700">{t("city")}</Label>
                  <Select onValueChange={setSelectedCity} value={selectedCity} disabled={isJoined}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl">
                      <SelectValue placeholder={t("cityPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {cityList.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCity && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      {t("currentTime")}:{" "}
                      <span className="font-semibold text-blue-700">
                        {formatInTimeZone(
                          new Date(),
                          cityList.find((c) => c.name === selectedCity)?.timezone || "UTC",
                          "yyyy-MM-dd HH:mm",
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date Selector */}
            <DateSelector selectedDates={selectedDates} onDatesChange={setSelectedDates} />

            {/* Time Grid Selector */}
            <TimeGridSelector selectedTimeSlots={selectedTimeSlots} onTimeSlotsChange={setSelectedTimeSlots} />

            <div className="flex justify-center">
              {!isJoined ? (
                <Button
                  onClick={joinRoom}
                  disabled={
                    !name.trim() || !selectedCity || selectedDates.length === 0 || selectedTimeSlots.length === 0
                  }
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {t("joinButton")}
                </Button>
              ) : (
                <Button 
                  onClick={updateAvailability} 
                  className="w-full h-14 text-lg rounded-xl border-2 border-blue-300 hover:bg-blue-50 transition-all duration-300" 
                  variant="outline"
                >
                  {t("updateButton")}
                </Button>
              )}
            </div>

            {/* Participants List */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {t("participantsList")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {room.participants.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t("noParticipants")}</p>
                ) : (
                  <div className="space-y-4">
                    {room.participants.map((participant, index) => (
                      <div key={participant.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {participant.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{participant.name}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {participant.city}
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {participant.availableDates?.length || 0} dates
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {participant.availableTimeSlots?.length || 0} time slots
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Meeting Suggestions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    {t("suggestedTimes")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {overlappingSlots.length > 0 ? (
                  <div className="space-y-4">
                    {overlappingSlots.slice(0, 10).map((slot, index) => (
                      <div
                        key={`${slot.date}-${slot.time}`}
                        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg shadow-sm">
                            <Star className="w-3 h-3 mr-1" />
                            {t("option")} {index + 1}
                          </Badge>
                          <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg border border-green-200">
                            {new Date(slot.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          {slot.time} ({slot.participants[0]}'s timezone)
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3 font-medium">{t("localTimes")}</div>
                        <div className="space-y-2">
                          {room.participants.map((p) => {
                            const datetime = new Date(`${slot.date}T${slot.time}:00`)
                            const localTime = formatInTimeZone(datetime, p.timezone, "yyyy-MM-dd HH:mm")
                            return (
                              <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200">
                                <span className="font-medium text-gray-700">{p.name}</span>
                                <span className="text-green-700 font-semibold">{localTime}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-10 h-10 text-gray-400" />
                    </div>
                    {room.participants.length < 2 ? (
                      <div>
                        <p className="text-lg font-medium mb-2">{t("minParticipants")}</p>
                        <p className="text-sm">더 많은 참가자가 필요합니다.</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-medium mb-2">{t("noOverlap")}</p>
                        <p className="text-sm">{t("adjustTimes")}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
