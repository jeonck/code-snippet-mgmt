import { useState, useEffect } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
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
    },
    {
      id: 2,
      title: "Async Data Loader with Promise.all",
      language: "javascript",
      code: `async function loadAllGuides() {
  try {
    const response = await fetch('data/guides.json');
    const fileList = await response.json();

    const promises = fileList.map(filename =>
      fetch(\`data/\${filename}\`).then(res => res.json())
    );

    const guidesData = await Promise.all(promises);
    return guidesData;
  } catch (error) {
    console.error('Error loading guides:', error);
  }
}`,
      tags: ["javascript", "async", "fetch", "promise"]
    },
    {
      id: 3,
      title: "Copy to Clipboard with Feedback",
      language: "javascript",
      code: `function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  }, () => {
    button.textContent = 'Failed!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  });
}`,
      tags: ["javascript", "clipboard", "ui", "feedback"]
    },
    {
      id: 4,
      title: "Dynamic Search Filter",
      language: "javascript",
      code: `// Search filter with event listener
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredGuides = guides.filter(guide => {
    return guide.title.toLowerCase().includes(searchTerm) ||
           guide.description.toLowerCase().includes(searchTerm);
  });
  renderGuides(filteredGuides);
});`,
      tags: ["javascript", "search", "filter", "event"]
    },
    {
      id: 5,
      title: "Dynamic DOM Element Creation",
      language: "javascript",
      code: `function renderGuides(guidesToRender) {
  guidesContainer.innerHTML = '';
  guidesToRender.forEach(guide => {
    const guideElement = document.createElement('div');
    guideElement.classList.add('guide');
    guideElement.innerHTML = \`
      <h2>\${guide.title}</h2>
      <p>\${guide.description}</p>
    \`;
    guideElement.addEventListener('click', () => openModal(guide));
    guidesContainer.appendChild(guideElement);
  });
}`,
      tags: ["javascript", "dom", "template", "dynamic"]
    },
    {
      id: 6,
      title: "Modal Window with Event Handlers",
      language: "javascript",
      code: `// Modal open/close functionality
function openModal(guide) {
  modalTitle.textContent = guide.title;
  modal.style.display = 'block';
}

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});`,
      tags: ["javascript", "modal", "ui", "events"]
    },
    {
      id: 7,
      title: "DOMContentLoaded Event Pattern",
      language: "javascript",
      code: `document.addEventListener('DOMContentLoaded', () => {
  // Initialize DOM elements
  const guidesContainer = document.getElementById('guides-container');
  const searchInput = document.getElementById('search');
  const modal = document.getElementById('guide-modal');

  // Initialize app state
  let guides = [];

  // Load initial data
  loadAllGuides();

  // Setup event listeners
  setupEventListeners();
});`,
      tags: ["javascript", "dom", "initialization", "pattern"]
    }
  ])

  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search snippets by title, tags, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

        {filteredSnippets.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p className="text-lg">No snippets found matching "{searchTerm}"</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="text-white/80 text-sm">
            <p>Total: {snippets.length} snippets | Showing: {filteredSnippets.length}</p>
          </div>
        </div>
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