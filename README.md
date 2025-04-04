# FlashCode – Admin Dashboard

FlashCode is a modern, full-featured Q&A platform built to foster interactive learning. This repository contains the **Admin Dashboard** for managing users, questions, tags, events, magazines, and academic schedules, with rich analytics and real-time insights.

Built with a **Next.js frontend** powered by **ShadCN UI**, and a **Flask + MongoDB backend**

## Tech Stack

### Frontend

- **Framework**: Next.js (React + TypeScript)
- **Styling**: Tailwind CSS + ShadCN UI + Radix Primitives
- **Auth**: Clerk (JWT-based)
- **Validation**: React Hook Form + Zod
- **Charts**: Recharts
- **Calendar**: FullCalendar
- **Interactivity**: DnD Kit
- **Export**: react-csv, downloadable reports
- **Deployment Ready**: Vercel

### Backend

- **Framework**: Flask (Python)
- **Database**: MongoDB (via PyMongo)
- **Media Storage**: Cloudinary (for magazine covers)
- **Deployment Ready**: Render-compatible via `render.yaml`
- **Architecture**: Modular REST API with Flask Blueprints

---

## 🎯 Key Features

### 🔒 Authentication

- Secure Clerk integration with middleware protection for all routes
- Profile and settings management with username/email updates

### 📊 Dashboard Highlights

- Quick stats: Total Users, Questions, Answers, Answer Rate
- Activity drop alerts and leaderboard for contributors
- Interactive “Questions vs Answers” chart
- Views trend graph with time filter (day/week/month)

### 📅 Calendar & Scheduling

- Quick calendar view with FullCalendar (project deadlines, meetings)
- Admin can manage semester-wise academic dates (Spring/Summer/Fall)
- Event Manager with fields like title, time, location, link, description

### 📁 Content Management

- **Users**: Search, view stats, CSV export
- **Questions**: Moderate, filter, sort
- **Tags**: Usage stats, pie chart, missing icon detection
- **Magazines**: Upload cover image, title, link, and description

---

## 🧭 Route Structure

| Route        | Feature                                          |
| ------------ | ------------------------------------------------ |
| `/`          | Home dashboard with metrics and leaderboard      |
| `/quick`     | Quick calendar analysis                          |
| `/analysis`  | Analytics page: trends, charts                   |
| `/reports`   | (Coming soon) report exports                     |
| `/users`     | User management and statistics                   |
| `/questions` | Question moderation and insights                 |
| `/tags`      | Tag usage breakdown and chart                    |
| `/events`    | Event management dashboard                       |
| `/magazines` | Upload and manage digital magazines              |
| `/schedule`  | Add/view important academic dates                |
| `/settings`  | Clerk-authenticated profile and account settings |

---

## Why ShadCN UI?

ShadCN UI was essential in building a professional-grade, accessible UI rapidly. Leveraging **Radix Primitives** and pre-styled components allowed for:

- Fast layout building (tables, modals, dropdowns, tooltips)
- Consistent design across routes
- Easy dark mode integration
- Clean code and developer-friendly structure

---

## 🌐 Backend API Overview

RESTful endpoints serve all data to the frontend:

- `GET/POST/PUT/DELETE /users`
- `GET/POST /questions`, `/answers`
- `GET/POST /tags`
- `GET/POST /events`
- `GET/POST /schedule`
- `GET/POST /magazine`
- `GET /analytics`

All API routes use structured collections from MongoDB and respond in JSON.

---

## 🧠 Project Outcome

FlashCode Admin Dashboard demonstrates end-to-end engineering using:

- 🧱 Modern UI frameworks (Next.js + ShadCN)
- ⚙️ Scalable backend logic (Flask + MongoDB)
- 📊 Real-time data visualization
- 🔐 Secure multi-role admin tools
- 📁 Seamless form handling and export utilities

Perfect for academic platforms, learning communities, or coding clubs to manage interactive content at scale.

---

## 🛠️ Getting Started

### Frontend

```bash
cd admin_flashcode
npm install
npm run dev
```
