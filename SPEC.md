# SPEC.md - Sistem Penilaian Karyawan 360° AKHLAK

## 1. Project Overview

**Project Name**: AKHLAK 360 - Sistem Penilaian Karyawan
**Type**: Web Application (PWA-ready, responsive)
**Core Functionality**: Platform penilaian kinerja 360 derajat berbasis Core Values AKHLAK untuk PT Energi Nusanstara dengan fitur self-assessment, peer assessment, dan analytics dashboard
**Target Users**: Admin HR, Karyawan, Atasan, Peer, Manajemen

---

## 2. Visual & Rendering Specification

### Design System
- **Style**: Modern Corporate with Indonesian cultural touches
- **Color Palette**:
  - Primary: `#1E40AF` (Royal Blue - Trust)
  - Secondary: `#059669` (Emerald - Growth)
  - Accent: `#F59E0B` (Amber - Excellence)
  - Background: `#F8FAFC` (Slate 50)
  - Card Background: `#FFFFFF`
  - Text Primary: `#1E293B` (Slate 800)
  - Text Secondary: `#64748B` (Slate 500)
- **Typography**:
  - Headings: Inter (700, 600)
  - Body: Inter (400, 500)
  - Monospace: JetBrains Mono (for numbers/stats)

### Layout Structure
- **Navigation**: Sidebar (desktop) / Bottom Tab Bar (mobile)
- **Container**: Max-width 1400px, centered
- **Grid System**: 12-column, responsive breakpoints
- **Card Design**: Border-radius 16px, subtle shadow, hover lift effect

### Animations
- Page transitions: Fade + slide (300ms ease-out)
- Card hover: translateY(-4px) + shadow enhancement
- Button interactions: Scale 0.98 on press
- Progress bars: Animated fill on mount
- Staggered list animations: 50ms delay between items
- Number counters: Animated count-up for statistics
- Skeleton loaders: Shimmer effect

---

## 3. AKHLAK Core Values

1. **Amanah** - Trustworthy (Being dependable and keeping promises)
2. **Kompeten** - Competent (Continuously learning and developing skills)
3. **Harmonis** - Harmonious (Caring for each other and building positive relationships)
4. **Loyal** - Loyal (Devoted to the organization and nation)
5. **Adaptif** - Adaptive (Innovative and embracing change)
6. **Kolaboratif** - Collaborative (Working together to achieve shared goals)

---

## 4. User Roles & Features

### A. Admin HR
- Dashboard overview with statistics
- Kelola data karyawan (CRUD)
- Kelola user dan hak akses
- Kelola periode penilaian
- Kelola relasi penilai 360°
- Kelola indikator AKHLAK
- Monitoring pengisian penilaian
- Validasi data penilai
- Generate laporan PDF

### B. Karyawan
- Self assessment (penilaian diri)
- Peer assessment (penilaian rekan)
- Lihat hasil penilaian
- Export PDF hasil
- Gap analysis visualization

### C. Atasan
- All Employee features
- Penilaian bawahan (subordinate assessment)

### D. Peer
- Self assessment
- Penilaian rekan kerja
- Lihat hasil penilaian

### E. Manajemen
- Dashboard analitik organization-wide
- Monitoring budaya kerja AKHLAK
- Distribusi nilai karyawan
- Tren budaya kerja
- Perbandingan antar divisi
- Laporan penilaian keseluruhan

---

## 5. Page Structure

### Login Page
- Clean centered card
- Company logo/branding
- Username/password fields
- Remember me checkbox
- Animated background gradient

### Dashboard (Role-based)
- Welcome banner with user info
- Quick stats cards (animated counters)
- Recent activities
- Pending tasks/assessments

### Penilaian Pages
- AKHLAK indicator cards
- Rating scale (1-5) with visual feedback
- Progress indicator
- Save/submit functionality

### Reports & Analytics
- Chart visualizations (bar, radar, line)
- Data tables with sorting
- Export controls
- Date range filters

---

## 6. Technical Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State**: React Context + useState
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

---

## 7. Acceptance Criteria

1. ✅ Responsive on mobile (375px+), tablet (768px+), desktop (1024px+)
2. ✅ Smooth animations on all interactions
3. ✅ Role-based views and navigation
4. ✅ Complete user flow from login to assessment submission
5. ✅ Analytics dashboard with charts
6. ✅ Gap analysis visualization
7. ✅ PDF export simulation
8. ✅ Modern card-based UI throughout
9. ✅ Indonesian language interface
10. ✅ AKHLAK values prominently displayed
