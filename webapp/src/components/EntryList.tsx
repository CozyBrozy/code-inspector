// webapp/src/components/EntryList.tsx
'use client';

import { useEntries } from '@/hooks/useEntries';

export default function EntryList() {
  const { entries, isLoading, isError } = useEntries();

  if (isLoading)
    return <p style={{ textAlign: 'center' }}>Lade Einträge…</p>;
  if (isError)
    return (
      <p style={{ textAlign: 'center', color: 'red' }}>
        Fehler beim Laden der Einträge
      </p>
    );

  return (
    <ul className="entry-list">
      {entries?.map((e) => (
        <li key={e.id} className="entry-item">
          <h2>{e.name}</h2>
          <dl className="entry-details">
            <div>
              <dt>Kalorien</dt>
              <dd>{e.calories}</dd>
            </div>
            <div>
              <dt>Kohlenhydrate</dt>
              <dd>{e.carbs} g</dd>
            </div>
            <div>
              <dt>Protein</dt>
              <dd>{e.protein} g</dd>
            </div>
            <div>
              <dt>Fett</dt>
              <dd>{e.fat} g</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
