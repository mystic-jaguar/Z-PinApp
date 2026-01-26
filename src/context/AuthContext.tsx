"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  isOnline: boolean
  setUser: (user: User | null) => void
  toggleOnline: () => void
  login: (email: string, password: string) => void
  signup: (name: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Rahul Kumar",
  phone: "+91 98765 43210",
  email: "rahul.kumar@email.com",
  avatar: undefined,
  vehicleType: "bike",
  vehicleNumber: "DL 01 AB 1234",
  isOnline: true,
  rating: 4.8,
  totalDeliveries: 1247,
  documentsVerified: true,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null) // Explicitly set initial user state to null to ensure the app starts at the login screen
  const [isOnline, setIsOnline] = useState(false)

  const toggleOnline = () => {
    setIsOnline((prev) => !prev)
    if (user) {
      setUser({ ...user, isOnline: !isOnline })
    }
  }

  const login = (email: string, password: string) => {
    setUser({ ...mockUser, email })
    setIsOnline(true)
  }

  const signup = (name: string, email: string, password: string) => {
    setUser({ ...mockUser, name, email })
    setIsOnline(true)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isOnline, setUser, toggleOnline, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
