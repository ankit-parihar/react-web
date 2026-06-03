# Elementum — React Landing Page

A pixel-perfect, fully responsive React web application built from a Figma design as part of a frontend development assignment.

🔗 **Live Demo:** [react-web-five-drab.vercel.app](https://react-web-five-drab.vercel.app)

---

## Preview

> A modern agency landing page featuring bold typography, smooth animations, and a clean editorial layout.

---

## Built With

- ⚛️ **React** (Vite)
- 💅 **CSS-in-JS** (inline styles with CSS variables)
- 🔠 **Google Fonts** — Playfair Display + DM Sans
- 🚀 **Vercel** (deployment)

---

## Features

- ✅ Pixel-accurate Figma-to-code conversion
- ✅ Fully responsive — mobile, tablet, desktop
- ✅ Scroll-triggered fade-in animations (IntersectionObserver)
- ✅ Animated hamburger mobile navbar
- ✅ Hover micro-interactions throughout
- ✅ Newsletter subscribe with success state
- ✅ No external CSS libraries — pure React

---

## Sections

| Section | Description |
|---|---|
| Navbar | Fixed, scroll-aware, mobile hamburger menu |
| Hero | Bold headline with highlights, team avatar grid |
| Tomorrow | Two-column layout with circular image |
| Progress | Mirrored layout with decorative shapes |
| Services | Animated list with hover effects |
| Testimonials | Customer review with avatar layout |
| Newsletter | Email subscribe with mint green background |
| Footer | 4-column links and contact info |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ankit-parihar/react-web.git

# Go into the project
cd react-web/react-web

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

```bash
git add .
git commit -m "your message"
git push
```

Vercel auto-deploys within ~1 minute. ✅

---

## Folder Structure

```
react-web/
├── public/
├── src/
│   ├── ElementumApp.jsx   # Main app component
│   ├── App.jsx            # Entry point
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── vercel.json
├── vite.config.js
└── package.json
```

---

## Assignment

This project was built as part of a frontend assignment to evaluate:
- Accuracy of Figma-to-code implementation
- Clean and structured component code
- Responsiveness across all devices
- Attention to spacing, typography, and layout
- Hover states and subtle animations

---

## License

MIT © Ankit Parihar
