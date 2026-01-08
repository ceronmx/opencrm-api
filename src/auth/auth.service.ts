import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private passService: PasswordService){}

  async validateUser(email: string, pass: string): Promise<any>{
    const user = await this.userService.findCredential(email);
    if(!user) return null;
    const correct =  await this.passService.verifyPassword(user.password, pass);
    return correct;
  }
}
