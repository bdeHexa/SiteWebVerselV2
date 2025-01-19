import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Cette variable simule une base de données pour cet exemple
let users = [
  {
    id: 1,
    firstname: 'Super',
    lastname: 'Admin',
    email: 'superadmin@example.com',
    password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9ovi/9DZmbClby', // 'password' hashé
    role: 'superadmin'
  }
]

function generateToken(payload: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = btoa('secret') // Dans une vraie application, utilisez une clé secrète sécurisée

  return `${header}.${encodedPayload}.${signature}`
}

export async function POST(request: Request) {
  try {
    const { firstname, lastname, email, password, role } = await request.json()

    // Vérifiez si l'utilisateur existe déjà
    if (users.find(user => user.email === email)) {
      return NextResponse.json({ message: 'Cet email est déjà utilisé' }, { status: 400 })
    }

    // Vérifiez si l'utilisateur essaie de créer un compte admin
    if (role === 'admin') {
      // Vérifiez si l'utilisateur actuel est un super admin
      const authHeader = request.headers.get('Authorization')
      if (!authHeader) {
        return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
      }

      const token = authHeader.split(' ')[1]
      const decodedToken = JSON.parse(atob(token.split('.')[1]))

      if (decodedToken.role !== 'superadmin') {
        return NextResponse.json({ message: 'Seul un super admin peut créer des comptes admin' }, { status: 403 })
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer un nouvel utilisateur
    const newUser = {
      id: users.length + 1,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || 'visiteur' // Par défaut, le rôle est 'visiteur'
    }

    // Ajouter l'utilisateur à notre "base de données"
    users.push(newUser)

    // Générer un token JWT
    const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role })

    return NextResponse.json({ token }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json({ message: 'Erreur interne du serveur' }, { status: 500 })
  }
}

