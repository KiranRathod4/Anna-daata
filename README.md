# Anna Daata: Smart Procurement & Trust Network for Street Food Vendors

Anna Daata is a web application designed to empower street food vendors by connecting them with a network of reliable raw material suppliers. It provides smart tools to streamline procurement, manage inventory, and discover the best deals, fostering a community of trust and turning passion into prosperity.

The application features two distinct portals: one for vendors and one for suppliers, each with a dedicated dashboard and tools tailored to their needs.

## Core Features

### For Vendors:
- **Browse & Purchase:** Search and filter a wide range of raw materials from various suppliers.
- **Order Management:** Place orders, track their status (Pending, Confirmed, Out for Delivery, Delivered), and view order history.
- **Smart Reorder Assistant (AI):** An AI-powered tool that analyzes past orders to suggest optimal reorder times and quantities, helping to prevent stockouts.
- **Bargain Hunter Agent (AI):** An AI agent that alerts vendors to deals from trusted suppliers or new suppliers with competitive prices and good reviews.
- **Profile Management:** Manage stall information, location, and cuisine type.

### For Suppliers:
- **Listing Management:** Create, update, and manage detailed listings for raw materials, including price, stock, and unit.
- **Order Dashboard:** View and manage incoming orders from vendors, and update order statuses.
- **Reputation System:** Build trust through vendor reviews and ratings, which are displayed on the dashboard.
- **Profile Management:** Manage business information, contact details, and specialties.

### General Features:
- **Dual Role Authentication:** Secure user authentication and profile management for both vendors and suppliers.
- **Dynamic Theming:** Light and dark mode support for a personalized user experience.
- **Responsive Design:** A fully responsive interface that works seamlessly on desktop and mobile devices.

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Auth:** [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/anna-daata.git
    cd anna-daata
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Firebase project configuration. You can get these keys from your Firebase project console.

    ```dotenv
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4.  **Run the development servers:**

    You need to run two separate processes: the Next.js frontend and the Genkit AI server.

    -   **Start the Next.js app:**
        ```sh
        npm run dev
        ```
        The application will be available at `http://localhost:9002`.

    -   **Start the Genkit server:**
        In a new terminal window, run:
        ```sh
        npm run genkit:dev
        ```
        This starts the Genkit development server, which the Next.js app will communicate with for AI features.

## Project Structure

-   `src/app/`: Contains the main application routes, pages, and layouts using the Next.js App Router.
    -   `src/app/(auth)/`: Routes for login and signup.
    -   `src/app/vendor/`: Routes and pages for the vendor portal.
    -   `src/app/supplier/`: Routes and pages for the supplier portal.
-   `src/components/`: Shared React components.
    -   `src/components/ui/`: Components from ShadCN/UI.
    -   `src/components/vendor/`: Components specific to the vendor experience.
-   `src/ai/`: Contains Genkit flows and AI-related logic.
    -   `src/ai/flows/`: Genkit flows for the AI agents.
-   `src/hooks/`: Custom React hooks for managing state (cart, orders, profile, etc.).
-   `src/lib/`: Utility functions, type definitions, and mock data.
-   `public/`: Static assets.

This structured approach ensures a clean and maintainable codebase.
