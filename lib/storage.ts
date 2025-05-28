import { Room, Participant } from "@/types"

// LocalStorage 관련 유틸리티 함수들
export class StorageService {
  private static readonly ROOM_PREFIX = "room_"
  private static readonly USER_ID_KEY = "userId"

  // 사용자 ID 생성 및 관리
  static generateUserId(): string {
    const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    this.setUserId(userId)
    return userId
  }

  static getUserId(): string | null {
    try {
      return localStorage.getItem(this.USER_ID_KEY)
    } catch (error) {
      console.error("Failed to get user ID from localStorage:", error)
      return null
    }
  }

  static setUserId(userId: string): void {
    try {
      localStorage.setItem(this.USER_ID_KEY, userId)
    } catch (error) {
      console.error("Failed to set user ID to localStorage:", error)
    }
  }

  // 방 데이터 관리
  static saveRoom(room: Room): boolean {
    try {
      const roomKey = `${this.ROOM_PREFIX}${room.id}`
      localStorage.setItem(roomKey, JSON.stringify(room))
      return true
    } catch (error) {
      console.error("Failed to save room to localStorage:", error)
      return false
    }
  }

  static getRoom(roomId: string): Room | null {
    try {
      const roomKey = `${this.ROOM_PREFIX}${roomId}`
      const roomData = localStorage.getItem(roomKey)
      return roomData ? JSON.parse(roomData) : null
    } catch (error) {
      console.error("Failed to get room from localStorage:", error)
      return null
    }
  }

  static deleteRoom(roomId: string): boolean {
    try {
      const roomKey = `${this.ROOM_PREFIX}${roomId}`
      localStorage.removeItem(roomKey)
      return true
    } catch (error) {
      console.error("Failed to delete room from localStorage:", error)
      return false
    }
  }

  // 참가자 관리
  static addParticipant(roomId: string, participant: Participant): boolean {
    try {
      const room = this.getRoom(roomId)
      if (!room) return false

      // 기존 참가자가 있다면 제거 후 추가
      const updatedParticipants = room.participants.filter(p => p.id !== participant.id)
      updatedParticipants.push(participant)

      const updatedRoom: Room = {
        ...room,
        participants: updatedParticipants
      }

      return this.saveRoom(updatedRoom)
    } catch (error) {
      console.error("Failed to add participant:", error)
      return false
    }
  }

  static removeParticipant(roomId: string, participantId: string): boolean {
    try {
      const room = this.getRoom(roomId)
      if (!room) return false

      const updatedParticipants = room.participants.filter(p => p.id !== participantId)
      const updatedRoom: Room = {
        ...room,
        participants: updatedParticipants
      }

      return this.saveRoom(updatedRoom)
    } catch (error) {
      console.error("Failed to remove participant:", error)
      return false
    }
  }

  // 유틸리티 함수들
  static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  static clearAllRooms(): boolean {
    try {
      const keys = Object.keys(localStorage)
      const roomKeys = keys.filter(key => key.startsWith(this.ROOM_PREFIX))
      
      roomKeys.forEach(key => {
        localStorage.removeItem(key)
      })
      
      return true
    } catch (error) {
      console.error("Failed to clear all rooms:", error)
      return false
    }
  }
}
