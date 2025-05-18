// Sample articles data (you can replace this with your actual articles)
const articles = [
    {
        id: 1,
        title: "Market Trends Analysis 2025",
        category: "Market Analysis",
        summary: "An in-depth analysis of current market trends and future projections.",
        date: "2025-03-15",
        readTime: "10 min read"
    },
    {
        id: 2,
        title: "Global Financial Institutions Report",
        category: "Financial Institutions",
        summary: "Comprehensive research on the state of global financial institutions.",
        date: "2025-03-10",
        readTime: "15 min read"
    },
    // Add more articles as needed
];

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const articlesGrid = document.querySelector('.articles-grid');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedArticles();
    setupSearchFunctionality();
    setupSmoothScrolling();
});

// Load featured articles
function loadFeaturedArticles() {
    if (!articlesGrid) return;

    articlesGrid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <div class="article-meta">
                    <span class="article-date">${formatDate(article.date)}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Setup search functionality
function setupSearchFunctionality() {
    if (!searchInput || !searchButton) return;

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) return;

        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.summary.toLowerCase().includes(searchTerm) ||
            article.category.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(filteredArticles);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Display search results
function displaySearchResults(results) {
    if (!articlesGrid) return;

    if (results.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-results">
                <p>No articles found matching your search criteria.</p>
            </div>
        `;
        return;
    }

    articlesGrid.innerHTML = results.map(article => `
        <article class="article-card">
            <div class="article-content">
                <span class="article-category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <div class="article-meta">
                    <span class="article-date">${formatDate(article.date)}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}); 