export function Navbar({ className }: { className?: string }) {
  return (
    <nav className={className}>
      <span>Hospital Assistant</span>
      <a href="/dashboard">Dashboard</a>
      <a href="/chatbot">Chatbot</a>
      <a href="/jadwal-dokter">Jadwal Dokter</a>
      <a href="/profil">Profil</a>
    </nav>
  )
}