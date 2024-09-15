import prisma from "../api/prismaClient";

const users = [
    {
        lastname: "Doe",
        firstname: "John",
        email: "jdoe@astros.com",
        password: "password",
        roleId: 1,
        status: true,
    },
    {
        lastname: "Doe",
        firstname: "Jane",
        email: "jane@astros.com",
        password: "password",
        roleId: 2,
        status: true,
    },
    {
        lastname: "Doe",
        firstname: "Jack",
        email: "jack@astros.com",
        password: "password",
        roleId: 3,
        status: true,
    }
];

async function sequenceExists(sequenceName: string): Promise<boolean> {
    const result = await prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS (
        SELECT FROM information_schema.sequences 
        WHERE sequence_schema = 'public' 
        AND sequence_name = ${sequenceName}
      );
    `;
    return result[0].exists;
  }
  
  async function resetIdSequences() {
    const sequenceName = 'Role_id_seq';
    const exists = await sequenceExists(sequenceName);
    if (exists) {
        await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    } else {
      console.log(`Sequence "${sequenceName}" does not exist, skipping reset`);
    }
  }

async function seedUsers() {
    try{
        await resetIdSequences();
        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    password: user.password,
                    roleId: user.roleId,
                    status: user.status,
                    carts: { create: [] },
                    orders: { create: [] },
                } as any,
            });
        }
        console.log("Users seeded successfully");
    } catch (error: unknown) {
        console.error("Failed to seed users", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default seedUsers;