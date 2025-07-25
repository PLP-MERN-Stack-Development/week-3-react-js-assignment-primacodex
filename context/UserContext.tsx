"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { fetchUser } from "@/api/userApi"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  avatar: string
  company?: {
    name: string
  }
  address?: {
    city: string
  }
}

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
  refreshUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await fetchUser()
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        refreshUser: loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
