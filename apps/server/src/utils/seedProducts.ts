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
      'https://static.thcdn.com/images/large/webp//productimg/1600/1600/15066969-1055120637632265.jpg',
  },
  {
    id: 2,
    name: 'Action Figure',
    description: 'g.i. joe, masters of the universe, etc',
    categoryId: 1,
    price: 14.99,
    status: true,
    imageUrl:
      'https://m.media-amazon.com/images/I/71zS41vyMQL._AC_SL1500_.jpg',
  },
  {
    id: 3,
    name: 'T-Shirt',
    description: 'best shirts in the world',
    categoryId: 2,
    price: 19.99,
    status: true,
    imageUrl:
      'https://sportsgoodsmarket.com/wp-content/uploads/2021/04/JUST-SUPERSTAR-T-SHIRT-I.BLUE_.jpg',
  },
  {
    id: 4,
    name: 'Jeans',
    description: 'very expensive jeans',
    categoryId: 2,
    price: 39.99,
    status: true,
    imageUrl:
      'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/02/shaping-jeans.jpg',
  },
  {
    id: 5,
    name: 'Sofa',
    description: 'this furnitures looks great in your leaving room',
    categoryId: 3,
    price: 499.99,
    status: true,
    imageUrl:
      'https://www.creativefabrica.com/wp-content/uploads/2019/11/22/1574412817/Sofa-sketch-drawing-style-580x386.jpg',
  },
  {
    id: 6,
    name: 'Dining Table',
    description: 'dining and kitchen tables',
    categoryId: 3,
    price: 299.99,
    status: true,
    imageUrl:
      'https://static.wixstatic.com/media/9209ab_5eb8fad32a6a48528a3eb9e6a318e7a7~mv2.jpg/v1/fill/w_633,h_460,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9209ab_5eb8fad32a6a48528a3eb9e6a318e7a7~mv2.jpg',
  },
  {
    id: 7,
    name: 'Pizza',
    description: 'best dish in the world',
    categoryId: 4,
    price: 9.99,
    status: true,
    imageUrl:
      'https://www.allrecipes.com/thmb/ULiSEmH8Tje7Hh-TW1aN2P8dC98=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/240376-homemade-pepperoni-pizza-Beauty-3x4-1-6ae54059c23348b3b9a703b6a3067a44.jpg',
  },
  {
    id: 8,
    name: 'Burger',
    description: 'do not eat to much of this',
    categoryId: 4,
    price: 5.99,
    status: true,
    imageUrl:
      'https://www.plasutil.com.br/wp-content/uploads/2022/04/Hamburguer.jpg',
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
          imageUrl: product.imageUrl,
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
