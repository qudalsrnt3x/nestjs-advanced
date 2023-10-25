import { Controller, Get, Param } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindUserReqDto } from './dto/req.dto';

@ApiTags('User')
@ApiExtraModels(FindUserReqDto) // swagger에 findUserReqDto 추가
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') { id }: FindUserReqDto) {
    return this.userService.findOne(id);
  }
}
