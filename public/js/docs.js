// Dark mode handling
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const html = document.documentElement;

// Check for saved dark mode preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Dark mode toggle click handler
darkModeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
});

// Mobile menu handling
const mobileMenuButton = document.querySelector('[aria-label="Open navigation"]');
const mobileMenu = document.querySelector('#mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu?.classList.toggle('hidden');
});

// Handle sidebar navigation highlighting
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const currentPath = window.location.pathname;

sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('text-sky-500');
        link.classList.add('font-semibold');
    }
});

// Copy code button functionality
document.querySelectorAll('pre').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button absolute right-2 top-2 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 hover:text-slate-50 bg-slate-700/50 hover:bg-slate-700';
    button.textContent = 'Copy';
    
    block.classList.add('relative');
    block.appendChild(button);
    
    button.addEventListener('click', async () => {
        const code = block.querySelector('code').textContent;
        await navigator.clipboard.writeText(code);
        
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
});

// Search functionality (basic implementation)
const searchInput = document.querySelector('.docs-search input');
const searchResults = document.querySelector('.search-results');

searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Clear results if query is empty
    if (!query) {
        searchResults.innerHTML = '';
        searchResults.classList.add('hidden');
        return;
    }

    // Get all searchable content
    const searchableElements = document.querySelectorAll('.docs-content h2, .docs-content h3, .docs-content p');
    const results = [];

    // Search through content
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            results.push({
                title: element.textContent,
                element: element
            });
        }
    });

    // Display results
    searchResults.innerHTML = '';
    searchResults.classList.remove('hidden');

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="p-4 text-sm text-slate-500">
                No results found for "${query}"
            </div>
        `;
        return;
    }

    results.slice(0, 5).forEach(result => {
        const div = document.createElement('div');
        div.className = 'p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer';
        div.innerHTML = `
            <div class="text-sm text-slate-900 dark:text-slate-200">${result.title}</div>
        `;
        div.addEventListener('click', () => {
            result.element.scrollIntoView({ behavior: 'smooth' });
            searchResults.classList.add('hidden');
            searchInput.value = '';
        });
        searchResults.appendChild(div);
    });
});