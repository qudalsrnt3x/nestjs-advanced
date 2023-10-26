import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refresh-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>
    ) {}

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

    // 리프레쉬 토큰 생성 
    const refreshToken = this.generateRefreshToken(findUser.id);
    await this.createRefreshTokenUsingUser(findUser.id, refreshToken);

    return {
      accessToken: this.jwtService.sign({ sub: findUser.id }),
      refreshToken,
    }
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  private async createRefreshTokenUsingUser(userId: string, refreshToken: string) {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({ user: { id: userId } });
    if (refreshTokenEntity) { // 이미 있다면 토큰만 교체
      refreshTokenEntity.token = refreshToken; 
    } else {
      refreshTokenEntity = this.refreshTokenRepository.create({ user: {id: userId }, token: refreshToken });
    }
    await this.refreshTokenRepository.save(refreshTokenEntity);
  }

}
