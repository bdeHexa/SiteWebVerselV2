'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faCalendar, faTicket, faScrewdriverWrench, faRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Section de gauche : Logo */}
        <Link href="/home" className="hover:underline">
          <FontAwesomeIcon icon={faHouse} size="lg" className="mr-2" />
          BDE
        </Link>

        {/* Section centrale : Liens principaux (décalés à gauche) */}
        {user && (
          <div className="flex-1 flex justify-start space-x-8 ml-6">
            <Link href="/event" className="hover:underline">
              <FontAwesomeIcon icon={faCalendar} size="lg" className="mr-2" />
              Événements
            </Link>
            <Link href="/activity" className="hover:underline">
              <FontAwesomeIcon icon={faTicket} size="lg" className="mr-2" />
              Communauté
            </Link>
            <Link href="/kanban" className="hover:underline flex items-center">
              <FontAwesomeIcon icon={faTrello} size="lg" className="mr-2" />
              Kanban
            </Link>
          </div>
        )}

        {/* Section de droite : Profil / Déconnexion */}
        <div className="flex-shrink-0 flex space-x-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="hover:underline">
                  <FontAwesomeIcon icon={faScrewdriverWrench} size="lg" className="mr-2" />
                  Administration
                </Link>
              )}
              <Link href="/profil" className="hover:underline">
                <FontAwesomeIcon icon={faAddressCard} size="lg" className="mr-2" />
                Mon compte
              </Link>
              <button onClick={logout} className="hover:underline">
                <FontAwesomeIcon icon={faRightFromBracket} size="lg" className="mr-2" />
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/log" className="hover:underline">
              Connexion / Inscription
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}