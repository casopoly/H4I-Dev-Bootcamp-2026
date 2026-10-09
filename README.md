# SLO Drip

A coffee shop website for a two-store coffee house in San Luis Obispo, California, with a menu that the shop can update itself.

**Live site:** [slodrip.vercel.app](https://slodrip.vercel.app)

> SLO Drip is a fictional demo project made for a coding bootcamp. It is not a real business and is not affiliated with any other business.

## Table of Contents

- [Overview](#overview)
  - [Purpose](#purpose)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Team](#team)
- [Getting Started And Contributing](#getting-started-and-contributing)

## Overview

### Purpose

SLO Drip gives customers one place to see what the shop serves, where its two stores are and when they are open, and what jobs are available. It also gives the shop owner a simple way to keep the menu up to date without editing code: after logging in, an admin can change or remove menu items and the public menu updates right away.

### Features

- **Menu:** drinks and pastries grouped by category, with search and prices for each size (S, M, L)
- **Locations:** both stores with photos, hours, phone numbers and a link to Google Maps
- **Jobs:** open positions at each store
- **Admin area:** password-protected pages to edit and delete menu items. The menu API rejects invalid data with clear messages
- **Responsive design:** works on phones and desktops

### Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) for the menu data
- [Vitest](https://vitest.dev/) for unit tests
- [Vercel](https://vercel.com/) for hosting

### Team

The SLO Drip team consists of 5 students who built this web application together in the Hack4Impact Dev Bootcamp. The team members are listed below:

- [Caleb So](https://github.com/casopoly) - Tech Lead
- [Dorsey Campbell](https://github.com/DaRealDorseyBro) - Software Developer
- [Olivia Chau](https://github.com/oliviachau) - Software Developer
- [Bisman Kaur](https://github.com/kaurbisman2008-ctrl) - Software Developer
- [Noah Shahraz](https://github.com/noahshahraz) - Software Developer

## Getting Started And Contributing

To run the site on your computer:

1. Clone the repository and run `npm i` in its folder
2. Copy `.env.local.example` to `.env.local` and fill in `MONGO_URI` and `ADMIN_PASSWORD` (the real values come from the tech lead, never put them in git)
3. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000)
4. Run `npm test` to run the unit tests

Visit [getting-started.md](docs/getting-started.md) on info for how to set up this repo.

Visit [contributing.md](docs/contributing.md) on info for how to contribute to this repo.
