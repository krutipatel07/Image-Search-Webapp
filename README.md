# Pexels Image Search & Bookmark App

This is a web application that allows users to search for images using the Pexels API, view image details, and bookmark their favorite images into custom folders.

## Features

* Search for images on Pexels.com.
* View search results in an image grid layout.
* Click on an image to view details (photographer, link to Pexels) in a modal window.
* Bookmark images into different folders.
* Manage bookmarks (add, update folder, remove).
* Responsive design.

## Technology Stack

* React
* Vite
* TypeScript
* Axios (for API calls)
* CSS Modules

## Prerequisites

* Node.js and npm (or yarn) installed on your machine.
* A Pexels API Key. You can get one for free from the [Pexels website](https://www.pexels.com/api/).

## Installation

1.  **Clone the repository (or download the source code):**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```
2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Environment Variables

This project requires a Pexels API key to function.

1.  Create a file named `.env` in the root directory of the project.
2.  Add your Pexels API key to the `.env` file like this:
    ```env
    VITE_PEXELS_API_KEY=YOUR_PEXELS_API_KEY
    ```
    Replace `YOUR_PEXELS_API_KEY` with your actual key.

## Running the Application

1.  **Start the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
2.  Open your web browser and navigate to the local URL provided by Vite (usually `http://localhost:5173` or similar).
