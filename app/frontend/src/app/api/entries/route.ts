import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:8000/entries/');
    
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const entryData = await request.json();
    
    const response = await fetch('http://localhost:8000/entries/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create entry: ${errorText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
} 