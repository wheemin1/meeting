// 공통 타입 정의
export interface Participant {
  id: string
  name: string
  city: string
  timezone: string
  availableDates: string[]
  availableTimeSlots: string[]
  joinedAt: string
}

export interface Room {
  id: string
  name: string
  organizer: string
  createdAt: string
  participants: Participant[]
}

export interface TimeSlot {
  date: string
  time: string
  participants: string[]
}

export interface City {
  name: string
  timezone: string
}
