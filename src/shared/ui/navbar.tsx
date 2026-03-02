import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "Jadwal Dokter", href: "/jadwal-dokter" },
  { label: "Profil", href: "/profil" },
]

export function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm",
        className
      )}
    >
      <span className="text-lg font-bold text-blue-700">
        Hospital Assistant
      </span>

      <ul className="flex items-center gap-6" role="list">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
