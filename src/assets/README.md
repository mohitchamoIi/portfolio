# Assets

Organized asset files for the portfolio application.

## Directory Structure

```
assets/
├── images/           # Project and profile images
│   ├── profilephoto.jpg
│   ├── project1-thumbnail.jpg
│   ├── project2-thumbnail.jpg
│   └── project3-thumbnail.jpg
├── docs/            # Documents (CV, certificates, etc.)
│   └── mohitcv.pdf
└── styles/          # Legacy CSS files (archived)
    └── legacy.css   # Old CSS3 styles (for reference only)
```

## Usage

### Images
Import images in React components:
```tsx
import profilePhoto from '@/assets/images/profilephoto.jpg';

export function Profile() {
  return <img src={profilePhoto} alt="Profile" />;
}
```

### Documents
Link to documents:
```tsx
import cvPdf from '@/assets/docs/mohitcv.pdf';

export function CVLink() {
  return <a href={cvPdf} download>Download CV</a>;
}
```

### Styles
The project now uses **Tailwind CSS** exclusively (see `src/index.css`).
Legacy CSS is kept for reference only at `legacy.css`.

## Notes

- All image assets are optimized and compressed
- The main styling system uses Tailwind CSS with custom theme configuration in `tailwind.config.js`
- Old HTML files (`more.html`, Google verification HTML) have been removed as the app is now a React SPA
