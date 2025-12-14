import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['Pre', 'CC', 'CC Apt', 'NMP', 'MA', 'EA'] as const;

type SalesData = Record<string, number[]>;

interface ReportSectionProps {
	salesData: SalesData;
	storeNumber: string;
}

export function ReportSection({ salesData, storeNumber }: ReportSectionProps) {
	const [copied, setCopied] = useState(false);

	const calculateTotal = (sales: number[]): number => {
		return sales.reduce((sum, sale) => sum + sale, 0);
	};

	const generateReport = (): string => {
		const lines: string[] = [];

		// Add store number
		lines.push(storeNumber || '(store number)');

		// Add each category with its total
		for (const category of CATEGORIES) {
			const sales = salesData[category] || [];
			const total = calculateTotal(sales);

			// Skip CC Apt if it has no sales
			if (category === 'CC Apt' && total === 0) {
				continue;
			}

			// Show empty string if total is 0, otherwise show the total
			lines.push(`${category}: ${total === 0 ? '' : total}`);
		}

		return lines.join('\n');
	};

	const handleCopy = async () => {
		const report = generateReport();
		try {
			await navigator.clipboard.writeText(report);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const report = generateReport();

	return (
		<div className="w-full max-w-sm mx-auto p-4">
			<h2 className="text-xl font-bold mb-4 text-center text-gray-800">Report</h2>
			<div className="bg-gray-50 rounded-lg p-4 mb-4">
				<pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{report}</pre>
			</div>
			<button
				onClick={handleCopy}
				className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2"
			>
				{copied ? (
					<>
						<Check size={20} />
						Copied!
					</>
				) : (
					<>
						<Copy size={20} />
						Copy Report
					</>
				)}
			</button>
		</div>
	);
}
