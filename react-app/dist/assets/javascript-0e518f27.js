const e=[{title:"Async Data Loader with Promise.all",language:"javascript",category:"javascript",code:`async function loadAllGuides() {
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
}`,tags:["javascript","async","fetch","promise"]},{title:"Copy to Clipboard with Feedback",language:"javascript",category:"javascript",code:`function copyToClipboard(text, button) {
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
}`,tags:["javascript","clipboard","ui","feedback"]},{title:"Dynamic Search Filter",language:"javascript",category:"javascript",code:`// Search filter with event listener
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredGuides = guides.filter(guide => {
    return guide.title.toLowerCase().includes(searchTerm) ||
           guide.description.toLowerCase().includes(searchTerm);
  });
  renderGuides(filteredGuides);
});`,tags:["javascript","search","filter","event"]},{title:"Dynamic DOM Element Creation",language:"javascript",category:"javascript",code:`function renderGuides(guidesToRender) {
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
}`,tags:["javascript","dom","template","dynamic"]},{title:"Modal Window with Event Handlers",language:"javascript",category:"javascript",code:`// Modal open/close functionality
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
});`,tags:["javascript","modal","ui","events"]},{title:"DOMContentLoaded Event Pattern",language:"javascript",category:"javascript",code:`document.addEventListener('DOMContentLoaded', () => {
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
});`,tags:["javascript","dom","initialization","pattern"]}];export{e as javascriptSnippets};
