import { PrismaClient } from "@/generated/prisma";

declare global {
    // allow global `var` across module reloads in development
    // eslint-disable-next-line vars-on-top
    interface GlobalWithPrisma {
        __prisma?: PrismaClient;
    }
    // allow global `var` across module reloads in development
    // eslint-disable-next-line vars-on-top
    var __prisma: GlobalWithPrisma["__prisma"];
}

const prisma = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.__prisma = prisma;
}

export { prisma };
export default prisma;