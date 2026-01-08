import { Injectable } from '@nestjs/common';
import { User_Credential } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async findCredential(email: string): Promise<User_Credential | undefined>{
    try {
      const userCredential = await this.prisma.user_Credential.findUniqueOrThrow({
        where: {email}
      })
      return userCredential;
    } catch (error){
      throw error;
    }
  }
}
