"use client"

// Mock user data for demonstration
const mockUser = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  phone: "+1-555-0123",
  website: "johndoe.dev",
  avatar: "/placeholder.svg?height=100&width=100",
  company: {
    name: "Tech Solutions Inc.",
  },
  address: {
    city: "New York",
  },
}

export async function fetchUser() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Try to fetch from JSONPlaceholder API
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    if (response.ok) {
      const user = await response.json()
      return {
        ...user,
        avatar: "/placeholder.svg?height=100&width=100",
      }
    }
  } catch (error) {
    console.log("API unavailable, using mock data")
  }

  // Fallback to mock data
  return mockUser
}

export async function updateUser(userData: Partial<typeof mockUser>) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would make a PUT/PATCH request
  return { ...mockUser, ...userData }
}
