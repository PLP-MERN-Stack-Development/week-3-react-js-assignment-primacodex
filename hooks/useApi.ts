"use client"

import { useState, useEffect, useCallback } from "react"

interface UseApiOptions {
  fallbackData?: any
}

export function useApi<T = any>(url: string | null, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(options.fallbackData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!url) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error("API fetch error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")

      // Use fallback data if available
      if (options.fallbackData) {
        setData(options.fallbackData)
      }
    } finally {
      setLoading(false)
    }
  }, [url, options.fallbackData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}
