'use client'

import { useEffect, useState } from 'react'

interface Event {
  id: number
  title: string
  description: string
  date: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const eventsData = await response.json()
          setEvents(eventsData)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()
  }, [])

  const handleRegister = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
      })
      if (response.ok) {
        // Update the UI to show the user is registered
        alert('Inscription réussie!')
      }
    } catch (error) {
      console.error('Error registering for event:', error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Événements à venir</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString()}</p>
            <p className="mb-4">{event.description}</p>
            <button
              onClick={() => handleRegister(event.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

