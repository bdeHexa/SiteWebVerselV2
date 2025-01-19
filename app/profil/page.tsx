'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface UserProfile {
  firstname: string
  lastname: string
  email: string
}

interface RegisteredEvent {
  id: number
  title: string
  date: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([])

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const profileData = await response.json()
          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch('/api/user/events')
        if (response.ok) {
          const eventsData = await response.json()
          setRegisteredEvents(eventsData)
        }
      } catch (error) {
        console.error('Error fetching registered events:', error)
      }
    }

    fetchProfileData()
    fetchRegisteredEvents()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Informations personnelles</h2>
        {profile && (
          <div>
            <p><strong>Prénom:</strong> {profile.firstname}</p>
            <p><strong>Nom:</strong> {profile.lastname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        )}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Modifier le mot de passe
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Événements inscrits</h2>
        {registeredEvents.length > 0 ? (
          <ul className="space-y-2">
            {registeredEvents.map((event) => (
              <li key={event.id} className="border-b pb-2">
                <p className="font-semibold">{event.title}</p>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Vous n'êtes inscrit à aucun événement pour le moment.</p>
        )}
      </div>
    </div>
  )
}

