# Product Inventory — Summary

IMPORTANT: DO NOT BUILD OR DEPLOY THIS PROJECT UNLESS YOU HAVE EXPLICIT APPROVAL.

## Project Overview
A minimal full‑stack exercise demonstrating:
- A small Node.js + Express backend serving product data and allowing stock updates.
- A React frontend that lists products in a responsive grid and lets users adjust per‑item stock.
- Local data storage (JSON file or in‑memory) only — no heavy DB.

## API Endpoints
- GET /products
  - Returns: array of products (5-10 items) with fields: id, name, price, stockQuantity, lowStockThreshold.
- POST /update-stock
  - Body: { id: number, newQuantity: number }
  - Validation: rejects negative newQuantity with an error.
  - Returns the updated product on success.

## Frontend Requirements
- Responsive card grid for products (mobile-first).
- Each card shows name, price, stock, and lowStockThreshold.
- "+" and "−" buttons to change stock. Disable "−" when stock is 0.
- If stock < lowStockThreshold, card updates visually (e.g., red border and "Critical Low" badge) immediately.
- Show per-item loading state while waiting for the API response.

## Data Model (per product)
- id: number
- name: string
- price: number
- stockQuantity: number
- lowStockThreshold: number

## Constraints & Notes
- Persist data in a local JSON file or keep in memory; do not use MongoDB/MySQL.
- Enable CORS for local frontend/backends during development.
- API must enforce non‑negative stock; frontend must prevent negative values in the UI.
- Handle quick repeated clicks via per-item loading locks or disabled controls while a request is pending.

## Suggested Workflow (do not run until approved)
1. Review and approve this README.
2. Implement backend: Express server with the two endpoints; store products in backend/products.json.
3. Implement frontend: React (Vite suggested). Fetch products, render grid, wire increment/decrement handlers to POST /update-stock, show loading states.
4. Test validation, UX for low stock visuals, mobile responsiveness, and edge cases (concurrent updates).

## Acceptance Criteria
- Backend implements GET /products and POST /update-stock with negative quantity validation.
- Frontend displays/respects lowStockThreshold, prevents negative stock, shows loading states, and is responsive.
- No heavy DB used.
- Project is not built or deployed until explicit approval is granted.

## Contact / Approval
Request approval from the project owner before building or running the code.
