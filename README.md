# Yudistio Portfolio v3

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f172a)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock&logoColor=white&labelColor=0e0e0e)

---

## ✨ Features

- 🌗 **Dark / Light mode** with smooth transition
- 🌐 **Bilingual** — Indonesian & English (i18n via context)
- 🎞️ **GSAP ScrollTrigger** animations on every section
- 🌌 **Three.js** particle background on Hero
- 🖱️ **Lenis** smooth scrolling
- 📱 **Fully responsive** — 5 breakpoints (320px → 1280px+)
- ⚡ **Vite** for blazing-fast dev & optimized builds

---

## 🛠️ Tech Stack

| Category          | Technology           | Version |
| ----------------- | -------------------- | ------- |
| ⚡ Build Tool     | Vite                 | 8.x     |
| ⚛️ UI Framework   | React                | 19.x    |
| 🎨 Styling        | Tailwind CSS         | 4.2     |
| 💫 Animation      | GSAP + ScrollTrigger | 3.15    |
| 🌌 3D / Particles | Three.js             | 0.176   |
| 🖱️ Smooth Scroll  | Lenis                | 1.3     |
| 🔷 Language       | TypeScript           | 5.x     |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yudistioizza/portfolio-v3.git
cd portfolio-v3

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
portfolio-v3/
├── public/
│   ├── favicon.svg                      # Navbar icon (light mode)
│   ├── favicon_dark.svg                 # Navbar icon (dark mode)
│   ├── longicon.svg                     # Footer wordmark (light mode)
│   ├── longicon_dark.svg                # Footer wordmark (dark mode)
│   ├── foto.jpg                         # Profile photo
│   └── CV-Yudistio-Izza-Al-Farisi.pdf  # Resume / CV
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Navigation bar
│   │   │   └── Footer.tsx               # Footer / Contact section
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Projects.tsx
│   │       ├── Skills.tsx
│   │       ├── Leadership.tsx
│   │       └── Contact.tsx
│   ├── lib/
│   │   ├── data.ts                      # ← All content lives here
│   │   └── context.tsx                  # App context (theme, lang, i18n)
│   ├── App.tsx                          # Lenis setup + layout
│   └── index.css                        # Tailwind v4 theme & CSS variables
```

---

## ✏️ Customization

All content is centralized in **`src/lib/data.ts`** — edit this file to update:

- Personal info (name, email, location, title)
- Social links (LinkedIn, GitHub)
- Projects & descriptions
- Skills & technologies
- Experience / timeline
- Leadership & organizational roles
- CV / resume path

---

## 👤 Author

**Yudistio Izza Al Farisi**  
Full-Stack Web Developer · Bekasi, Indonesia

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yudistio-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yudistioizza)
[![GitHub](https://img.shields.io/badge/GitHub-yudistioizza-181717?style=flat-square&logo=github)](https://github.com/yudistioizza)
[![Email](https://img.shields.io/badge/Email-yudistioizza@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:yudistioizza@gmail.com)
