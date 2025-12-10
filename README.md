# Sales Pro

A lightweight sales tracking dashboard for recording and monitoring daily sales across multiple categories. Perfect for retail environments where quick data entry and real-time totals are essential.

## Features

- **5 Sales Categories**: Pre, CC, NMP, MA, EA
- **Quick Entry**: Input multiple sales at once with a single button click
- **Live Totals**: Automatic calculation of category totals
- **Individual Tracking**: View each sale alongside totals (e.g., "MA: 10, 20, 5, 10 TOTAL: 45")
- **Data Persistence**: Sales data saved in browser localStorage
- **Daily Reset**: Clear all data with one button for fresh starts
- **Mobile-First**: Optimized for phone usage with responsive desktop support

## Tech Stack

- React 19 + TypeScript
- Vite 7 with SWC
- Tailwind CSS 4
- Bun package manager

## Usage

1. **Enter Sales**: Type sale amounts in the input fields for any categories
2. **Add Sale**: Click the "Add Sale" button to record all entered values
3. **View Summary**: Scroll down to see individual sales and running totals per category
4. **Clear Day**: Use the "Clear Day" button to reset all data when starting a new day

### Example Workflow

```
Input:  MA: 10    NMP: 20
        EA: 15
Click "Add Sale"

Later:  MA: 5     CC: 10
Click "Add Sale"

Result:
  MA: 10, 5  TOTAL: 15
  CC: 10     TOTAL: 10
  NMP: 20    TOTAL: 20
  EA: 15     TOTAL: 15
```

## Data Persistence

Sales data is automatically saved to browser localStorage. Data persists across browser sessions until manually cleared with the "Clear Day" button.

## License

MIT
