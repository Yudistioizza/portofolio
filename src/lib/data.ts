// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
export const SITE_CONFIG = {
  personal: {
    name: 'Yudistio Izza Al Farisi',
    shortName: 'Yudistio',
    title: 'Full-Stack Web Developer',
    email: 'yudistioizza@gmail.com',
    phone: '+62-xxx-xxxx-xxxx',
    location: { city: 'Bekasi Utara', province: 'Jawa Barat', display: 'Bekasi, Indonesia' },
    tagline: 'Backend-focused fullstack developer building scalable web systems. Currently integrating AI capabilities into modern web apps while completing my Informatics degree at UNSIKA.',
  },
  socials: {
    linkedin: 'https://linkedin.com/in/yudistioizza',
    github: 'https://github.com/Yudistioizza',
  },
  assets: {
    photo: '/foto.jpeg',
    cv: '/Yudistio Izza Al Farisi_CV.pdf',
  },
  status: { available: true, lookingFor: ['Full-Stack Developer', 'Backend Developer', 'Web Developer'] },
} as const;

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    nav: { about: 'About', projects: 'Projects', skills: 'Skills', leadership: 'Leadership', contact: 'Contact', resume: 'Resume', viewResume: 'View Resume', downloadResume: 'Download Resume' },
    hero: { greeting: 'Hi, I\'m', available: 'Open to Opportunities', scrollHint: 'Scroll', taglineRole: ['ANALYST', 'ENGINEER', 'CREATOR'] },
    about: { eyebrow: 'Get to know me', title: 'About Me', backgroundTitle: 'Background', experienceTitle: 'Experience',
      bio1: "I'm a backend-focused fullstack developer with a passion for building scalable web systems. My experience spans enterprise applications at state-owned companies to freelance projects.",
      bio2: "Currently completing my Informatics degree at UNSIKA while actively learning to integrate AI capabilities into modern web applications. Strong leadership background across academic and community organizations." },
    projects: { eyebrow: 'My Work', title: 'Projects', featured: 'Featured', allProjects: 'All Projects' },
    skills: { eyebrow: 'Technical Expertise', title: 'Skills & Technologies', subtitle: 'I CONSTANTLY TRY TO', subtitleBold: ['IMPROVE', 'LEARN', 'ADAPT'] },
    leadership: { eyebrow: 'Experience & Achievements', title: 'Leadership &', titleAccent: 'Certifications', rolesTitle: 'Leadership Experience', certsTitle: 'Professional Certifications' },
    contact: { eyebrow: 'Get In Touch', title: "Let's Build Something", titleAccent: 'Great Together', subtitle: "I'm currently", subtitleAccent: 'open to new opportunities', subtitleEnd: '. Whether you have a project in mind or just want to connect, feel free to reach out!', available: 'Available for Work', lookingFor: 'Looking for:' },
    footer: { copyright: '©', rights: 'All rights reserved.', builtWith: 'Built with' },
    meta: { location: 'Location', university: 'University', email: 'Email', status: 'Status', openToWork: '🟢 Open to Work' },
  },
  id: {
    nav: { about: 'Tentang', projects: 'Proyek', skills: 'Keahlian', leadership: 'Kepemimpinan', contact: 'Kontak', resume: 'Resume', viewResume: 'Lihat Resume', downloadResume: 'Unduh Resume' },
    hero: { greeting: 'Halo, saya', available: 'Terbuka untuk Peluang', scrollHint: 'Gulir', taglineRole: ['DEVELOPER', 'ENGINEER', 'BUILDER', 'KREATOR'] },
    about: { eyebrow: 'Kenali saya', title: 'Tentang Saya', backgroundTitle: 'Latar Belakang', experienceTitle: 'Pengalaman',
      bio1: "Saya adalah fullstack developer yang fokus pada backend dengan semangat membangun sistem web yang skalabel. Pengalaman saya mencakup aplikasi enterprise di perusahaan BUMN hingga proyek freelance.",
      bio2: "Sedang menyelesaikan gelar Informatika di UNSIKA sembari aktif mempelajari integrasi AI ke dalam aplikasi web modern. Memiliki latar belakang kepemimpinan yang kuat di berbagai organisasi akademik dan komunitas." },
    projects: { eyebrow: 'Karya Saya', title: 'Proyek', featured: 'Unggulan', allProjects: 'Semua Proyek' },
    skills: { eyebrow: 'Keahlian Teknis', title: 'Keahlian & Teknologi', subtitle: 'SAYA TERUS BERUSAHA UNTUK', subtitleBold: ['BERKEMBANG', 'BELAJAR', 'BERADAPTASI'] },
    leadership: { eyebrow: 'Pengalaman & Pencapaian', title: 'Kepemimpinan &', titleAccent: 'Sertifikasi', rolesTitle: 'Pengalaman Kepemimpinan', certsTitle: 'Sertifikasi Profesional' },
    contact: { eyebrow: 'Hubungi Saya', title: 'Mari Membangun Sesuatu yang', titleAccent: 'Luar Biasa Bersama', subtitle: 'Saya sedang', subtitleAccent: 'terbuka untuk peluang baru', subtitleEnd: '. Apakah Anda memiliki proyek atau hanya ingin terhubung, jangan ragu untuk menghubungi saya!', available: 'Tersedia untuk Bekerja', lookingFor: 'Mencari:' },
    footer: { copyright: '©', rights: 'Hak cipta dilindungi.', builtWith: 'Dibuat dengan' },
    meta: { location: 'Lokasi', university: 'Universitas', email: 'Email', status: 'Status', openToWork: '🟢 Terbuka untuk Kerja' },
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;

// ─── STATS ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: '3+', labelEn: 'Years Experience', labelId: 'Tahun Pengalaman' },
  { value: '6+', labelEn: 'Projects Delivered', labelId: 'Proyek Selesai' },
  { value: '5+', labelEn: 'Certifications', labelId: 'Sertifikasi' },
  { value: '1yr', labelEn: '@ MIND ID', labelId: '@ MIND ID' },
] as const;

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: 'minid', period: '2024 – 2025',
    roleEn: 'Full-Stack Developer Intern', roleId: 'Intern Full-Stack Developer',
    organization: 'PT. Mineral Industri Indonesia (MIND ID)',
    descriptionEn: 'Led development of portal aplikasi (React + Laravel + Node.js + PostgreSQL) and portal Tableau (Laravel + PostgreSQL). ~80% contribution on both projects alongside a WordPress-based CSIRT website.',
    descriptionId: 'Memimpin pengembangan portal aplikasi (React + Laravel + Node.js + PostgreSQL) dan portal Tableau (Laravel + PostgreSQL). Kontribusi ~80% pada kedua proyek beserta website CSIRT berbasis WordPress.',
    technologies: ['React', 'Laravel', 'Node.js', 'PostgreSQL', 'WordPress'],
  },
  // {
  //   id: 'freelance', period: '2024 – Present',
  //   roleEn: 'Freelance Web Developer', roleId: 'Freelance Web Developer',
  //   organization: 'Self-Employed',
  //   descriptionEn: 'Building custom web solutions for various clients using modern stacks. Focus on Laravel backends, React frontends, and REST API integrations.',
  //   descriptionId: 'Membangun solusi web kustom untuk berbagai klien menggunakan stack modern. Fokus pada backend Laravel, frontend React, dan integrasi REST API.',
  //   technologies: ['Laravel', 'React', 'Next.js', 'MySQL', 'REST API'],
  // },
  // {
  //   id: 'unsika', period: '2021 – 2026',
  //   roleEn: 'Informatics Student (Final Year)', roleId: 'Mahasiswa Informatika (Tingkat Akhir)',
  //   organization: 'Universitas Singaperbangsa Karawang (UNSIKA)',
  //   descriptionEn: 'Completing thesis on a web-based boarding house management system built with Laravel using the Prototyping methodology.',
  //   descriptionId: 'Menyelesaikan skripsi tentang sistem informasi manajemen kos berbasis web dibangun dengan Laravel menggunakan metode Prototyping.',
  //   technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  // },
] as const;

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  organization: string;
  descriptionEn: string;
  descriptionId: string;
  technologies: string[];
  links?: { live?: string; github?: string };
  featured: boolean;
  image?: string; // path relative to /public, e.g. '/images/project-1.jpg'
  year: string;
  status: 'completed' | 'ongoing' | 'wip';
}

export const PROJECTS: Project[] = [
  // {
  //   id: 'minid-portal',
  //   title: 'Portal Aplikasi MIND ID',
  //   organization: 'PT. Mineral Industri Indonesia',
  //   descriptionEn: 'Enterprise internal portal aggregating multiple applications for state-owned mining company. Built with React frontend, Laravel REST API, Node.js microservices, and PostgreSQL.',
  //   descriptionId: 'Portal internal enterprise yang mengagregasi beberapa aplikasi untuk perusahaan pertambangan BUMN. Dibangun dengan frontend React, REST API Laravel, microservices Node.js, dan PostgreSQL.',
  //   technologies: ['React', 'Laravel', 'Node.js', 'PostgreSQL', 'REST API', 'RBAC'],
  //   featured: true,
  //   image: '/images/project-portal.jpg', // replace with actual image
  //   year: '2025',
  //   status: 'completed',
  // },
  // {
  //   id: 'minid-tableau',
  //   title: 'Portal Tableau MIND ID',
  //   organization: 'PT. Mineral Industri Indonesia',
  //   descriptionEn: 'Business intelligence dashboard portal for data visualization. Integrates Tableau embeds with Laravel backend and PostgreSQL for data management and user access control.',
  //   descriptionId: 'Portal dashboard business intelligence untuk visualisasi data. Mengintegrasikan embed Tableau dengan backend Laravel dan PostgreSQL untuk manajemen data dan kontrol akses pengguna.',
  //   technologies: ['Laravel', 'PostgreSQL', 'Tableau', 'JWT', 'RBAC'],
  //   featured: true,
  //   image: '/images/project-tableau.jpg', // replace with actual image
  //   year: '2024',
  //   status: 'completed',
  // },
  {
    id: 'boarding-thesis',
    title: 'Boarding House Management System',
    organization: 'UNSIKA – Thesis Project',
    descriptionEn: 'Web-based system for managing boarding houses: tenant registration, payment tracking, room management, and reports. Built using the Prototyping method.',
    descriptionId: 'Sistem berbasis web untuk manajemen kos: registrasi penyewa, tracking pembayaran, manajemen kamar, dan laporan. Dibangun menggunakan metode Prototyping.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'PHP', 'JavaScript'],
    featured: false,
    year: '2025',
    status: 'ongoing',
  },
  {
    id: 'csirt-website',
    title: 'CSIRT Website',
    organization: 'PT. Mineral Industri Indonesia',
    descriptionEn: 'Official Computer Security Incident Response Team website for MIND ID. Built on WordPress with custom theme, incident reporting forms, and CMS.',
    descriptionId: 'Website resmi tim CSIRT MIND ID. Dibangun di atas WordPress dengan tema kustom, formulir pelaporan insiden, dan CMS.',
    technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
    featured: false,
    year: '2024',
    status: 'completed',
  },
  {
    id: 'ecommerce-client',
    title: 'E-Commerce Web App',
    organization: 'Freelance Client',
    descriptionEn: 'Full-featured online store with product catalog, cart, payment gateway integration, and admin dashboard for inventory and order management.',
    descriptionId: 'Toko online lengkap dengan katalog produk, keranjang belanja, integrasi payment gateway, dan dashboard admin untuk manajemen inventaris dan pesanan.',
    technologies: ['Laravel', 'MySQL', 'React', 'Midtrans', 'Tailwind CSS'],
    featured: false,
    year: '2024',
    status: 'completed',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

// ─── SKILLS (flat list with icon slug) ────────────────────────────────────────
export const SKILLS_LIST = [
  { name: 'PHP',         icon: '🐘' },
  { name: 'Laravel',     icon: '🔴' },
  { name: 'JavaScript',  icon: '🟡' },
  { name: 'TypeScript',  icon: '🔷' },
  { name: 'React',       icon: '⚛️' },
  { name: 'Next.js',     icon: '▲' },
  { name: 'Node.js',     icon: '🟩' },
  { name: 'HTML5',       icon: '🟠' },
  { name: 'CSS3',        icon: '🔵' },
  { name: 'Tailwind CSS',icon: '💨' },
  { name: 'MySQL',       icon: '🗄️' },
  { name: 'PostgreSQL',  icon: '🐘' },
  { name: 'REST API',    icon: '🔗' },
  { name: 'GitHub',      icon: '🐙' },
  { name: 'JWT',         icon: '🔐' },
  { name: 'Ubuntu',      icon: '🐧' },
  { name: 'Vite',        icon: '⚡' },
  { name: 'WordPress',   icon: '📝' },
] as const;

export const TECH_MARQUEE = [
  'Laravel', '✦', 'React', '✦', 'Node.js', '✦', 'PostgreSQL', '✦',
  'TypeScript', '✦', 'Vite', '✦',
  'MySQL', '✦', 'REST API', '✦', 'Next.js', '✦', 'PHP', '✦',
  'JWT', '✦', 'Tailwind CSS', '✦',
];

// ─── LEADERSHIP ───────────────────────────────────────────────────────────────
export const LEADERSHIP_ROLES = [
  {
    id: 'imasika-se', period: '2023 – 2024',
    titleEn: 'Head of Special Event Division', titleId: 'Kepala Divisi Special Event',
    organization: 'IMASIKA – UNSIKA',
    descriptionEn: 'Led the Special Event division of Informatics Student Association. Oversaw major events including Dies Natalis and IMASIKA Goes To School programs.',
    descriptionId: 'Memimpin Divisi Special Event Himpunan Mahasiswa Informatika. Mengawasi acara besar termasuk Dies Natalis dan program IMASIKA Goes To School.',
    achievements: ['Organized Dies Natalis celebration', 'Managed IMASIKA Goes To School program', 'Led team of 10+ members'],
    skills: ['Event Management', 'Leadership', 'Team Coordination'],
  },
  {
    id: 'osis-sma', period: '2021',
    titleEn: 'Student Council President', titleId: 'Ketua OSIS',
    organization: 'SMA Islam Al Azhar 8',
    descriptionEn: 'President of the Student Council. Led school programs and represented student body to school management.',
    descriptionId: 'Ketua OSIS. Memimpin program sekolah dan mewakili siswa kepada manajemen sekolah.',
    achievements: ['Led 40+ member student council', 'Coordinated school-wide events', 'Represented students in institutional meetings'],
    skills: ['Leadership', 'Public Speaking', 'Program Management'],
  },
  {
    id: 'pramuka-sd', period: 'Early Education',
    titleEn: 'Scout Extracurricular Head', titleId: 'Ketua Ekskul Pramuka',
    organization: 'Elementary School',
    descriptionEn: 'Led the Scout extracurricular from elementary school, demonstrating early leadership aptitude.',
    descriptionId: 'Memimpin ekskul Pramuka sejak SD, menunjukkan kemampuan kepemimpinan sejak dini.',
    achievements: ['Led scout activities and ceremonies'],
    skills: ['Leadership', 'Teamwork', 'Discipline'],
  },
  {
    id: 'remaja-masjid', period: '2019 – Present',
    titleEn: 'Active Member', titleId: 'Anggota Aktif',
    organization: 'Remaja Masjid Al Ikhlas',
    descriptionEn: 'Active member of the mosque youth organization, contributing to community religious and social programs in Bekasi.',
    descriptionId: 'Anggota aktif organisasi remaja masjid, berkontribusi dalam program keagamaan dan sosial di Bekasi.',
    achievements: ['Organized Ramadan programs', 'Community outreach activities'],
    skills: ['Community Service', 'Organization', 'Social Leadership'],
  },
] as const;

export const CERTIFICATIONS = [
  { id: 'dicoding-be',   name: 'Back-End Developer',      issuer: 'Dicoding',            date: '2024', credentialUrl: '' },
  { id: 'dicoding-fe',   name: 'Front-End Developer',     issuer: 'Dicoding',            date: '2024', credentialUrl: '' },
  { id: 'ibm-cloud',     name: 'IBM Cloud Essentials',    issuer: 'IBM',                 date: '2024', credentialUrl: '' },
  { id: 'digitalent-1',  name: 'Web Development',         issuer: 'Digitalent Kominfo',  date: '2023', credentialUrl: '' },
  { id: 'dicoding-react',name: 'React Web Developer',     issuer: 'Dicoding',            date: '2024', credentialUrl: '' },
] as const;
