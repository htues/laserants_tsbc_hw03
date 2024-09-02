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

async function seedUsers() {
    try{
        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: user,
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