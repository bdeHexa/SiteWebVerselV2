'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface Event {
  id: number
  title: string
  date: string
}

export default function HomePage() {
  const { user } = useAuth()
  const [nextEvent, setNextEvent] = useState<Event | null>(null)

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const response = await fetch('/api/events/next')
        if (response.ok) {
          const event = await response.json()
          setNextEvent(event)
        }
      } catch (error) {
        console.error('Error fetching next event:', error)
      }
    }

    fetchNextEvent()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bienvenue {user?.firstname} {user?.lastname}</h1>
      {nextEvent && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Prochain événement</h2>
          <p className="text-xl">{nextEvent.title}</p>
          <p className="text-gray-600">{new Date(nextEvent.date).toLocaleDateString()}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Activités en cours</h2>
          {/* Add content for ongoing activities */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Actions rapides</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Voir tous les évènements
          </button>
        </div>
      </div>
    </div>
  )
}

