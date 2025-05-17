# Hippopotamus Research Website

A professional static website for showcasing research articles about capital markets. This website features a modern, responsive design with search functionality and categorized content display.

## Features

- Modern, responsive design
- Search functionality for articles
- Categorized research articles
- Smooth scrolling navigation
- Mobile-friendly interface
- Dynamic content loading
- Clean and professional UI

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
└── README.md          # Project documentation
```

## Setup and Usage

1. Clone this repository to your local machine
2. Open `index.html` in your web browser to view the website
3. To add new articles, edit the `articles` array in `js/main.js`
4. Customize the content by modifying the HTML, CSS, and JavaScript files as needed

## Customization

### Adding New Articles

To add new articles, edit the `articles` array in `js/main.js`. Each article should follow this structure:

```javascript
{
    id: number,
    title: "Article Title",
    category: "Category Name",
    summary: "Article summary text",
    date: "YYYY-MM-DD",
    readTime: "X min read"
}
```

### Modifying Categories

The categories are defined in the HTML file under the "Research Categories" section. You can modify the categories by editing the category cards in `index.html`.

### Styling

The website's appearance can be customized by modifying the `styles/main.css` file. The design uses a modern color scheme and responsive layout that can be adjusted to your preferences.

## Browser Support

The website is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Feel free to modify and enhance this website according to your needs. Some suggestions for improvements:
- Add a blog system
- Implement a contact form
- Add social media integration
- Include a newsletter subscription
- Add more interactive features

## License

This project is open source and available for personal and commercial use.

## Contact

For any questions or suggestions, please reach out through the contact information provided on the website. # HippoResearch
