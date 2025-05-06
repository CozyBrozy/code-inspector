"use client"

// src/app/page.tsx
import { useState } from 'react';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';

export default function EntriesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleFormSuccess = () => {
    // Increment the key to force a re-render of EntryList
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
      <section className="flex justify-center">
        <main
            className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl
                   my-12 px-6 space-y-8 bg-white dark:bg-gray-800
                   rounded-2xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Lebensmittel-Einträge
          </h1>
          <EntryForm onSuccess={handleFormSuccess} />
          <hr className="border-gray-300 dark:border-gray-600" />
          <EntryList key={refreshKey} />
        </main>
      </section>
  );
}
