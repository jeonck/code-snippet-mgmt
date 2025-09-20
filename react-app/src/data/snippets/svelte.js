export const svelteSnippets = [
  {
    id: 15,
    title: "Svelte Component with State",
    language: "svelte",
    category: "svelte",
    code: `<script>
  import { onMount } from 'svelte';

  let count = 0;
  let name = 'World';
  let items = [];

  onMount(() => {
    console.log('Component mounted');
  });

  function increment() {
    count += 1;
  }

  function addItem() {
    items = [...items, \`Item \${items.length + 1}\`];
  }
</script>

<main>
  <h1>Hello {name}!</h1>

  <div class="counter">
    <button on:click={increment}>
      Count: {count}
    </button>
  </div>

  <div class="input-section">
    <input bind:value={name} placeholder="Enter name" />
  </div>

  <div class="items">
    <button on:click={addItem}>Add Item</button>
    {#each items as item, i}
      <p>{i + 1}: {item}</p>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .counter button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .input-section {
    margin: 1rem 0;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>`,
    tags: ["svelte", "component", "state", "reactivity"]
  },
  {
    id: 16,
    title: "Svelte Store Management",
    language: "javascript",
    category: "svelte",
    code: `// stores.js
import { writable, derived, readable } from 'svelte/store';

// Writable store
export const count = writable(0);

// User store with custom methods
function createUser() {
  const { subscribe, set, update } = writable({
    name: '',
    email: '',
    isLoggedIn: false
  });

  return {
    subscribe,
    login: (name, email) => update(u => ({
      ...u,
      name,
      email,
      isLoggedIn: true
    })),
    logout: () => update(u => ({
      ...u,
      name: '',
      email: '',
      isLoggedIn: false
    })),
    updateProfile: (data) => update(u => ({ ...u, ...data })),
    reset: () => set({ name: '', email: '', isLoggedIn: false })
  };
}

export const user = createUser();

// Derived store
export const userDisplayName = derived(
  user,
  $user => $user.isLoggedIn ? $user.name : 'Guest'
);

// Readable store (for external data)
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});`,
    tags: ["svelte", "store", "state-management", "reactive"]
  }
];