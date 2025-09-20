import { useState, useEffect } from 'react'
import { snippetCategories, loadAllSnippets, loadSnippetsByCategory, getSnippetCounts } from './data/snippets'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Load snippets and counts on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [allSnippets, counts] = await Promise.all([
          loadAllSnippets(),
          getSnippetCounts()
        ]);
        setSnippets(allSnippets);
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load snippets when category changes
  useEffect(() => {
    const loadCategorySnippets = async () => {
      if (selectedCategory === 'all') {
        const allSnippets = await loadAllSnippets();
        setSnippets(allSnippets);
      } else {
        const categorySnippets = await loadSnippetsByCategory(selectedCategory);
        setSnippets(categorySnippets);
      }
    };

    loadCategorySnippets();
  }, [selectedCategory]);

  // Refresh counts when snippets change
  useEffect(() => {
    if (snippets.length > 0 && selectedCategory === 'all') {
      const refreshCounts = async () => {
        const counts = await getSnippetCounts();
        setCategoryCounts(counts);
      };
      refreshCounts();
    }
  }, [snippets, selectedCategory]);

  // ESC key listener for modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedSnippet(null);
      }
    };

    if (selectedSnippet) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [selectedSnippet]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          📝 Code Snippet Manager
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search snippets by title, tags, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              All ({Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)})
            </button>
            {Object.entries(snippetCategories)
              .filter(([key]) => key !== 'all') // 'all' 카테고리 제외
              .map(([key, label]) => {
                const count = categoryCounts[key] || 0;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === key
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-4">Loading snippets...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets.map(snippet => (
            <div
              key={snippet.id}
              onClick={() => setSelectedSnippet(snippet)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl cursor-pointer hover:bg-white/15 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{snippet.title}</h3>
                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                  {snippet.language}
                </span>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-green-300 overflow-hidden">
                  <code className="line-clamp-3">
                    {snippet.code.split('\n').slice(0, 3).join('\n')}
                    {snippet.code.split('\n').length > 3 && '\n...'}
                  </code>
                </pre>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {snippet.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-500/30 text-blue-200 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-center">
                <span className="text-blue-300 text-sm">Click to view full code →</span>
              </div>
            </div>
            ))}
          </div>
        )}

        {!loading && filteredSnippets.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">No snippets found matching "{searchTerm}"</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}

        {!loading && (
          <div className="mt-12 text-center">
            <div className="text-white/80 text-sm">
              <p>Total: {Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)} snippets | Showing: {filteredSnippets.length}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedSnippet && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSnippet(null)}
        >
          <div
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedSnippet.title}</h2>
                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                  {selectedSnippet.language}
                </span>
              </div>
              <button
                onClick={() => setSelectedSnippet(null)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-140px)] overflow-auto">
              <div className="relative bg-gray-800 rounded-lg">
                <button
                  onClick={() => copyToClipboard(selectedSnippet.code, selectedSnippet.id)}
                  className="absolute top-4 right-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 rounded transition-colors z-10"
                >
                  {copiedId === selectedSnippet.id ? 'Copied!' : 'Copy Code'}
                </button>
                <pre className="text-sm text-green-300 overflow-x-auto p-6 pr-24">
                  <code>{selectedSnippet.code}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedSnippet.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App