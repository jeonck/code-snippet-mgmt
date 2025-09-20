import { useState } from 'react'

function App() {
  const [snippets, setSnippets] = useState([
    {
      id: 1,
      title: "React Component Template",
      language: "jsx",
      code: `function Component() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
    </div>
  )
}`,
      tags: ["react", "component"]
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          📝 Code Snippet Manager
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map(snippet => (
            <div key={snippet.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-3">{snippet.title}</h3>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-green-300 overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </div>
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg backdrop-blur-lg border border-white/30 transition-colors">
            Add New Snippet
          </button>
        </div>
      </div>
    </div>
  )
}

export default App