import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: restaurantId } = await params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id: restaurantId }
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      );
    }

    const menuItems = await prisma.menuItem.findMany({
      where: { 
        restaurant_id: restaurantId,
      },
      orderBy: {
        category: 'asc'
      }
    });

    return NextResponse.json({
      restaurant,
      menuItems
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}