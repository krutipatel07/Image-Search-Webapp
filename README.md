# Pexels Image Search & Bookmark App

A web application that allows users to search for images using the Pexels API, view image details, and bookmark their favorite images into custom folders.

## Contents
* [Features](#Features)
* [Technology Stack](#TechnologyStack)
* [Prerequisites](#Prerequisites)
* [Environment Variables](#EnvironmentVariables)
* [Installation](#Installation)
* [Running the Application](#RunningtheApplication)
* [Screenshots](#ScreenShots)
* [License](#License)

## Features

* Search for images on Pexels.com.
* View search results in an image grid layout.
* Click on an image to view details (photographer, link to Pexels) in a modal window.
* Bookmark images into different folders.
* Manage bookmarks (add, update folder, remove).
* Responsive design.

## Technology Stack

* **Vite:** A fast frontend build tool for modern web projects.
* **React.js:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
* **Axios:** A promise-based HTTP client for making API requests (used for Pexels API).
* **CSS Modules:** CSS files where names are scoped locally to avoid conflicts.
* **TanStack Query (React Query):** Library for fetching, caching, and managing server state (likely used for Pexels API calls).
* **React Context API:** React structure for sharing state across components without prop drilling (likely used for bookmarks).
* **LocalStorage:** Browser storage for persisting data locally (likely used for saving bookmarks).

## Prerequisites

* Node.js and npm (or yarn) installed.
* A Pexels API Key ([Get one here](https://www.pexels.com/api/)).

## Environment Variables

This project requires a Pexels API key to function.

1.  Create a file named `.env` in the root project directory (the directory containing the `src` folder).
2.  Add your Pexels API key to the `.env` file:
    ```env
    VITE_PEXELS_API_KEY=YOUR_PEXELS_API_KEY
    ```
    Replace `YOUR_PEXELS_API_KEY` with your actual key.

## Installation

1.  Navigate to the project's root directory in your terminal.
2.  Install dependencies:
    * Using npm:
        ```bash
        npm install
        ```
    * Or using yarn:
        ```bash
        yarn install
        ```

## Running the Application

1.  Start the development server from the project's root directory:
    * Using npm:
        ```bash
        npm run dev
        ```
    * Or using yarn:
        ```bash
        yarn dev
        ```
2.  Open your web browser and go to the local URL provided (usually `http://localhost:5173` or similar).

## ScreenShots
![Image Search Web app](/assets/SearchPage.png)
![Image Search Web app](/assets/AddtoFolder-Bookmark.png)
![Image Search Web app](/assets/SavedBookmarks.png)

## Credits
* Coded by Kruti Patel.
