// src/app/entries/page.tsx
import EntryForm from '@/components/EntryForm';
import EntryList from '@/components/EntryList';

export default function EntriesPage() {
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
        <EntryForm />
        <hr className="border-gray-300 dark:border-gray-600" />
        <EntryList />
      </main>
    </section>
  );
}
