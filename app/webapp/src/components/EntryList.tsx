"use client"

import { useEffect, useState } from 'react';
import { Entry } from '@/types';

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError('Error loading entries: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  if (isLoading) return <div className="py-4">Loading entries...</div>;
  if (error) return <div className="py-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Einträge</h2>
      {entries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Keine Einträge vorhanden</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div 
              key={entry.id} 
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{entry.meal_description}</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="text-gray-600 dark:text-gray-400">Kalorien:</div>
                <div className="text-gray-800 dark:text-gray-200 font-medium">{entry.calories} kcal</div>
                
                <div className="text-gray-600 dark:text-gray-400">Kohlenhydrate:</div>
                <div className="text-gray-800 dark:text-gray-200 font-medium">{entry.carbohydrates} g</div>
                
                <div className="text-gray-600 dark:text-gray-400">Proteine:</div>
                <div className="text-gray-800 dark:text-gray-200 font-medium">{entry.protein} g</div>
                
                <div className="text-gray-600 dark:text-gray-400">Fett:</div>
                <div className="text-gray-800 dark:text-gray-200 font-medium">{entry.fat} g</div>
                
                <div className="text-gray-600 dark:text-gray-400">Zeitpunkt:</div>
                <div className="text-gray-800 dark:text-gray-200 font-medium">{formatDate(entry.meal_time)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 