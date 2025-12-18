import Link from 'next/link'
import projectsData from '@/data/projects.json'

const projects = projectsData.projects

: any

export default function Home() {
  return (
    <div>
      <header className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Nepal Hydro Timeline</h1>
          <p className="mt-3 text-lg opacity-90">Explore timelines of major hydropower projects</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search a project or ask a question..."
            className="flex-1 px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/chat?q=${e.currentTarget.value}`)}
          />
          <Link href="/chat" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-center">
            AI Chat (Nepali/English)
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: any) => (
            <Link key={p.id} href={`/project/${p.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border">
                <h3 className="text-xl font-bold text-primary">{p.name}</h3>
                <p className="text-gray-600">{p.river} • {p.capacity_mw} MW</p>
                <p className="text-sm text-gray-500 mt-1">{p.developer}</p>
                <span className={`mt-4 inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  p.status === 'Operational' ? 'bg-green-100 text-green-800' :
                  p.status.includes('Construction') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {p.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
