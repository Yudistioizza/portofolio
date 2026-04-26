# Yudistio Portfolio v3

Personal portfolio built with modern stack inspired by **obliviousaman.netlify.app**.

## Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| Build Tool | **Vite** | 8.x |
| UI Framework | **React** | 19.x |
| Styling | **Tailwind CSS** | 4.2 |
| Animation | **GSAP** + ScrollTrigger | 3.15 |
| 3D / Particles | **Three.js** | 0.176 |
| Smooth Scroll | **Lenis** | 1.3 |
| Language | TypeScript | 5.x |

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview build
```

## Structure

```
src/
├── components/
│   ├── layout/   Navbar, Footer
│   └── sections/ Hero, About, Projects, Skills, Leadership, Contact
├── lib/
│   └── data.ts   ← ALL content lives here, edit this!
├── App.tsx       Lenis setup + layout
└── index.css     Tailwind v4 theme
```

## Customization

Edit **`src/lib/data.ts`** to update all content.

Add assets to `public/`:
- `foto.jpg` — your professional photo
- `CV-Yudistio-Izza-Al-Farisi.pdf` — your resume

## Deployment

Build outputs to `/dist`, deploy to Vercel/Netlify/any static host.
