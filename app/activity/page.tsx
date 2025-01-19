'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface Ticket {
  id: number
  title: string
  content: string
  status: 'open' | 'closed'
  createdAt: string
}

export default function CommunityPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [newTicket, setNewTicket] = useState({ title: '', content: '' })
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets')
        if (response.ok) {
          const ticketsData = await response.json()
          setTickets(ticketsData)
        } else {
          throw new Error('Failed to fetch tickets')
        }
      } catch (error) {
        console.error('Error fetching tickets:', error)
        setError('Failed to load tickets. Please try again later.')
      }
    }

    fetchTickets()
  }, [])

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(newTicket),
      })
      if (response.ok) {
        const createdTicket = await response.json()
        setTickets([createdTicket, ...tickets])
        setNewTicket({ title: '', content: '' })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create ticket')
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred while creating the ticket')
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Communauté</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Créer un nouveau ticket</h2>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <input
              type="text"
              placeholder="Titre"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Contenu"
              value={newTicket.content}
              onChange={(e) => setNewTicket({ ...newTicket, content: e.target.value })}
              required
              className="w-full p-2 border rounded"
              rows={4}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Soumettre
            </button>
          </form>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Tickets récents</h2>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border-b pb-4">
                <h3 className="text-xl font-semibold">{ticket.title}</h3>
                <p className="text-gray-600 mb-2">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                <p>{ticket.content}</p>
                <p className="mt-2">
                  Status: <span className={ticket.status === 'open' ? 'text-green-600' : 'text-red-600'}>
                    {ticket.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

