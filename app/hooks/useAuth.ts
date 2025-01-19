'use client'

import { useContext } from 'react'
import { AuthContext } from '../components/AuthProvider'

interface User {
  id: number
  email: string
  role: 'admin' | 'modo' | 'adherant' | 'visiteur'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

