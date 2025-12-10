import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
	// Get stored value or use initial value
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	// Update localStorage when state changes
	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	}, [key, storedValue]);

	// Clear function to reset to initial value
	const clearStorage = () => {
		try {
			window.localStorage.removeItem(key);
			setStoredValue(initialValue);
		} catch (error) {
			console.error(`Error clearing localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setStoredValue, clearStorage];
}
