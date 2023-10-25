import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    return null;
  }

  async signup(signupReqDto: SignupReqDto) {
    // 비밀번호, 비밀번호 확인 
    const { email, password, passwordConfirm } = signupReqDto;
    if (password !== passwordConfirm) {
      throw new BadRequestException();
    }
    // 유저 정보 조회
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException();
    }
    // 유저 생성
    const createdUser = await this.userService.create(email, password);

    return createdUser;
  }

  async signin(signinReqDto: SigninReqDto) {
    const { email, password } = signinReqDto;
    // 유저 정보 조회
    const findUser = await this.userService.findOneByEmail(email);
    if (!findUser) {
      throw new UnauthorizedException();
    }

    const isMatch = password === findUser.password;
    if (!isMatch) throw new UnauthorizedException();

    return {
      accessToken: this.jwtService.sign({ sub: findUser.id })
    }

  }
}
