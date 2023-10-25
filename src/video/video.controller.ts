import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';

@ApiTags('Video')
@ApiExtraModels(FindVideoReqDto)
@Controller('api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  upload(@Body() creaetVideoReqDto: CreateVideoReqDto) {
    return this.videoService.create();
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') { id }: FindVideoReqDto) {
    return this.videoService.findOne(id);
  }

  @Get(':id/download')
  async download(@Param('id') { id }: FindVideoReqDto) {
    return this.videoService.download(id);
  }
}
