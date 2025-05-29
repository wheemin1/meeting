"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, X, Sparkles, Sun, Moon, Coffee } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"

interface TimeGridSelectorProps {
  selectedTimeSlots: string[]
  onTimeSlotsChange: (timeSlots: string[]) => void
}

export default function TimeGridSelector({ selectedTimeSlots, onTimeSlotsChange }: TimeGridSelectorProps) {
  const { t } = useLanguage()

  // Generate 30-minute time slots from 00:00 to 23:30
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const toggleTimeSlot = (timeSlot: string) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      onTimeSlotsChange(selectedTimeSlots.filter((t) => t !== timeSlot))
    } else {
      onTimeSlotsChange([...selectedTimeSlots, timeSlot])
    }
  }

  const clearAll = () => {
    onTimeSlotsChange([])
  }

  const selectBusinessHours = () => {
    const businessHours = timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour >= 9 && hour < 17
    })
    onTimeSlotsChange(businessHours)
  }

  const selectMorning = () => {
    const morningHours = timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour >= 6 && hour < 12
    })
    onTimeSlotsChange(morningHours)
  }

  const selectEvening = () => {
    const eveningHours = timeSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour >= 18 && hour < 22
    })
    onTimeSlotsChange(eveningHours)
  }

  const getTimeSlotDisplay = (timeSlot: string) => {
    const [hour, minute] = timeSlot.split(":")
    const hourNum = Number.parseInt(hour)
    const period = hourNum >= 12 ? "PM" : "AM"
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
    return `${displayHour}:${minute} ${period}`
  }

  const getTimeSlotStyle = (timeSlot: string) => {
    const hour = Number.parseInt(timeSlot.split(":")[0])
    const isSelected = selectedTimeSlots.includes(timeSlot)
    
    if (isSelected) {
      if (hour >= 6 && hour < 12) {
        return "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg"
      } else if (hour >= 12 && hour < 18) {
        return "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg"
      } else {
        return "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg"
      }
    }
    
    if (hour >= 6 && hour < 12) {
      return "bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 text-orange-800 border-2 border-orange-200"
    } else if (hour >= 12 && hour < 18) {
      return "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-800 border-2 border-blue-200"
    } else {
      return "bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-800 border-2 border-purple-200"
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {t("availability")}
            </span>
          </CardTitle>
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={clearAll} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-red-50 hover:border-red-200">
              {t("clearAll")}
            </Button>
            <Button variant="outline" size="sm" onClick={selectMorning} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-yellow-50 hover:border-yellow-200 flex items-center gap-1">
              <Sun className="w-3 h-3" />
              Morning
            </Button>
            <Button variant="outline" size="sm" onClick={selectBusinessHours} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-blue-50 hover:border-blue-200 flex items-center gap-1">
              <Coffee className="w-3 h-3" />
              9AM-5PM
            </Button>
            <Button variant="outline" size="sm" onClick={selectEvening} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-purple-50 hover:border-purple-200 flex items-center gap-1">
              <Moon className="w-3 h-3" />
              Evening
            </Button>
          </div>
        </div>
        <p className="text-gray-600">{t("selectTimeSlots")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2 max-h-80 overflow-y-auto p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          {timeSlots.map((timeSlot) => (
            <button
              key={timeSlot}
              onClick={() => toggleTimeSlot(timeSlot)}
              className={`p-2 sm:p-3 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-300 transform hover:scale-105 time-grid-button ${getTimeSlotStyle(timeSlot)}`}
            >
              {getTimeSlotDisplay(timeSlot)}
            </button>
          ))}
        </div>

        {selectedTimeSlots.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              {t("selectedTimes")} ({selectedTimeSlots.length}):
            </h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {selectedTimeSlots.sort().map((timeSlot) => (
                <div
                  key={timeSlot}
                  className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-green-200"
                >
                  <span className="text-xs font-medium text-gray-700">
                    {getTimeSlotDisplay(timeSlot)}
                  </span>
                  <button 
                    onClick={() => toggleTimeSlot(timeSlot)} 
                    className="hover:bg-red-100 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
