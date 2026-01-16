# Honest Graphics Backend

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Check `.env` file and ensure `MONGO_URI` is correct.
    ```
    MONGO_URI=mongodb://localhost:27017/honest_graphics
    ```

3.  **Seed Database**:
    Populate the database with sample products and users.
    ```bash
    npm run data:import
    ```

4.  **Run Server**:
    - Development: `npm run dev`
    - Production: `npm start`

## API Endpoints

-   **Auth**:
    -   POST `/api/auth/register`
    -   POST `/api/auth/login`
    -   GET `/api/auth/me` (Protected)

-   **Products**:
    -   GET `/api/products`
    -   GET `/api/products/:slug`
    -   POST `/api/products` (Admin)
    -   PUT `/api/products/:id` (Admin)
    -   DELETE `/api/products/:id` (Admin)

-   **Orders**:
    -   POST `/api/orders` (Protected)
    -   GET `/api/orders/:id` (Protected)
    -   PUT `/api/orders/:id/pay` (Protected)
    -   GET `/api/orders/myorders` (Protected)
    -   GET `/api/orders` (Admin)
