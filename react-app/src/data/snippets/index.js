// Category definitions
export const snippetCategories = {
  javascript: "JavaScript",
  react: "React",
  "spring-boot": "Spring Boot",
  java: "Java",
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

// Load all snippets
export async function loadAllSnippets() {
  try {
    const snippetArrays = await Promise.all(
      Object.values(categoryImports).map(importFn => importFn())
    );

    return snippetArrays.flat();
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
}

// Load snippets by category
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

    return await importFn();
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