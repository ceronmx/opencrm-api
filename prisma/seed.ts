import { Omit } from "@prisma/client/runtime/client";
import { PrismaClient, type User_Credential } from "./generated/client";
import * as argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: ""+process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});

const argonOptions: argon2.Options = {
    type: argon2.argon2id, 
    memoryCost: 2 ** 16,   // 64 MB 
    timeCost: 3,
    parallelism: 1,
  };

async function hashPassword(password: string): Promise<string>{
  try {
    return await argon2.hash(password, argonOptions);
  } catch (e){
    console.log("Error hashing password", e);
    throw e;
  }
}

async function main(){
  const user: Omit<User_Credential, 'id'>= {
    email: "admin@test.com",
    password: "micomicon"
  };
  const hash = await hashPassword(user.password);
  const createdCredential = await prisma.user_Credential.create({
    data: {
      email: user.email,
      password: hash
    }
  });
  const createdUser = await prisma.user.create({
    data: {
      credentialId: createdCredential.id
    }
  })

  console.log(createdUser);
};

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
  process.exit(1);
});
