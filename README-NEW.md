# Mohit Chamoli - Premium Portfolio

A cinematic, modern portfolio website inspired by PMNDRS, Linear, Vercel, and Apple. Built with React, Vite, Framer Motion, and Three.js for an immersive digital experience.

## ✨ Features

- **Premium Design**: Dark theme with charcoal background (#111111) inspired by industry leaders
- **3D Interactive Scene**: Floating geometric shapes with mouse parallax using Three.js
- **Smooth Animations**: Sophisticated motion design with Framer Motion
- **Full Responsiveness**: Mobile-first approach for all device sizes
- **Fast Performance**: Vite for lightning-fast development and builds
- **Modern Stack**: React 18, TypeScript, Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The portfolio will open at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx    # Sticky navbar with floating glass effect
│   ├── Hero.tsx          # Hero section with premium typography
│   ├── Scene3D.tsx       # Interactive 3D scene with Three.js
│   └── Footer.tsx        # Footer with links and social media
├── pages/
│   ├── Home.tsx          # Homepage with hero and 3D scene
│   └── Portfolio.tsx     # Portfolio page with skills, projects, and contact
├── App.tsx               # Main app with routing
├── main.tsx              # React entry point
└── index.css             # Global styles and animations
```

## 🎨 Design System

### Colors
- **Background**: `#111111` (Deep Charcoal)
- **Surface**: `#1A1A1A` (Slightly Lighter)
- **Primary Accent**: `#007BFF` (Blue)
- **Secondary Accent**: `#3B82F6` (Lighter Blue)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#B3B3B3` (Gray)

### Typography
- **Font Family**: Inter (fallback to system fonts)
- **Large Titles**: Bold, up to 5xl
- **Body**: Regular weight, readable line height
- **Accent**: Blue color (#007BFF) for emphasis

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Router** - Navigation
- **Lucide React** - Icon library

## 📱 Sections

### Home Page
- Hero section with profile image and CTA buttons
- Interactive 3D scene with floating geometric shapes
- About preview section
- Call-to-action to explore portfolio

### Portfolio Page
- Skills section with programming languages and frameworks
- Featured projects with GitHub and demo links
- Contact form with email validation
- Direct contact options (email, LinkedIn)

## ✨ Animations & Interactions

- **Entrance Animations**: Smooth fade-in with stagger effects
- **Scroll Animations**: Elements reveal as they come into view
- **Hover Effects**: Magnetic buttons, card elevation, icon rotation
- **3D Parallax**: Mouse movement affects 3D scene
- **Micro-interactions**: Smooth transitions on all interactive elements

## 📊 Performance

- Lazy-loaded 3D assets
- Optimized animations (using transform and opacity)
- Responsive images
- Minimal CSS footprint with Tailwind

## 🔗 Links

- **GitHub**: https://github.com/mohitchamoIi
- **LinkedIn**: https://linkedin.com/in/mohit-chamoli-a837a7348
- **Email**: mohitchamoli1207@gmail.com
- **Resume**: /mohitcv.pdf

## 📄 License

All rights reserved © 2024 Mohit Chamoli

## 🎯 Future Enhancements

- Blog section with markdown support
- Dark/light theme toggle
- More detailed project case studies
- Integration with CMS
- Analytics tracking
- Advanced filtering for projects

---

**Built with precision and passion** ✨
