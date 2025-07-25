"use client"

import { useUser } from "@/context/UserContext"
import { useApi } from "@/hooks/useApi"
import Card from "@/components/ui/Card"
import Loading from "@/components/ui/Loading"
import Button from "@/components/ui/Button"

export default function UserProfile() {
  const { user, loading: userLoading, refreshUser } = useUser()
  const {
    data: posts,
    loading: postsLoading,
    error,
  } = useApi(user ? `https://jsonplaceholder.typicode.com/users/${user.id}/posts` : null)

  if (userLoading) {
    return (
      <Card>
        <Loading text="Loading profile..." />
      </Card>
    )
  }

  if (!user) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No user data available</p>
          <Button onClick={refreshUser}>Load User</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <div className="flex items-start space-x-6">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-24 h-24 rounded-full" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600 mb-2">@{user.username}</p>
            <p className="text-gray-700 mb-4">{user.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Phone:</span>
                <span className="ml-2 text-gray-600">{user.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Website:</span>
                <span className="ml-2 text-gray-600">{user.website}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Company:</span>
                <span className="ml-2 text-gray-600">{user.company?.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">City:</span>
                <span className="ml-2 text-gray-600">{user.address?.city}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* User Posts */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h3>

        {postsLoading ? (
          <Loading text="Loading posts..." />
        ) : error ? (
          <div className="text-center py-4 text-red-600">Error loading posts: {error}</div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.slice(0, 5).map((post: any) => (
              <div key={post.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 capitalize">{post.title}</h4>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No posts available</p>
        )}
      </Card>
    </div>
  )
}
