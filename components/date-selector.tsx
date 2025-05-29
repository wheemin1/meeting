"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, X, Sparkles } from 'lucide-react'
import { useLanguage } from "@/lib/language-context"

interface DateSelectorProps {
  selectedDates: string[]
  onDatesChange: (dates: string[]) => void
}

export default function DateSelector({ selectedDates, onDatesChange }: DateSelectorProps) {
  const { t } = useLanguage()

  // Generate next 30 days starting from today
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const availableDates = generateDates()

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      onDatesChange(selectedDates.filter((d) => d !== date))
    } else {
      onDatesChange([...selectedDates, date])
    }
  }

  const clearAll = () => {
    onDatesChange([])
  }

  const selectAll = () => {
    onDatesChange(availableDates.slice(0, 14)) // Select first 2 weeks
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("meetingDates")}
            </span>
          </CardTitle>
          <div className="flex gap-1 sm:gap-2">
            <Button variant="outline" size="sm" onClick={clearAll} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-red-50 hover:border-red-200">
              {t("clearAll")}
            </Button>
            <Button variant="outline" size="sm" onClick={selectAll} className="text-xs sm:text-sm rounded-lg border-2 hover:bg-blue-50 hover:border-blue-200">
              {t("selectAll")}
            </Button>
          </div>
        </div>
        <p className="text-gray-600">{t("selectDates")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-3">
          {availableDates.slice(0, 21).map((date) => {
            const isSelected = selectedDates.includes(date)
            const isToday = new Date(date).toDateString() === new Date().toDateString()
            
            return (
              <button
                key={date}
                onClick={() => toggleDate(date)}
                className={`p-2 sm:p-3 rounded-xl text-[10px] sm:text-sm transition-all duration-300 transform hover:scale-105 date-selector-button ${
                  isSelected 
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg" 
                    : isToday
                    ? "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800 border-2 border-orange-300 hover:from-orange-200 hover:to-orange-300"
                    : "bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 border-2 border-gray-200"
                }`}
              >
                <div className="text-xs font-medium">{getDayOfWeek(date)}</div>
                <div className="font-bold">{formatDate(date)}</div>
              </button>
            )
          })}
        </div>

        {selectedDates.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              {t("selectedDates")} ({selectedDates.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date) => (
                <div key={date} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-200">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(date).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => toggleDate(date)} 
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
