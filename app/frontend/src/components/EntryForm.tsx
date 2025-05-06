"use client"

import { useState } from 'react';
import { EntryCreate } from '@/types';

interface EntryFormProps {
  onSuccess?: () => void;
}

export default function EntryForm({ onSuccess }: EntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EntryCreate>({
    meal_description: '',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    meal_time: new Date().toISOString().slice(0, 16)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericFields = ['calories', 'carbohydrates', 'protein', 'fat'];

    setFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/entries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Eintrags');
      }

      // Reset the form after successful submission
      setFormData({
        meal_description: '',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        meal_time: new Date().toISOString().slice(0, 16)
      });

      // Callback to refresh the list
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Fehler beim Erstellen des Eintrags: ' +
               (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Neuer Eintrag
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mahlzeitbeschreibung
          </label>
          <textarea
            name="meal_description"
            value={formData.meal_description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kalorien (kcal)
            </label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              required
              min={0}
              step="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                       focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kohlenhydrate (g)
            </label>
            <input
              type="number"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
              required
              min={0}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                       focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              required
              min={0}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                       focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fett (g)
            </label>
            <input
              type="number"
              name="fat"
              value={formData.fat}
              onChange={handleChange}
              required
              min={0}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                       focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zeitpunkt
          </label>
          <input
            type="datetime-local"
            name="meal_time"
            value={formData.meal_time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent
                     rounded-md shadow-sm text-sm font-medium text-white bg-blue-600
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Wird gespeichert...' : 'Eintrag speichern'}
          </button>
        </div>
      </form>
    </div>
  );
}
