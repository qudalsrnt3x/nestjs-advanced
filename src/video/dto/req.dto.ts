import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoReqDto {
    @ApiProperty({ required: true })
    title: string;
    @ApiProperty({ required: true, type: 'string', format: 'binary' })
    video: any;
}

export class FindVideoReqDto {
    @ApiProperty({ required: true })
    id: string;
}