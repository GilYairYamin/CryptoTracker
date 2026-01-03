# CryptoTracker

**A lightweight, framework-free Single Page Application (SPA) for tracking real-time cryptocurrency data.**

## Overview

CryptoTracker is a dynamic web application that allows users to monitor cryptocurrency prices and view real-time market trends.
Unlike typical modern web apps that rely on heavy frameworks like React or Angular, this project was built entirely with **Vanilla JavaScript (ES6+)**. This architectural choice demonstrates a deep understanding of the DOM, state management, and asynchronous data handling without abstraction layers.

## Tech Stack

- **Core:** Vanilla JavaScript (ES6 Modules)
- **UI/Styling:** HTML5, CSS3, Bootstrap 5
- **Data Visualization:** Chart.js
- **API:** [CryptoCompare API](https://min-api.cryptocompare.com/)
- **State Management:** Browser `sessionStorage`

## Key Features

- **Component-Based Architecture:** Modular JavaScript design where UI elements (Searchbar, Coin Cards) are encapsulated in reusable functions.
- **Real-Time Visualization:** Integrates **Chart.js** to render live price updates. Implements a **sliding window algorithm** to maintain a fixed dataset size (15 points), preventing memory leaks during long-running sessions.
- **Lazy Loading:** Detailed pricing data (USD/ILS/EUR) is fetched asynchronously on-demand only when a user expands a specific coin card, minimizing unnecessary API calls.
- **Session Persistence:** Utilizes `sessionStorage` to cache the user's selected coins and active tab. This ensures the workspace is preserved if the page is refreshed, but clears automatically when the session ends.
- **Data Normalization:** Implements an adapter layer to transform raw API responses into a clean, internal data structure before rendering.

## Project Structure

```text
/
├── index.html          # Main entry point (Shell)
├── app.js              # Core router and application entry
├── css/                # Custom styles
└── javascript/
    ├── data/
    │   ├── marketCap.js    # CryptoCompare API Adapter
    │   └── cache.js        # sessionStorage Logic
    ├── main-page/      # Coin Grid & Search Logic
    │   ├── main-page.js    # Controller
    │   ├── coins-div.js    # List Container
    │   ├── coin-element.js # Card Component
    │   └── searchbar.js    # Search Component
    ├── live-update/    # Charting Logic
    │   ├── live-update-page.js # Page Controller
    │   └── live-chart.js       # Chart.js Config & Sliding Window
    └── about-page/     # Static content injector
```

## 🔧 Setup & Usage

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    ```
2.  **Open `index.html`:**
    **Note:** Since this project uses ES6 modules (`import/export`), you must run it on a local server to avoid CORS errors (browsers block `file://` imports for security).
    - **VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
    - **Python:** Run `python -m http.server` in the project directory and visit `localhost:8000`.
