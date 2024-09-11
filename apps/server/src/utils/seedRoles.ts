import prisma from "../api/prismaClient";

const roles = [
  {
    name: "ADMINISTRATOR",
    description: "Admin users have full access to all resources",
    status: true,
  },
    {
        name: "SUPERVISOR",
        description: "supervisor users have access to most resources",
        status: true,
    },
  {
    name: "USER",
    description: "User users have limited access to resources",
    status: true,
  },
];

async function seedRoles() {
    try{
        for (const role of roles) {
            await prisma.role.upsert({
                where: { name: role.name },
                update: {},
                create: role,
            });
        }
        console.log("Roles seeded successfully");
    } catch (error: unknown) {
        console.error("Failed to seed roles", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default seedRoles;