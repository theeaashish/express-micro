import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrisma = () => new PrismaClient();

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  (process.env.NODE_ENV === "production"
    ? createPrisma()
    : (globalForPrisma.prisma = createPrisma()));

export default prisma;
