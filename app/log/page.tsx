'use client'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (isLogin) {
      try {
        await login(email, password)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite lors de la connexion')
      }
    } else {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            firstname, 
            lastname, 
            email, 
            password,
            role: isAdmin ? 'admin' : 'visiteur'
          }),
        })
        if (response.ok) {
          const data = await response.json()
          // Utilisez le token retourné pour connecter automatiquement l'utilisateur
          sessionStorage.setItem('token', data.token)
          window.location.href = '/home'
        } else {
          const errorData = await response.json()
          throw new Error(errorData.message || 'L\'inscription a échoué')
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite lors de l\'inscription')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Connexion' : 'Inscription'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isAdmin">Créer un compte administrateur</label>
            </div>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <p className="mt-4 text-center">
        {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
        <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-blue-600">
          {isLogin ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </p>
    </div>
  )
}

