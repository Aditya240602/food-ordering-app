// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create delivery drivers
  const driver1 = await prisma.deliveryDriver.create({
    data: {
      name: 'Rajesh Kumar',
      phone_number: '+91-9876543210',
      vehicle_type: 'Bike',
      vehicle_number: 'DL-01-AB-1234',
      license_number: 'DL1234567890',
      availability_status: 'available',
      current_location_lat: 28.5355,
      current_location_lng: 77.3910,
    },
  });

  const driver2 = await prisma.deliveryDriver.create({
    data: {
      name: 'Amit Singh',
      phone_number: '+91-9876543211',
      vehicle_type: 'Scooter',
      vehicle_number: 'DL-02-CD-5678',
      license_number: 'DL0987654321',
      availability_status: 'available',
      current_location_lat: 28.5450,
      current_location_lng: 77.4000,
    },
  });

  // Create restaurants
  const swaadOfIndia = await prisma.restaurant.create({
    data: {
      name: 'Swaad of India',
      address: 'Sector 18, Dwarka, New Delhi',
      cuisine_type: 'North Indian',
      operating_hours: '11:00 AM - 11:00 PM',
      status: 'active',
      rating: 4.5,
      image_url: '/images/restaurants/swaad.jpg',
      is_canteen: false,
    },
  });

  const biryaniPalace = await prisma.restaurant.create({
    data: {
      name: 'Biryani Palace',
      address: 'Connaught Place, New Delhi',
      cuisine_type: 'Hyderabadi',
      operating_hours: '12:00 PM - 12:00 AM',
      status: 'active',
      rating: 4.7,
      image_url: '/images/restaurants/biryani-palace.jpg',
      is_canteen: false,
    },
  });

  const curryHouse = await prisma.restaurant.create({
    data: {
      name: 'Curry House',
      address: 'Hauz Khas Village, New Delhi',
      cuisine_type: 'Multi-Cuisine Indian',
      operating_hours: '10:00 AM - 10:00 PM',
      status: 'active',
      rating: 4.3,
      image_url: '/images/restaurants/curry-house.jpg',
      is_canteen: false,
    },
  });

  const nsutCanteen = await prisma.restaurant.create({
    data: {
      name: 'NSUT Canteen',
      address: 'Netaji Subhas University of Technology, Dwarka',
      cuisine_type: 'Indian Snacks',
      operating_hours: '8:00 AM - 6:00 PM',
      status: 'active',
      rating: 4.0,
      image_url: '/images/restaurants/nsut-canteen.jpg',
      is_canteen: true,
    },
  });

  // Menu items for Swaad of India
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken pieces',
        price: 320,
        restaurant_id: swaadOfIndia.restaurant_id,
        is_available: true,
        category: 'Main Course',
        image_url: '/images/menu/butter-chicken.jpg',
      },
      {
        name: 'Paneer Tikka Masala',
        description: 'Grilled cottage cheese in rich spicy gravy',
        price: 280,
        restaurant_id: swaadOfIndia.restaurant_id,
        is_available: true,
        category: 'Main Course',
        image_url: '/images/menu/paneer-tikka.jpg',
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils cooked in butter and cream',
        price: 220,
        restaurant_id: swaadOfIndia.restaurant_id,
        is_available: true,
        category: 'Main Course',
        image_url: '/images/menu/dal-makhani.jpg',
      },
      {
        name: 'Garlic Naan',
        description: 'Soft flatbread topped with garlic and butter',
        price: 50,
        restaurant_id: swaadOfIndia.restaurant_id,
        is_available: true,
        category: 'Breads',
        image_url: '/images/menu/garlic-naan.jpg',
      },
      {
        name: 'Gulab Jamun',
        description: 'Deep-fried dumplings soaked in sugar syrup',
        price: 80,
        restaurant_id: swaadOfIndia.restaurant_id,
        is_available: true,
        category: 'Desserts',
        image_url: '/images/menu/gulab-jamun.jpg',
      },
    ],
  });

  // Menu items for Biryani Palace
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Hyderabadi Chicken Biryani',
        description: 'Aromatic basmati rice layered with spiced chicken',
        price: 350,
        restaurant_id: biryaniPalace.restaurant_id,
        is_available: true,
        category: 'Biryani',
        image_url: '/images/menu/chicken-biryani.jpg',
      },
      {
        name: 'Mutton Biryani',
        description: 'Tender mutton pieces cooked with fragrant rice',
        price: 420,
        restaurant_id: biryaniPalace.restaurant_id,
        is_available: true,
        category: 'Biryani',
        image_url: '/images/menu/mutton-biryani.jpg',
      },
      {
        name: 'Veg Dum Biryani',
        description: 'Mixed vegetables in aromatic biryani rice',
        price: 280,
        restaurant_id: biryaniPalace.restaurant_id,
        is_available: true,
        category: 'Biryani',
        image_url: '/images/menu/veg-biryani.jpg',
      },
      {
        name: 'Raita',
        description: 'Cooling yogurt with cucumber and spices',
        price: 60,
        restaurant_id: biryaniPalace.restaurant_id,
        is_available: true,
        category: 'Side Dish',
        image_url: '/images/menu/raita.jpg',
      },
    ],
  });

  // Menu items for Curry House
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Chole Bhature',
        description: 'Spicy chickpeas with fluffy fried bread',
        price: 150,
        restaurant_id: curryHouse.restaurant_id,
        is_available: true,
        category: 'Main Course',
        image_url: '/images/menu/chole-bhature.jpg',
      },
      {
        name: 'Palak Paneer',
        description: 'Cottage cheese cubes in spinach gravy',
        price: 240,
        restaurant_id: curryHouse.restaurant_id,
        is_available: true,
        category: 'Main Course',
        image_url: '/images/menu/palak-paneer.jpg',
      },
      {
        name: 'Tandoori Roti',
        description: 'Whole wheat bread baked in tandoor',
        price: 25,
        restaurant_id: curryHouse.restaurant_id,
        is_available: true,
        category: 'Breads',
        image_url: '/images/menu/tandoori-roti.jpg',
      },
    ],
  });

  // Menu items for NSUT Canteen
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Chilli Potato',
        description: 'Crispy fried potatoes tossed in spicy sauce',
        price: 60,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/chilli-potato.jpg',
      },
      {
        name: 'Veg Chowmein',
        description: 'Stir-fried noodles with vegetables',
        price: 50,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/chowmein.jpg',
      },
      {
        name: 'Fried Rice',
        description: 'Indo-Chinese style fried rice',
        price: 55,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/fried-rice.jpg',
      },
      {
        name: 'Samosa',
        description: 'Crispy pastry filled with spiced potatoes',
        price: 15,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/samosa.jpg',
      },
      {
        name: 'Patties',
        description: 'Vegetable or aloo patties',
        price: 20,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/patties.jpg',
      },
      {
        name: 'Bread Pakoda',
        description: 'Spiced potato filling between bread slices',
        price: 25,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/bread-pakoda.jpg',
      },
      {
        name: 'Maggi',
        description: 'Classic instant noodles with Indian spices',
        price: 30,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Snacks',
        image_url: '/images/menu/maggi.jpg',
      },
      {
        name: 'Tea',
        description: 'Hot Indian chai',
        price: 10,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Beverages',
        image_url: '/images/menu/tea.jpg',
      },
      {
        name: 'Cold Coffee',
        description: 'Chilled coffee with ice cream',
        price: 40,
        restaurant_id: nsutCanteen.restaurant_id,
        is_available: true,
        category: 'Beverages',
        image_url: '/images/menu/cold-coffee.jpg',
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📍 Created ${2} delivery drivers`);
  console.log(`🍽️  Created ${4} restaurants (3 regular + 1 canteen)`);
  console.log(`📋 Created menu items for all restaurants`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });