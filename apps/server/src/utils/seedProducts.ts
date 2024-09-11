import prisma from '../api/prismaClient'

const products = [
  {
    id: 1,
    name: 'Lego Set',
    description: 'best lego sets',
    categoryId: 1,
    price: 29.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/tribuna-juguete-masculino-ni%C3%B1o-330930/',
  },
  {
    id: 2,
    name: 'Action Figure',
    description: 'g.i. joe, masters of the universe, etc',
    categoryId: 1,
    price: 14.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/colt-single-action-marcapasos-4394862/',
  },
  {
    id: 3,
    name: 'T-Shirt',
    description: 'best shirts in the world',
    categoryId: 2,
    price: 19.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/modelo-t-shirt-maniqu%C3%AD-azul-2710535/',
  },
  {
    id: 4,
    name: 'Jeans',
    description: 'very expensive jeans',
    categoryId: 2,
    price: 39.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/jeans-blanco-denim-azul-fondos-4907233/',
  },
  {
    id: 5,
    name: 'Sofa',
    description: 'this furnitures looks great in your leaving room',
    categoryId: 3,
    price: 499.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/garden-patio-appeltern-furniture-5353123/',
  },
  {
    id: 6,
    name: 'Dining Table',
    description: 'dining and kitchen tables',
    categoryId: 3,
    price: 299.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/taza-tabla-bebida-cafe%C3%ADna-desayuno-5089934/',
  },
  {
    id: 7,
    name: 'Pizza',
    description: 'best dish in the world',
    categoryId: 4,
    price: 9.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/pizza-cocina-pizzeria-comida-5275191/',
  },
  {
    id: 8,
    name: 'Burger',
    description: 'do not eat to much of this',
    categoryId: 4,
    price: 5.99,
    status: true,
    imageUrl:
      'https://pixabay.com/es/photos/hamburguer-foot-burguer-hamburguesa-2253344/',
  },
]

async function resetIdSequences() {
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`
}

async function seedProducts() {
  try {
    await resetIdSequences()
    for (const product of products) {
      await prisma.product.upsert({
        where: { name: product.name },
        update: {},
        create: {
          name: product.name,
          description: product.description,
          price: product.price,
          status: product.status,
          category: { connect: { id: product.categoryId } },
          variants: { create: [] },
        } as any,
      })
    }
    console.log('Products seeded successfully')
  } catch (error: unknown) {
    console.error('Failed to seed products', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default seedProducts
