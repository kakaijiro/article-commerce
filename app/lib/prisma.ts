import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const globalPrisma = global as unknown as { prisma: PrismaClient | undefined };
if (!globalPrisma.prisma) {
  globalPrisma.prisma = new PrismaClient();
}
prisma = globalPrisma.prisma;

export default prisma;
// defined the object prisma as a global object to avoid multiple instances of PrismaClient being created. This is a common pattern in Next.js applications to avoid memory leaks and performance issues.
