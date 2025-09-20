// Category definitions
export const snippetCategories = {
  javascript: "JavaScript",
  react: "React",
  "spring-boot": "Spring Boot",
  svelte: "Svelte",
  python: "Python"
};

// Dynamic imports for each category
const categoryImports = {
  javascript: () => import('./javascript.js').then(m => m.javascriptSnippets),
  react: () => import('./react.js').then(m => m.reactSnippets),
  "spring-boot": () => import('./spring-boot.js').then(m => m.springBootSnippets),
  svelte: () => import('./svelte.js').then(m => m.svelteSnippets),
  python: () => import('./python.js').then(m => m.pythonSnippets)
};

// Load all snippets with auto-generated IDs
export async function loadAllSnippets() {
  try {
    const snippetArrays = await Promise.all(
      Object.entries(categoryImports).map(async ([category, importFn]) => {
        const snippets = await importFn();
        // Auto-generate unique IDs: category-index
        return snippets.map((snippet, index) => ({
          ...snippet,
          id: `${category}-${index + 1}`,
          originalId: snippet.id // Keep original ID for reference
        }));
      })
    );

    return snippetArrays.flat();
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
}

// Load snippets by category with auto-generated IDs
export async function loadSnippetsByCategory(category) {
  try {
    if (category === 'all') {
      return await loadAllSnippets();
    }

    const importFn = categoryImports[category];
    if (!importFn) {
      console.warn(`Category "${category}" not found`);
      return [];
    }

    const snippets = await importFn();
    // Auto-generate unique IDs for single category
    return snippets.map((snippet, index) => ({
      ...snippet,
      id: `${category}-${index + 1}`,
      originalId: snippet.id // Keep original ID for reference
    }));
  } catch (error) {
    console.error(`Error loading ${category} snippets:`, error);
    return [];
  }
}

// Get snippet count for each category
export async function getSnippetCounts() {
  try {
    const counts = {};

    await Promise.all(
      Object.keys(categoryImports).map(async (category) => {
        const snippets = await categoryImports[category]();
        counts[category] = snippets.length;
      })
    );

    return counts;
  } catch (error) {
    console.error('Error getting snippet counts:', error);
    return {};
  }
}