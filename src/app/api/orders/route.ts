import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.customerName || !body.customerPhone || !body.restaurantId || !body.items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or find customer
    let customer = await prisma.customer.findFirst({
      where: { phone_number: body.customerPhone }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: body.customerName,
          email: body.customerEmail || null,
          phone_number: body.customerPhone,
          status: 'active'
        }
      });
    }

    // Calculate total amount
    const totalAmount = body.items.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity),
      0
    );

    // Create order with order items
    const order = await prisma.order.create({
      data: {
        customer_id: customer.customer_id,
        restaurant_id: body.restaurantId,
        total_amount: totalAmount * 1.05, // Including 5% tax
        order_type: body.orderType, // 'delivery' or 'takeaway'
        status: 'pending',
        notes: body.notes || null,
        order_items: {
          create: body.items.map((item: any) => ({
            item_id: item.id,
            quantity: item.quantity,
            price_at_order_time: item.price,
            special_instructions: item.instructions || null
          }))
        }
      },
      include: {
        order_items: {
          include: {
            menu_item: true
          }
        },
        restaurant: true
      }
    });

    // If delivery order, create delivery record
    if (body.orderType === 'delivery' && body.deliveryAddress) {
      const driver = await prisma.deliveryDriver.findFirst({
        where: { availability_status: 'available' }
      });

      if (driver) {
        await prisma.delivery.create({
          data: {
            order_id: order.order_id,
            driver_id: driver.driver_id,
            delivery_status: 'pending',
            delivery_address: body.deliveryAddress,
            delivery_fee: 40,
            estimated_delivery_time: new Date(Date.now() + 45 * 60000)
          }
        });

        await prisma.deliveryDriver.update({
          where: { driver_id: driver.driver_id },
          data: { availability_status: 'busy' }
        });
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { order_id: orderId },
        include: {
          order_items: { include: { menu_item: true } },
          restaurant: true,
          customer: true,
          deliveries: { include: { driver: true } }
        }
      });
      return NextResponse.json(order);
    }

    const orders = await prisma.order.findMany({
      include: { restaurant: true, customer: true },
      orderBy: { order_date: 'desc' },
      take: 50
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}