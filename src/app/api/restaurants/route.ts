import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isCanteen = searchParams.get('canteen') === 'true';

    const restaurants = await prisma.restaurant.findMany({
      where: { 
        is_canteen: isCanteen,
        status: 'active'
      },
      orderBy: {
        rating: 'desc'
      }
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}