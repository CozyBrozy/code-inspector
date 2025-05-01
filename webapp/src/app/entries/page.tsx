// webapp/src/app/entries/page.tsx
'use client';

import EntryForm from '@/components/EntryForm';
import EntryList from '@/components/EntryList';

export default function EntriesPage() {
  return (
    <div className="page-wrapper">
      <h1>Lebensmittel-Einträge</h1>

      <div className="form-box">
        <EntryForm />
      </div>

      <div className="list-box">
        <EntryList />
      </div>
    </div>
  );
}
