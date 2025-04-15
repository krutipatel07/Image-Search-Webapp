# Project Q&A: Image Search Web App

---

### ❓ What was your approach (thought process) to tackling this project?


1.  **Foundation & Setup:** Chose **Vite** for its rapid development server and optimized build process. Integrated **React** for component-based UI development and **TypeScript** from the outset to ensure type safety, reduce runtime errors, and improve code maintainability, especially as the application grows.
2.  **Core Feature - Image Searching:**
    * Identified the need for efficient server state management for interacting with the **Pexels API**. Selected **Tanstack Query (React Query)** to handle data fetching, caching, background updates, and managing loading/error states seamlessly. 
    * Designed a modular `SearchBar` component for user input and a `ImageGrid` component to display results fetched via Tanstack Query hooks.
3.  **State Management Strategy:**
    * **Server State (API Data):** Delegated entirely to Tanstack Query for fetching, caching, and invalidation of search results.
    * **Client State (Bookmarks & Folders):** Utilized **React Context API** combined with `useReducer`  to manage the global state of bookmarks and user-created folders. This allows different components (like the `ImageDetail` view and the `BookmarkPage`) to access and modify bookmark data consistently.
    * **Persistence:** Leveraged **Local Storage** to persist the bookmark and folder state across browser sessions, providing a seamless experience for returning users. Implemented utility functions to safely serialize/deserialize this data.
4.  **Feature Implementation - Bookmarking & Folders:**
    * Developed components for viewing individual images (`ImageDetail`) where users can trigger the bookmark action.
    * Implemented logic within the Context provider to add/remove bookmarks, associate them with a default or user-created folder, and manage folder creation/deletion.
    * Created a dedicated `BookmarkPage` component that subscribes to the bookmark context to display saved images, organized by folders.
5.  **Component Design:** Focused on creating reusable and well-defined components with clear responsibilities. Employed TypeScript interfaces/types for prop validation.
6.  **Iterative Development:** Started with the core search functionality, then progressively added the bookmarking features, context management, local storage persistence, and folder organization, ensuring each layer functioned correctly before adding the next.
7.  **Focus on accessibility and responsiveness**, using modular CSS.

 * My thought process was also guided by real-world UX — I wanted users to have an intuitive experience searching, viewing, and organizing images.

---

### ⚠️ What challenges did you face when creating your solution?

1.  **Seamless Infinite Scrolling:** Integrating infinite scrolling using Tanstack Query's `useInfiniteQuery` required careful management of paginated API responses from Pexels. Ensuring the correct parameters were passed for triggering the fetch for the next page (e.g., via `IntersectionObserver`) while maintaining a smooth user experience presented a complex state management challenge.
2.  **Optimized Image Rendering:** Challenge was designing and integrating appropriate placeholders that accurately reflected image dimensions before load, crucial for maintaining visual stability in the grid. Determining the optimal preview image sizes from the API also required consideration to balance performance and visual quality.
3.  **State Synchronization:** Ensuring consistency between the server state managed by Tanstack Query (search results, potentially showing if an image *is* bookmarked) and the client state managed by Context/Local Storage (the actual list of bookmarks).
4.  **Efficient Local Storage Management:** Structuring the bookmark and folder data in Local Storage effectively to avoid performance bottlenecks, especially if the number of bookmarks grows significantly. Ensuring robust serialization/deserialization and handling potential Local Storage limits or errors gracefully.
5.  **Context API Complexity:** As the bookmarking/folder logic grew (e.g., moving items between folders, editing folder names), managing the state logic within the Context provider and associated reducer could become complex.

---

###  💡What else can we do to make this better in terms of user experience?

1.  **Performance Optimization:**
    * **Debounce Search Input:** Implement debouncing on the search input field. This prevents firing API requests on every keystroke, instead waiting until the user pauses typing. It reduces the number of Pexels API calls, saves resources, and prevents UI flickering from rapidly changing results.
2.  **Enhanced Bookmark Management:**
    * **Search/Filter Bookmarks:** Add functionality to search or filter saved bookmarks by keywords or tags within the bookmark page.
    * **Sorting Options:** Allow users to sort bookmarks (e.g., by date added, alphabetically).
    * **Drag-and-Drop:** Implement drag-and-drop functionality for organizing bookmarks into folders more intuitively.
    * **Bulk Actions:** Allow users to select multiple bookmarks for actions like deletion or moving between folders.
3.  **Improved Feedback & Interaction:**
    * **Clearer Loading/Empty States:** Enhance visual feedback during loading (e.g., skeleton loaders) and provide more informative messages for empty search results or empty bookmark folders.
    * **UI Polish:** Add subtle animations or transitions for smoother interactions (e.g., when opening/closing image details, adding bookmarks).
5.  **Feature Expansion:**
    * **Theming:** Introduce light/dark mode options based on user preference or system settings.
    * **(Advanced) Sharing:** Explore options for sharing specific bookmarks or folders.
    * **Image Download:** Add a button to directly download the high-resolution version of a bookmarked image via the Pexels API.

---

