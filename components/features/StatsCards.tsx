"use client"

import { useTasks } from "@/context/TaskContext"
import { useUser } from "@/context/UserContext"
import Card from "@/components/ui/Card"

export default function StatsCards() {
  const { tasks } = useTasks()
  const { user } = useUser()

  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.filter((task) => !task.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: "📝",
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: "⏳",
      color: "bg-yellow-500",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: "📊",
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center" hover>
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} text-white text-xl mb-3`}
          >
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-gray-600 text-sm">{stat.title}</p>
        </Card>
      ))}
    </div>
  )
}
