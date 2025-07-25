"use client"

import { useUser } from "@/context/UserContext"
import Button from "@/components/ui/Button"

export default function Header() {
  const { user, loading } = useUser()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">React Dashboard</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Assignment Demo
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
            ) : (
              <Button variant="primary" size="sm">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
