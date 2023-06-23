import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

async function main() {
    const hashpassword = await argon.hash('123456');
    const admin1 = await prisma.user.upsert({
        where: {email: 'example@mmail.com'},
        update: {},
        create: {
            email: 'example@mmail.com',
            password: hashpassword,
            username: "example",
            role: "ADMIN"
        }
    })
}

main().then(async () => { 
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
})