import { NextResponse } from 'next/server'

let tickets = [
  {
    id: 1,
    title: 'Sample Ticket',
    content: 'This is a sample ticket content.',
    status: 'open',
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(tickets)
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
    }

    const newTicket = {
      id: tickets.length + 1,
      title,
      content,
      status: 'open',
      createdAt: new Date().toISOString(),
    }

    tickets.unshift(newTicket)

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    console.error('Error creating ticket:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

