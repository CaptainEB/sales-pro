import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const CATEGORIES = ['Pre', 'CC', 'CC Apt', 'NMP', 'MA', 'EA'] as const;

type SalesData = Record<string, number[]>;

interface SalesSummaryProps {
	salesData: SalesData;
	onClearDay: () => void;
}

export function SalesSummary({ salesData, onClearDay }: SalesSummaryProps) {
	const calculateTotal = (sales: number[]): number => {
		return sales.reduce((sum, sale) => sum + sale, 0);
	};

	const hasAnySales = Object.values(salesData).some((sales) => sales.length > 0);

	return (
		<div className="w-full max-w-sm mx-auto p-4">
			<h2 className="text-xl font-bold mb-4 text-center text-gray-800">Today's Sales</h2>
			<div className="space-y-4 bg-gray-50 rounded-lg p-4">
				{CATEGORIES.map((category) => {
					const sales = salesData[category] || [];
					const total = calculateTotal(sales);

					return (
						<div key={category} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
							<div className="flex items-center justify-between mb-1">
								<span className="font-semibold text-gray-700">{category}:</span>
								<span className="font-bold text-blue-600">TOTAL: {total}</span>
							</div>
							<div className="text-sm text-gray-600 pl-2">
								{sales.length > 0 ? (
									<span className="wrap-break-word">{sales.join(', ')}</span>
								) : (
									<span className="italic text-gray-400">No sales yet</span>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{hasAnySales && (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button className="w-full mt-6 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-95">
							Clear Day
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Clear Today's Sales?</AlertDialogTitle>
							<AlertDialogDescription>This will permanently delete all sales data for today. This action cannot be undone.</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={onClearDay} className="bg-red-500 hover:bg-red-600">
								Clear Day
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
