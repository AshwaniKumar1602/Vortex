<div align="center">

# ⚡ Vortex

**A modern, full-stack real-time communication platform inspired by Discord.**

[![Next.js](https://img.shields.io/badge/Next.js_15%2B-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![LiveKit](https://img.shields.io/badge/LiveKit-000000?style=for-the-badge&logo=livekit&logoColor=white)](https://livekit.io/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables)

</div>

---

## 📌 Overview

**Vortex** brings teams and communities together through low-latency text channels, voice rooms, and video calling. Built with the latest Web technologies, it provides a seamless desktop-like messaging experience in the browser.

---

## ✨ Key Features

- 💬 **Real-time Messaging:** WebSockets integration for instant text chat without page refreshes.
- 🔊 **Voice & Video Channels:** High-quality group audio and video rooms powered by LiveKit.
- 📞 **1-on-1 Direct Messaging & Calls:** Private messaging and direct video calling between members.
- 🛡️ **Server & Channel Management:** Create servers, customize invite links, create text/audio/video channels, and assign member roles (`GUEST`, `MODERATOR`, `ADMIN`).
- 📁 **Media & File Attachments:** Direct file and image sharing powered by UploadThing.
- 🔐 **Authentication & Profiles:** Secure authentication and account management using Clerk.
- 🌓 **Theme Customization:** Seamless Light and Dark mode using `next-themes`.
- 📱 **Fully Responsive UI:** Clean interface built with Radix UI components and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Real-Time Communication:** WebSockets (Socket.io), LiveKit
- **Authentication:** Clerk
- **File Storage:** UploadThing
- **Styling:** Tailwind CSS, Radix UI, Lucide Icons

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A PostgreSQL database instance (Local or hosted on Neon/Supabase)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/AshwaniKumar1602/Vortex.git](https://github.com/AshwaniKumar1602/Vortex.git)
   cd Vortex