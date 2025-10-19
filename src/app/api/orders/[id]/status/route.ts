import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderId = params.id;

    const order = await prisma.order.update({
      where: { order_id: orderId },
      data: {
        status: body.status,
        updated_at: new Date()
      },
      include: { deliveries: true }
    });

    // Update delivery status if exists
    if (order.deliveries.length > 0 && body.deliveryStatus) {
      await prisma.delivery.update({
        where: { delivery_id: order.deliveries[0].delivery_id },
        data: { delivery_status: body.deliveryStatus }
      });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}