import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. MEMORY (useState): Load saved data from browser storage first, or use initialValue
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // 2. SIDE EFFECT (useEffect): Whenever `key` or `value` changes, save to browser storage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [key, value])

  // 3. Return the exact same [value, setValue] pair as normal useState!
  return [value, setValue] as const
}