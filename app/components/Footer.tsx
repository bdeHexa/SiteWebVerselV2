import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>Email: bde.versailles@ecole-hexagone.com</p>
        </div>
        <div className="flex space-x-4 my-2 md:my-0">
          <a href="https://discord.gg/studentcommunity" target="_blank" rel="noopener noreferrer">
            <img src="/discord-icon.svg" alt="Discord" className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/studentcommunity" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.svg" alt="Instagram" className="h-6 w-6" />
          </a>
        </div>
        <div>
          <Link href="/mentions-legales" className="hover:underline mr-4">
            Mentions légales
          </Link>
          <Link href="/politique-confidentialite" className="hover:underline">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  )
}

