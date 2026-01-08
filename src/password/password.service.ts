import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {

  private readonly argonOptions: argon2.Options = {
    type: argon2.argon2id, 
    memoryCost: 2 ** 16,   // 64 MB 
    timeCost: 3,
    parallelism: 1,
  };

  public async hashPassword(password: string): Promise<string>{
    try {
      return await argon2.hash(password, this.argonOptions);
    } catch(error){
      console.error('Error parsing password: ', error);
      throw error; 
    } 
  }

  public async verifyPassword(hash: string, plain: string): Promise<boolean>{
    try {
      return await argon2.verify(hash, plain);
    } catch(error){
      return false;
    }
  }
}
