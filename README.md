# DrvoArt.bih - Handcrafted Oak Products Website

A beautiful, modern website for DrvoArt.bih woodworking brand featuring interactive 3D product models, smooth animations, and a minimalistic design with natural wood tones.

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive 3D Models**: Each product features a rotating 3D model with realistic oak textures
- **F-Shaped Reading Pattern**: Layout designed for optimal readability and navigation
- **Hero Video Background**: Seamless looping CNC woodworking video with subtle overlay
- **Product Showcase**: Interactive product cards with hover animations
- **Full-Screen Product Modals**: Detailed product pages with 3D interaction (rotate/zoom)
- **Contact Section**: Professional contact form with social media links
- **Smooth Animations**: Modern transitions and micro-interactions throughout
- **Wood-Themed Design**: Natural color palette emphasizing craftsmanship

## Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Three.js**: 3D graphics and WebGL rendering
- **Font Awesome**: Professional icons
- **Google Fonts**: Playfair Display (serif) and Inter (sans-serif)

## File Structure

```
drvoart-website/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Media files directory
│   └── cnc-woodworking.mp4  # Hero background video (required)
└── README.md           # This file
```

## Setup Instructions

1. **Clone or download** this project to your local machine
2. **Add the hero video** (see Video Requirements below)
3. **Open `index.html`** in a modern web browser
4. **For development**: Use a local server (recommended for best performance)

### Using a Local Server

For optimal performance and to avoid CORS issues, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Video Requirements

The website requires a hero background video file. Please add a video file named `cnc-woodworking.mp4` to the `assets/` directory.

### Video Specifications:
- **Filename**: `cnc-woodworking.mp4`
- **Content**: CNC machine carving/cutting wood (satisfying, smooth operation)
- **Duration**: 10-30 seconds (will loop seamlessly)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Format**: MP4 (H.264 codec recommended)
- **Size**: Optimized for web (under 10MB recommended)
- **Style**: Clean, professional woodworking footage

### Video Sources:
You can find suitable videos from:
- Stock video sites (Pexels, Unsplash, Pixabay)
- YouTube (with proper licensing)
- Custom footage of CNC woodworking operations

### Fallback:
If no video is available, the hero section will display with a solid background. The site will function normally without the video.

## Customization

### Colors
The color palette is defined in CSS custom properties at the top of `styles.css`:

```css
:root {
    --primary-oak: #8B4513;
    --light-oak: #D2B48C;
    --dark-oak: #654321;
    --cream: #F5F5DC;
    --warm-white: #FEFCF7;
    --charcoal: #2C2C2C;
    --soft-brown: #A0826D;
    --accent-gold: #DAA520;
}
```

### Products
Product data is stored in the `productData` object in `script.js`. You can modify:
- Product names and descriptions
- Dimensions and specifications
- Features lists
- 3D model shapes (by modifying geometry functions)

### Contact Information
Update the contact details in the HTML:
- Email address in the Kontakt section
- Instagram handle and URL
- Form submission handling (currently simulated)

## Browser Compatibility

- **Chrome**: 60+ ✅
- **Firefox**: 55+ ✅
- **Safari**: 12+ ✅
- **Edge**: 79+ ✅
- **Mobile browsers**: iOS Safari 12+, Chrome Mobile 60+ ✅

## Performance Notes

- 3D animations pause when the page is not visible (performance optimization)
- Textures are generated procedurally to reduce file size
- Responsive images and optimized CSS for fast loading
- Smooth scrolling with reduced motion support

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators for interactive elements
- Reduced motion preferences respected
- Alt text for important visual elements
- High contrast color ratios

## SEO Optimization

- Semantic HTML5 structure
- Meta tags for description and viewport
- Proper heading hierarchy
- Clean URL structure with anchor links
- Fast loading times

## Future Enhancements

Potential additions for future versions:
- Product image galleries
- Shopping cart functionality
- Multi-language support (English/Bosnian)
- Blog section for woodworking tips
- Customer testimonials
- Online ordering system
- Advanced 3D model loading (GLTF/GLB files)

## License

This project is created for DrvoArt.bih. Please respect intellectual property rights when using or modifying this code.

## Support

For questions or customization requests, please contact the development team.

---

**Note**: This website showcases modern web development techniques including WebGL 3D graphics, CSS Grid layouts, and smooth animations. It's designed to represent the quality and craftsmanship of DrvoArt.bih products through elegant digital presentation.
