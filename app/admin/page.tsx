'use client'

import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'modo')) {
      router.push('/home')
    }
  }, [user, router])

  if (!user || (user.role !== 'admin' && user.role !== 'modo')) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Page d'administration</h1>
      {/* Contenu de la page d'administration */}
      <p>Bienvenue sur la page d'administration. Ici, vous pouvez gérer les utilisateurs, les événements et les tickets.</p>
    </div>
  )
}

