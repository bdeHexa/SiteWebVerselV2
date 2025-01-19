'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])) as User
        setUser(decodedToken)
      } catch (error) {
        console.error('Error decoding token:', error)
        sessionStorage.removeItem('token')
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const { token } = await response.json()
      
      // Validate the token before storing it
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])) as User
        sessionStorage.setItem('token', token)
        setUser(decodedToken)
        router.push('/home')
      } catch (error) {
        console.error('Invalid token received:', error)
        throw new Error('Invalid token received from server')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setUser(null)
    router.push('/log')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

