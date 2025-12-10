import { useState } from 'react';

const CATEGORIES = ['Pre', 'CC', 'NMP', 'MA', 'EA'] as const;

type CategoryInputs = Record<string, string>;

interface SalesInputProps {
	onAddSale: (sales: Record<string, number>) => void;
}

export function SalesInput({ onAddSale }: SalesInputProps) {
	const [inputs, setInputs] = useState<CategoryInputs>(() => CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: '' }), {}));

	const handleInputChange = (category: string, value: string) => {
		// Only allow positive integers
		if (value === '' || /^\d+$/.test(value)) {
			setInputs((prev) => ({ ...prev, [category]: value }));
		}
	};

	const handleAddSale = () => {
		const salesToAdd: Record<string, number> = {};

		// Collect all non-empty inputs
		for (const [category, value] of Object.entries(inputs)) {
			if (value !== '') {
				const numValue = parseInt(value, 10);
				if (numValue > 0) {
					salesToAdd[category] = numValue;
				}
			}
		}

		// Only proceed if there's at least one sale to add
		if (Object.keys(salesToAdd).length > 0) {
			onAddSale(salesToAdd);
			// Clear all inputs after adding
			setInputs(CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: '' }), {}));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddSale();
		}
	};

	return (
		<div className="w-full max-w-sm mx-auto p-4">
			<h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add Sales</h2>
			<div className="space-y-3">
				{CATEGORIES.map((category) => (
					<div key={category} className="flex items-center gap-3">
						<label htmlFor={category} className="w-16 text-right font-semibold text-gray-700">
							{category}:
						</label>
						<input
							id={category}
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							value={inputs[category]}
							onChange={(e) => handleInputChange(category, e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="0"
							className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
						/>
					</div>
				))}
			</div>
			<button
				onClick={handleAddSale}
				className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 active:scale-95"
			>
				Add Sale
			</button>
		</div>
	);
}
