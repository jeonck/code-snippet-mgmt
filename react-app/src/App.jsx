import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
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
            <div key={snippet.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{snippet.title}</h3>
                <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                  {snippet.language}
                </span>
              </div>
              <div className="relative bg-gray-900/50 rounded-lg mb-4">
                <button
                  onClick={() => copyToClipboard(snippet.code, snippet.id)}
                  className="absolute top-2 right-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/40 text-blue-200 rounded text-xs transition-colors z-10"
                >
                  {copiedId === snippet.id ? 'Copied!' : 'Copy'}
                </button>
                <pre className="text-sm text-green-300 overflow-x-auto p-4 pr-20">
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
    </div>
  )
}

export default App