import prisma from "../api/prismaClient";

async function clearDatabase() {
    try {
        await prisma.$executeRaw`TRUNCATE "Role" CASCADE`;
        await prisma.$executeRaw`TRUNCATE "User" CASCADE`;
        console.log("Database cleared successfully");
    } catch (error: unknown) {
        console.error("Failed to clear database", error);
    } finally {
        await prisma.$disconnect();
    }
}