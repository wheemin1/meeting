import { formatInTimeZone, toZonedTime, fromZonedTime } from "date-fns-tz"
import { format, parseISO, addMinutes, startOfDay, endOfDay } from "date-fns"
import { Participant, TimeSlot } from "@/types"

export class TimeZoneService {
  // 특정 시간대의 현재 시간을 가져옵니다
  static getCurrentTimeInTimezone(timezone: string): string {
    try {
      const now = new Date()
      return formatInTimeZone(now, timezone, "yyyy-MM-dd HH:mm:ss")
    } catch (error) {
      console.error(`Failed to get current time for timezone ${timezone}:`, error)
      return new Date().toISOString()
    }
  }
  // 날짜와 시간을 특정 시간대로 변환합니다
  static convertToTimezone(dateStr: string, timeStr: string, fromTimezone: string, toTimezone: string): string {
    try {
      const dateTime = `${dateStr}T${timeStr}:00`
      const zonedTime = fromZonedTime(dateTime, fromTimezone)
      return formatInTimeZone(zonedTime, toTimezone, "HH:mm")
    } catch (error) {
      console.error(`Failed to convert time from ${fromTimezone} to ${toTimezone}:`, error)
      return timeStr
    }
  }

  // 참가자들의 공통 가능한 시간대를 찾습니다
  static findCommonTimeSlots(participants: Participant[]): TimeSlot[] {
    if (participants.length < 2) return []

    const commonSlots: TimeSlot[] = []

    // 모든 참가자가 선택한 공통 날짜 찾기
    const allDates = participants.map(p => p.availableDates).flat()
    const dateCount = allDates.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const commonDates = Object.entries(dateCount)
      .filter(([, count]) => count === participants.length)
      .map(([date]) => date)

    // 각 공통 날짜에 대해 시간대 겹치는 부분 찾기
    commonDates.forEach(date => {
      const timeSlotsByParticipant = participants.map(participant => {
        return participant.availableTimeSlots.map(timeSlot => ({
          participant: participant.id,
          time: timeSlot,
          timezone: participant.timezone
        }))
      })

      // 모든 참가자의 시간대를 UTC로 변환하여 비교
      const utcTimeSlots = timeSlotsByParticipant.map(slots =>
        slots.map(slot => ({
          ...slot,
          utcTime: this.convertToUtc(date, slot.time, slot.timezone)
        }))
      )      // 공통 시간대 찾기
      const firstParticipantSlots = utcTimeSlots[0]
      
      firstParticipantSlots.forEach(firstSlot => {
        const allParticipantsHaveThisTime = utcTimeSlots.every(participantSlots =>
          participantSlots.some(slot => slot.utcTime === firstSlot.utcTime)
        )

        if (allParticipantsHaveThisTime) {
          commonSlots.push({
            date,
            time: firstSlot.time,
            participants: participants.map(p => p.name)
          })
        }
      })
    })

    // 중복 제거 및 정렬
    const uniqueSlots = commonSlots.filter((slot, index, arr) =>
      arr.findIndex(s => s.date === slot.date && s.time === slot.time) === index
    )

    return uniqueSlots.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time)
    })
  }
  // 시간대를 UTC로 변환
  private static convertToUtc(dateStr: string, timeStr: string, timezone: string): string {
    try {
      const dateTime = `${dateStr}T${timeStr}:00`
      const zonedTime = fromZonedTime(dateTime, timezone)
      return format(zonedTime, "HH:mm")
    } catch (error) {
      console.error(`Failed to convert to UTC:`, error)
      return timeStr
    }
  }

  // 참가자별 로컬 시간 표시
  static getLocalTimesForParticipants(
    date: string, 
    time: string, 
    baseTimezone: string, 
    participants: Participant[]
  ): Array<{ participant: Participant; localTime: string }> {
    return participants.map(participant => {
      const localTime = this.convertToTimezone(date, time, baseTimezone, participant.timezone)
      return {
        participant,
        localTime
      }
    })
  }

  // 시간대 이름을 사용자 친화적으로 변환
  static getTimezoneDisplayName(timezone: string): string {
    try {
      const now = new Date()
      const offsetStr = formatInTimeZone(now, timezone, "O")
      const cityName = timezone.split("/").pop()?.replace(/_/g, " ") || timezone
      return `${cityName} (${offsetStr})`
    } catch (error) {
      console.error(`Failed to get display name for timezone ${timezone}:`, error)
      return timezone
    }
  }

  // 시간대 유효성 검사
  static isValidTimezone(timezone: string): boolean {
    try {
      formatInTimeZone(new Date(), timezone, "yyyy-MM-dd")
      return true
    } catch {
      return false
    }
  }

  // 비즈니스 시간 필터링 (9AM - 6PM)
  static filterBusinessHours(timeSlots: string[]): string[] {
    return timeSlots.filter(time => {
      const hour = parseInt(time.split(":")[0])
      return hour >= 9 && hour <= 18
    })
  }

  // 30분 간격의 시간 슬롯 생성
  static generateTimeSlots(startHour: number = 0, endHour: number = 24, intervalMinutes: number = 30): string[] {
    const slots: string[] = []
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    
    return slots
  }
}
