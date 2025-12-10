import { SalesInput } from './components/SalesInput';
import { SalesSummary } from './components/SalesSummary';
import { useLocalStorage } from './hooks/useLocalStorage';

const CATEGORIES = ['Pre', 'CC', 'NMP', 'MA', 'EA'] as const;

type SalesData = Record<string, number[]>;

const initialSalesData: SalesData = CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: [] }), {});

function App() {
	const [salesData, setSalesData, clearSalesData] = useLocalStorage<SalesData>('sales-pro-data', initialSalesData);

	const handleAddSale = (newSales: Record<string, number>) => {
		setSalesData((prev) => {
			const updated = { ...prev };
			for (const [category, amount] of Object.entries(newSales)) {
				updated[category] = [...(updated[category] || []), amount];
			}
			return updated;
		});
	};

	const handleClearDay = () => {
		clearSalesData();
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4">
			<div className="max-w-lg mx-auto">
				<h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Sales Pro</h1>
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<SalesInput onAddSale={handleAddSale} />
					<div className="border-t border-gray-200" />
					<SalesSummary salesData={salesData} onClearDay={handleClearDay} />
				</div>
			</div>
		</div>
	);
}

export default App;
