// Sample articles data (in a real application, this would come from a backend)
const articles = [
    {
        id: 1,
        title: "אחרי ירידה חדה במחיר המניה מכ־$148 לשפל של $64 (ירידה של כ־57%), עולה שאלה מהותית: האם מדובר בצניחה מוצדקת, או בתמחור חסר קלאסי?",
        excerpt: "ניתוח מעמיק של הירידה החדה במחיר המניה והשלכותיה על שווי החברה. המאמר בוחן את הגורמים לירידה, השוואה למתחרים, והערכת פוטנציאל ההתאוששות.",
        category: "Market Analysis",
        date: "2025-03-20",
        readTime: "12 min read",
        image: "static/article-placeholder.jpg",
        author: "ניר אלמליח",
        embedUrl: "https://www.canva.com/design/DAGntlJpqfY/LU5nqY1e2hOr-LwlRSzoKw/view?embed"
    },
    {
        id: 2,
        title: "The Impact of Global Economic Trends on Emerging Markets",
        excerpt: "An in-depth analysis of how global economic trends are shaping emerging markets and investment opportunities...",
        category: "Market Analysis",
        date: "2025-03-15",
        readTime: "15 min read",
        image: "static/article-placeholder.jpg",
        author: "Research Team"
    }
];

// DOM Elements
const articlesGrid = document.querySelector('.articles-grid');
const categoryFilter = document.getElementById('category-filter');
const dateFilter = document.getElementById('date-filter');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const paginationButtons = document.querySelectorAll('.pagination-btn');
const paginationInfo = document.querySelector('.pagination-info');

// State
let currentPage = 1;
const articlesPerPage = 6;
let filteredArticles = [...articles];

// Initialize the page
function initializePage() {
    renderArticles();
    setupEventListeners();
}

// Render articles based on current filters and page
function renderArticles() {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    articlesGrid.innerHTML = articlesToShow.map(article => `
        <article class="article-card">
            ${article.embedUrl ? `
                <div class="article-embed">
                    <div style="position: relative; width: 100%; height: 0; padding-top: 56.25%; overflow: hidden; border-radius: 12px 12px 0 0;">
                        <iframe loading="lazy" 
                            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none;"
                            src="${article.embedUrl}"
                            allowfullscreen="allowfullscreen" 
                            allow="fullscreen">
                        </iframe>
                    </div>
                </div>
            ` : `
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}">
                    <span class="article-category">${article.category}</span>
                </div>
            `}
            <div class="article-content">
                <h2>${article.title}</h2>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <div class="article-meta-left">
                        <span class="article-date">${formatDate(article.date)}</span>
                        <span class="article-author">${article.author}</span>
                    </div>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
                ${article.embedUrl ? `
                    <a href="${article.embedUrl}" target="_blank" rel="noopener" class="read-more">קרא את המאמר המלא <i class="fas fa-arrow-right"></i></a>
                ` : `
                    <a href="#" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                `}
            </div>
        </article>
    `).join('');

    updatePagination();
}

// Format date to a more readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter articles based on category and search term
function filterArticles() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    const sortOrder = dateFilter.value;

    filteredArticles = articles.filter(article => {
        const matchesCategory = category === 'all' || article.category.toLowerCase() === category.toLowerCase();
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) || 
                            article.excerpt.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    // Sort articles by date
    filteredArticles.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    currentPage = 1;
    renderArticles();
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    paginationInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    paginationButtons[0].disabled = currentPage === 1;
    paginationButtons[1].disabled = currentPage === totalPages;
}

// Setup event listeners
function setupEventListeners() {
    // Filter change events
    categoryFilter.addEventListener('change', filterArticles);
    dateFilter.addEventListener('change', filterArticles);

    // Search events
    searchInput.addEventListener('input', debounce(filterArticles, 300));
    searchButton.addEventListener('click', filterArticles);

    // Pagination events
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 0 && currentPage > 1) {
                currentPage--;
            } else if (index === 1 && currentPage < Math.ceil(filteredArticles.length / articlesPerPage)) {
                currentPage++;
            }
            renderArticles();
        });
    });
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 