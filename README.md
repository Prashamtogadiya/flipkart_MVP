# FLIPKART_MVP

_Empowering seamless shopping experiences, effortlessly connected._

<p align="center">
  <img alt="last-commit" src="https://img.shields.io/github/last-commit/Prashamtogadiya/flipkart_MVP?style=flat&logo=git&logoColor=white&color=0080ff" />
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/Prashamtogadiya/flipkart_MVP?style=flat&color=0080ff" />
  <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/Prashamtogadiya/flipkart_MVP?style=flat&color=0080ff" />
</p>

<p align="center">
  <em>Built with:</em><br/>
  <img alt="Express" src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" />
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&logo=Mongoose&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" />
  <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC.svg?style=flat&logo=Redux&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-06B6D4.svg?style=flat&logo=TailwindCSS&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" />
  <img alt="PostCSS" src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" />
  <img alt="Autoprefixer" src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" />
  <img alt=".ENV" src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" />
</p>

---

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**flipkart_MVP** is a robust full-stack e-commerce MVP inspired by Flipkart, featuring a modern React + Redux frontend and a secure Express/MongoDB backend. It is designed for rapid development, maintainability, and a seamless user experience.

### Why flipkart_MVP?
- **Modern UI/UX:** Flipkart-style layouts, responsive design, and reusable React components.
- **Robust Authentication:** Secure login/signup, protected routes, and error handling.
- **Cart & Orders:** Add to cart, update quantity, place orders, and view order history.
- **Product Management:** Browse, search, and view detailed product pages with image galleries.
- **Centralized State:** Redux for authentication and cart, with clear separation of concerns.
- **API Management:** Axios for all API calls, with a single configuration point.

---

## Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Prashamtogadiya/flipkart_MVP
   cd flipkart_MVP
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Usage

- **Start the backend server:**
  ```sh
  cd backend
  npm start
  ```
- **Start the frontend dev server:**
  ```sh
  cd frontend
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Testing

- **Backend tests:**
  ```sh
  cd backend
  npm test
  ```
- **Frontend tests:**
  ```sh
  cd frontend
  npm test
  ```

---

## Features
- Flipkart-style responsive UI (React + Tailwind CSS)
- Authentication (signup, login, protected routes)
- Product listing, search, and detail pages
- Cart management (add, update, remove, place order)
- Order history
- Centralized API and state management (Axios, Redux)
- Error handling and user feedback dialogs
- Modular, maintainable codebase

---

## Project Structure

```
flipkart_MVP/
├── backend/           # Express, MongoDB, REST API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/          # React, Redux, Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices & logic
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── ...
└── README.md
```

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## License

This project is licensed under the MIT License.
