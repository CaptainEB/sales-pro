# Sales Pro - Sales Tracking Dashboard

A single-page React app to track daily sales across 5 categories with input fields, running totals, individual sale breakdowns, and LocalStorage persistence. Mobile-first design using Tailwind CSS.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** with SWC for fast builds
- **Tailwind CSS 4** for styling
- **LocalStorage** for data persistence
- **Bun** as package manager

## Features

- Track 5 sales categories: **Pre, CC, NMP, MA, EA**
- Vertical input layout with number fields for each category
- Single "Add Sale" button to submit all non-empty inputs at once
- Display individual sales per category (e.g., "MA: 10, 20, 5, 10")
- Auto-calculated totals per category
- "Clear Day" button to reset all data
- Data persists in LocalStorage between sessions
- Mobile-first responsive design

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── App.tsx                     # Main app component
├── index.css                   # Tailwind CSS imports
├── components/
│   ├── SalesInput.tsx          # Input form for all categories
│   └── SalesSummary.tsx        # Display totals and individual sales
└── hooks/
    └── useLocalStorage.ts      # Custom hook for localStorage persistence
```

## Data Structure

```typescript
// Sales data stored in localStorage
type SalesData = Record<string, number[]>;

// Example:
{
  "Pre": [10, 25, 15],
  "CC": [5, 10],
  "NMP": [20, 30, 10, 5],
  "MA": [10, 20, 5, 10],
  "EA": [15, 25]
}
```

## Implementation Steps

1. ✅ Install and configure Tailwind CSS
2. ✅ Clean up Vite boilerplate
3. ✅ Create useLocalStorage hook
4. ✅ Build SalesInput component
5. ✅ Build SalesSummary component
6. ✅ Wire up App.tsx

## Usage

1. Enter sale amounts in any category input fields
2. Click "Add Sale" to record all entered values
3. View running totals and individual sales in the summary section
4. Click "Clear Day" to reset all data for a new day
