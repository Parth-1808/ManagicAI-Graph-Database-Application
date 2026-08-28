import { NextResponse } from 'next/server';
import { seedCognoDBDatabase } from '@/lib/seedCognoDB';

export async function POST() {
  try {
    const result = await seedCognoDBDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
