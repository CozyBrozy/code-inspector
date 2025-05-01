// src/app/api/entries.ts
export async function createEntry(data: {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/entries/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function getEntry(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/entries/${id}`
  );
  return res.json();
}

export async function listEntries(skip = 0, limit = 100) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/entries/?skip=${skip}&limit=${limit}`
  );
  return res.json();
}
