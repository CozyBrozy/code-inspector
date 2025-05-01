// webapp/src/components/EntryForm.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { createEntry } from '@/app/api/entries';
import type { FoodEntryCreate } from '@/types/entry';

export default function EntryForm() {
  const [form, setForm] = useState<FoodEntryCreate>({
    name: '',
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'name' ? e.target.value : Number(e.target.value),
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createEntry(form);
    alert('Eintrag angelegt');
    setForm({ name: '', calories: 0, carbs: 0, protein: 0, fat: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {(['name', 'calories', 'carbs', 'protein', 'fat'] as const).map((key) => (
        <div key={key} className="form-group">
          <label htmlFor={key}>{key}</label>
          <input
            id={key}
            name={key}
            type={key === 'name' ? 'text' : 'number'}
            value={form[key]}
            onChange={handleChange}
            placeholder={key === 'name' ? 'Bezeichnung' : '0'}
          />
        </div>
      ))}
      <button type="submit">Speichern</button>
    </form>
  );
}
