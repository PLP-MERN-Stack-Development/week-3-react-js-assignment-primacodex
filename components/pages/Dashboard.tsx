"use client"

import { useState } from "react"
import { TaskProvider } from "@/context/TaskContext"
import { UserProvider } from "@/context/UserContext"
import Header from "@/components/ui/Header"
import TaskList from "@/components/features/TaskList"
import UserProfile from "@/components/features/UserProfile"
import WeatherWidget from "@/components/features/WeatherWidget"
import StatsCards from "@/components/features/StatsCards"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"tasks" | "profile" | "weather">("tasks")

  return (
    <UserProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="container mx-auto px-4 py-8">
            {/* Navigation Tabs */}
            <div className="mb-8">
              <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                {[
                  { id: "tasks", label: "Tasks", icon: "📝" },
                  { id: "profile", label: "Profile", icon: "👤" },
                  { id: "weather", label: "Weather", icon: "🌤️" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Content */}
            <div className="mt-8">
              {activeTab === "tasks" && <TaskList />}
              {activeTab === "profile" && <UserProfile />}
              {activeTab === "weather" && <WeatherWidget />}
            </div>
          </main>
        </div>
      </TaskProvider>
    </UserProvider>
  )
}
