import { NextResponse } from 'next/server'

function generateToken(payload: object): string {
  // In a real application, you would use a proper JWT library
  // This is a simplified version for demonstration purposes
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = btoa('secret') // In a real app, this would be a proper signature

  return `${header}.${encodedPayload}.${signature}`
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // This is a mock authentication. In a real application, you would validate against a database.
    if (email === 'test@example.com' && password === 'password') {
      // Create a mock token with admin role for test@example.com
      const token = generateToken({ id: 1, email, role: 'admin' })

      return NextResponse.json({ token })
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

