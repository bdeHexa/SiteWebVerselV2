'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-2xl font-bold">
          Student Community
        </Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/event" className="hover:underline">
              Événements
            </Link>
            <Link href="/activity" className="hover:underline">
              Communauté
            </Link>
            <Link href="/profil" className="hover:underline">
              Mon compte
            </Link>
            {(user.role === 'admin' || user.role === 'modo') && (
              <Link href="/admin" className="hover:underline">
                Administration
              </Link>
            )}
            <button onClick={logout} className="hover:underline">
              Déconnexion
            </button>
          </div>
        ) : (
          <Link href="/log" className="hover:underline">
            Connexion / Inscription
          </Link>
        )}
      </div>
    </nav>
  )
}

